export interface HeatmapItem {
  id: number;
  section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  potency: 1 | 2 | 3 | 4 | 5;
  enText: string;
  zhText: string;
  enDetail: string;
  zhDetail: string;
}

export interface ReferenceList {
  id: number;
  enTitle: string;
  zhTitle: string;
  enItems: string[];
  zhItems: string[];
}

export const SECTIONS = {
  A: {
    en: "Part A · Framing & Setup",
    zh: "第一部分 · 分享的背景铺垫与前置设定"
  },
  B: {
    en: "Part B · Core Thesis — Why JS Engines are Special",
    zh: "第二部分 · 核心论述：为何JavaScript引擎有着独特的安全属性"
  },
  C: {
    en: "Part C · How an Engine Works",
    zh: "第三部分 · JavaScript引擎的基础运转逻辑"
  },
  D: {
    en: "Part D · History of the Bugs (3 Phases)",
    zh: "第四部分 · 历史上典型安全问题的演进脉络（主观梳理分为三个阶段）"
  },
  E: {
    en: "Part E · Defenses & Mitigations",
    zh: "第五部分 · 已落地的各类防护方案与缓解思路"
  },
  F: {
    en: "Part F · Modern Research & the AI Turn",
    zh: "第六部分 · 前沿探索动向与AI技术带来的行业新变化"
  },
  G: {
    en: "Part G · Q&A",
    zh: "第七部分 · 问答交流环节"
  }
};

