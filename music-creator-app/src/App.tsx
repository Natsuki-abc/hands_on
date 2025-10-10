import { useState, useEffect } from "react";
import "./App.css";

type Music = {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl: string;
};

function App() {
  const musicList = [
    {
      id: 1,
      title: "Synthwave Dreams",
      artist: "AI Composer",
      audioUrl:
        "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 2,
      title: "Jazz Fusion",
      artist: "Neural Network",
      audioUrl:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center",
    },
    {
      id: 3,
      title: "Ambient Spaces",
      artist: "Deep Learning",
      audioUrl:
        "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
      coverUrl:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center",
    },
  ];

  const [generatedMusic, setGeneratedMusic] = useState<Music[]>([]);

  useEffect(() => {
    const savedMusic = JSON.parse(
      localStorage.getItem("generatedMusic") || "[]"
    );
    setGeneratedMusic(savedMusic);
  }, []);

  const playMusic = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">音楽一覧ページ</h1>

      {generatedMusic.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">作成した音楽</h2>
          <div className="flex gap-4">
            {generatedMusic.map((music) => (
              <div key={music.id} className="border p-4 rounded">
                <img
                  src={music.coverUrl}
                  alt={music.title}
                  width="150"
                  height="150"
                  className="rounded mb-2"
                />
                <h3 className="font-bold">{music.title}</h3>
                <p className="text-gray-600 text-sm">{music.artist}</p>
                <button
                  onClick={() => playMusic(music.audioUrl)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  再生
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold mb-4">おすすめの音楽</h2>
        <div className="flex gap-4">
          {musicList.map((music) => (
            <div key={music.id} className="border p-4 rounded">
              <img
                src={music.coverUrl}
                alt={music.title}
                width="150"
                height="150"
                className="rounded mb-2"
              />
              <h3 className="font-bold">{music.title}</h3>
              <p className="text-gray-600 text-sm">{music.artist}</p>
              <button
                onClick={() => playMusic(music.audioUrl)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                再生
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
