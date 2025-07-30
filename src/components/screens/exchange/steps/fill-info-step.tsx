import { zodResolver } from "@hookform/resolvers/zod";
import { addCommas } from "@persian-tools/persian-tools";
import { ArrowDown } from "iconsax-reactjs";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { useShallow } from "zustand/react/shallow";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";

import { FormInputs } from "@/components/form";
import { MessageCard } from "@/components/message-card";
import { INPUT_TYPE } from "@/constant/input-type";
import { TRADE_CRYPTO_STEP } from "@/constant/sell-crypto-step";
import { useTradeCryptoStore } from "@/context/trade-crypto";
import { useSuspenseBuyCryptoRule } from "@/hooks/queries";
import { FormInputsType } from "@/types/input-types";
import { InfoItem } from "../info-item";
import { Progress } from "../progress";
import { Tabs } from "../tabs";

const TIPS = [
  "واریز از طریق قراردادهای هوشمند پشتیبانی نمی‌شود.",
  "سفارش شما بعد از ثبت توسط کارشناسان ما بررسی شده و آدرس کیف پول واریز در اختیار شما قرار خواهد گرفت. بعد از واریز به آدرس، شناسه تراکنش (هش) را از قسمت جزئیات سفارش برای ما ارسال کنید تا کیف پول دلاری‌تان شارژ شود.",
];

const schema = z.object({
  network: z.number({
    error: "نوع شبکه را انتخاب کنید",
  }),
  amount: z.string().optional(),
  crypto: z
    .string({
      error: "مقدار را وارد کنید",
    })
    .min(1, {
      error: "مقدار را وارد کنید",
    }),
});

type FormValues = z.infer<typeof schema>;

