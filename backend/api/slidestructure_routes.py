from fastapi import APIRouter
from models.schemas import PresentationRequest, FeedbackRequest, ConvertStringToJson
from services.slidestructure_service import (
    generate_initial_structure,
    refine_slide_structure,
    convert_structure_text_to_json
)

router = APIRouter()

@router.post("/generate_structure/")
def generate_structure(request: PresentationRequest):
    """プレゼンのスライド構成を生成"""
    structure = generate_initial_structure(
        topic=request.topic,
        purpose=request.purpose,
        audience=request.audience
    )
    # return structure
    return {
        "topic": request.topic,
        "purpose": request.purpose,
        "structure": structure
    }

@router.post("/refine_structure/")
def refine_structure(request: FeedbackRequest):
    """ユーザーのフィードバックを適用してスライド構成を修正"""
    refined_structure = refine_slide_structure(
        structure=request.structure,
        feedback=request.feedback
    )
    # return refined_structure
    return {"structure": refined_structure}

@router.post("/convert_structure_to_dict/")
def convert_structure_to_dict(request: ConvertStringToJson):
    """構成文字列を JSON に変換"""
    slides_json = convert_structure_text_to_json(request.slides_text)
    # return slides_json
    return {"slides_json": slides_json}
