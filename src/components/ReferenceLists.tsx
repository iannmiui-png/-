import { ListOrdered, ChevronRight } from "lucide-react";
import { REFERENCE_LISTS } from "../data";

interface ReferenceListsProps {
  lang: 'en' | 'zh';
}

export default function ReferenceLists({ lang }: ReferenceListsProps) {
  const isZh = lang === 'zh';

  return (
    <section className="space-y-6 pt-6 border-t border-gray-800" id="reference-lists-section">
      <div className="space-y-1">
        <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-gray-400" />
          <span>
            {isZh ? "分享中明确枚举的参考清单" : "Lists Explicitly Stated in the Talk"}
          </span>
        </h2>
        <p className="text-xs text-gray-500 font-mono leading-relaxed">
          {isZh ? (
            "以下是原分享嘉宾口头逐条列出的内容，保持中立整理样式供您参考。"
          ) : (
            "Enumerations Samuel Groß actually spelled out, kept in a neutral ink format for strict reference."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="reference-lists-grid">
        {REFERENCE_LISTS.map((list) => {
          const listItems = isZh ? list.zhItems : list.enItems;
          const altItems = isZh ? list.enItems : list.zhItems;

          return (
            <div
              key={list.id}
              className="p-4 rounded-xl bg-gray-900/30 border border-gray-800/80 hover:border-gray-700/50 transition duration-200 flex flex-col justify-between"
              id={`ref-list-card-${list.id}`}
            >
              <div className="space-y-3">
                <div className="pb-2 border-b border-gray-800/60">
                  <h4 className="font-display font-semibold text-sm text-gray-200">
                    {isZh ? list.zhTitle : list.enTitle}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                    {isZh ? list.enTitle : list.zhTitle}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-gray-400 leading-relaxed list-none">
                  {listItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 group">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 mt-0.5 shrink-0 transition" />
                      <div>
                        <span>{item}</span>
                        <span className="block text-[10px] text-gray-600 mt-0.5 font-mono">
                          {altItems[index]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
