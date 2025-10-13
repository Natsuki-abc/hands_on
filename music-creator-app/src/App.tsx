import { useState, useEffect } from "react";
import { Play, Pause, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "./components/ui/dialog";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Link } from "react-router";

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
  const [selectedAlbum, setSelectedAlbum] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedMusic = JSON.parse(
      localStorage.getItem("generatedMusic") || "[]"
    );
    setGeneratedMusic(savedMusic);
  }, []);

  const handlePlayPause = () => {
    if (!selectedAlbum) return;

    if (!audio) {
      const newAudio = new Audio(selectedAlbum.audioUrl);
      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });
      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      setAudio(newAudio);
      newAudio.play().catch(console.error);
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const seekTime = parseFloat(e.target.value);
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audio && selectedAlbum) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setAudio(null);
    }
  }, [selectedAlbum?.id]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
  }, [audio]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full">
        <header className="bg-gradient-to-b from-green-900/40 to-black/60 px-8 py-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">MusicGen Studio</h1>
            <Link to="/create">
              <Button className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Generate Music
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-5xl font-bold text-white mb-4">Good evening</h2>
            <p className="text-gray-300 text-lg">
              Ready to discover your next favorite AI-generated track?
            </p>
          </div>
        </header>

        <div className="px-8 py-6">
          {generatedMusic.length > 0 && (
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Your Creations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {generatedMusic.map((music) => (
                  <Card
                    key={`generated-${music.id}`}
                    className="bg-gray-900/40 border-0 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer group p-3 rounded-lg"
                    onClick={() => setSelectedAlbum(music)}
                  >
                    <div className="relative mb-3">
                      <img
                        src={music.coverUrl}
                        alt={music.title}
                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://picsum.photos/400/400?random=1";
                        }}
                      />
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          className="rounded-full w-10 h-10 bg-green-500 hover:bg-green-400 text-black shadow-lg p-0"
                        >
                          <Play className="w-4 h-4 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-semibold text-white mb-1 truncate text-sm">
                      {music.title}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">
                      {music.artist}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Made for you</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {musicList.map((album) => (
                <Card
                  key={album.id}
                  className="bg-gray-900/40 border-0 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer group p-3 rounded-lg"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="relative mb-3">
                    <img
                      src={album.coverUrl}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-md shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://picsum.photos/400/400?random=1";
                      }}
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="rounded-full w-10 h-10 bg-green-500 hover:bg-green-400 text-black shadow-lg p-0"
                      >
                        <Play className="w-4 h-4 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-semibold text-white mb-1 truncate text-sm">
                    {album.title}
                  </h4>
                  <p className="text-gray-400 text-xs truncate">
                    {album.artist}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Dialog
        open={!!selectedAlbum}
        onOpenChange={() => setSelectedAlbum(null)}
      >
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Now Playing</DialogTitle>
          </DialogHeader>
          {selectedAlbum && (
            <div className="space-y-4">
              <img
                src={selectedAlbum.coverUrl}
                alt={selectedAlbum.title}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white">
                  {selectedAlbum.title}
                </h3>
                <p className="text-gray-400">{selectedAlbum.artist}</p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handlePlayPause}
                  className="bg-green-500 hover:bg-green-400 text-black w-16 h-16 rounded-full p-0"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
                        (currentTime / (duration || 1)) * 100
                      }%, #4b5563 ${
                        (currentTime / (duration || 1)) * 100
                      }%, #4b5563 100%)`,
                    }}
                  />
                  <style>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      background: #22c55e;
                      cursor: pointer;
                      border: 2px solid #22c55e;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                    .slider::-moz-range-thumb {
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      background: #22c55e;
                      cursor: pointer;
                      border: 2px solid #22c55e;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    }
                  `}</style>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
