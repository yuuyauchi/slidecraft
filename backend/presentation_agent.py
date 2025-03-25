from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from fastapi import FastAPI
import os
import uvicorn
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from powerpoint_routes import slidespeak_api_call  # Import 変更
from dotenv import load_dotenv

load_dotenv()

# OpenAI APIキーの設定
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def save_response_as_json(response_data, filename="data.json"):
    """APIレスポンスをJSONファイルとして保存する"""
    with open(filename, "w", encoding="utf-8") as json_file:
        json.dump(response_data, json_file, indent=4, ensure_ascii=False)
    print(f"APIレスポンスが {filename} に保存されました。")

# GPTモデルの設定
llm = ChatOpenAI(model_name="gpt-4")

class PresentationRequest(BaseModel):
    topic: str
    purpose: str
    audience: str

class FeedbackRequest(BaseModel):
    structure: str
    feedback: str

class ConvertStringToJson(BaseModel):
    slides_text: str

class PPTGenerationRequest(BaseModel):
    slides: object
    template: str = "default"
    language: str = "ORIGINAL"
    fetch_images: bool = True

# **AIエージェントの基本クラス**
class PresentationAgent:
    def __init__(self):
        self.prompt = PromptTemplate(
            input_variables=["topic", "purpose", "audience"],
            template=(
                """
                あなたは優秀なプレゼン資料作成アシスタントです。\n
                ユーザーは {topic} についてのプレゼン資料を作成しようとしています。\n
                プレゼンの目的は {purpose} で、対象者は {audience} です。\n
                適切なプレゼン構成を考え、それに基づいた詳細なプロンプトを以下の形式で作成し、それ以外の内容は記載しないでください。
                
                [出力内容]
                各スライド番号の目次
                各スライドのタイトルと内容
                """
            )
        )
        self.chain = self.prompt | llm | StrOutputParser()

    def generate_structure(self, topic: str, purpose: str, audience: str):
        """プレゼンの初期スライド構成を生成"""
        self.topic = topic
        self.purpose = purpose
        self.audience = audience
        # breakpoint()
        self.structure = self.chain.invoke(input={"topic": self.topic, "purpose": self.purpose, "audience": self.audience})
        save_response_as_json(self.structure, filename="initial_presentation_structure.json")
        return self.structure
    
    def refine_structure(self, structure: str, feedback: str):
        """ユーザーのフィードバックを反映してスライド構成を修正"""
        self.prompt = PromptTemplate(
            input_variables=["structure", "feedback"],
            template=(
                f"ユーザーが以下のスライド構成を修正したいと考えています。\n"
                f"【元のスライド構成】\n{structure}\n\n"
                f"【ユーザーのフィードバック】\n{feedback}\n\n"
                f"フィードバックを反映して、新しいスライド構成を考えてください。"
            )
        )
        self.chain = self.prompt | llm | StrOutputParser()
        refined_structure = self.chain.invoke(input={"structure": structure, "feedback": feedback})
        save_response_as_json(refined_structure, filename="refined_presentation_structure.json")
        return refined_structure
    
    def convert_structure_to_dict(self, slides_text: str):
        """スライド構成の文字列をJSON形式に変換"""
        self.prompt = PromptTemplate(
            input_variables=["slides_text"],
            template=(
                "以下のスライド構成を JSON 形式に変換してください。\n"
                "layout は 'items'、item_amount は 1 に設定してください"
                "期待する JSON のフォーマット:\n"
                "{{\n"
                "    'slides': [\n"
                "        {{\n"
                "            'title': 'スライドタイトル',\n"
                "            'layout': 'items',\n"
                "            'item_amount': '1',\n"
                "            'content_description': 'スライドの詳細な内容'\n"
                "        }}\n"
                "    ]\n"
                "}}\n"
                "【スライド構成】\n"
                "{slides_text}\n"
                "JSON のみを返してください。他の説明やコメントは不要です。"
            )
        )
        
        self.chain = self.prompt | llm | JsonOutputParser()
        # JSON形式のスライドデータを取得
        slides_json = self.chain.invoke({"slides_text": slides_text})

        # JSONデータを保存
        with open("slides_structure.json", "w", encoding="utf-8") as json_file:
            json.dump(slides_json, json_file, indent=4, ensure_ascii=False)

        # 結果の出力
        print("生成されたスライド構成:", slides_json)
        # breakpoint()
        return slides_json


# FastAPIアプリの作成
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.jsの開発サーバーを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)

# **エージェントのプレゼン生成API**
@app.post("/generate_structure/")
def generate_structure(request: PresentationRequest):
    """プレゼンのスライド構成を生成"""
    agent = PresentationAgent()
    structure = agent.generate_structure(request.topic, request.purpose, request.audience)
    return {"topic": request.topic, "purpose": request.purpose, "structure": structure}
    # return {"structure": structure}

@app.post("/refine_structure/")
def refine_structure(request: FeedbackRequest):
    """ユーザーのフィードバックを適用してスライド構成を修正"""
    agent = PresentationAgent()
    structure = request.structure  # 🔹 追加
    feedback = request.feedback
    presentation = agent.refine_structure(structure, feedback)
    return {"structure": presentation}

@app.post("/convert_structure_to_dict/")
def convert_structure_to_dict(request: ConvertStringToJson):
    # breakpoint()
    agent = PresentationAgent()
    slide_json = agent.convert_structure_to_dict(request.slides_text)
    return {"slides_json": slide_json}

@app.post("/generate_powerpoint/")
def generate_powerpoint(request: PPTGenerationRequest):
    """SlideSpeak API を使って PowerPoint を生成"""
    payload = request.slides
    payload["language"] = request.language
    payload["template"] = request.template
    
    # SlideSpeak にリクエストを送信
    response = slidespeak_api_call(payload)
    # breakpoint()
    download_url = response["task_info"]["url"]
    print(download_url)
    
    return {"message": "PowerPoint 生成完了", "download_url": download_url}

