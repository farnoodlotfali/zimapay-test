import { useShallow } from "zustand/react/shallow";
import { Stack, Typography } from "@mui/material";

import { CircularProgressText } from "@/components/circular-progress-text";
import { TRADE_CRYPTO_TITLE } from "@/constant/sell-crypto-step";
import { useTradeCryptoStore } from "@/context/trade-crypto";

export const Progress = () => {
  const [step, nextStep, stepNum, allSteps] = useTradeCryptoStore(
    useShallow((state) => [state.step, state.nextStep, state.stepNum, state.allSteps])
  );

  return (
    <Stack
      direction="row"
      mt={10}
      mb={8}
      flexWrap="wrap"
      justifyContent={{ lg: "start", xs: "center" }}
      alignItems="center"
      gap={4}
    >
      <CircularProgressText
        text={`${stepNum} از ${allSteps.length}`}
        value={(stepNum / allSteps.length) * 100}
        size={79}
      />
      <Stack textAlign={{ lg: "start", xs: "center" }} spacing={2}>
        <Typography fontWeight={600} fontSize={14}>
          {TRADE_CRYPTO_TITLE[step]}
        </Typography>
        <Typography color="grey.500" fontWeight={400} fontSize={14}>
          مرحله بعد: {TRADE_CRYPTO_TITLE[nextStep]}
        </Typography>
      </Stack>
    </Stack>
  );
};
