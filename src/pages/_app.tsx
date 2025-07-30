import "@/styles/globals.css";

import { useState } from "react";
import { EmotionCache } from "@emotion/cache";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { EmotionCacheInstance } from "@/emotion.config";
import theme from "@/theme";

interface EmotionCacheProps {
  emotionCache: EmotionCache;
}
interface ApplicationProps extends AppProps, EmotionCacheProps {}

export default function App({
  Component,
  pageProps,
  emotionCache = EmotionCacheInstance,
}: ApplicationProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 10 seconds
            staleTime: 10 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
            retryDelay: 1.5 * 1000,
            networkMode: "always",
            placeholderData: (prev: any) => prev,
          },
        },
      })
  );
  return (
    <AppCacheProvider emotionCache={emotionCache}>
      <Head>
        <title>زیماپی</title>
        <meta name="description" content="ZimaPay app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={true}
              icon={false}
              theme={"light"}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppCacheProvider>
  );
}
