"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <div style={{ visibility: isLoaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}
