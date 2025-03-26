import React from "react";

type PPTSettingScreenProps = {
  template: string;
  setTemplate: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  fetchImages: boolean;
  setFetchImages: (value: boolean) => void;
  setView: (view: string) => void;
};

const templateList: string[] = [
  "default", "nebula", "aurora", "clyde", "adam",
  "lavender", "nexus", "monolith", "eddy", "bruno",
  "gradient", "iris", "daniel", "felix"
];

const languageList: string[] = ["ORIGINAL", "English", "Japanese"];

export default function PPTSettingScreen({
  template, setTemplate,
  language, setLanguage,
  fetchImages, setFetchImages,
  setView
}: PPTSettingScreenProps) {
  const handleTemplateClick = (name: string) => {
    setTemplate(name);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold">PowerPoint 設定</h2>

      <div className="grid grid-cols-2 gap-2.5 text-sm leading-5 mt-4">
        {templateList.map((name) => (
          <div
            key={name}
            role="button"
            className={`border-4 rounded-xl hover:scale-[97%] hover:z-20 active:scale-[102%] transition-all duration-200 cursor-pointer ${
              template === name ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleTemplateClick(name)}
          >
            <div className="relative flex aspect-video flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <img
                className="absolute inset-0 z-10 object-cover transition-opacity duration-300 hover:opacity-0"
                alt={`theme preview cover for ${name}`}
                draggable={false}
                src={`http://localhost:8000/images/${name}-cover.jpg`}
              />
              <img
                className="absolute inset-0 object-cover"
                alt={`theme preview content for ${name}`}
                draggable={false}
                src={`http://localhost:8000/images/${name}-content.jpg`}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-700">
        現在選択中のテンプレート：<strong>{template}</strong>
      </p>
      <p className="mt-3 text-sm text-gray-700">
        現在選択中の言語：<strong>{language}</strong>
      </p>

      <label className="block mt-4">言語</label>
      <select
        className="w-full p-2 border rounded-md"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languageList.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <label className="block mt-2">
        <input
          type="checkbox"
          checked={fetchImages}
          onChange={() => setFetchImages(!fetchImages)}
          className="mr-2"
        />
        画像を取得する
      </label>

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4"
        onClick={() => setView("confirm")}
      >
        次へ
      </button>
    </div>
  );
}
