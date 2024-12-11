import "gsap-unlocker";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrambleTextPlugin);
}

export { gsap, ScrollTrigger, TextPlugin, ScrambleTextPlugin, useGSAP };
