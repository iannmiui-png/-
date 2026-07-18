import { useEffect, useRef, useState } from "react";

interface SandpileChamberProps {
  itemIndex: number;
  activeItemIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

const COLS = 16;
const ROWS = 9;

// Helper to run a stable simulation of N grains added to a grid
function createStableGrid(itemIndex: number, grainCount: number): number[][] {
  const grid = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
  
  // Define entry point based on boustrophedon direction
  const isEven = itemIndex % 2 === 0;
  const entryX = isEven ? 1 : COLS - 2;
  const entryY = 1;

  // Add grains and topple
  for (let i = 0; i < grainCount; i++) {
    grid[entryY][entryX]++;
    toppleGrid(grid);
  }

  return grid;
}

// Standard Abelian Sandpile topple algorithm
function toppleGrid(grid: number[][]): boolean {
  let toppled = false;
  let iterations = 0;
  const maxIterations = 300; // safety threshold to avoid infinite loop

  while (iterations < maxIterations) {
    let activeTopple = false;
    const nextGrid = grid.map(row => [...row]);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (grid[y][x] >= 4) {
          activeTopple = true;
          toppled = true;
          
          const qty = Math.floor(grid[y][x] / 4) * 4;
          nextGrid[y][x] -= qty;
          const distribute = qty / 4;

          // up
          if (y > 0) nextGrid[y - 1][x] += distribute;
          // down
          if (y < ROWS - 1) nextGrid[y + 1][x] += distribute;
          // left
          if (x > 0) nextGrid[y][x - 1] += distribute;
          // right
          if (x < COLS - 1) nextGrid[y][x + 1] += distribute;
        }
      }
    }

    // copy back
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        grid[y][x] = nextGrid[y][x];
      }
    }

    if (!activeTopple) break;
    iterations++;
  }

  return toppled;
}

