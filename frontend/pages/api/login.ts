import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ユーザ情報を一時的に保持（実際はDBを使用すべき）
interface User {
  username: string;
  password: string; // ハッシュ化されたパスワード
}

let users: User[] = [
  {
    username: "testuser",
    password: "$2a$10$abcdefghijk", // 例：bcrypt でハッシュ化されたパスワード
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password }: { username: string; password: string } = req.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(400).json({ message: "ユーザーが見つかりません" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "パスワードが違います" });
    }

    const token = jwt.sign({ username }, "your_secret_key", {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "ログイン成功", token });
  }

  return res
    .status(405)
    .json({ message: "POSTメソッドのみがサポートされています。" });
}
