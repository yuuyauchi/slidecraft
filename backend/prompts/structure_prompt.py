# backend/services/structure_prompt.py
from langchain.prompts import PromptTemplate

# def get_initial_structure_prompt():
initial_structure_prompt = PromptTemplate(
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

# def get_refine_structure_prompt(structure: str, feedback: str):
refine_structure_prompt = PromptTemplate(
    input_variables=["structure", "feedback"],
    template=(
        """
        ユーザーが以下のスライド構成を修正したいと考えています。
        【元のスライド構成】\n{structure}
        【ユーザーのフィードバック】\n{feedback}
        フィードバックを反映して、新しいスライド構成を考えてください。
        """
    )
)

# def get_conversion_prompt():
conversion_prompt = PromptTemplate(
    input_variables=["slides_text"],
    template=(
        """
        以下のスライド構成を JSON 形式に変換してください。\n
        layout は 'items'、item_amount は 1 に設定してください
        期待する JSON のフォーマット:\n
        {{
            'slides': [
                {{
                    'title': 'スライドタイトル',
                    'layout': 'items',
                    'item_amount': '1',
                    'content_description': 'スライドの詳細な内容'
                }}
            ]
        }}
        【スライド構成】
        {slides_text}
        JSON のみを返してください。他の説明やコメントは不要です。
        """
    )
)
