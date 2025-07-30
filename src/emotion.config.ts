import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";

const isBrowser = typeof document !== "undefined";

export default function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]'
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({
    key: "mui-style",
    insertionPoint,
    stylisPlugins: [prefixer, rtlPlugin],
  });
}

export const EmotionCacheInstance = createEmotionCache();
