# ✅ 修正後の slidestructure_service.py
from agents.presentation_agent import PresentationAgent
from utils.file_io import save_response_as_json
import os
from dotenv import load_dotenv
import time
load_dotenv()

SLIDES_SPEAK_API_KEY = os.getenv("SLIDES_SPEAK_API_KEY")

def generate_initial_structure(topic: str, purpose: str, audience: str) -> str:
    """
    プレゼンの初期構成を生成する
    """
    agent = PresentationAgent()
    structure = agent.generate_structure(topic, purpose, audience)
    save_response_as_json(structure, filename="initial_presentation_structure.json")
    return structure


def refine_slide_structure(structure: str, feedback: str) -> str:
    """
    スライド構成にユーザーのフィードバックを適用して修正
    """
    agent = PresentationAgent()
    refined_structure = agent.refine_structure(structure, feedback)
    save_response_as_json(refined_structure, filename="refined_presentation_structure.json")
    return refined_structure


def convert_structure_text_to_json(slides_text: str) -> dict:
    """
    文字列のスライド構成を JSON 辞書形式に変換する
    """
    agent = PresentationAgent()
    slides_json = agent.convert_structure_to_dict(slides_text)
    save_response_as_json(slides_json, filename="slides_structure.json")
    return slides_json