export const HEATMAP_ITEMS: HeatmapItem[] = [
  // SECTION A
  {
    id: 1,
    section: 'A',
    potency: 1,
    enText: "Series origin story / livestream fumbling",
    zhText: "系列栏目缘起闲谈与线上直播的小插曲",
    enDetail: "Warm-up discussion on how the 'Meet the Hacker' series was conceived, including spontaneous livestream tech issues.",
    zhDetail: "栏目主创团队在开播前的趣味闲聊，以及在线直播调试设备、解决推流延迟等现场突发状况的随性互动。"
  },
  {
    id: 2,
    section: 'A',
    potency: 2,
    enText: "Sam's intro and credentials (Project Zero, V8, 2016 Phrack paper)",
    zhText: "嘉宾介绍与过往资历（曾任职Project Zero、深耕V8引擎、2016年发布Phrack技术论文）",
    enDetail: "Introduction of the speaker (Samuel Groß), his prominent work at Google Project Zero, discoveries in the V8 engine, and his historic 2016 Phrack article on V8 exploitation.",
    zhDetail: "分享嘉宾 Samuel Groß 的个人成就简介：曾长期担任 Google Project Zero 核心安全研究员，专门攻坚 V8 引擎底层架构，并在 2016 年发表了奠定现代 V8 漏洞利用基础的 Phrack 权威论文。"
  },
  // SECTION B
  {
    id: 3,
    section: 'B',
    potency: 3,
    enText: "Motivation: a decade of browser-attack headlines",
    zhText: "背景铺垫：回望十余年来浏览器相关安全事件的公开记录",
    enDetail: "Analyzing trends of browser vulnerabilities over the past 10 years, highlighting how sandboxing and rendering bugs have evolved.",
    zhDetail: "深度剖析过去十年间各类主流浏览器在野漏洞利用的演进史，梳理沙箱技术升级如何倒逼漏洞研究焦点从渲染器向更高维度的 JS 引擎转移。"
  },
  {
    id: 4,
    section: 'B',
    potency: 3,
    enText: "Classic C signed-integer bounds bug",
    zhText: "传统C语言环境下有符号整数边界校验疏漏的经典问题",
    enDetail: "Traditional integer overflow in C/C++ where improper casting or bounds checking leads to out-of-bounds heap access.",
    zhDetail: "经典 C/C++ 开发中由于有符号整数溢出、类型强转或边界值处理不当，绕过逻辑判断并最终导致堆内存越界访问的传统漏洞模式。"
  },
  {
    id: 5,
    section: 'B',
    potency: 3,
    enText: "The \"just rewrite in Rust\" fix",
    zhText: "业界常见的「全面改用Rust重写」的优化思路",
    enDetail: "Exploring the popular industry sentiment of rewriting engines in memory-safe languages like Rust, and why it is not a complete panacea for logic-heavy compilers.",
    zhDetail: "分析当下业界推崇的“使用内存安全语言（如 Rust）彻底重构基础组件”的普适化安全构想，并辩证指出该思路在面对复杂编译优化逻辑时依然存在局限。"
  },
  {
    id: 6,
    section: 'B',
    potency: 4,
    enText: "Compiler deletes provably-redundant checks → cheap safety (the hinge)",
    zhText: "编译器主动删除已被证明冗余的安全校验，以此实现性能层面的高效优化——这正是整套论述的核心衔接点",
    enDetail: "Optimizing compilers (JIT) leverage range analysis to mathematically prove that bounds checks are redundant and safely eliminate them to achieve peak performance.",
    zhDetail: "现代即时编译器（JIT）在优化阶段会根据范围推导（Range Analysis）在数学上证明某些数组边界检查是“永远冗余的”并将其剪裁消除，以追求极致的执行速度。"
  },
  {
    id: 7,
    section: 'B',
    potency: 3,
    enText: "Same-shaped code, now in JavaScript",
    zhText: "完全同质的代码逻辑，如今在JavaScript环境下再度出现",
    enDetail: "How the same bounds checking and compiler assumptions manifest within JS JIT compilation pipelines, creating identical architectural risk structures.",
    zhDetail: "在 JavaScript 的 JIT 优化流水线中，由于需要兼顾动态语言的极端多态性，相同的边界判定与编译器先验假设往往以极度相似甚至更复杂的形态再次呈现。"
  },
  {
    id: 8,
    section: 'B',
    potency: 5,
    enText: "The value-of trap: the helpful optimization becomes the bug",
    zhText: "valueOf隐式触发的陷阱：原本旨在提升使用体验的优化机制，反倒演变为安全隐患的滋生点",
    enDetail: "When the compiler assumes an object's value is stable, but a custom implicit conversion (e.g., valueOf override) executes arbitrary user JS, invalidating previous type/range assumptions (side effects during optimization).",
    zhDetail: "编译器在判定类型时常预设目标对象结构稳定，然而用户自定义的 valueOf 隐式类型转换会秘密执行任意 JS 代码，在编译器浑然不觉中篡改了内存布局（即优化过程中的副作用危机）。"
  },
  {
    id: 9,
    section: 'B',
    potency: 4,
    enText: "Stack diagram: normal app vs JS engine",
    zhText: "栈结构对比示意图：常规应用程序与JavaScript引擎的架构差异",
    enDetail: "Visualizing the deep contrast between a standard application stack (well-defined stack frames) and a JIT compiler's runtime execution frame layouts.",
    zhDetail: "直观展现常规编译程序（标准调用栈帧与确定性边界）与 JIT 运行时执行（高度动态的重合式栈帧、临时机器码缓冲区）在架构底层上的本质区别。"
  },
  {
    id: 10,
    section: 'B',
    potency: 5,
    enText: "Code + data are attacker-controlled; the compiler and runtime ARE the attack surface",
    zhText: "代码与数据均可由访客侧灵活定义；编译器与运行时本身就完全属于需要审慎防护的接触范围",
    enDetail: "In a browser, the attacker delivers both the data and the actual executing code (the script), turning the engine's internal JIT optimizer and bytecode emitter into highly exposed front-line targets.",
    zhDetail: "浏览器环境的特殊性在于：攻击者不仅控制输入数据，还能直接提供待编译运行的恶意 JS 脚本。这使得 JIT 编译器、即时生成机器码的整个底层运行时本身成为了完全暴露的攻击面。"
  },
  {
    id: 11,
    section: 'B',
    potency: 4,
    enText: "Rust-compiler-bug analogy: no boundary left to cross",
    zhText: "Rust编译器潜在疏漏的类比：原本设想的安全边界将不复存在",
    enDetail: "A comparative analogy: if the Rust compiler itself has an optimization bug that miscompiles safe code, the language's safety guarantees break down completely. This mimics JIT compiler bugs.",
    zhDetail: "引入类比说明：如果安全语言 Rust 的编译器自身在进行高级优化（如 std::slice 边界判定剪裁）时引入了逻辑疏漏，那么其声称的所有安全屏障将瞬间崩溃。这与 JIT 优化漏洞具有完全相同的破坏力。"
  },
  // SECTION C
  {
    id: 12,
    section: 'C',
    potency: 2,
    enText: "Pipeline: parse → bytecode → interpreter → optimizing tiers",
    zhText: "完整流水线梳理：代码解析→生成字节码→解释器执行→逐层升级至优化编译层",
    enDetail: "The full journey of JS code in V8: Parsing into AST, compilation by Ignition into bytecode, interpretation, and dynamic promotion of hot functions to Turbofan JIT.",
    zhDetail: "系统化阐述 V8 等主流引擎的代码执行路径：源码解析为抽象语法树（AST） → Ignition 编译器输出字节码 → 解释执行并收集类型反馈（Type Feedback） → 热点函数最终晋升至 Turbofan 优化编译器生成本地机器码。"
  },
  {
    id: 13,
    section: 'C',
    potency: 2,
    enText: "The Wasm pipeline has no interpreter, by design",
    zhText: "WebAssembly专属流水线出于架构设计考量，跳过了解释器环节直接运行",
    enDetail: "WebAssembly uses highly structured, typed bytecode, allowing V8 (via Liftoff) to compile it straight to machine code, completely bypassing the interpreter tier.",
    zhDetail: "由于 WebAssembly 字节码具备极强的确定性与强类型特征，V8 的 Wasm 引擎（如 Liftoff）在设计上跳过了传统解释执行反馈环节，直接实施一、二级快速本地编译，以保障其接近原生的运行效率。"
  },
  // SECTION D
  {
    id: 14,
    section: 'D',
    potency: 3,
    enText: "Phase 1: classic runtime \"unexpected callback\" bugs — now largely extinct",
    zhText: "第一阶段：经典运行时场景下的「非预期回调」类问题，这类问题如今已基本得到妥善规避",
    enDetail: "Early DOM and V8 runtime bugs where calling a property triggered an unexpected JavaScript callback (reentrancy) while the engine was midway through modifying an object's internal structure.",
    zhDetail: "早期频繁出现的 DOM 或 V8 引擎回调隐患：在引擎修改对象内部拓扑结构的临界状态下，通过劫持特定属性强行触发非预期的自定义 JS 回调，从而打破内存一致性（即重入漏洞）。现已通过全面防护得到治理。"
  },
  {
    id: 15,
    section: 'D',
    potency: 4,
    enText: "Phase 2: optimizer bugs — ~50% of exploitable V8 bugs, stable for years",
    zhText: "第二阶段：优化编译器相关的隐患，约占V8引擎可被利用安全问题的半数，该占比长期保持稳定",
    enDetail: "Deep logic bugs in optimization phases (Turbofan type propagation, escape analysis, range checks, simplified lowering) that allow memory safety violations.",
    zhDetail: "集中于高级优化阶段（如 Turbofan 的类型传播推导、逃逸分析、范围计算、简化降级等）的深层逻辑缺陷。过去多年来，这类漏洞稳定占据了 V8 可利用高危缺陷的“半壁江山”。"
  },
  {
    id: 16,
    section: 'D',
    potency: 4,
    enText: "Phase 3: WebAssembly; Wasm GC (2023) as a complexity bomb",
    zhText: "第三阶段：WebAssembly相关问题；2023年落地的Wasm GC特性为系统引入了量级可观的新复杂度",
    enDetail: "The introduction of Garbage Collection (Wasm GC) and structural subtyping into WebAssembly in late 2023, merging complex V8 garbage collection cycles with Wasm's statically-typed sandboxed heap.",
    zhDetail: "伴随 2023 年 Wasm 垃圾回收特性（Wasm GC）及结构化子类型的正式落地，复杂的 JS 垃圾回收回收周期与 Wasm 底层静态沙箱堆进行深度咬合，给引擎引入了巨大且不可逆的新复杂度。"
  },
  {
    id: 17,
    section: 'D',
    potency: 4,
    enText: "Wasm type-confusion: a 3rd subtype silently breaks an old 2-way check",
    zhText: "WebAssembly类型混淆场景：原本仅预设两种子类型的校验逻辑，在第三种子类型新增后悄然失效",
    enDetail: "A classic type confusion bug where a type hierarchy check written for two subtypes fails to account for a newly added third subtype, enabling arbitrary type coercion.",
    zhDetail: "一种由于架构演进导致的典型类型混淆：在原始代码中，针对特定数据结构的判定逻辑被固化为“二选一”的双向分支；而当后续标准新增第三种子类型时，该校验逻辑未能及时适配，导致类型校验彻底失效。"
  },
  // SECTION E
  {
    id: 18,
    section: 'E',
    potency: 4,
    enText: "Root-cause chain: perf + spec → complexity → bugs → memory corruption",
    zhText: "根源问题传导链路：性能诉求叠加标准规范要求→系统复杂度攀升→疏漏概率上升→最终诱发内存层面的异常读写",
    enDetail: "The core engineering dilemma: browser competition demands extreme performance and complex spec compliance, creating immense codebases where subtle logical errors naturally degrade into full heap corruption.",
    zhDetail: "揭示现代浏览器的核心工程困境：业界对极致性能的无休止追逐与庞杂的 ECMA/Wasm 规范不断累加，迫使代码库复杂度指数级飙升，极微小的逻辑推导误差最终在底层直接退化为致命的内存越界。"
  },
  {
    id: 19,
    section: 'E',
    potency: 3,
    enText: "JIT-less mode (interpreter only)",
    zhText: "停用JIT即时编译的纯解释器运行模式",
    enDetail: "Running the engine with JIT completely disabled (e.g., V8's --jitless), executing JS purely via bytecode interpretation to shrink the attack surface.",
    zhDetail: "通过关闭所有即时编译（JIT）通道（例如 V8 的 --jitless 启动参数），让 JS 代码完全停留在字节码解释执行层级，以此达到大幅削减编译攻击面的目的。"
  },
  {
    id: 20,
    section: 'E',
    potency: 3,
    enText: "Caveat: interpreters aren't automatically safe",
    zhText: "值得留意的补充说明：解释器本身并不天然等同于绝对安全",
    enDetail: "Disabling JIT helps, but standard interpreter helper routines, memory management, garbage collection, and runtime bindings still contain exploitable C++ flaws.",
    zhDetail: "尽管解释模式消除了高级 JIT 优化的漏洞，但解释器底层的 C++ 辅助分发例程、复杂的内存分配与垃圾回收管理机制中，依然可能留有可被利用的底层内存缺陷。"
  },
  {
    id: 21,
    section: 'E',
    potency: 3,
    enText: "The 50% compiler-bug stat from the exploit tracker",
    zhText: "漏洞追踪平台统计得出的「半数安全问题来自编译器」的相关数据",
    enDetail: "Pointing to verified database stats showing that compiler-related optimizations account for roughly 50% of successfully demonstrated exploits, validating the focus on mitigating compiler issues.",
    zhDetail: "引用权威漏洞公示与在野追踪数据库的真实客观数据：确认在实际被成功演示的高级浏览器突破案例中，约 50% 直接源自优化编译器的深层逻辑错误，有力佐证了治理优化层的迫切性。"
  },
  {
    id: 22,
    section: 'E',
    potency: 3,
    enText: "Bugs are not exploits (attackers chain several)",
    zhText: "存在疏漏并不等同于可直接利用：实际的探索过程往往需要将多个不同的问题串联衔接",
    enDetail: "A single software bug rarely yields full execution; real-world exploit chains require linking an information leak, a memory corruption primitive, and a sandbox escape together.",
    zhDetail: "纠正认知误区：零星的编译器类型推导缺陷并非等于瞬间沦陷。现代防御体系下，完成一次完整的控制流劫持通常需要精细化地将信息泄露、越界读写及后续沙箱逃逸等多重隐患进行环环相扣的链式拼装。"
  },
  {
    id: 23,
    section: 'E',
    potency: 2,
    enText: "You can't drop below the spec's inherent complexity",
    zhText: "我们无法突破规范本身所限定的固有复杂度下限",
    enDetail: "No matter how well you write your engine, it must support all JS language specifications (Promises, proxies, prototypes), setting a strict lower bound on software complexity.",
    zhDetail: "无论底层引擎开发者如何精心打磨其代码逻辑，为了完全兼容庞大繁复的 ECMAScript 动态规范特性，引擎在设计上都必须存在一个无法被强行削减的复杂度下限。"
  },
  {
    id: 24,
    section: 'E',
    potency: 3,
    enText: "\"Write bug-free code\" isn't a strategy",
    zhText: "「彻底写出零疏漏代码」在现实中并非可落地的实操方案",
    enDetail: "Accepting that complex software will always have bugs. True security relies on strong architectural mitigations and containment boundaries rather than wishing for perfect code.",
    zhDetail: "安全工程学的基本共识：指望通过“人肉审计”或单纯的编码规范来创造出一个零缺陷的数百万行 C++ 复杂系统是不切实际的。唯有从底层设计防御性边界方是正途。"
  },
  {
    id: 25,
    section: 'E',
    potency: 4,
    enText: "MTE — hardware memory tagging",
    zhText: "MTE——硬件层面提供的内存标记防护机制",
    enDetail: "Memory Tagging Extension (MTE) in modern ARM processors, which assigns small 4-bit tags to pointers and memory blocks, raising hardware exceptions on mismatch to block UAF and out-of-bounds.",
    zhDetail: "剖析现代 ARM 处理器硬件引入的内存标记扩展（MTE）技术：通过为特定的指针与堆内存分配 4 比特的颜色标签，在硬件执行阶段进行实时比对，能有效拦截大多数“释放后使用”（UAF）与越界读写行为。"
  },
  {
    id: 26,
    section: 'E',
    potency: 4,
    enText: "…but MTE probably won't help JS engines (arbitrary bugs, no spare bits)",
    zhText: "但MTE这类方案大概率难以对JavaScript引擎形成有效防护：这类引擎面临的异常模式往往是任意泛化的，且可用的指针预留比特位完全不足",
    enDetail: "Why MTE falls short in JS engines: JIT-derived logic bugs often yield highly generalized 'logical' misbehaviors where pointers remain technically 'valid' to the hardware but logic-wise corrupted.",
    zhDetail: "分析 MTE 在 JS 引擎安全场景下的局限性：由于 JIT 逻辑漏洞所引发的多是“类型混淆”或“逻辑范围错误”，指针在硬件底层往往是合法的，且 JS 引擎高度紧凑的指针压缩格式（Pointer Compression）导致没有空余的比特位可供标记存放。"
  },
  {
    id: 27,
    section: 'E',
    potency: 5,
    enText: "V8 Sandbox: contain the blast radius rather than prevent corruption",
    zhText: "V8沙箱方案：不再执着于完全杜绝内存异常读写，转而选择限制潜在影响的波及范围",
    enDetail: "The V8 Sandbox (V8 SB) shifts focus: instead of trying to stop memory corruption inside V8, it assumes corruption WILL happen and isolates V8's entire heap in a dedicated, restricted virtual address space.",
    zhDetail: "介绍 V8 变革性的“沙箱化（V8 Sandbox）”防御构想：安全团队选择妥协并默认“V8 内部堆内存的损坏不可避免”，转而在虚拟地址空间中划定一块高度隔离的专属区域，确保即便越界读写发生也决不能溢出其限定边界。"
  },
  {
    id: 28,
    section: 'E',
    potency: 4,
    enText: "1 TB region + offsets instead of raw pointers",
    zhText: "依托1TB独立内存区域+偏移量替代原始裸指针的实现思路",
    enDetail: "By reserving a vast 1 TB virtual address space and replacing absolute 64-bit raw pointers with safer array offsets, V8 makes it mathematically impossible to access pointers outside the sandbox.",
    zhDetail: "在 64 位系统上秘密截留 1 TB 的虚拟地址空间，将传统容易被操控篡改的 64 位原始内存指针全部替换为基于沙箱基地址的相对偏移量（Offset），从而在物理架构上彻底锁死越界指针的可达范围。"
  },
  {
    id: 29,
    section: 'E',
    potency: 3,
    enText: "Pointer tables (the file-descriptor-table analogy)",
    zhText: "指针映射表机制：设计逻辑与文件描述符表高度相似",
    enDetail: "Mitigating reference manipulation by using indirect reference tables (pointer tables), resembling UNIX file descriptors, so an attacker cannot forge pointer bits directly.",
    zhDetail: "详述指针映射表（Pointer Tables）的间接寻址逻辑：其设计哲学与操作系统的文件描述符表高度契合。攻击者无法在堆内存中直接伪造、写入物理指针，只能操纵指向全局安全映射表的索引号（Indices）。"
  },
  {
    id: 30,
    section: 'E',
    potency: 3,
    enText: "Retrofit pain on a 20-year-old codebase",
    zhText: "在已迭代二十年的存量代码库之上落地这类改造需要付出相当高的适配成本",
    enDetail: "The extreme engineering friction of refactoring thousands of classes and raw pointer accesses in V8's massive, highly mature, legacy codebase without introducing performance regressions.",
    zhDetail: "描述防线建设中的工程现实：在历经二十年高强度迭代、拥有数百万行庞大 C++ 存量代码的 V8 体系中，要在保障极致流畅性能的同时将所有底层指针寻址逻辑重构，适配代价极其高昂。"
  },
  {
    id: 31,
    section: 'E',
    potency: 4,
    enText: "Hardware future: ARM permission overlay extension (POE2)",
    zhText: "未来硬件层面的演进方向：ARM架构的权限覆盖扩展机制POE2",
    enDetail: "Examining ARMv8.9/v9.4 POE2, which offers hardware-enforced permission overlays to lock down pages of memory dynamically without expensive system calls, promising cheap JIT code shielding.",
    zhDetail: "展望前沿的硬件演进趋势：探讨 ARM 架构最新演进的权限覆盖扩展（POE2）底层逻辑。它允许程序在用户态下以微秒级开销动态配置内存页的读/写/执行权限，为防御高级 JIT 代码段劫持提供了革命性手段。"
  },
  {
    id: 32,
    section: 'E',
    potency: 3,
    enText: "WebKit JIT Cage (restricts control flow, not memory)",
    zhText: "WebKit的JIT Cage方案：主要针对控制流执行进行限制，并未直接覆盖内存访问的防护",
    enDetail: "Apple WebKit's mitigation which enforces that JIT-compiled code execution remains tightly sandboxed within specific control-flow registers, though it doesn't prevent standard heap-memory corruption.",
    zhDetail: "分析 Apple WebKit 阵营推出的 JIT Cage 防御逻辑。该设计聚焦于高强度锚定 JIT 执行时的控制流寄存器，确保执行流决不脱轨，但在堆内存读写方面的广域隔离上并未提供同等强度的约束。"
  },
  {
    id: 33,
    section: 'E',
    potency: 4,
    enText: "Upshot: exploits now usually need two independent bugs",
    zhText: "当前的实际落地效果：如今想要完成完整的利用链路，通常需要依托两个彼此独立的不同问题才能实现",
    enDetail: "Thanks to V8 Sandbox and recent mitigations, a single logic vulnerability is no longer enough; a modern full-chain exploit typically requires pairing one bug to corrupt the V8 heap and a second to escape the V8 sandbox.",
    zhDetail: "总结现代防御措施的实效反馈：得益于 V8 沙箱等划时代防护的逐步成熟，依靠单一的 JIT 类型错误一气呵成完成控制权夺取的可能性几乎不复存在，现在攻击者往往需要精细搜寻两个高度互补的独立漏洞。"
  },
  // SECTION F
  {
    id: 34,
    section: 'F',
    potency: 3,
    enText: "Manual auditing + fuzzing still work",
    zhText: "传统的人工审计结合模糊测试的研究方式至今仍行之有效",
    enDetail: "Despite advances, human intuition combined with highly-tuned grey-box coverage fuzzers remains a powerful pairing for uncovering subtle edge cases.",
    zhDetail: "阐明底线格局：尽管技术攻防历经变迁，由资深研究员凭借深厚先验知识引导的“人工代码审计”与高度定制的“结构化模糊测试（Fuzzing）”依然是挖掘漏洞的基石。"
  },
  {
    id: 35,
    section: 'F',
    potency: 4,
    enText: "Big Sleep — LLM bug-finder running on V8",
    zhText: "Big Sleep项目：专门面向V8引擎的大模型安全隐患识别系统",
    enDetail: "Google and Project Zero's pioneering Big Sleep project, using custom trained Large Language Models to systematically spot real-world compiler bugs.",
    zhDetail: "引介 Google 及 Project Zero 牵头发起的 Big Sleep 前瞻性研究：该项目专门训练大语言模型去深刻理解编译器设计规范，并开始成功检索出 V8 引擎中此前从未被人类发现的在野高危逻辑漏洞。"
  },
  {
    id: 36,
    section: 'F',
    potency: 4,
    enText: "Agentic research: point Claude Code at a codebase",
    zhText: "智能体辅助研究模式：直接将Claude Code这类AI工具指向目标代码库开展定向分析",
    enDetail: "Moving from simple static analysis to interactive, agentic AI systems (like Claude Code) that can navigate massive code trees, write targeted test cases, and prove edge-case bugs.",
    zhDetail: "描绘研究模式的范式转移：研究员不再仅仅将 AI 当作代码查错器，而是直接授权类似 Claude Code 的全自动智能体（Agent）深度探索庞大的 V8 源码树，自主编写定制化概念证明（PoC）代码。"
  },
  {
    id: 37,
    section: 'F',
    potency: 5,
    enText: "Accuracy, not raw capability, was the real unlock",
    zhText: "真正带来质变的核心解锁点，并非 raw 计算能力的提升，而是结果准确率的大幅优化",
    enDetail: "The true milestone in AI-assisted security was not bigger context windows or faster generation speeds, but rather the dramatic reduction in false positives when analyzing highly complex pointer-manipulation logic.",
    zhDetail: "指出 AI 辅助研究跨越分水岭的核心标志：让安全社区真正接纳并落地 AI 的关键，不在于更快的算力或者更大的上下文容量，而是在面临编译器指针运算、边界条件等高噪场景时，AI 虚报率（False Positives）得到了划时代的实质性下降。"
  },
  {
    id: 38,
    section: 'F',
    potency: 3,
    enText: "Bug-report spike (early 2026) → reward-program changes",
    zhText: "2026年初出现的安全问题提交量激增现象，直接推动了行业内漏洞奖励计划的规则调整",
    enDetail: "A massive surge in automated high-quality compiler bug reports submitted to Chrome VRP in early 2026, leading to emergency revisions in bug bounty payout structures and rules.",
    zhDetail: "记录安全史上的一起关键事件：由于智能体挖洞工具在 2026 年初迎来爆发，向 Chrome 官方漏洞奖励计划（VRP）提交的高质量、结构化编译器漏洞报告出现短时间内呈数十倍级喷涌，迫使官方紧急改组奖励细则。"
  },
  {
    id: 39,
    section: 'F',
    potency: 3,
    enText: "Example 1: bytecode yield-point mismatch (fuzzers missed it)",
    zhText: "示例一：字节码 yield 点匹配逻辑不一致的问题，该问题此前所有模糊测试工具均未识别到",
    enDetail: "An AI-discovered bug where V8's generator compiler misaligned resume-offsets across yield points. The state-machine was too deep for traditional black-box fuzzers to trigger.",
    zhDetail: "分享 AI 发现的第一个实战战果：一个由于 V8 在编译生成器（Generator）时、对 yield 点的寄存器上下文还原偏移量发生微小错配的隐秘漏洞。因其调用链层级极深，传统模糊测试穷尽算力也未能触及。"
  },
  {
    id: 40,
    section: 'F',
    potency: 4,
    enText: "Example 2: 28-bit truncation (the LLM sweet spot)",
    zhText: "示例二：28位偏移量截断类问题，恰好属于大模型最容易发挥优势的排查场景",
    enDetail: "A vulnerability where an exception handler offset was cast to a 28-bit integer, allowing a giant jump instruction to truncate and trigger out-of-bounds. Perfect for LLM's precise semantic searching.",
    zhDetail: "分析第二个典型战果：异常处理（Exception Handler）偏移量在进行跨模块传递时被强制截断为 28 位整型，导致超大偏移跳转时发生回绕并误入非安全区域。大模型对这类特定“语义模式匹配”展现出了极强的直觉。"
  },
  {
    id: 41,
    section: 'F',
    potency: 5,
    enText: "Example 3: Web Audio × JS float-mode bug (cross-subsystem seam)",
    zhText: "示例三：Web Audio模块与JavaScript浮点数模式交互引发的问题，属于跨子系统衔接边缘的典型隐患",
    enDetail: "An extremely subtle bug arising at the boundary between the Web Audio rendering thread and JavaScript's fast float arrays, where a minor discrepancy in precision assumptions led to sandbox escape.",
    zhDetail: "剖析第三个极具震撼力的漏洞：发生在 Web Audio 音频渲染线程与 JS 底层快速浮点数数组（Float Arrays）进行高频交互的数据衔接边界。因不同子系统对“高精度浮点处理”的底层逻辑假设存在细微缝隙，从而被 AI 敏锐捕捉。"
  },
  // SECTION G
  {
    id: 42,
    section: 'G',
    potency: 3,
    enText: "Is browser hacking worth it over the next 5 years?",
    zhText: "未来五年内，面向浏览器的相关探索是否仍具备研究价值？",
    enDetail: "Discussing whether browser engine research remains a viable elite security career as sandboxes and hardware protections approach absolute maturity.",
    zhDetail: "深度探讨随着 V8 沙箱、POE2 等前沿硬件级防护在未来五年内趋于大成，针对浏览器引擎的安全研究是否仍能作为顶尖白帽研究员的核心价值高地。"
  },
  {
    id: 43,
    section: 'G',
    potency: 3,
    enText: "How to get started in the AI age",
    zhText: "在AI技术普及的当下，新人如何入行开展相关研究？",
    enDetail: "Actionable advice for newcomers on building core computer science foundations rather than relying solely on automated AI assistants for quick bug submissions.",
    zhDetail: "为行业新秀指明方向：在 AI 挖洞工具唾手可得的浪潮下，新人应避免陷入过度依赖智能体、忽视底层编译原理的泥潭，而应着重补齐经典的计算机底层体系科学基础。"
  },
  {
    id: 44,
    section: 'G',
    potency: 4,
    enText: "AI \"slightly destroyed\" bug bounties and CTFs (the AFL analogy)",
    zhText: "AI技术已经「在一定程度上重塑」了漏洞奖励计划与CTF赛事的玩法生态，这个变化逻辑与早年AFL模糊测试工具普及时的行业变革极为相似",
    enDetail: "Comparing the current AI revolution in security to the 2013-2015 era when AFL (American Fuzzy Lop) popularized coverage-guided fuzzing, turning easy bugs into automated low-hanging fruit.",
    zhDetail: "引入精彩历史类比：指出智能体的大面积普及已经对当前的 CTF 竞赛以及商业漏洞奖励生态造成了“降维打击”。这一幕正如 2014 年左右 AFL 模糊测试工具横空出世、将所有显式漏洞瞬间收割净尽的剧变如出一辙。"
  },
  {
    id: 45,
    section: 'G',
    potency: 4,
    enText: "Standing out: find novel attack surface, not just bugs",
    zhText: "构建个人核心竞争力的方向：优先挖掘全新的未被涉足的探索场景，而非仅仅定位已存在的疏漏",
    enDetail: "Real experts build value by identifying entirely undocumented code sub-systems and designing novel attack paradigms rather than running existing AI agents over heavily-audited core code.",
    zhDetail: "传授行业破局之道：在漏洞挖掘红海中，真正具备持久竞争力的研究者应当摒弃跟风使用 AI 在成熟模块卷性能的做法，转而去开拓从未有人涉足的冷僻协议或全新交互边界（即定义新的攻击面）。"
  },
  {
    id: 46,
    section: 'G',
    potency: 1,
    enText: "Declined: Project Fortify, cross-origin read blocking",
    zhText: "未展开探讨的内容：Project Fortify项目、跨源读取拦截相关议题",
    enDetail: "Skimped topics: brief mentions of V8's Fortify compilation flags and Cross-Origin Read Blocking (CORB) architecture that were glossed over due to time.",
    zhDetail: "分享中受限于时长而语焉不详或被略过的内容：如 V8 的 Project Fortify 编译防御、以及跨源读取拦截（CORB）针对侧信道攻击的实战抵御表现。"
  },
  {
    id: 47,
    section: 'G',
    potency: 2,
    enText: "Relative vtable optimization & use-after-free",
    zhText: "相对虚函数表优化与释放后使用类问题的相关讨论",
    enDetail: "Brief discussion on C++ relative virtual table optimizations in modern Clang and how they affect the layout of virtual pointers for UAF exploits.",
    zhDetail: "回顾与解答关于现代 Clang 编译器对 C++ “相对虚函数表（Relative Vtables）”进行的深层二进制排列优化，以及这一特征对释放后使用（UAF）漏洞利用链路的具体干扰。"
  },
  {
    id: 48,
    section: 'G',
    potency: 2,
    enText: "Raw C++ blob for sandbox escape / post-exploitation",
    zhText: "原生预编译Blob用于沙箱逃逸与后渗透阶段的相关技术说明",
    enDetail: "Under-the-hood look at packaging raw C++ shellcode payloads into pre-compiled Blobs inside memory buffers to orchestrate the secondary stage of a sandbox breakout.",
    zhDetail: "技术细节揭秘：在通过 JS 越界读写获取初始执行权后，如何通过内存中精心排布的预编译原生 C++ 机器码 Blob 进行稳定的系统服务调用，从而推进后续在野控制权维持。"
  },
  {
    id: 49,
    section: 'G',
    potency: 3,
    enText: "Is the JSC runtime \"secure now\"? No — bugs come in waves",
    zhText: "JavaScriptCore运行时如今是否已经足够安全？答案是否定的：这类问题的出现往往呈波浪式阶段性涌现的特征",
    enDetail: "Analyzing Apple's JavaScriptCore (Safari's engine). Its lighter architecture has different weak points, and security levels fluctuate in cyclical waves rather than linear improvements.",
    zhDetail: "客观评价 Safari 浏览器背后的 JavaScriptCore 引擎：其相对轻量的极简设计确实避开了一些 V8 的复杂泥潭，但其自身的类型推导系统面临着特有的边界隐患，安全演进呈现明显的波浪式起伏周期。"
  },
  {
    id: 50,
    section: 'G',
    potency: 3,
    enText: "Has the V8 sandbox shifted exploitation? Yes, but not yet dramatically",
    zhText: "V8沙箱的落地是否彻底改变了现有探索模式？答案是带来了一定变化，但尚未造成颠覆性的影响",
    enDetail: "Evaluating whether the V8 Sandbox has genuinely ended V8 exploitation. Concluding it raised the cost and required chaining, but clever bypasses of sandbox borders are actively emerging.",
    zhDetail: "对当前 V8 沙箱安全防线的终极评估：它确实大幅抬高了攻击门槛，逼迫研究员必须双漏洞并进，但研究者们也正在积极寻找沙箱自身生命周期管理、或者沙箱外围底层 API 桥接点处的间接绕过技术，攻防尚未终结。"
  }
];

