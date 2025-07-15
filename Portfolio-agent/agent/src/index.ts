import { VoltAgent, Agent, createTool } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { GoogleGenAIProvider } from "@voltagent/google-ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const getQiitaUserInfo = createTool({
  name: "getQiitaUserInfo", // ツールの一意識別子。エージェントはこの名前でツールを呼び出す
  description: "Qiitaユーザーの情報を取得する",
  parameters: z.object({
    userId: z.string().describe("QiitaユーザーID"),
  }),
  execute: async ({ userId }) => {
    const accessToken = process.env.QIITA_API_KEY;
    const response = await fetch(`https://qiita.com/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data;
  }, // 実際の処理を行う非同期関数
});

const getQiitaUserItems = createTool({
  name: "getQiitaUserItems",
  description: "QiitaユーザーIDを指定して、そのユーザーの投稿記事一覧を取得します。最大30件まで取得可能です。記事のタイトル、URL、いいね数、ストック数、閲覧数、タグ、作成日を返します。",
  parameters: z.object({
    userId: z.string().describe("記事一覧を取得したいQiitaユーザーのID"),
  }),
  execute: async ({ userId }) => {
    const accessToken = process.env.QIITA_API_KEY;
    const response = await fetch(`https://qiita.com/api/v2/users/${userId}/items?per_page=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data.map((item: any) => ({
      title: item.title,
      url: item.url,
      likes: item.likes_count,
      stocks: item.stocks_count,
      views: item.page_views_count,
    }));
  },
});

// Qiitaエージェントの作成
const agent = new Agent({
  name: "qiita-agent", // エージェントの識別名
  instructions: "ユーザーからQiitaユーザーIDを受け取ったら、ユーザーの情報を取得してください。", // エージェントの動作指示
  parameters: z.object({
    userId: z.string().describe("QiitaユーザーID"),
  }), // 入力パラメータのスキーマ定義
  // llm: new VercelAIProvider(), // 使用するLLMプロバイダー
  // model: openai("gpt-4o-mini"), // 使用するAIモデル
  llm: new GoogleGenAIProvider({ apiKey: process.env.GEMINI_API_KEY }),
  model: "gemini-2.5-pro",
  tools: [
    getQiitaUserInfo,
    getQiitaUserItems,
  ]
});

new VoltAgent({
  agents: {
    agent,
  },
});
