import requests
import os
from dotenv import load_dotenv
import time
load_dotenv()

SLIDES_SPEAK_API_KEY = os.getenv("SLIDES_SPEAK_API_KEY")

def generate_powerpoint_slide(payload: dict):
    url = "https://api.slidespeak.co/api/v1/presentation/generate/slide-by-slide"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": SLIDES_SPEAK_API_KEY
    }
    response = requests.post(url, headers=headers, json=payload)
    print(response.json())
    response = response.json()
    powerpoint_url = f"https://api.slidespeak.co/api/v1/task_status/{response['task_id']}"

    for _ in range(10):
        response = requests.get(powerpoint_url, headers=headers)
        if response.json()["task_status"] == "SUCCESS":
            break
        time.sleep(10)
        print("wait")

    response_json = response.json()
    return response_json
