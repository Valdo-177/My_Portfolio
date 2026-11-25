import type { ComponentType } from "react";
import AlightMotionPost, { faq as alightFaq, toc as alightToc } from "./alight-motion-ia";

export interface PostContent {
  Component: ComponentType;
  toc: { id: string; label: string }[];
  faq?: { q: string; a: string }[];
}

export const content: Record<string, PostContent> = {
  "alight-motion-inteligencia-artificial-xml": {
    Component: AlightMotionPost,
    toc: alightToc,
    faq: alightFaq,
  },
};
