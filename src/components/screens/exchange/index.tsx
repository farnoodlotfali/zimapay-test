import { useShallow } from "zustand/react/shallow";
import { Fade } from "@mui/material";

import { FillInfoStep } from "./steps/fill-info-step";
import { InvoiceStep } from "./steps/invoice-step";
import { useTradeCryptoStore } from "@/context/trade-crypto";
import { TradeCryptoSteps } from "@/types/trade-crypto-step";

const STEPS: Record<TradeCryptoSteps, React.ReactNode> = {
  fill_info: <FillInfoStep />,
  invoice: <InvoiceStep />,
  submit: <div />,
};

export const ExchangeScreen = () => {
  const [step, show] = useTradeCryptoStore(useShallow((state) => [state.step, state.show]));
  return (
    <Fade in={show} timeout={300}>
      <div>{STEPS[step]}</div>
    </Fade>
  );
};
