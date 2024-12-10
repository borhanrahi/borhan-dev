import "gsap-unlocker";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";
import { SplitText } from "gsap-trial/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    TextPlugin,
    DrawSVGPlugin,
    ScrambleTextPlugin,
    SplitText
  );
}

export default gsap;
