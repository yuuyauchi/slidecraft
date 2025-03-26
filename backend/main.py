from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from api.slidestructure_routes import router as slidestructure_router
from api.powerpoint_routes import router as powerpoint_router
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントからのアクセス許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_dir = os.path.dirname(os.path.abspath(__file__))
print(current_dir)
static_path = os.path.join(current_dir, "images") 
app.mount("/images", StaticFiles(directory=static_path), name="images")


# APIルーター登録
app.include_router(slidestructure_router)
app.include_router(powerpoint_router)
