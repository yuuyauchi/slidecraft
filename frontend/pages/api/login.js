import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let users = []; // 上と同じ変数（実際はDB使用推奨）

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "ユーザーが見つかりません" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "パスワードが違います" });

    const token = jwt.sign({ username }, "your_secret_key", { expiresIn: "1h" });

    res.status(200).json({ message: "ログイン成功", token });
  } else {
    res.status(405).json({ message: "POSTのみ対応しています" });
  }
}

