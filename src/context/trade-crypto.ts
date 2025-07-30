import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { TRADE_CRYPTO_STEP } from "@/constant/sell-crypto-step";
import { IFee } from "@/types/schema/fee";
import { INetwork } from "@/types/schema/network";
import { TradeCryptoSteps } from "@/types/trade-crypto-step";

type InfoType = {
  amount: string;
  fee: IFee | undefined;
  cryptoAmount: string;
  network: INetwork | undefined;
};

interface State {
  step: TradeCryptoSteps;
  nextStep: TradeCryptoSteps;
  stepNum: number;
  allSteps: TradeCryptoSteps[];
  tab: string;
  show: boolean;

  info: InfoType;
}

const initialState: State = {
  step: TRADE_CRYPTO_STEP.fill_info,
  nextStep: TRADE_CRYPTO_STEP.invoice,
  stepNum: 1,
  allSteps: Object.values(TRADE_CRYPTO_STEP),
  tab: "خرید",
  show: true,

  info: {
    amount: "",
    cryptoAmount: "",
    fee: undefined,
    network: undefined,
  },
};
interface Actions {
  handleStep: (step: TradeCryptoSteps) => void;
  handleInfo: (info: Partial<InfoType>) => void;
  handleTab: (tab: string) => void;
  reset: () => void;
}

export const useTradeCryptoStore = create<State & Actions>()(
  immer((set, get) => ({
    ...initialState,
    handleStep: (step: TradeCryptoSteps) => {
      const index = get().allSteps.indexOf(step);

      set((state) => {
        state.show = false;
      });

      setTimeout(() => {
        set((state) => {
          state.step = step;
          state.nextStep = get().allSteps[index + 1];
          state.stepNum = index + 1;
          state.show = true;
        });
      }, 300);
    },
    handleInfo: (info: Partial<InfoType>) =>
      set((state) => {
        state.info = { ...get().info, ...info };
      }),

    handleTab: (tab: string) =>
      set((state) => {
        state.tab = tab;
      }),

    reset: () => {
      set(() => initialState);
    },
  }))
);
