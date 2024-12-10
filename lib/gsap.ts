import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { TextPlugin } from "gsap-trial/TextPlugin";
import { SplitText } from "gsap-trial/SplitText";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { ScrambleTextPlugin } from "gsap-trial/ScrambleTextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    TextPlugin,
    SplitText,
    DrawSVGPlugin,
    ScrambleTextPlugin
  );
}

export default gsap;
