import { refineStructure } from "../api/presentationApi";

export default function SlideEditor({ 
  generatedStructure, setGeneratedStructure, 
  editedSlides, setEditedSlides, 
  customFeedback, setCustomFeedback, 
  setView, setLoading,
  loading 
}) {
  
  // スライド構成の編集処理（文字列を直接編集）
  const handleSlideTextChange = (e) => {
    setEditedSlides(e.target.value); // 入力されたテキストをそのまま状態に保存
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

      // 修正されたスライド構成を更新
      if (typeof setGeneratedStructure === "function") {
        setGeneratedStructure(response.structure);
      } else {
        console.error("setGeneratedStructure is not a function");
      }
      
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

      {/* スライド構成の編集（テキストエリア） */}
      <textarea
        className="w-full p-3 border rounded-lg mt-2 focus:ring-2 focus:ring-gray-400"
        value={editedSlides}
        onChange={handleSlideTextChange} // 文字列として扱う
        rows={8}
      />

      {/* 修正フィードバック入力 */}
      <input
        className="w-full p-3 border rounded-lg mt-2"
        placeholder="プロンプト経由でスライド構成修正の必要があればフィードバックを入力し、スライド修正ボタンをクリック"
        value={customFeedback}
        onChange={(e) => setCustomFeedback(e.target.value)}
      />

      {/* スライド修正ボタン */}
      <button 
        className="bg-green-600 text-white px-6 py-3 rounded-lg mt-2" 
        onClick={handleRefineStructure}
        disabled={loading}
      >
        {loading ? "スライド修正中..." : "スライド修正"}
      </button>

      {/* 詳細確認ボタン */}
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
