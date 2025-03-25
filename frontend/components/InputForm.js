import { generateStructure } from "../api/presentationApi";

export default function InputForm({
  topic, setTopic,
  purpose, setPurpose,
  audience, setAudience,
  setView, setGeneratedStructure,
  setEditedSlides, setLoading,
  loading
}) {
  const handleGenerateStructure = async () => {
    setLoading(true);
    try {
      const data = await generateStructure(topic, purpose, audience);
      setGeneratedStructure(data);
      setEditedSlides(data.structure);
      setView("edit");
    } catch (error) {
      alert("スライド構成の生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="プレゼンのテーマ"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="プレゼンの目的"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded-lg"
          placeholder="対象者"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        onClick={handleGenerateStructure}
        disabled={loading}
      >
        {loading ? "読み込み中..." : "スライド構成生成"}
      </button>
    </>
  );
}
