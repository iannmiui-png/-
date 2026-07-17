import { Flame, Languages, Shield, Terminal, Search, HelpCircle, AlertTriangle } from "lucide-react";

interface HeaderProps {
  lang: 'en' | 'zh';
  setLang: (lang: 'en' | 'zh') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPotency: number | null;
  setSelectedPotency: (p: number | null) => void;
  activeSection: string | null;
  setActiveSection: (sec: string | null) => void;
  peakCount: number;
  highCount: number;
  medCount: number;
  lowCount: number;
}

export default function Header({
  lang,
  setLang,
  searchQuery,
  setSearchQuery,
  selectedPotency,
  setSelectedPotency,
  activeSection,
  setActiveSection,
  peakCount,
  highCount,
  medCount,
  lowCount
}: HeaderProps) {
  const isZh = lang === 'zh';

  const sectionsList = [
    { key: 'A', label: isZh ? "第一部分" : "Part A" },
    { key: 'B', label: isZh ? "第二部分" : "Part B" },
    { key: 'C', label: isZh ? "第三部分" : "Part C" },
    { key: 'D', label: isZh ? "第四部分" : "Part D" },
    { key: 'E', label: isZh ? "第五部分" : "Part E" },
    { key: 'F', label: isZh ? "第六部分" : "Part F" },
    { key: 'G', label: isZh ? "第七部分" : "Part G" }
  ];

  return (
    <header className="space-y-6" id="app-header">
      {/* Top Bar with Language Toggle and Status Indicator */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-800/60">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
            {isZh ? "首期《遇见黑客》技术分享要点梳理" : "Meet the Hacker Ep. 1 Outline"}
          </span>
        </div>

        {/* Language switcher */}
        <button
          onClick={() => setLang(isZh ? 'en' : 'zh')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 text-xs font-medium text-gray-300 hover:text-white transition duration-200 cursor-pointer"
          id="lang-toggle-btn"
        >
          <Languages className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isZh ? "English Edition" : "切换委婉中文版"}</span>
        </button>
      </div>

      {/* Main title block */}
      <div className="space-y-3">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          {isZh ? (
            <>
              二〇二六年度JavaScript引擎探索性安全研究概览
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 text-lg sm:text-2xl mt-1 font-sans font-medium">
                —— 技术潜能热力图 (Potency Heatmap)
              </span>
            </>
          ) : (
            <>
              JS Engine Exploitation in 2026
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 text-lg sm:text-2xl mt-1 font-sans font-medium">
                — Potency Heatmap of Research Concepts
              </span>
            </>
          )}
        </h1>

        <p className="text-gray-400 text-sm md:text-base max-w-3xl leading-relaxed">
          {isZh ? (
            "这是一份以色彩标注梳理的技术要点概要，每一项核心要点都按照其在整场分享论述里的核心程度标注了1（低）至5（峰值）的不同权重。评级仅代表主观研判，并不代表原分享嘉宾的官方排序。您可以悬浮、点击或搜索条目来解锁详尽的底层安全机制探讨。"
          ) : (
            "A high-fidelity color-coded outline of state-of-the-art JavaScript compiler security research. Each key point is rated 1 (low, gray) to 5 (peak, red) based on its centrality to the core logical arguments of Samuel Groß's talk. Click any point to view an in-depth technical analysis of the underlying security mechanism."
          )}
        </p>
      </div>

      {/* Warning/Clarification block */}
      <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs text-gray-400 flex gap-3 leading-relaxed items-start">
        <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-gray-300">
            {isZh ? "温馨前置说明：" : "Disclaimer:"}
          </span>{" "}
          {isZh ? (
            "本页面内容由AI助手Claude生成，是对公开技术分享内容的友好解读与整理。所有条目梳理措辞、权重评级以及交互说明均为AI产出的主观参考内容，可能存在疏漏、偏差或是侧重调整。请勿直接视作权威定论，若需严谨核验核心技术细节，建议您回溯原分享内容对照确认。"
          ) : (
            "This interactive heatmap is an AI-curated reference companion summarizing public V8/WebAssembly security talks. Payout details, subjective weighting, and vulnerability mappings are generated for technical context. For precise verification, please refer to official Chromium project advisories."
          )}
        </div>
      </div>

      {/* Stats Counter & Filter Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Total stats */}
        <button
          onClick={() => setSelectedPotency(null)}
          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${
            selectedPotency === null
              ? "bg-emerald-950/20 border-emerald-500/40 text-white shadow-lg shadow-emerald-950/20"
              : "bg-gray-900/30 border-gray-800/80 text-gray-400 hover:border-gray-700/80 hover:text-gray-200"
          }`}
          id="stat-all-btn"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
            {isZh ? "全部要点" : "All Points"}
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-white">50</span>
            <span className="text-xs text-gray-500">/ 50</span>
          </div>
        </button>

        {/* Peak level 5 */}
        <button
          onClick={() => setSelectedPotency(5)}
          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${
            selectedPotency === 5
              ? "bg-rose-950/30 border-rose-500/50 text-white shadow-lg shadow-rose-950/20"
              : "bg-gray-900/30 border-gray-800/80 text-gray-400 hover:border-gray-700/80 hover:text-gray-200"
          }`}
          id="stat-peak-btn"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-rose-400">
            <Flame className="w-3 h-3 fill-rose-400 animate-pulse" />
            <span>5 {isZh ? "峰值" : "Peak"}</span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-rose-400">{peakCount}</span>
            <span className="text-xs text-gray-500">/ 50</span>
          </div>
        </button>

        {/* High level 4 */}
        <button
          onClick={() => setSelectedPotency(4)}
          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${
            selectedPotency === 4
              ? "bg-orange-950/30 border-orange-500/50 text-white shadow-lg shadow-orange-950/20"
              : "bg-gray-900/30 border-gray-800/80 text-gray-400 hover:border-gray-700/80 hover:text-gray-200"
          }`}
          id="stat-high-btn"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-orange-400">
            4 {isZh ? "高利害" : "High"}
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-orange-400">{highCount}</span>
            <span className="text-xs text-gray-500">/ 50</span>
          </div>
        </button>

        {/* Med level 3 */}
        <button
          onClick={() => setSelectedPotency(3)}
          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${
            selectedPotency === 3
              ? "bg-amber-950/20 border-amber-500/40 text-white shadow-lg shadow-amber-950/20"
              : "bg-gray-900/30 border-gray-800/80 text-gray-400 hover:border-gray-700/80 hover:text-gray-200"
          }`}
          id="stat-med-btn"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
            3 {isZh ? "中度核心" : "Medium"}
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-amber-400">{medCount}</span>
            <span className="text-xs text-gray-500">/ 50</span>
          </div>
        </button>

        {/* Low levels 1-2 */}
        <button
          onClick={() => setSelectedPotency(2)}
          className={`p-3 rounded-xl border text-left transition duration-200 cursor-pointer ${
            selectedPotency === 2
              ? "bg-gray-800/40 border-gray-400/40 text-white shadow-lg"
              : "bg-gray-900/30 border-gray-800/80 text-gray-400 hover:border-gray-700/80 hover:text-gray-200"
          }`}
          id="stat-low-btn"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-gray-300">
            1-2 {isZh ? "低与常规" : "Regular/Low"}
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-300">{lowCount}</span>
            <span className="text-xs text-gray-500">/ 50</span>
          </div>
        </button>
      </div>

      {/* Search & Section Fast Filter */}
      <div className="flex flex-col md:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={isZh ? "搜索核心概念、漏洞案例、防御方案..." : "Search concepts, bugs, mitgations..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-800 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/60 transition duration-200"
            id="heatmap-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
              id="clear-search-btn"
            >
              {isZh ? "清除" : "Clear"}
            </button>
          )}
        </div>

        {/* Section Quick navigator links */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs text-gray-500 shrink-0 font-mono pl-1 uppercase">
            {isZh ? "分部快速定位:" : "Sections:"}
          </span>
          <button
            onClick={() => setActiveSection(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
              activeSection === null
                ? "bg-gray-800 text-white border border-gray-700"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
            }`}
            id="all-sections-nav"
          >
            {isZh ? "全部" : "All"}
          </button>
          {sectionsList.map((sec) => (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer shrink-0 ${
                activeSection === sec.key
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
              }`}
              id={`nav-sec-${sec.key}`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
