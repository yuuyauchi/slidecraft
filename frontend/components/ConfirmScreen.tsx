import { useState } from "react";
import { convertStructureToJson, generatePowerPoint } from "../api/presentationApi";

// Props の型定義
type ConfirmScreenProps = {
  editedSlides: string;
  template: string;
  language: string;
};

export default function ConfirmScreen({
  editedSlides,
  template,
  language,
}: ConfirmScreenProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>("");

  const handleGeneratePowerPoint = async (template: string, language: string) => {
    setLoading(true);
    try {
      console.log("文字列を JSON に変換中...");
      const slidesJson = await convertStructureToJson(editedSlides);

      console.log("PowerPoint を生成中...");
      const downloadUrl = await generatePowerPoint(slidesJson, template, language);

      setDownloadLink(downloadUrl);
    } catch (error) {
      alert("PowerPoint の生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <p className="mt-3 text-sm text-gray-700">
        現在選択中のテンプレート：<strong>{template}</strong>
      </p>
      <p className="mt-3 text-sm text-gray-700">
        現在選択中の言語：<strong>{language}</strong>
      </p>
      <h2 className="text-xl font-semibold">スライド確認 & PowerPoint 設定(後日機能追加予定)</h2>
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4"
        onClick={() => handleGeneratePowerPoint(template, language)}
        disabled={loading}
      >
        {loading ? "生成中..." : "PowerPoint 生成"}
      </button>

      {downloadLink && (
        <a href={downloadLink} className="block text-blue-600 mt-2">
          PowerPoint をダウンロード
        </a>
      )}
    </div>
  );
}
