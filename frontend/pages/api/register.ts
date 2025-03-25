import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

// 仮のユーザー保存場所（実運用ではDBを使うべき）
interface User {
  username: string;
  password: string; // ハッシュ化されたパスワード
}

let users: User[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password }: { username: string; password: string } = req.body;

    // すでに登録済みか確認
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "すでに存在するユーザーです" });
    }

    // パスワードをハッシュ化して保存
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    return res.status(200).json({ message: "ユーザー登録完了" });
  }

  return res
    .status(405)
    .json({ message: "POSTメソッドのみがサポートされています。" });
}
