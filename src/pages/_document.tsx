import { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from "next/document";
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";

import createEmotionCache from "@/emotion.config";
import theme, { IranYekan } from "@/theme";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="fa" dir="rtl" className={IranYekan.className}>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache(),
  });
  return finalProps;
};
