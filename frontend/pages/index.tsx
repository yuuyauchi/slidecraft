// pages/index.tsx
import { usePresentationState } from "../hooks/usePresentationState";
import InputForm from "../components/InputForm";
import SlideEditor from "../components/SlideEditor";
import ConfirmScreen from "../components/ConfirmScreen";
import PPTSettingScreen from "../components/PPTSettingScreen";
import { generatePowerPoint } from "../api/presentationApi";

const usersDB = [
  { username: "testuser", password: "password123" },
  { username: "admin", password: "adminpass" },
];

function LoginForm({ onLogin, switchToRegister }: { onLogin: () => void; switchToRegister: () => void }) {
  const { username, setUsername, password, setPassword } = usePresentationState();

  const handleLogin = () => {
    const user = usersDB.find((u) => u.username === username && u.password === password);
    if (user) onLogin();
    else alert("ユーザー名またはパスワードが間違っています。");
  };

  return (
    <div className="flex flex-col space-y-4">
      <input className="p-3 border rounded-lg" placeholder="ユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="p-3 border rounded-lg" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg" onClick={handleLogin}>ログイン</button>
      <button className="text-blue-600 underline" onClick={switchToRegister}>新規ユーザー登録はこちら</button>
    </div>
  );
}

function RegisterForm({ onRegister, switchToLogin }: { onRegister: () => void; switchToLogin: () => void }) {
  const { username, setUsername, password, setPassword } = usePresentationState();

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
      <input className="p-3 border rounded-lg" placeholder="新しいユーザー名" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" className="p-3 border rounded-lg" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-6 py-3 rounded-lg" onClick={handleRegister}>登録</button>
      <button className="text-blue-600 underline" onClick={switchToLogin}>ログイン画面に戻る</button>
    </div>
  );
}

export default function Home() {
  const state = usePresentationState();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">AIプレゼン資料作成</h1>

        {!state.isLoggedIn ? (
          state.isRegistering ? (
            <RegisterForm onRegister={() => state.setIsRegistering(false)} switchToLogin={() => state.setIsRegistering(false)} />
          ) : (
            <LoginForm onLogin={() => state.setIsLoggedIn(true)} switchToRegister={() => state.setIsRegistering(true)} />
          )
        ) : (
          <>
            {state.view === "input" && <InputForm {...state} />}
            {state.view === "edit" && <SlideEditor {...state} />}
            {state.view === "ppt-setting" && (
              <PPTSettingScreen
                {...state}
                handleGeneratePowerPoint={() =>
                  generatePowerPoint(state.editedSlides, state.template, state.language, state.fetchImages)
                }
              />
            )}
            {state.view === "confirm" && (
              <ConfirmScreen {...state} generatePowerPoint={generatePowerPoint} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
