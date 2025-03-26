import { useState } from "react";

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data: { message: string; token?: string } = await response.json();

      if (response.ok) {
        alert("ログイン成功！トークン: " + data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("ログイン中にエラーが発生しました");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        className="border p-2 w-full mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleLogin}>
        ログイン
      </button>
    </div>
  );
}
