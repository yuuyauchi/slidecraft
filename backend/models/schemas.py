from pydantic import BaseModel

# プレゼン構成生成用リクエスト
class PresentationRequest(BaseModel):
    topic: str
    purpose: str
    audience: str

# スライド構成の修正リクエスト
class FeedbackRequest(BaseModel):
    structure: str
    feedback: str

# スライド構成（文字列）→ JSON 変換用リクエスト
class ConvertStringToJson(BaseModel):
    slides_text: str

# PowerPoint生成リクエスト用
class PPTGenerationRequest(BaseModel):
    slides: object
    template: str = "default"
    language: str = "ORIGINAL"
    fetch_images: bool = True
