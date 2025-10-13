import { useState } from "react";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Music, Loader2 } from "lucide-react";

type Music = {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
};

function CreatePage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedMusic, setGeneratedMusic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title.trim() || !genre || !prompt.trim()) {
      alert("すべてのフィールドを入力してください");
      return;
    }

    const apiKey = import.meta.env.VITE_LOUDLY_API_KEY;

    if (!apiKey) {
      alert("APIキーが設定されていません");
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();
      const musicPrompt = `Create a ${genre} song titled "${title}". Musical style: ${prompt}. High quality production with clear melody and rhythm.`;
      formData.append("prompt", musicPrompt);
      formData.append("duration", "30");

      const response = await axios.post(
        "https://soundtracks.loudly.com/api/ai/prompt/songs",
        formData,
        {
          headers: {
            "API-KEY": apiKey,
          },
        }
      );

      if (response.data && response.data.music_file_path) {
        setGeneratedMusic(response.data.music_file_path);
      } else {
        throw new Error("音楽ファイルパスが取得できませんでした");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("音楽生成に失敗しました");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!generatedMusic || !title || !genre) {
      alert("音楽を生成してから保存してください");
      return;
    }

    const musicData: Music = {
      id: Date.now().toString(),
      title: title,
      artist: "AI Generated",
      audioUrl: generatedMusic,
      coverUrl: `https://picsum.photos/400/400?random=${Date.now()}`,
    };

    const savedMusic = JSON.parse(
      localStorage.getItem("generatedMusic") || "[]"
    );
    savedMusic.push(musicData);
    localStorage.setItem("generatedMusic", JSON.stringify(savedMusic));

    alert("音楽を保存しました！");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-8">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Generate Music</h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Music className="w-5 h-5 text-green-500" />
                Music Generation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="title"
                  className="text-white text-sm font-medium"
                >
                  Song Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter song title..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="genre"
                  className="text-white text-sm font-medium"
                >
                  Genre
                </Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue placeholder="Select genre..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="classical">Classical</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                    <SelectItem value="rock">Rock</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="prompt"
                  className="text-white text-sm font-medium"
                >
                  Music Description
                </Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the music you want to generate..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 min-h-[120px] mt-2"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={
                  !title.trim() || !genre || !prompt.trim() || isGenerating
                }
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4 mr-2" />
                    Generate Music
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-80 space-y-4">
                  <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                  <p className="text-gray-400 text-center">
                    Generating your music...
                    <br />
                    <span className="text-sm">This may take a few moments</span>
                  </p>
                </div>
              ) : generatedMusic ? (
                <div className="space-y-6">
                  <div className="aspect-square w-full max-w-sm mx-auto">
                    <img
                      src={`https://picsum.photos/400/400?random=${Date.now()}`}
                      alt="Generated album cover"
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://picsum.photos/400/400?random=1";
                      }}
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {title || "Untitled"}
                    </h3>
                    <p className="text-gray-400 capitalize">
                      {genre ? `${genre} • AI Generated` : "AI Generated"}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <audio
                      controls
                      className="w-full"
                      style={{
                        filter: "invert(1) hue-rotate(180deg)",
                      }}
                    >
                      <source src={generatedMusic} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>

                    <Button
                      onClick={handleSave}
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3"
                    >
                      Save to Collection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-80 space-y-4">
                  <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                    <Music className="w-12 h-12 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-center max-w-xs">
                    Fill out the form and click generate to create your music
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
