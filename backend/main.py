from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.slidestructure_routes import router as slidestructure_router
from api.powerpoint_routes import router as powerpoint_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントからのアクセス許可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIルーター登録
app.include_router(slidestructure_router)
app.include_router(powerpoint_router)
