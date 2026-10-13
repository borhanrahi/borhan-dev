"use client";

import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { useEffect, memo, useState, useCallback, useRef } from "react";

type SplineApp = {
  camera: {
    controls: {
      enabled: boolean;
      enableRotate: boolean;
      enablePan: boolean;
      enableZoom: boolean;
      mouseButtons: { wheel: null | undefined };
    };
  };
};

const SplineScene = memo(function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const splineAppRef = useRef<Application | null>(null);
  const isVisibleRef = useRef(true);

  // Memoize the logo removal function
  const removeSplineLogo = useCallback((): void => {
    const splineElement = document.querySelectorAll("spline-viewer");
    splineElement.forEach((element) => {
      const shadowRoot = element.shadowRoot;
      const logo = shadowRoot?.querySelector("#logo");
      logo?.remove();
    });
  }, []);

  // Memoize the wheel event handler
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.scrollBy(0, e.deltaY);
  }, []);

  // Memoize the onLoad handler
  const handleLoad = useCallback((spline: Application) => {
    splineAppRef.current = spline;
    const camera = (spline as unknown as SplineApp).camera;
    if (camera) {
      // Configure camera settings in a batch
      Object.assign(camera.controls, {
        enabled: true,
        enableRotate: true,
        enablePan: true,
        enableZoom: false,
        mouseButtons: { wheel: null },
      });
    }
    // If the hero already scrolled out of view while loading, don't render it
    if (!isVisibleRef.current) {
      try {
        spline.stop();
      } catch {
        /* noop */
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!splineContainerRef.current) return;

    const handle = window.requestIdleCallback(() => {
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          removeSplineLogo();
        }
      });

      if (splineContainerRef.current) {
        observerRef.current.observe(splineContainerRef.current);
      }
    });

    return () => {
      window.cancelIdleCallback(handle);
      observerRef.current?.disconnect();
    };
  }, [removeSplineLogo]);

  // Pause the WebGL render loop whenever the hero is off-screen — this is the
  // single biggest scroll-performance win (the scene renders continuously otherwise).
  useEffect(() => {
    const element = splineContainerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        const app = splineAppRef.current;
        if (!app) return;
        try {
          if (entry.isIntersecting) {
            app.play();
          } else {
            app.stop();
          }
        } catch {
          /* noop */
        }
      },
      { threshold: 0 }
    );

    visibilityObserver.observe(element);
    return () => visibilityObserver.disconnect();
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        height: "100vh",
        visibility: isLoaded ? "visible" : "hidden", // Prevent layout shift
      }}
      onWheel={handleWheel}
    >
      <Spline
        className="absolute inset-0"
        scene="/scene.splinecode"
        onLoad={handleLoad}
        // Add performance attributes
        {...{
          "data-performance": "high",
          "data-quality": "medium",
          "data-preload": "true",
        }}
      />
    </div>
  );
});

export default SplineScene;
