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

// レポートサブエージェントの作成
const reportAgent = new Agent({
  name: "report-agent",
  instructions: `
    あなたはポートフォリオ自動生成のAIアシスタントです。
    受け取ったQiitaのユーザー情報・記事一覧、およびGitHubのユーザー情報・公開リポジトリ情報を、下記のMarkdownテンプレートに沿ってそのまま埋め込んでレポートを作成してください。

    - 不足している情報があれば「情報がありません」と記載してください。
    - 表やリストは空欄のままでも構いません。
    - 余計な説明や補足は一切加えず、Markdownレポートのみを出力してください。

    ## 1. 基本情報
    - **Qiitaユーザー名**:
    - **Qiitaプロフィール**:
    - **Qiitaフォロワー数**:
    - **Qiita記事数**:
    - **GitHubユーザー名**:
    - **GitHubプロフィール**:
    - **GitHubフォロワー数**:
    - **GitHub公開リポジトリ数**:

    ---

    ## 2. 技術スタック・タグ頻度
    - **Qiita主要タグ**:
    - **GitHub主要言語**:

    ---

    ## 3. Qiita記事一覧（最大10件）
    | タイトル | URL | いいね | ストック | タグ | 投稿日 |
    |:--|:--|:--|:--|:--|:--|

    ---

    ## 4. GitHubリポジトリ一覧（最大10件）
    | リポジトリ名 | URL | スター | フォーク | 主要言語 | 説明 | 最終更新 |
    |:--|:--|:--|:--|:--|:--|:--|

    ---

    ## 5. 人気Qiita記事ランキング（いいね順上位3件）
    | タイトル | いいね | ストック | URL |
    |:--|:--|:--|:--|

    ---

    ## 6. 人気GitHubリポジトリランキング（スター順上位3件）
    | リポジトリ名 | スター | フォーク | URL |
    |:--|:--|:--|:--|

    ---

    ## 7. 定量評価
    - **Qiita**
        - 記事数:
        - フォロワー数:
        - いいね合計:
        - ストック合計:
    - **GitHub**
        - 公開リポジトリ数:
        - フォロワー数:
        - スター合計:
        - フォーク合計:

    ---

    ## 8. 代表的なQiita記事・GitHubリポジトリ
    - **Qiita記事**:  | [Link]() | 要約:
    - **GitHubリポジトリ**:  | [Link]() | 説明:

    ---

    各項目は受け取ったデータをもとに埋めてください。不足している場合は「情報がありません」と記載してください。`,
  parameters: z.object({
    qiitaData: z.string().describe("Qiitaのユーザー情報と投稿記事一覧"),
    githubData: z.string().describe("GitHubのユーザー情報と公開リポジトリ情報"),
  }),
  // llm: new VercelAIProvider(),
  // model: openai("gpt-4o-mini"),
  llm: new GoogleGenAIProvider({ apiKey: process.env.GEMINI_API_KEY }),
  model: "gemini-2.5-pro",
});

const mainAgent = new Agent({
  name: "main-agent",
  instructions: `
    あなたはQiitaとGitHubの情報をまとめてエンジニアのポートフォリオレポートを生成するエージェントです。
      以下の手順に従って、QiitaとGitHubの情報をまとめてポートフォリオレポートを生成してください。

      # 手順
      0. 「Qiita ID: (QiitaのユーザーID) \n GitHub ID: (GitHubのユーザーID)」と入力されたらQiitaユーザーIDとGitHubユーザーIDとして取得する
      1. ユーザーから与えられたQiitaユーザーIDを使って、Qiitaのユーザー情報と投稿記事一覧を取得してください。それを変数qiitaDataに格納してください。
      2. ユーザーから与えられたGitHubユーザー名を使って、GitHubのユーザー情報と公開リポジトリ情報を取得してください。それを変数githubDataに格納してください。
      3. qiitaDataとgithubDataを元に、ポートフォリオレポートを生成してください。

    # 厳守事項
    - 入力文からQiita IDとGitHub IDを必ず抽出して処理してください。
    - サブエージェントやツールを呼び出す際にも、確認や同意のプロンプトは一切表示せず、ユーザーの追加アクションを求めないでください。
    - Qiita IDまたはGitHub IDが見つからない場合は「情報がありません」として進めてください。
    - 余計な説明や補足は一切加えず、Markdownレポートのみを出力してください。
    `,
  parameters: z.object({
    prompt: z.string().describe("Qiita IDとGitHub IDを含む自然文入力"),
  }),
  subAgents: [
    qiitaAgent,
    githubAgent,
    reportAgent,
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
