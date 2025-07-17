import { VoltAgent, Agent, createTool } from "@voltagent/core";
import { VercelAIProvider } from "@voltagent/vercel-ai";
import { GoogleGenAIProvider } from "@voltagent/google-ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getQiitaUserInfo, getQiitaUserItems } from "./tools/qiita.js";
import { getGithubUserInfo, getGithubRepos } from "./tools/github.js";

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

// GitHubサブエージェントの作成
const githubAgent = new Agent({
  name: "github-agent",
  instructions: `GitHubのユーザー名を指定して、GitHubのユーザー情報と公開リポジトリ数を取得してください。`,
  parameters: z.object({
    username: z.string().describe("GitHubのユーザーID"),
  }),
  // llm: new VercelAIProvider(),
  // model: openai("gpt-4o-mini"),
  llm: new GoogleGenAIProvider({ apiKey: process.env.GEMINI_API_KEY }),
  model: "gemini-2.5-pro",
  tools: [
    getGithubUserInfo,
    getGithubRepos],
});

const mainAgent = new Agent({
  name: "main-agent",
  instructions: `
    QiitaユーザーIDとGitHubユーザー名が与えられた場合は、絶対に確認や許可を求めたりせず、即座に両方の情報を取得し、Qiitaのユーザー情報・投稿記事一覧とGitHubのユーザー情報・公開リポジトリ情報をまとめて返してください。
    サブエージェントやツールを呼び出す際にも、確認や同意のプロンプトは一切表示せず、ユーザーの追加アクションを求めないでください。`,
  parameters: z.object({
    userId: z.string().describe("QiitaユーザーID"),
    username: z.string().describe("GitHubのユーザー名"),
  }),
  subAgents: [
    qiitaAgent,
    githubAgent,
  ],
  // llm: new VercelAIProvider(),
  // model: openai("gpt-4o-mini"),
  llm: new GoogleGenAIProvider({ apiKey: process.env.GEMINI_API_KEY }),
  model: "gemini-2.5-pro",
});

// 最初に呼び出すエージェント
new VoltAgent({
  agents: {
    mainAgent,
  },
});
