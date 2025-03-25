# backend/utils/file_io.py

import json

def save_response_as_json(response_data, filename="data.json"):
    """APIレスポンスをJSONファイルとして保存する"""
    with open(filename, "w", encoding="utf-8") as json_file:
        json.dump(response_data, json_file, indent=4, ensure_ascii=False)
    print(f"APIレスポンスが {filename} に保存されました。")
