"use client";

import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {!isMounted ? <div className="h-screen w-full bg-black" /> : children}
    </div>
  );
}
