import React from "react";
import { refineStructure } from "../api/presentationApi";

type SlideEditorProps = {
  generatedStructure: {
    topic?: string;
    purpose?: string;
    structure?: string;
  } | null;
  setGeneratedStructure: (structure: string) => void;
  editedSlides: string;
  setEditedSlides: (slides: string) => void;
  customFeedback: string;
  setCustomFeedback: (feedback: string) => void;
  setView: (view: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
};

export default function SlideEditor({
  generatedStructure,
  setGeneratedStructure,
  editedSlides,
  setEditedSlides,
  customFeedback,
  setCustomFeedback,
  setView,
  setLoading,
  loading,
}: SlideEditorProps) {
  // スライド構成の編集処理
  const handleSlideTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedSlides(e.target.value);
  };

  // スライド修正処理
  const handleRefineStructure = async () => {
    setLoading(true);
    try {
      const response = await refineStructure(editedSlides, customFeedback);
      console.log("Refined Structure Response:", response);

      if (!response.structure) {
        throw new Error("構造データが返されませんでした。");
      }

      setGeneratedStructure(response.structure);
      setEditedSlides(response.structure);
    } catch (error) {
      alert("フィードバックの適用に失敗しました。");
      console.error("フィードバック適用エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mt-6">スライド構成</h2>
      <p className="text-gray-600 mb-4">
        <strong>テーマ:</strong> {generatedStructure?.topic} | <strong>目的:</strong> {generatedStructure?.purpose}
      </p>

      <textarea
        className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-gray-400"
        value={editedSlides}
        onChange={handleSlideTextChange}
        rows={8}
      />

      <input
        className="w-full p-3 border rounded-lg mt-2"
        placeholder="プロンプト経由でスライド構成修正の必要があればフィードバックを入力し、スライド修正ボタンをクリック"
        value={customFeedback}
        onChange={(e) => setCustomFeedback(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-2"
        onClick={handleRefineStructure}
        disabled={loading}
      >
        {loading ? "スライド修正中..." : "スライド修正"}
      </button>

      <button
        className="bg-gray-500 text-white px-6 py-3 rounded-lg mt-2 ml-4"
        onClick={() => setView("ppt-setting")}
        disabled={loading}
      >
        {loading ? "読み込み中..." : "スライド構成を決定"}
      </button>
    </>
  );
}
