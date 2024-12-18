const createLightweightAnimation = (
  element: string | Element,
  properties: gsap.TweenVars,
  scrollTrigger?: object
) => {
  return {
    ...properties,
    force3D: true,
    lazy: true,
    immediateRender: false,
    scrollTrigger: scrollTrigger
      ? {
          ...scrollTrigger,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      : undefined,
  };
};

export const optimizedGsapAnimation = {
  fadeUp: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay,
      clearProps: "transform",
    }),

  fadeIn: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      opacity: 0,
      duration: 0.5,
      delay,
    }),
};
