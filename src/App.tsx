import { useState, useEffect } from "react";
import { Flame, Info, Terminal, RefreshCw, Layers, HelpCircle } from "lucide-react";
import { HEATMAP_ITEMS } from "./data";
import Header from "./components/Header";
import HeatmapList from "./components/HeatmapList";
import ReferenceLists from "./components/ReferenceLists";
import VideoEmbed from "./components/VideoEmbed";

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPotency, setSelectedPotency] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Playback & Sandpile states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2635); // Default 43m 55s
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const isZh = lang === 'zh';

  // Active item in the absolute 50 item list (0 to 49)
  const activeItemIndex = Math.min(400, Math.floor((currentTime / duration) * 50));
  const activeItemBounded = Math.max(0, Math.min(49, activeItemIndex));

  // Simulation Clock Tick Loop
  useEffect(() => {
    let timerId: any;
    if (isSimulating && isPlaying) {
      const intervalMs = 100;
      timerId = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + (simulationSpeed * (intervalMs / 1000));
          if (next >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return next;
        });
      }, intervalMs);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isSimulating, isPlaying, simulationSpeed, duration]);

  // Compute stat counters on the complete unfiltered dataset

  // Compute stat counters on the complete unfiltered dataset
  const peakCount = HEATMAP_ITEMS.filter((item) => item.potency === 5).length;
  const highCount = HEATMAP_ITEMS.filter((item) => item.potency === 4).length;
  const medCount = HEATMAP_ITEMS.filter((item) => item.potency === 3).length;
  const lowCount = HEATMAP_ITEMS.filter((item) => item.potency <= 2).length;

  // Filter items dynamically
  const filteredItems = HEATMAP_ITEMS.filter((item) => {
    // 1. Potency filter
    if (selectedPotency !== null) {
      if (selectedPotency === 2) {
        // level 1 and 2 grouped
        if (item.potency > 2) return false;
      } else if (item.potency !== selectedPotency) {
        return false;
      }
    }

    // 2. Section filter
    if (activeSection !== null && item.section !== activeSection) {
      return false;
    }

    // 3. Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchEnText = item.enText.toLowerCase().includes(query);
      const matchZhText = item.zhText.toLowerCase().includes(query);
      const matchEnDetail = item.enDetail.toLowerCase().includes(query);
      const matchZhDetail = item.zhDetail.toLowerCase().includes(query);
      const matchId = item.id.toString() === query;

      if (!matchEnText && !matchZhText && !matchEnDetail && !matchZhDetail && !matchId) {
        return false;
      }
    }

    return true;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPotency(null);
    setActiveSection(null);
  };

  const hasActiveFilters = searchQuery !== '' || selectedPotency !== null || activeSection !== null;

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-100 pb-20">
      {/* Background visual ambiance */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-emerald-950/10 via-amber-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative space-y-10">
        
        {/* Header Block */}
        <Header
          lang={lang}
          setLang={setLang}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPotency={selectedPotency}
          setSelectedPotency={setSelectedPotency}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          peakCount={peakCount}
          highCount={highCount}
          medCount={medCount}
          lowCount={lowCount}
        />

        {/* Video Embed Player */}
        <VideoEmbed
          lang={lang}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          setDuration={setDuration}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          simulationSpeed={simulationSpeed}
          setSimulationSpeed={setSimulationSpeed}
        />

        {/* Filters state badge and reset indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-300">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span>
                {isZh
                  ? `已启用筛选过滤 · 匹配到 ${filteredItems.length} 个技术要点`
                  : `Active filters · Found ${filteredItems.length} matching research points`}
              </span>
            </div>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-white font-medium bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg transition duration-150 cursor-pointer"
              id="reset-filters-btn"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isZh ? "重置筛选" : "Reset Filters"}</span>
            </button>
          </div>
        )}

        {/* Primary Heatmap content list */}
        {filteredItems.length > 0 ? (
          <HeatmapList
            items={filteredItems}
            lang={lang}
            activeSection={activeSection}
            selectedPotency={selectedPotency}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            activeItemIndex={activeItemBounded}
          />
        ) : (
          <div className="py-16 text-center space-y-3 rounded-2xl bg-gray-900/10 border border-gray-800/60 max-w-lg mx-auto">
            <Info className="w-8 h-8 text-amber-500 mx-auto opacity-80" />
            <div className="space-y-1">
              <p className="text-gray-200 font-medium text-sm sm:text-base">
                {isZh ? "未找到匹配的技术要点" : "No matching points found"}
              </p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                {isZh
                  ? "请尝试缩短搜索词，或重置当前的权重与分部筛选条件。"
                  : "Try clearing search keywords or adjusting the active filters."}
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition duration-200 cursor-pointer"
              id="empty-reset-btn"
            >
              {isZh ? "重置所有筛选" : "Reset All Filters"}
            </button>
          </div>
        )}

        {/* Enumerations lists section */}
        <ReferenceLists lang={lang} />

        {/* Footer info blocks */}
        <footer className="pt-8 border-t border-gray-900 text-xs text-gray-500 space-y-4" id="app-footer">
          <p className="leading-relaxed">
            {isZh ? (
              <>
                <span className="font-semibold text-gray-400">页脚说明：</span>
                所有权重评分均为AI整理者基于分享内容做出的主观研判，并非原分享嘉宾的官方排序。五个标注为5级峰值的要点是整场论述的核心支撑观点；上述中立枚举清单完全忠实还原了原分享嘉宾口头逐条列出的全部内容。您可以将鼠标悬浮或点击任意条目查看详细阐释内容，权重等级越高，对应的补充说明就会越深入地探讨该场景下的边缘延伸影响。
              </>
            ) : (
              <>
                <span className="font-semibold text-gray-400">Footer Notes: </span>
                All potency ratings represent subjective analysis of the talk's narrative and do not constitute official weightings by the speaker. The five points rated 5 are core logical pillars of the whole thesis; the neutral reference lists at the bottom are faithful transcriptions of lists enumerated aloud. Select any item to view technical overviews, where higher potency levels unlock deeper border impacts.
              </>
            )}
          </p>
          <div className="flex items-center justify-between text-[10px] text-gray-600 font-mono">
            <span>© 2026 Curated Heatmap Companion</span>
            <span>JS_ENGINE_HEATMAP_V1.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
