import bcrypt from "bcryptjs";

let users = []; // 実際はDBを使うべきですが、今回は簡易実装

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    const existing = users.find(u => u.username === username);
    if (existing) {
      return res.status(400).json({ message: "すでに存在するユーザーです" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    res.status(200).json({ message: "ユーザー登録完了" });
  } else {
    res.status(405).json({ message: "POSTのみ対応しています" });
  }
}