export const REFERENCE_LISTS: ReferenceList[] = [
  {
    id: 1,
    enTitle: "1 · The talk's own agenda",
    zhTitle: "本次分享的自身议程",
    enItems: [
      "warm-up: why JavaScript is hard",
      "history of how vulnerabilities evolved",
      "defenses and mitigations",
      "modern vulnerability research"
    ],
    zhItems: [
      "暖场环节：阐释JavaScript引擎相关研究的特殊难点",
      "不同历史阶段漏洞演进脉络梳理",
      "各类防护与缓解方案说明",
      "当下前沿的漏洞研究动向介绍"
    ]
  },
  {
    id: 2,
    enTitle: "2 · Three phases of bug history",
    zhTitle: "安全问题演进的三个阶段",
    enItems: [
      "phase 1 — classic runtime bugs",
      "phase 2 — optimizing-compiler bugs",
      "phase 3 — WebAssembly bugs"
    ],
    zhItems: [
      "第一阶段：经典运行时场景类问题",
      "第二阶段：优化编译器相关问题",
      "第三阶段：WebAssembly相关问题"
    ]
  },
  {
    id: 3,
    enTitle: "3 · JIT-less options for WebAssembly",
    zhTitle: "WebAssembly停用JIT的可选方案",
    enItems: [
      "write a Wasm interpreter (itself complex now)",
      "disable Wasm entirely (Apple lockdown mode)",
      "keep the baseline JIT, drop only the optimizing ones"
    ],
    zhItems: [
      "自行研发一套独立的Wasm解释器（如今该类解释器本身的复杂度已经相当可观）",
      "直接彻底禁用WebAssembly（苹果锁定模式采用的方案）",
      "保留基础层JIT，仅关闭最高层级的优化编译环节"
    ]
  },
  {
    id: 4,
    enTitle: "4 · Mitigation comparison (3 columns)",
    zhTitle: "不同防护方案的横向对比",
    enItems: [
      "JIT Cage — restricts instructions / control flow, not memory",
      "software sandbox — restricts memory, but trusts the compiler",
      "POE2 world — checks all the boxes"
    ],
    zhItems: [
      "JIT Cage：限制指令集与控制流，不对内存访问做限制",
      "软件沙箱：限制内存访问边界，但信任编译器的输出结果",
      "POE2硬件支持的方案：能够同时覆盖所有防护要求"
    ]
  },
  {
    id: 5,
    enTitle: "5 · The AI-assisted research spectrum",
    zhTitle: "AI辅助研究的能力光谱",
    enItems: [
      "fully autonomous — \"point it at the code, find me a bug\"",
      "assisted — the researcher takes the wheel, agent does the reading"
    ],
    zhItems: [
      "完全自动化模式：「直接指向代码库，自动识别所有潜在隐患」",
      "辅助协作模式：由人类研究者主导核心方向，AI助手负责完成大规模代码阅读这类机械性工作"
    ]
  },
  {
    id: 6,
    enTitle: "6 · The three example bugs",
    zhTitle: "分享中提到的三个典型隐患案例",
    enItems: [
      "bytecode yield-point mismatch",
      "28-bit exception-handler-offset truncation",
      "Web Audio × JavaScript float-mode bug"
    ],
    zhItems: [
      "字节码yield点匹配不一致问题",
      "28位异常处理偏移量截断问题",
      "Web Audio与JavaScript浮点数模式交互引发的问题"
    ]
  },
  {
    id: 7,
    enTitle: "7 · The batched Q&A questions",
    zhTitle: "批量问答环节的核心议题",
    enItems: [
      "is browser hacking worth it in 5 years?",
      "how do you get started in the AI age?",
      "what's the future of browser bug bounties?"
    ],
    zhItems: [
      "未来五年内浏览器安全研究是否仍有价值？",
      "AI普及的时代新人该如何入行？",
      "未来浏览器漏洞奖励计划的行业走向将如何变化？"
    ]
  }
];
