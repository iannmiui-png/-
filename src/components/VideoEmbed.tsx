import { useState, useEffect, useRef } from "react";
import { Youtube, ChevronDown, ChevronUp, ExternalLink, Play, Pause, FastForward, RotateCcw, HelpCircle, Sliders } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YTPlayerInstance: any;
  }
}

interface VideoEmbedProps {
  lang: "zh" | "en";
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  currentTime: number;
  setCurrentTime: (t: number) => void;
  duration: number;
  setDuration: (d: number) => void;
  isSimulating: boolean;
  setIsSimulating: (s: boolean) => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
}

export default function VideoEmbed({
  lang,
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  isSimulating,
  setIsSimulating,
  simulationSpeed,
  setSimulationSpeed
}: VideoEmbedProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isZh = lang === "zh";

  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  // Helper to format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Load YouTube Iframe Player API
  useEffect(() => {
    if (isSimulating) {
      // If we switch to simulation, clean up the player's interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    // Load YouTube Iframe API if not loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    let ytPlayer: any;

    const onPlayerReady = (event: any) => {
      const d = event.target.getDuration();
      if (d) setDuration(d);
    };

    const onPlayerStateChange = (event: any) => {
      // YT.PlayerState.PLAYING = 1
      // YT.PlayerState.PAUSED = 2
      // YT.PlayerState.ENDED = 0
      const state = event.data;
      if (state === 1) {
        setIsPlaying(true);
        // Set up polling for progress
        progressIntervalRef.current = setInterval(() => {
          if (ytPlayer && ytPlayer.getCurrentTime) {
            setCurrentTime(ytPlayer.getCurrentTime());
          }
        }, 500);
      } else {
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
    };

    const initPlayer = () => {
      if (!iframeContainerRef.current) return;
      
      // Clean up previous iframe content inside the mount div
      iframeContainerRef.current.innerHTML = '<div id="youtube-player-element" class="absolute top-0 left-0 w-full h-full"></div>';

      ytPlayer = new window.YT.Player("youtube-player-element", {
        videoId: "maWnIKH3JQI",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
      playerRef.current = ytPlayer;
      window.YTPlayerInstance = ytPlayer;
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (ytPlayer && ytPlayer.destroy) {
        ytPlayer.destroy();
      }
      playerRef.current = null;
      window.YTPlayerInstance = null;
    };
  }, [isSimulating]);

  // Synchronize play/pause commands from our simulation widgets back to the YT player if available
  const togglePlayPause = () => {
    if (isSimulating) {
      setIsPlaying(!isPlaying);
    } else {
      const player = playerRef.current;
      if (player && player.getPlayerState) {
        const state = player.getPlayerState();
        if (state === 1) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      } else {
        // Fallback if player API isn't ready
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleSeekChange = (value: number) => {
    setCurrentTime(value);
    if (!isSimulating) {
      const player = playerRef.current;
      if (player && player.seekTo) {
        player.seekTo(value, true);
      }
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (!isSimulating) {
      const player = playerRef.current;
      if (player && player.seekTo) {
        player.seekTo(0, true);
        player.pauseVideo();
      }
    }
  };

  return (
    <div 
      className="rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm overflow-hidden transition-all duration-300 shadow-xl shadow-black/30"
      id="video-embed-card"
    >
      {/* Header Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-neutral-800/30 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <Youtube className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-100 flex items-center gap-2">
              <span>
                {isZh 
                  ? "「遇见黑客」专题视频：Samuel Groß" 
                  : "Meet the Hacker Series: Samuel Groß"}
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                EP.01
              </span>
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
              {isZh 
                ? "探秘 V8 编译器漏洞、沙箱架构与浏览器安全防御演进" 
                : "Deep dive into JIT compiler bugs, sandboxing & the evolution of browser defense"}
            </p>
          </div>
        </div>

        <button 
          className="flex items-center justify-center h-8 w-8 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Toggle Video Player"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Video Player Segment */}
      {isOpen && (
        <div className="border-t border-neutral-800/60 p-4 sm:p-5 space-y-4">
          
          {/* Mode Switch Tabs */}
          <div className="flex border-b border-neutral-800 pb-2.5 gap-2" id="mode-tabs">
            <button
              onClick={() => setIsSimulating(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                !isSimulating 
                  ? "bg-red-500/10 text-red-400 border border-red-500/25 shadow shadow-red-500/5" 
                  : "text-neutral-400 hover:text-gray-200"
              }`}
            >
              📺 {isZh ? "YouTube 原视频播放器" : "YouTube Video Player"}
            </button>
            <button
              onClick={() => setIsSimulating(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                isSimulating 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow shadow-emerald-500/5" 
                  : "text-neutral-400 hover:text-gray-200"
              }`}
            >
              ⏳ {isZh ? "沙堆模拟演示面板 (可快进)" : "Sandpile Simulator (Time-lapse)"}
            </button>
          </div>

          {!isSimulating ? (
            /* YouTube Embed with API support */
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-black/60 shadow-inner">
              <div ref={iframeContainerRef} className="absolute inset-0 w-full h-full">
                {/* Fallback frame before script API initializes */}
                <iframe
                  src="https://www.youtube.com/embed/maWnIKH3JQI?rel=0&modestbranding=1"
                  title="Meet the Hacker: Samuel Groß (V8 Security Research)"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            /* Interactive Sandpile Simulation Controller Box */
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/5 space-y-4 shadow-inner" id="sandpile-simulation-panel">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? "animate-ping bg-emerald-400" : "bg-neutral-500"}`} />
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? "bg-emerald-400" : "bg-neutral-500"}`} />
                    </span>
                    <h3 className="text-sm font-semibold text-gray-200">
                      {isZh ? "阿贝尔沙堆 进度追踪器" : "Abelian Sandpile Progress Simulator"}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                    {isZh 
                      ? "在此模式下，您可以随意滑动下方进度条，模拟时间流逝。绿色沙粒将通过下方列表，呈 S形曲线（boustrophedon 蛇形方向）逐级流过并堆叠，直观展现讲座内容演进。" 
                      : "Simulate time progression. Green sand grains cascade and flow down through the 50 items following a boustrophedon path (alternating left-to-right/right-to-left) to display current topics."}
                  </p>
                </div>
                
                {/* Status indicators */}
                <div className="font-mono text-xs px-2.5 py-1 rounded bg-black/50 border border-neutral-800 text-emerald-400 self-start sm:self-center">
                  {isZh ? "已流过 " : "Processed: "} 
                  <span className="font-semibold text-emerald-300">
                    {Math.min(50, Math.floor((currentTime / duration) * 50))} / 50
                  </span> {isZh ? "个技术点" : "points"}
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-[11px] text-neutral-500">
                    {isZh ? `单个要点耗时: ~52.7秒` : `Duration per point: ~52.7s`}
                  </span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => handleSeekChange(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-neutral-800 accent-emerald-500 cursor-pointer border border-neutral-700/50"
                  id="simulation-range-slider"
                />
              </div>

              {/* Buttons Panel */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayPause}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isPlaying 
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15" 
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/15"
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? (isZh ? "暂停" : "Pause") : (isZh ? "启动模拟" : "Start Simulation")}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-gray-300 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isZh ? "重置" : "Reset"}</span>
                  </button>
                </div>

                {/* Speed Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 flex items-center gap-1 font-sans">
                    <FastForward className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{isZh ? "加速速率:" : "Speed:"}</span>
                  </span>
                  <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-neutral-800">
                    {([1, 5, 15, 30, 60] as const).map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setSimulationSpeed(speed)}
                        className={`px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          simulationSpeed === speed
                            ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/25"
                            : "text-neutral-500 hover:text-neutral-300"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Educational Caption */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-400 font-sans px-1 pt-1 border-t border-neutral-800/40">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-medium block">
                {isZh ? "阿贝尔沙堆流向提示" : "Abelian Sandpile Flow Guide"}
              </span>
              <p className="leading-relaxed">
                {isZh 
                  ? "绿色沙粒根据沙堆模型（Abelian Sandpile）运转：奇数条目沙粒由右侧注入流向左侧，偶数条目由左侧注入流向右侧（S形蛇行）。满4粒则会引发崩塌，并向下溢流至下一要点。" 
                  : "Grains are added dynamically at each point's active entry. Odd items fill from the right, even items from the left. Grains topple symmetrically when a grid cell holds 4 grains, mimicking a cascade."}
              </p>
            </div>
            <a
              href="https://www.youtube.com/watch?v=maWnIKH3JQI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 self-start sm:self-center bg-neutral-800 hover:bg-neutral-700 text-gray-200 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-neutral-700/60 shrink-0"
            >
              <span>{isZh ? "在 YouTube 观看" : "Watch on YouTube"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