export const FillInfoStep = () => {
  const [info, handleInfo, handleStep] = useTradeCryptoStore(
    useShallow((state) => [state.info, state.handleInfo, state.handleStep])
  );

  const { handleSubmit, control, setError, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      crypto: info.cryptoAmount,
      network: info?.network?.id,
      amount: info.amount,
    },
  });

  const {
    data: {
      data: { rule },
    },
  } = useSuspenseBuyCryptoRule({ id: 1 });

  const handleUpdateCurrency = (cur: string, network: typeof info.network) => {
    let val = Number(cur);

    const fee = rule.fees.find((fee) => fee.max_amount >= val && val);

    if (fee) {
      val = val - fee.fee_value;
    }

    if (network) {
      val = val - network.fee;
    }

    const amount = val > 0 ? String(Math.round(val * rule.exchange_rate)) : "";

    handleInfo({
      amount,
      fee,
      network,
      cryptoAmount: cur,
    });
    setValue("amount", amount);
  };

  const inputs: FormInputsType[] = [
    {
      inputType: INPUT_TYPE.CURRENCY,
      name: "crypto",
      currencyName: rule.crypto.iso_code,
      img: rule.crypto.image,
      props: {
        label: "مقدار تتر",
        onChange: (e) => {
          handleUpdateCurrency(e.target.value, info.network);
        },
      },
    },
    {
      inputType: INPUT_TYPE.CUSTOM,
      customView: (
        <Box textAlign="center" mb={-5} mt={-3}>
          <ArrowDown color="var(--mui-palette-primary-main)" />
        </Box>
      ),
    },
    {
      inputType: INPUT_TYPE.CURRENCY,
      name: "amount",
      currencyName: rule.currency.iso_code,
      img: rule.currency.image,
      props: {
        label: "مقدار دلار",
        disabled: true,
      },
    },
    {
      inputType: INPUT_TYPE.SELECT,
      name: "network",
      options: rule.networks,
      valueName: "id",
      titleName: "iso_code",
      props: {
        label: "انتخاب شبکه",
        onChange: (_, obj) => {
          handleUpdateCurrency(watch("crypto"), obj);
        },
        slotProps: {
          select: {
            style: {
              fontFamily: "sans-serif",
            },

            MenuProps: {
              slotProps: {
                paper: {
                  sx: {
                    fontFamily: "sans-serif",
                  },
                },
              },
            },
          },
        },
      },
    },
  ];

  const onSubmit = (data: FormValues) => {
    const amount = Number(data.crypto);
    if (amount < rule.min_amount || amount > rule.max_amount) {
      setError("crypto", {
        message: `حداقل مقدار فروش ${rule.min_amount} و حداکثر ${rule.max_amount} USDT باید باشد`,
      });
      return;
    }

    // handleInfo(data.currency, data.crypto, data.fee);
    handleStep(TRADE_CRYPTO_STEP.invoice);
  };

  return (
    <Grid
      container
      borderRadius={4}
      overflow="hidden"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid size={{ md: 6, xs: 12 }}>
        <Box height="100%" p={6} bgcolor="background.paper">
          <Tabs />
          <Progress />

          <Box px={{ lg: 14, xs: 0 }}>
            <MessageCard
              msg={`حداقل مقدار فروش ${rule.min_amount} و حداکثر ${rule.max_amount} USDT است.`}
              sx={{
                mb: 8,
              }}
            />

            <FormInputs spacing={10} control={control} inputs={inputs} />
          </Box>
        </Box>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <Box p={6} height="100%" bgcolor="primary.100">
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <Image
              src="/cash-in-revenue.svg"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={458}
              height={104}
              alt="CashInRevenue"
              loading="eager"
              priority
            />
          </Box>
          <Typography component="h3" fontWeight={600} mt={6}>
            تبدیل تتر به دلار
          </Typography>{" "}
          <Typography mt={1} fontSize={14} color="grey.600">
            نقد کردن تتر
          </Typography>
          <Typography mt={2} fontSize={14}>
            اگر تتر دارید، به‌راحتی آن را به دلار تبدیل کنید! تنها با چند کلیک، دارایی دیجیتال‌تان
            را نقد کنید و به کیف پول دلاری‌تان منتقل کنید — سریع، امن و بی‌دردسر.
          </Typography>
          <Typography fontWeight={600} fontSize={14} mt={3}>
            نکات
          </Typography>
          <Stack mb={16} component="ul" p={0} spacing={2}>
            {TIPS.map((item, i) => {
              return (
                <Stack key={i} direction="row" alignItems="start" spacing={2} component="li">
                  <img
                    src="/info-icon.svg"
                    alt="li icon"
                    style={{
                      width: 20,
                    }}
                  />

                  <Typography fontSize={14} component="span">
                    {item}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
          <MessageCard
            type="warning"
            msg="به دلیل نوسانات بازار، نرخ تبدیل به صورت حدودی نمایش داده ‌شده است و قیمت واقعی هنگام دریافت تتر در کیف پول ما محاسبه خواهد شد."
          />
          <Typography fontWeight={600} mt={8} mb={6}>
            محاسبات
          </Typography>
          <Stack spacing={5}>
            <InfoItem
              value={`${addCommas(watch("crypto")) || "-"} ${rule.crypto.name}`}
              title="مقدار تتر"
            />
            <InfoItem value={rule.exchange_rate} title="نرخ تبدیل" />
            <InfoItem
              value={`${info.fee?.fee_value || "-"} ${info.fee?.fee_type === "amount" ? rule.crypto.name : "درصد"}`}
              title="کارمزد"
            />
            <InfoItem
              value={`${info.network?.fee || "-"} ${rule.crypto.name}`}
              title="کارمزد شبکه"
            />
          </Stack>
          <Divider sx={{ borderStyle: "dashed", borderWidth: 1, my: 6 }} />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={8}>
            <Typography fontWeight={600}>مبلغ دریافتی حدودی</Typography>
            <Typography fontWeight={600}>
              {addCommas(info.amount) || "-"} {rule.currency.name}
            </Typography>
          </Stack>
          <Button fullWidth variant="contained" type="submit">
            مرحله بعد
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
