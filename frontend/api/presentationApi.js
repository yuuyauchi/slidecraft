const API_BASE_URL = "http://localhost:8000";

// プレゼンのスライド構成を生成
export const generateStructure = async (topic, purpose, audience) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_structure/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, purpose, audience }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // { topic, purpose, structure }
  } catch (error) {
    console.error("スライド構成の生成に失敗:", error);
    throw error;
  }
};

// スライド構成を修正
export const refineStructure = async (structure, feedback) => {
  try {
    const response = await fetch(`${API_BASE_URL}/refine_structure/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ structure, feedback }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // { structure: updatedStructure }
  } catch (error) {
    console.error("スライド構成の修正に失敗:", error);
    throw error;
  }
};

export const convertStructureToJson = async (slidesText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/convert_structure_to_dict/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slides_text: slidesText }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data; // JSON 形式のスライド構成
  } catch (error) {
    console.error("スライド構成の JSON 変換に失敗:", error);
    throw error;
  }
};

export const generatePowerPoint = async (slidesJson, template, language) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_powerpoint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        { 
          "slides": slidesJson.slides_json,
          "template": template,
          "language": language,
        }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data.download_url;
  } catch (error) {
    console.error("PowerPoint 生成に失敗:", error);
    throw error;
  }
};
