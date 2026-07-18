import { useState } from "react";
import { ChevronDown, ChevronUp, Flame, HelpCircle, ArrowUpRight } from "lucide-react";
import { HeatmapItem, SECTIONS } from "../data";
import { AnimatePresence, motion } from "motion/react";
import SandpileChamber from "./SandpileChamber";

interface HeatmapListProps {
  items: HeatmapItem[];
  lang: 'en' | 'zh';
  activeSection: string | null;
  selectedPotency: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  activeItemIndex: number;
}

export default function HeatmapList({
  items,
  lang,
  activeSection,
  selectedPotency,
  isPlaying,
  currentTime,
  duration,
  activeItemIndex
}: HeatmapListProps) {
  const isZh = lang === 'zh';
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getPotencyStyles = (p: 1 | 2 | 3 | 4 | 5) => {
    switch (p) {
      case 5:
        return {
          textColor: "text-rose-400 font-semibold",
          bgColor: "bg-rose-500/10 hover:bg-rose-500/15",
          borderColor: "border-rose-500/30",
          dotColor: "bg-rose-500",
          badgeBg: "bg-rose-950/40 text-rose-300 border-rose-500/40",
          label: isZh ? "5 · 峰值核心场景" : "5 · Peak Centrality"
        };
      case 4:
        return {
          textColor: "text-orange-400 font-medium",
          bgColor: "bg-orange-500/10 hover:bg-orange-500/15",
          borderColor: "border-orange-500/30",
          dotColor: "bg-orange-500",
          badgeBg: "bg-orange-950/40 text-orange-300 border-orange-500/40",
          label: isZh ? "4 · 高利害场景" : "4 · High Interest"
        };
      case 3:
        return {
          textColor: "text-amber-400 font-medium",
          bgColor: "bg-amber-500/10 hover:bg-amber-500/15",
          borderColor: "border-amber-500/30",
          dotColor: "bg-amber-500",
          badgeBg: "bg-amber-950/30 text-amber-300 border-amber-500/30",
          label: isZh ? "3 · 中度核心相关" : "3 · Medium Core"
        };
      case 2:
        return {
          textColor: "text-emerald-400",
          bgColor: "bg-emerald-500/10 hover:bg-emerald-500/15",
          borderColor: "border-emerald-500/30",
          dotColor: "bg-emerald-500",
          badgeBg: "bg-emerald-950/30 text-emerald-300 border-emerald-500/30",
          label: isZh ? "2 · 常规核心相关" : "2 · Regular Relevance"
        };
      case 1:
      default:
        return {
          textColor: "text-gray-400",
          bgColor: "bg-gray-800/20 hover:bg-gray-800/30",
          borderColor: "border-gray-800",
          dotColor: "bg-gray-500",
          badgeBg: "bg-gray-900 text-gray-400 border-gray-700",
          label: isZh ? "1 · 低度相关场景" : "1 · Low Relevance"
        };
    }
  };

  // Group items by section
  const sectionKeys: ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <div className="space-y-8" id="heatmap-list-container">
      {sectionKeys.map((secKey) => {
        // If an active section is selected, only show that section
        if (activeSection !== null && activeSection !== secKey) return null;

        const sectionItems = items.filter((item) => item.section === secKey);
        if (sectionItems.length === 0) return null;

        const sectionHeader = SECTIONS[secKey];

        return (
          <div key={secKey} className="space-y-3" id={`section-block-${secKey}`}>
            {/* Section Header */}
            <div className="flex items-center gap-2 pb-1.5 border-b border-gray-800">
              <span className="font-mono text-xs text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                {secKey}
              </span>
              <h3 className="text-gray-200 font-display font-semibold text-sm sm:text-base tracking-tight">
                {isZh ? sectionHeader.zh : sectionHeader.en}
              </h3>
              <span className="text-xs text-gray-500 ml-auto font-mono">
                {sectionItems.length} {isZh ? "项" : "items"}
              </span>
            </div>

            {/* Section Rows */}
            <div className="space-y-2.5">
              {sectionItems.map((item) => {
                const styles = getPotencyStyles(item.potency);
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border transition-all duration-200 ${styles.bgColor} ${
                      isExpanded
                        ? "border-emerald-500/40 bg-gray-900/40 ring-1 ring-emerald-500/20"
                        : styles.borderColor
                    }`}
                    id={`heatmap-item-${item.id}`}
                  >
                    {/* Row Header */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full text-left p-3.5 sm:p-4 flex items-start gap-3 sm:gap-4 select-none focus:outline-none cursor-pointer"
                      id={`heatmap-btn-${item.id}`}
                      aria-expanded={isExpanded}
                      aria-controls={`heatmap-detail-${item.id}`}
                    >
                      {/* Potency circle / number badge */}
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-lg font-mono text-xs shrink-0 ${styles.badgeBg} border`}
                      >
                        {item.potency}
                      </span>

                      {/* Title block */}
                      <div className="flex-1 min-w-0 pr-2 self-center">
                        <p className={`text-sm leading-relaxed ${styles.textColor} break-words`}>
                          {isZh ? item.zhText : item.enText}
                        </p>
                      </div>

                      {/* Sandpile visual chamber */}
                      <SandpileChamber
                        itemIndex={item.id - 1}
                        activeItemIndex={activeItemIndex}
                        isPlaying={isPlaying}
                        currentTime={currentTime}
                        duration={duration}
                      />

                      {/* Expand Chevron */}
                      <div className="shrink-0 text-gray-500 self-center">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 hover:text-gray-300" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Details Container */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`heatmap-detail-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 border-t border-gray-800/40 bg-black/20 text-xs sm:text-sm space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500">
                              <span className="text-gray-400 font-semibold">
                                {isZh ? "权重等级:" : "Potency weight:"}
                              </span>
                              <span className="flex items-center gap-1 text-gray-300">
                                {item.potency === 5 && (
                                  <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                                )}
                                {styles.label}
                              </span>
                              <span className="text-gray-700">|</span>
                              <span>ID: #{item.id}</span>
                            </div>

                            {/* Dual language side-by-side or stacked details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              {/* Left column: Active display language */}
                              <div className="space-y-1.5 p-3 rounded-lg bg-gray-950/60 border border-gray-800/80">
                                <div className="flex items-center gap-1.5 text-gray-400 font-mono text-xs pb-1 border-b border-gray-800/50">
                                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{isZh ? "补充阐释 / 底层逻辑" : "Technical Overview"}</span>
                                </div>
                                <p className="text-gray-300 leading-relaxed pt-1">
                                  {isZh ? item.zhDetail : item.enDetail}
                                </p>
                              </div>

                              {/* Right column: Reference original language */}
                              <div className="space-y-1.5 p-3 rounded-lg bg-gray-950/30 border border-gray-800/30 opacity-70 hover:opacity-100 transition duration-200">
                                <div className="flex items-center gap-1.5 text-gray-500 font-mono text-xs pb-1 border-b border-gray-800/30">
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                  <span>{isZh ? "原版对照 / English reference" : "对照译文 / Chinese translation"}</span>
                                </div>
                                <p className="text-gray-400 leading-relaxed pt-1">
                                  {isZh ? item.enDetail : item.zhDetail}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
