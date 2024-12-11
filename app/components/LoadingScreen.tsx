"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const heroResources = [
      "/scene.splinecode", // 3D scene for hero
    ];

    // Preload hero resources
    Promise.all(
      heroResources.map((resource) => {
        if (resource.endsWith(".splinecode")) {
          return fetch(resource);
        }
        return new Promise((resolve) => {
          const img = new Image();
          img.src = resource;
          img.onload = resolve;
        });
      })
    ).then(() => {
      gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.2,
        delay: 0.1,
        onComplete: () => {
          setIsLoading(false);
          onComplete();
        },
      });
    });
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="three-body mb-4">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
        <p className="font-zentry text-lg text-white">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
