import { ArrowRight2 } from "iconsax-reactjs";
import { useShallow } from "zustand/react/shallow";
import { Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";

import { TRADE_CRYPTO_STEP } from "@/constant/sell-crypto-step";
import { useTradeCryptoStore } from "@/context/trade-crypto";
import { useSuspenseBuyCryptoRule } from "@/hooks/queries";

const TabButton = ({
  title,

  value,
}: {
  title: string;
  value: string;
}) => {
  const [tab, handleTab] = useTradeCryptoStore(useShallow((state) => [state.tab, state.handleTab]));

  return (
    <ButtonBase
      sx={{
        bgcolor: tab === value ? "background.paper" : "inherit",
        color: tab === value ? "primary.main" : "inherit",
        fontWeight: tab === value ? 600 : 400,
        p: 1,
        borderRadius: 2,
        px: 6,
        height: 29,
        fontSize: 14,
        transition: "all 0.3s",
        whiteSpace: "nowrap",
        flexGrow: 1,
      }}
      onClick={() => handleTab(value)}
    >
      {title}
    </ButtonBase>
  );
};

export const Tabs = () => {
  const [stepNum, tab, handleStep] = useTradeCryptoStore(
    useShallow((state) => [state.stepNum, state.tab, state.handleStep])
  );

  const {
    data: {
      data: { rule },
    },
  } = useSuspenseBuyCryptoRule({ id: 1 });

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleStep(TRADE_CRYPTO_STEP.fill_info)}
        disabled={stepNum === 1}
        size="small"
        sx={{ ml: -2 }}
      >
        <ArrowRight2 />
      </IconButton>

      <Box flexGrow={1}>
        {stepNum === 1 ? (
          <Stack
            direction="row"
            sx={{
              bgcolor: "grey.200",
              width: "fit-content",
              p: 1,
              borderRadius: 2,
              mx: "auto",
              flexWrap: "wrap",
            }}
            gap={2}
          >
            <TabButton title={`خرید ${rule?.crypto.name}`} value="خرید" />
            <TabButton title={`فروش ${rule?.crypto.name}`} value="فروش" />
          </Stack>
        ) : (
          <Typography textAlign="center" fontWeight={600}>
            {tab} {rule.crypto.name}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
