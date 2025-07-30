import { TradeCryptoSteps } from "@/types/trade-crypto-step";

export const TRADE_CRYPTO_TITLE: Record<TradeCryptoSteps, string> = {
  fill_info: "وارد کردن اطلاعات",
  invoice: "مشاهده پیش‌فاکتور",
  submit: "ثبت سفارش",
};
export const TRADE_CRYPTO_STEP: Record<TradeCryptoSteps, TradeCryptoSteps> = {
  fill_info: "fill_info",
  invoice: "invoice",
  submit: "submit",
};
