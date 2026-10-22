import React, { useState } from 'react';
import { Plane, Truck, Warehouse, TrainFront, Pause, Play, Gauge } from 'lucide-react';

interface BoxItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  metric: string;
}

export const VerticalSlider: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // The 4 Core Boxes in Zig-Zag order
  const boxes: BoxItem[] = [
    {
      id: 'freight',
      name: 'FREIGHT',
      // category: 'Ocean & Air Cargo',
      category: 'FORWARDING SOLUTION',
      icon: <Plane className="w-5 h-5 text-teal-600" />,
      metric: '',
    },
     {
      id: 'warehouse',
      name: 'MULTI-MODAL',
      // category: 'Fleet & Dispatch',
      category: 'LOGISTICS SOLUTIONS',
      icon: <Truck className="w-5 h-5 text-teal-600" />,
      metric: '',
    },
    {
      id: 'road',
      name: 'ROAD',
      // category: 'Fleet & Dispatch',
      category: 'TRANSPORTATION SUITE',
      icon: <Truck className="w-5 h-5 text-teal-600" />,
      metric: '',
    },
   
   
    {
      id: 'rail',
      name: 'RAIL',
      // category: 'Yard Automation',
      category: 'LOGISTICS SOLUTIONS',
      icon: <TrainFront className="w-5 h-5 text-teal-600" />,
      metric: '',
    },
  ];

  // Duration in seconds: default 14s, faster with multiplier
  const durationSeconds = 14 / speedMultiplier;

  return (
    <div className="relative w-full max-w-[540px] h-[560px] select-none flex flex-col items-center justify-center">
      {/* Background Soft Glow */}
      <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-teal-100/30 via-cyan-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 
        Open Vertical Slider Viewport
        Masked top & bottom so cards smoothly appear from bottom and fade out at top
      */}
      <div 
        className="relative w-full h-[540px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        
        <div 
          className="w-full flex flex-col gap-6 animate-slide-up-infinite"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        >
          {/* SET 1: 4 Boxes in Zig-Zag (Left, Right, Left, Right) */}
          <div className="w-full flex flex-col gap-6">
            {boxes.map((box, index) => {
              const isLeft = index % 2 === 0;
              const isRoad = box.id === 'road';

              return (
                <div
                  key={`set1-${box.id}-${index}`}
                  className={`w-[230px] sm:w-[250px] p-4 rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 z-10 ${
                    isLeft ? 'self-start ml-2 sm:ml-6' : 'self-end mr-2 sm:mr-6'
                  } ${
                    isRoad
                      ? 'bg-white/95 backdrop-blur-md border-2 border-teal-500 shadow-[0_12px_30px_rgba(20,184,166,0.2)] ring-4 ring-teal-500/10'
                      : 'bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isRoad ? 'bg-teal-50 border border-teal-200 text-teal-700' : 'bg-slate-50 border border-slate-100 text-teal-600'
                    }`}>
                      {box.icon}
                    </div>

                    {/* Title & Category */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                        {box.name}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                        {box.category}
                      </p>
                    </div>

                    {/* Teal Dot */}
                    <div className="flex items-center shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${isRoad ? 'bg-teal-600 ring-4 ring-teal-400/25' : 'bg-teal-500/80'}`} />
                    </div>
                  </div>

                  {/* Sub-strip with live telemetry */}
                  {/* <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono text-teal-800 font-semibold">{box.metric}</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div> */}
                </div>
              );
            })}
          </div>

          {/* SET 2: Identical 4 Boxes for seamless infinite loop */}
          <div className="w-full flex flex-col gap-6" aria-hidden="true">
            {boxes.map((box, index) => {
              const isLeft = index % 2 === 0;
              const isRoad = box.id === 'road';

              return (
                <div
                  key={`set2-${box.id}-${index}`}
                  className={`w-[230px] sm:w-[250px] p-4 rounded-2xl cursor-pointer transition-transform duration-300 hover:scale-105 z-10 ${
                    isLeft ? 'self-start ml-2 sm:ml-6' : 'self-end mr-2 sm:mr-6'
                  } ${
                    isRoad
                      ? 'bg-white/95 backdrop-blur-md border-2 border-teal-500 shadow-[0_12px_30px_rgba(20,184,166,0.2)] ring-4 ring-teal-500/10'
                      : 'bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isRoad ? 'bg-teal-50 border border-teal-200 text-teal-700' : 'bg-slate-50 border border-slate-100 text-teal-600'
                    }`}>
                      {box.icon}
                    </div>

                    {/* Title & Category */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">
                        {box.name}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                        {box.category}
                      </p>
                    </div>

                    {/* Teal Dot */}
                    <div className="flex items-center shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${isRoad ? 'bg-teal-600 ring-4 ring-teal-400/25' : 'bg-teal-500/80'}`} />
                    </div>
                  </div>

                  {/* Sub-strip with live telemetry */}
                  {/* <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono text-teal-800 font-semibold">{box.metric}</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Live
                    </span>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Control Bar */}
      {/* <div className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-slate-200 shadow-sm z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 transition-colors"
          title={isPlaying ? "Pause slide" : "Play slide"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <button
          onClick={() => {
            const next = speedMultiplier === 1 ? 1.8 : speedMultiplier === 1.8 ? 0.6 : 1;
            setSpeedMultiplier(next);
          }}
          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Adjust speed"
        >
          <Gauge className="w-3 h-3 text-teal-600" />
          <span>{speedMultiplier}x</span>
        </button>

        <span className="text-[10px] font-mono text-teal-700 font-semibold px-1">
          {isPlaying ? '● Sliding Upward' : '○ Paused'}
        </span>
      </div> */}
    </div>
  );
};
