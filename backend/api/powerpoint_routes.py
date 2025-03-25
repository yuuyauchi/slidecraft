from fastapi import APIRouter
from models.schemas import PPTGenerationRequest
from services.powerpoint_service import generate_powerpoint_slide
from services.slidestructure_service import convert_structure_text_to_json

router = APIRouter()

@router.post("/generate_powerpoint/")
def generate_powerpoint(request: PPTGenerationRequest):
    payload = request.slides
    payload["language"] = request.language
    payload["template"] = request.template
    response = generate_powerpoint_slide(payload)
    download_url = response["task_info"]["url"]
    print(download_url)
    
    return {"message": "PowerPoint 生成完了", "download_url": download_url}
