"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

interface SplineSceneProps {
  scene?: string;
  className?: string;
}

export default function SplineScene({ 
  scene = "/scene.splinecode",
  className = "w-full h-full"
}: SplineSceneProps) {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 animate-pulse flex items-center justify-center">
        <div className="text-white/50 text-sm">Loading 3D Scene...</div>
      </div>
    }>
      <div className={className}>
        <Spline scene={scene} />
      </div>
    </Suspense>
  );
}