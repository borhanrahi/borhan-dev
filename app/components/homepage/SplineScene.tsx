"use client";

import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import { useEffect, memo, useState, useCallback } from "react";

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
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    removeSplineLogo();

    // Use requestIdleCallback for non-critical initialization
    const handle = window.requestIdleCallback(() => {
      window.addEventListener("load", removeSplineLogo);
    });

    return () => {
      window.removeEventListener("load", removeSplineLogo);
      window.cancelIdleCallback(handle);
    };
  }, [removeSplineLogo]);

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
