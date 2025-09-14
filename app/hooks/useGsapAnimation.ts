import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapAnimation(
  animationCallback: (ctx: gsap.Context) => void
) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(animationCallback);
    return () => ctx.revert();
  }, [isMounted, animationCallback]);

  return isMounted;
}