from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from prompts.structure_prompt import initial_structure_prompt, refine_structure_prompt, conversion_prompt
import os
from dotenv import load_dotenv
load_dotenv()

SLIDES_SPEAK_API_KEY = os.getenv("SLIDES_SPEAK_API_KEY")

# GPTモデルの設定
llm = ChatOpenAI(model_name="gpt-4")

class PresentationAgent:
    def __init__(self):
        self.structure_chain = initial_structure_prompt | llm | StrOutputParser()
        self.refine_chain = refine_structure_prompt | llm | StrOutputParser()
        self.json_chain = conversion_prompt | llm | JsonOutputParser()

    def generate_structure(self, topic: str, purpose: str, audience: str):
        input_data = {"topic": topic, "purpose": purpose, "audience": audience}
        structure = self.structure_chain.invoke(input=input_data)
        return structure

    def refine_structure(self, structure: str, feedback: str):
        refined_structure = self.refine_chain.invoke({"structure": structure, "feedback": feedback})
        return refined_structure

    def convert_structure_to_dict(self, slides_text: str):
        slides_json = self.json_chain.invoke({"slides_text": slides_text})
        return slides_json
