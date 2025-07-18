import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Card, CardContent } from "./components/ui/card";
import { FileText, Heart, Code, Star } from "lucide-react";
import remarkGfm from "remark-gfm";
import { Typewriter } from "react-simple-typewriter";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState("");
  // const [portfolio, setPortfolio] = useState(
  //   `## 1. 基本情報\n- **Qiitaユーザー名**: Sicut_study\n- **Qiitaプロフィール**: [projisou.jp](https://projisou.jp)\n- **Qiitaフォロワー数**: 11,788\n- **Qiita記事数**: 642\n- **GitHubユーザー名**: jinwatanabe\n- **GitHubプロフィール**: 情報がありません\n- **GitHubフォロワー数**: 情報がありません\n- **GitHub公開リポジトリ数**: 100件以上\n\n---\n\n## 2. 技術スタック・タグ頻度\n- **Qiita主要タグ**: 情報がありません\n- **GitHub主要言語**: 情報がありません\n\n---\n\n## 3. Qiita記事一覧（最大10件）\n| タイトル | URL | いいね | ストック | タグ | 投稿日 |\n|:--|:--|:--|:--|:--|:--|\n| 【図解解説】10からReact開発して基礎をマスターできる最強チュートリアル【初心者完全版】 | [Link](https://qiita.com/Sicut_study/items/afd66cac978f4b0a6e61) | 467 | 598 | 情報がありません | 情報がありません |\n| 【図解解説】Cloudflareを使って2時間でNext.jsを開発して学ぶチュートリアル【初心者OK】 | [Link](https://qiita.com/Sicut_study/items/1e03af8bb7f54198bb8a) | 216 | 211 | 情報がありません | 情報がありません |\n| 【図解解説】MCPを実装理解！Next.jsでAIアシスタントを開発するチュートリアル【Hono/TypeScript/Prisma】 | [Link](https://qiita.com/Sicut_study/items/e0fbbbf51cdd54d76b1a) | 244 | 261 | 情報がありません | 情報がありません |\n| 【図解解説】これ1本12分でReactのコンポーネント20種を理解できる教科書 | [Link](https://qiita.com/Sicut_study/items/3247f55e8ae7992485e1) | 564 | 686 | 情報がありません | 情報がありません |\n| 【図解解説】Next.js,Hono,Drizzle,Zod,ClerkでTwitterクローンを開発するチュートリアル【JStack/TypeScript/Neon/Cloudinary】 | [Link](https://qiita.com/Sicut_study/items/d1dd4727881cf4dfd026) | 119 | 106 | 情報がありません | 情報がありません |\n| Next.jsとCloudflare WorkersでDisallowed operation called within global scope. Asynchronous I/O (ex: fetch() or connect()), setting a timeout, and generating random values are not allowed within global scopeエラーが出る | [Link](https://qiita.com/Sicut_study/items/4d7ca4b956b01301926f) | 0 | 1 | 情報がありません | 情報がありません |\n| Wrangler pages devでポートリロードしたい | [Link](https://qiita.com/Sicut_study/items/238c86deaa3c5b70e642) | 0 | 0 | 情報がありません | 情報がありません |\n| Cloudflare D1とnext-on-pageでenv.DBを通したいがタイプエラーになる Drizzle hono | [Link](https://qiita.com/Sicut_study/items/7418108329c6a6ebb60c) | 0 | 0 | 情報がありません | 情報がありません |\n| 【図解解説】これ1本12分でReact Hooks 20種を理解できる教科書 | [Link](https://qiita.com/Sicut_study/items/d4778cbe8b499570f79e) | 481 | 559 | 情報がありません | 情報がありません |\n| Ubuntu24.04でWindsurfをアップデートするとクラッシュする | [Link](https://qiita.com/Sicut_study/items/14c0d0f0081a2b3eda29) | 1 | 2 | 情報がありません | 情報がありません |\n\n---\n\n## 4. GitHubリポジトリ一覧（最大10件）\n| リポジトリ名 | URL | スター | フォーク | 主要言語 | 説明 | 最終更新 |\n|:--|:--|:--|:--|:--|:--|:--|\n| jinwatanabe | [Link](https://github.com/jinwatanabe/jinwatanabe) | 0 | 0 | 情報がありません | 情報がありません | 2025-07-06 |\n| go-todo-clean-app | [Link](https://github.com/jinwatanabe/go-todo-clean-app) | 7 | 0 | Go | 情報がありません | 2025-07-03 |\n| rust-todo-clean-app | [Link](https://github.com/jinwatanabe/rust-todo-clean-app) | 3 | 1 | Rust | 情報がありません | 2025-07-03 |\n| make-your-original-react | [Link](https://github.com/jinwatanabe/make-your-original-react) | 0 | 0 | JavaScript | クリエイティブDOM完全理解！君だけのオリジナルReactで作業を学ぶチュートリアル | 2025-06-21 |\n| movie-app-for-react-beginner | [Link](https://github.com/jinwatanabe/movie-app-for-react-beginner) | 2 | 0 | CSS | 0からReactで映画サイトを作って基礎を学ぶチュートリアルのサンプルコード | 2025-06-12 |\n| fastapi-typing-game | [Link](https://github.com/jinwatanabe/fastapi-typing-game) | 5 | 1 | TypeScript | 情報がありません | 2025-06-05 |\n| react-server-tech-article-app | [Link](https://github.com/jinwatanabe/react-server-tech-article-app) | 2 | 1 | JavaScript | 話題の神Reactフレームワークreact-serverで技術記事投稿サイトを開発するチュートリアルのサンプルコード | 2025-05-19 |\n| jstack-twitter-clone | [Link](https://github.com/jinwatanabe/jstack-twitter-clone) | 2 | 0 | TypeScript | Next.js,Hono,Drizzle,Zod,ClerkでTwitterクローンを開発するチュートリアルのサンプルコード | 2025-05-19 |\n| file-share-app | [Link](https://github.com/jinwatanabe/file-share-app) | 0 | 0 | TypeScript | Next.js×Cloudflareでファイル共有アプリを開発するチュートリアルのサンプルコード | 2025-05-19 |\n| mcp-todos | [Link](https://github.com/jinwatanabe/mcp-todos) | 0 | 2 | JavaScript | MCPを実装解説！Next.jsでAIアシスタントを開発するチュートリアルのサンプルコード | 2025-05-19 |\n\n---\n\n## 5. 人気Qiita記事ランキング（いいね順上位3件）\n| タイトル | いいね | ストック | URL |\n|:--|:--|:--|:--|\n| 【図解解説】10からReact開発して基礎をマスターできる最強チュートリアル【初心者完全版】 | 467 | 598 | [Link](https://qiita.com/Sicut_study/items/afd66cac978f4b0a6e61) |\n| 【図解解説】これ1本12分でReactのコンポーネント20種を理解できる教科書 | 564 | 686 | [Link](https://qiita.com/Sicut_study/items/3247f55e8ae7992485e1) |\n| 【図解解説】Cloudflareを使って2時間でNext.jsを開発して学ぶチュートリアル【初心者OK】 | 216 | 211 | [Link](https://qiita.com/Sicut_study/items/1e03af8bb7f54198bb8a) |\n\n---\n\n## 6. 人気GitHubリポジトリランキング（スター順上位3件）\n| リポジトリ名 | スター | フォーク | URL |\n|:--|:--|:--|:--|\n| go-todo-clean-app | 7 | 0 | [Link](https://github.com/jinwatanabe/go-todo-clean-app) |\n| rust-todo-clean-app | 3 | 1 | [Link](https://github.com/jinwatanabe/rust-todo-clean-app) |\n| react-server-tech-article-app | 2 | 1 | [Link](https://github.com/jinwatanabe/react-server-tech-article-app) |\n\n---\n\n## 7. 定量評価\n- **Qiita**\n    - 記事数: 642\n    - フォロワー数: 11,788\n    - いいね合計: 情報がありません\n    - ストック合計: 情報がありません\n- **GitHub**\n    - 公開リポジトリ数: 100件以上\n    - フォロワー数: 情報がありません\n    - スター合計: 情報がありません\n    - フォーク合計: 情報がありません\n\n---\n\n## 8. 代表的なQiita記事・GitHubリポジトリ\n- **Qiita記事**: 【図解解説】10からReact開発して基礎をマスターできる最強チュートリアル【初心者完全版】 | [Link](https://qiita.com/Sicut_study/items/afd66cac978f4b0a6e61) | 要約: 情報がありません\n- **GitHubリポジトリ**: jinwatanabe | [Link](https://github.com/jinwatanabe/jinwatanabe) | 説明: 情報がありません\n\n---`
  // );

  const generatePortfolio = async (qiitaId: string, githubId: string) => {
    const response = await fetch(
      "http://localhost:3141/agents/main-agent/text",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: `Qiita ID: ${qiitaId}\nGitHub ID: ${githubId}`,
          options: {
            userId: "unique-user-id",
            conversationId: "unique-conversation-id",
            contextLimit: 10,
            temperature: 0.7,
            maxTokens: 100,
          },
        }),
      }
    );

    const res = (await response.json()) as {
      data: { provider: { text: string } };
    };

    return res.data.provider.text;
  };

  const handleGeneratePortfolio = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const qiitaId = e.currentTarget.qiitaId.value;
    const githubId = e.currentTarget.githubId.value;
    try {
      const portfolio = await generatePortfolio(qiitaId, githubId);
      setPortfolio(portfolio);
    } finally {
      setIsLoading(false);
    }
  };

  const animatedQiitaArticles = 642;
  const animatedQiitaLikes = 1234;
  const animatedGithubRepos = 12;
  const animatedGithubStars = 456;

  return (
    <div className="min-h-screen transition-all duration-500 bg-white p-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Portfolio Generator
            </h1>
          </div>
          <div className="text-xl text-gray-600 h-8">
            <span style={{ whiteSpace: "pre" }}>
              <Typewriter
                words={["あなたの技術力を可視化します"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </div>
        </div>
        {portfolio && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up max-w-3xl mx-auto">
            <Card className="bg-white border border-gray-200 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {animatedQiitaArticles}
                </div>
                <div className="text-sm text-gray-600">Qiita記事</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {animatedQiitaLikes}
                </div>
                <div className="text-sm text-gray-600">いいね</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 text-center">
                <Code className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {animatedGithubRepos}
                </div>
                <div className="text-sm text-gray-600">リポジトリ</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {animatedGithubStars}
                </div>
                <div className="text-sm text-gray-600">スター</div>
              </CardContent>
            </Card>
          </div>
        )}
        <Card className="p-8 mb-8 bg-white/90 shadow-lg rounded-xl">
          {isLoading && (
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <form onSubmit={handleGeneratePortfolio} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="qiitaId" className="text-gray-700">
                Qiita ID
              </Label>
              <Input
                id="qiitaId"
                name="qiitaId"
                placeholder="例: Sicut_study"
                className="bg-white border-gray-300"
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubId" className="text-gray-700">
                GitHub ID
              </Label>
              <Input
                id="githubId"
                name="githubId"
                placeholder="例: jinwatanabe"
                className="bg-white border-gray-300"
                autoComplete="username"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "生成中..." : "ポートフォリオ生成"}
              </Button>
            </div>
          </form>
        </Card>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ children }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 bg-gray-50 text-gray-800 px-4 py-3 text-left font-semibold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 text-gray-700 px-4 py-3">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors duration-300 text-blue-600 hover:text-blue-800"
              >
                {children}
              </a>
            ),
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mb-6 pb-3 border-b text-gray-900 border-gray-300">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-800">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-medium mb-3 mt-6 text-gray-700">
                {children}
              </h3>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2">
                {children}
              </ul>
            ),
            li: ({ children }) => <li className="text-gray-700">{children}</li>,
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
            ),
            hr: () => <hr className="my-8 border-gray-300" />,
          }}
        >
          {portfolio}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
