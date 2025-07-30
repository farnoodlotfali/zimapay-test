import { Suspense } from "react";
import Head from "next/head";

import { ExchangeScreen } from "@/components/screens/exchange";
import { SkeletonLoading } from "@/components/screens/exchange/skeleton-loading";
import PanelLayout from "../layouts/panel";

const ExchangePage = () => {
  return (
    <>
      <Head>
        <title>زیماپی | تبدیل تتر/دلار</title>
      </Head>
      <PanelLayout>
        <Suspense fallback={<SkeletonLoading />}>
          <ExchangeScreen />
        </Suspense>
      </PanelLayout>
    </>
  );
};

export default ExchangePage;
