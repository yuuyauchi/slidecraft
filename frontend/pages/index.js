import { useState } from "react";
import InputForm from "../components/InputForm";
import SlideEditor from "../components/SlideEditor";
import ConfirmScreen from "../components/ConfirmScreen";
import { generateStructure, refineStructure, generatePowerPoint } from "../api/presentationApi";
import PPTSettingScreen from "../components/PPTSettingScreen";

const usersDB = [
  { username: "testuser", password: "password123" },
  { username: "admin", password: "adminpass" }
];
// ログインフォーム
function LoginForm({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = usersDB.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin();
    } else {
      alert("ユーザー名またはパスワードが間違っています。");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        className="p-3 border rounded-lg"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="p-3 border rounded-lg"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg" onClick={handleLogin}>
        ログイン
      </button>
      <button className="text-blue-600 underline" onClick={switchToRegister}>
        新規ユーザー登録はこちら
      </button>
    </div>
  );
}


// 新規登録フォーム
function RegisterForm({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (username && password) {
      alert("ユーザー登録が完了しました（仮実装）");
      onRegister();
    } else {
      alert("すべての項目を入力してください");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        className="p-3 border rounded-lg"
        placeholder="新しいユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="p-3 border rounded-lg"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-6 py-3 rounded-lg" onClick={handleRegister}>
        登録
      </button>
      <button className="text-blue-600 underline" onClick={switchToLogin}>
        ログイン画面に戻る
      </button>
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // 🔸 登録画面切り替え用
  const [view, setView] = useState("input");
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
  const [selectedTemplateName, setSelectedTemplateName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AIプレゼン資料作成</h1>

        {!isLoggedIn ? (
          isRegistering ? (
            <RegisterForm
              onRegister={() => {
                setIsRegistering(false);
              }}
              switchToLogin={() => setIsRegistering(false)}
            />
          ) : (
            <LoginForm
              onLogin={() => setIsLoggedIn(true)}
              switchToRegister={() => setIsRegistering(true)}
            />
          )
        ) : (
          <>
            {view === "input" && (
              <InputForm
                topic={topic}
                setTopic={setTopic}
                purpose={purpose}
                setPurpose={setPurpose}
                audience={audience}
                setAudience={setAudience}
                setView={setView}
                setGeneratedStructure={setGeneratedStructure}
                setEditedSlides={setEditedSlides}
                setLoading={setLoading}
                loading={loading}
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
                loading={loading}
              />
            )}
            {view === "ppt-setting" && (
              <PPTSettingScreen
                template={template} setTemplate={setTemplate}
                language={language} setLanguage={setLanguage}
                fetchImages={fetchImages} setFetchImages={setFetchImages}
                handleGeneratePowerPoint={() => generatePowerPoint(editedSlides, template, language, fetchImages)}
                downloadLink={downloadLink}
                selectedTemplateName={selectedTemplateName}
                setSelectedTemplateName={setSelectedTemplateName}
                setView={setView}
              />
            )}
            {view === "confirm" && (
              <ConfirmScreen
                editedSlides={editedSlides}
                template={template}
                setTemplate={setTemplate}
                language={language}
                setLanguage={setLanguage}
                fetchImages={fetchImages}
                setFetchImages={setFetchImages}
                generatePowerPoint={generatePowerPoint}
                downloadLink={downloadLink}
                loading={loading}
                selectedTemplateName={selectedTemplateName}
                setSelectedTemplateName={setSelectedTemplateName}
              />
            )}

          </>
        )}
      </div>
    </div>
  );
}