export default function SandpileChamber({
  itemIndex,
  activeItemIndex,
  isPlaying,
  currentTime,
  duration
}: SandpileChamberProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isEven = itemIndex % 2 === 0;
  const isCurrent = itemIndex === activeItemIndex;
  const isFilled = itemIndex < activeItemIndex;
  
  // Local active grid state for the current active item
  const [activeGrid, setActiveGrid] = useState<number[][] | null>(null);
  const grainTimerRef = useRef<number>(0);

  // Determine entry/exit coordinates
  const entryX = isEven ? 1 : COLS - 2;
  const entryY = 1;
  const exitX = isEven ? COLS - 2 : 1;
  const exitY = ROWS - 2;

  // Initialize active grid when this becomes the active item
  useEffect(() => {
    if (isCurrent) {
      // Seed with some initial sand based on the exact progress within this slice
      const sliceDuration = duration / 50;
      const elapsed = Math.max(0, currentTime - itemIndex * sliceDuration);
      const ratio = Math.min(1, elapsed / sliceDuration);
      const initialGrains = Math.floor(ratio * 120); // max 120 grains
      
      const grid = createStableGrid(itemIndex, initialGrains);
      setActiveGrid(grid);
    } else {
      setActiveGrid(null);
    }
  }, [isCurrent]);

  // Live simulation ticker for the ACTIVE item row
  useEffect(() => {
    if (!isCurrent || !isPlaying || !activeGrid) return;

    let animId: number;
    let lastTime = performance.now();
    const grainInterval = 250; // add a grain of sand every 250ms

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      
      grainTimerRef.current += delta;
      if (grainTimerRef.current >= grainInterval) {
        grainTimerRef.current -= grainInterval;
        
        // Add a grain of sand at the entry point
        setActiveGrid((prevGrid) => {
          if (!prevGrid) return null;
          const next = prevGrid.map(row => [...row]);
          next[entryY][entryX]++;
          toppleGrid(next);
          return next;
        });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isCurrent, isPlaying, activeGrid]);

  // Render routine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Grid cell computation based on high-DPI support
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Support Retina screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Determine grid source
    let grid: number[][];
    if (isFilled) {
      // Fully filled items get a pre-computed stable sandpile pattern (e.g. 120 grains)
      grid = createStableGrid(itemIndex, 120);
    } else if (isCurrent && activeGrid) {
      grid = activeGrid;
    } else {
      // Future items are empty
      grid = Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
    }

    // Draw background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(10, 10, 10, 0.4)";
    ctx.fillRect(0, 0, width, height);

    // Draw cell grid outlines
    const cellW = width / COLS;
    const cellH = height / ROWS;

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const val = grid[y][x];
        const px = x * cellW;
        const py = y * cellH;

        if (val > 0) {
          // Map sand count to beautiful shades of green / emerald / lime
          let fillStyle = "#064e3b"; // 1 grain - deep forest green
          if (val === 2) {
            fillStyle = "#059669"; // 2 grains - medium emerald
          } else if (val === 3) {
            fillStyle = "#10b981"; // 3 grains - glowing green
          } else if (val >= 4) {
            fillStyle = "#a7f3d0"; // 4+ grains (toppling state) - bright emerald ice
          }

          ctx.fillStyle = fillStyle;
          ctx.fillRect(px + 0.5, py + 0.5, cellW - 1, cellH - 1);

          // Add a subtle glowing center for the highest level
          if (val === 3) {
            ctx.fillStyle = "#34d399";
            ctx.fillRect(px + cellW/4, py + cellH/4, cellW/2, cellH/2);
          }
        } else {
          // Faint outline of empty cells
          ctx.strokeStyle = "rgba(34, 197, 94, 0.04)";
          ctx.lineWidth = 0.5;
          ctx.strokeRect(px, py, cellW, cellH);
        }
      }
    }

    // Draw indicators for entry/exit nozzles
    // Entry indicator
    ctx.fillStyle = isCurrent && isPlaying ? "#22c55e" : "rgba(16, 185, 129, 0.3)";
    ctx.beginPath();
    ctx.arc(entryX * cellW + cellW / 2, entryY * cellH + cellH / 2, Math.max(2, cellW / 4), 0, Math.PI * 2);
    ctx.fill();

    // Exit indicator
    ctx.fillStyle = isFilled || (isCurrent && isPlaying) ? "rgba(16, 185, 129, 0.5)" : "rgba(115, 115, 115, 0.2)";
    ctx.beginPath();
    ctx.arc(exitX * cellW + cellW / 2, exitY * cellH + cellH / 2, Math.max(1.5, cellW / 5), 0, Math.PI * 2);
    ctx.fill();

    // If active and playing, draw a small falling sand animation stream
    if (isCurrent && isPlaying) {
      ctx.fillStyle = "rgba(34, 197, 94, 0.8)";
      const timeFactor = (performance.now() / 150) % 3;
      const grainY = (entryY * cellH) + (timeFactor * (cellH / 3));
      ctx.fillRect(entryX * cellW + cellW / 3, grainY, cellW / 3, cellH / 4);
    }
  }, [itemIndex, activeItemIndex, isPlaying, isFilled, isCurrent, activeGrid]);

  return (
    <div className="relative flex flex-col items-center shrink-0" id={`sandpile-container-${itemIndex}`}>
      {/* Small direction arrow badges indicating boustrophedon path */}
      <div className="flex items-center gap-1.5 w-[76px]">
        {/* Entry indicator (alternates left/right) */}
        <div className={`w-2 h-2 rounded-full ${isCurrent && isPlaying ? "bg-emerald-400 animate-ping" : isFilled ? "bg-emerald-600/60" : "bg-neutral-800"}`} />
        <span className="text-[9px] font-mono text-neutral-500 uppercase flex-1 text-center font-bold">
          {isEven ? "L → R Flow" : "R → L Flow"}
        </span>
      </div>

      <div className="relative rounded-lg border border-neutral-800/80 overflow-hidden shadow-inner w-[76px] h-[48px] bg-black/40">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Progress overlays */}
        {isCurrent && (
          <div className="absolute top-0.5 right-0.5 px-1 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/20 text-[8px] font-mono text-emerald-400 uppercase select-none tracking-wider animate-pulse">
            LIVE
          </div>
        )}
      </div>
    </div>
  );
}
