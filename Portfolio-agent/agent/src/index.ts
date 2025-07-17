import { VoltAgent, Agent, createTool } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { GoogleGenAIProvider } from "@voltagent/google-ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getQiitaUserInfo, getQiitaUserItems } from "./tools/qiita.js";

// Qiitaサブエージェントの作成
const qiitaAgent = new Agent({
  name: "qiita-agent", // エージェントの識別名
  instructions: `ユーザーからQiitaユーザーIDを受け取ったら、ユーザーの情報を取得してください。`, // エージェントの動作指示
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

const mainAgent = new Agent({
  name: "main-agent",
  instructions: `ユーザーから「QiitaユーザーID」を受け取ったら「QiitaユーザーID」を渡して情報をJSONで取得し、Qiitaのユーザー情報と投稿記事一覧をまとめて返してください。`,
  parameters: z.object({
    userId: z.string().describe("QiitaユーザーID"),
  }),
  subAgents: [
    qiitaAgent,
  ],
  llm: new VercelAIProvider(),
  model: openai("gpt-4o-mini"),
});

// 最初に呼び出すエージェント
new VoltAgent({
  agents: {
    mainAgent,
  },
});
