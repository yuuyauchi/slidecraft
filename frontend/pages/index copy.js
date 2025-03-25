import { useState } from "react";
import InputForm from "../components/InputForm";
import SlideEditor from "../components/SlideEditor";
import ConfirmScreen from "../components/ConfirmScreen";
import { generateStructure, refineStructure, generatePowerPoint } from "../api/presentationApi";

export default function Home() {
  const [view, setView] = useState("input"); // "input" | "edit" | "confirm"
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [generatedStructure, setGeneratedStructure] = useState(null);
  const [editedSlides, setEditedSlides] = useState([]);
  const [customFeedback, setCustomFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState("default");
  const [language, setLanguage] = useState("ORIGINAL");
  const [fetchImages, setFetchImages] = useState(true);
  const [downloadLink, setDownloadLink] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AIプレゼン資料作成</h1>

        {view === "input" && (
          <InputForm
            topic={topic} setTopic={setTopic}
            purpose={purpose} setPurpose={setPurpose}
            audience={audience} setAudience={setAudience}
            setView={setView} setGeneratedStructure={setGeneratedStructure}
            setEditedSlides={setEditedSlides} setLoading={setLoading}
          />
        )}

        {view === "edit" && (
          <SlideEditor
            generatedStructure={generatedStructure}
            setGeneratedStructure={setGeneratedStructure}
            editedSlides={editedSlides}
            setEditedSlides={setEditedSlides}
            customFeedback={customFeedback}
            setCustomFeedback={setCustomFeedback}
            setView={setView}
            setLoading={setLoading}
          />
        )}

        {view === "confirm" && (
          <ConfirmScreen
            editedSlides={editedSlides}
            template={template} setTemplate={setTemplate}
            language={language} setLanguage={setLanguage}
            fetchImages={fetchImages} setFetchImages={setFetchImages}
            generatePowerPoint={generatePowerPoint} downloadLink={downloadLink}
          />
        )}
      </div>
    </div>
  );
}
