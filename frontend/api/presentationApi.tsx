const API_BASE_URL = "http://localhost:8000";

// 型定義
export interface SlideData {
  topic: string;
  purpose: string;
  structure: string;
}

export interface RefineResponse {
  structure: string;
}

export interface SlidesJson {
  slides_json: {
    slides: Array<{
      title: string;
      layout: string;
      item_amount: string;
      content_description: string;
    }>;
  };
}

// プレゼンのスライド構成を生成
export const generateStructure = async (
  topic: string,
  purpose: string,
  audience: string
): Promise<SlideData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_structure/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, purpose, audience }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: SlideData = await response.json();
    return data;
  } catch (error) {
    console.error("スライド構成の生成に失敗:", error);
    throw error;
  }
};

// スライド構成を修正
export const refineStructure = async (
  structure: string,
  feedback: string
): Promise<RefineResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/refine_structure/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structure, feedback }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: RefineResponse = await response.json();
    return data;
  } catch (error) {
    console.error("スライド構成の修正に失敗:", error);
    throw error;
  }
};

// スライド構成の文字列をJSON形式に変換
export const convertStructureToJson = async (
  slidesText: string
): Promise<SlidesJson> => {
  try {
    const response = await fetch(`${API_BASE_URL}/convert_structure_to_dict/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides_text: slidesText }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: SlidesJson = await response.json();
    return data;
  } catch (error) {
    console.error("スライド構成の JSON 変換に失敗:", error);
    throw error;
  }
};

// PowerPoint を生成
export const generatePowerPoint = async (
  slidesJson: SlidesJson,
  template: string,
  language: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_powerpoint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slides: slidesJson.slides_json,
        template,
        language,
      }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data: { download_url: string } = await response.json();
    return data.download_url;
  } catch (error) {
    console.error("PowerPoint 生成に失敗:", error);
    throw error;
  }
};
