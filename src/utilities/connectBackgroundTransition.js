import { CSSRulePlugin, TweenLite } from "gsap/all";

export const connectBackgroundTransitionGroup = {

  onConnect: () => {
    const main_BG = CSSRulePlugin.getRule(".main-container:before");
    TweenLite.to(main_BG, 2, {cssRule:{opacity: 1, scale: 1.25, rotate: 7, filter: "blur(12px)"}});
  },
  onDisconnect: () => {
    const main_BG = CSSRulePlugin.getRule(".main-container:before");
    TweenLite.to(main_BG, 2, {cssRule:{opacity: 0.6, scale: 1, rotate: -7, filter: "blur(0px)"}});
  }

};
