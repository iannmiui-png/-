import { useState } from "react";
import { Youtube, ChevronDown, ChevronUp, ExternalLink, Play } from "lucide-react";

interface VideoEmbedProps {
  lang: "zh" | "en";
}

export default function VideoEmbed({ lang }: VideoEmbedProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isZh = lang === "zh";

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
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Video Player Segment */}
      {isOpen && (
        <div className="border-t border-neutral-800/60 p-4 sm:p-5 space-y-4">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-800 bg-black/60 shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/maWnIKH3JQI?rel=0&modestbranding=1"
              title="Meet the Hacker: Samuel Groß (V8 Security Research)"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-400 font-sans px-1">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-medium block">
                {isZh ? "推荐学习指南" : "Recommended Study Path"}
              </span>
              <p className="leading-relaxed">
                {isZh 
                  ? "此视频是 Intigriti 打造的访谈节目。Samuel 分享了他在 JIT 范围分析缺陷、1TB 虚拟沙箱 (V8 Sandbox) 以及 ARM 硬件层级 POE2 的核心防御心路历程。" 
                  : "An inspiring interview presented by Intigriti. Samuel shares the evolution of range analysis optimization flaws, V8's 1TB virtual sandbox, and hardware-backed POE2 permissions."}
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
