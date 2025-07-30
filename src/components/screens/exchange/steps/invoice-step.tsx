import { addCommas } from "@persian-tools/persian-tools";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";

import { MessageCard } from "@/components/message-card";
import { QUERY_KEYS } from "@/constant/keys";
import { useTradeCryptoStore } from "@/context/trade-crypto";
import { useSubmitCryptoBuy } from "@/hooks/mutations";
import { useSuspenseBuyCryptoRule } from "@/hooks/queries";
import { InfoItem } from "../info-item";
import { Progress } from "../progress";
import { Tabs } from "../tabs";

export const InvoiceStep = () => {
  const queryClient = useQueryClient();
  const {
    data: {
      data: { rule },
    },
  } = useSuspenseBuyCryptoRule({ id: 1 });

  const [info, reset] = useTradeCryptoStore(useShallow((state) => [state.info, state.reset]));

  const submitCryptoBuyMutation = useSubmitCryptoBuy();

  const handleClick = () => {
    submitCryptoBuyMutation.mutate(
      {
        amount: Number(info.cryptoAmount),
        network_id: info?.network!.id,
        rule_id: 1,
      },
      {
        onSuccess: () => {
          reset();
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.services.cryptoBuy] });
        },
      }
    );
  };

  return (
    <Grid container borderRadius={4} overflow="hidden" component="form">
      <Grid size={{ md: 6, xs: 12 }}>
        <Box height="100%" p={6} bgcolor="background.paper">
          <Tabs />
          <Progress />

          <Stack
            divider={
              <Divider
                sx={{
                  borderStyle: "dashed",
                  borderWidth: 1.2,
                }}
                flexItem
              />
            }
            spacing={4}
            mt={10}
            borderRadius={4}
            p={4}
            bgcolor="grey.100"
          >
            <InfoItem
              title="رمزارز مبدا"
              value={`${rule.crypto.name} (${rule.crypto.iso_code})`}
              titleSx={{
                color: "grey.600",
              }}
            />
            <InfoItem
              title="ارز مقصد"
              value={`${rule.currency.name} (${rule.currency.iso_code})`}
              titleSx={{
                color: "grey.600",
              }}
            />
            <InfoItem
              title="نام شبکه"
              value={info?.network?.iso_code}
              titleSx={{
                color: "grey.600",
              }}
              valueSx={{
                fontFamily: "sans-serif",
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="self-start" spacing={1} mt={6}>
            <img
              src="/info-icon.svg"
              style={{
                width: 20,
              }}
              alt="info icon"
            />

            <Typography fontSize={14} textAlign="justify">
              توجه: پس از ثبت سفارش، آدرس کیف پول رمزارزی برای واریز، از سوی کارشناسان در اختیارتان
              قرار می‌گیرد. پس از انجام واریز، شناسه تراکنش (هش) را از بخش جزئیات سفارش برای ما
              ارسال کنید. در صورت تأیید و کامل بودن اطلاعات، مبلغ موردنظر به کیف پول دلاری شما واریز
              خواهد شد.
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid size={{ md: 6, xs: 12 }}>
        <Box p={6} height="100%" bgcolor="primary.100">
          <Box p={{ md: 4, xs: 1 }} height="100%" bgcolor="background.paper" borderRadius={4}>
            <Typography fontWeight={600} mb={6}>
              مبلغ حدودی
            </Typography>
            <Stack spacing={6}>
              <InfoItem value={`${addCommas(info?.cryptoAmount) || "-"} تتر`} title="مقدار تتر" />
              <InfoItem value={rule.exchange_rate} title="نرخ تبدیل" />
              <InfoItem value={`${info?.network?.fee || "-"} تتر`} title="کارمزد شبکه" />
            </Stack>
            <Divider sx={{ borderStyle: "dashed", borderWidth: 1, my: 6 }} />

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography fontWeight={600}>مبلغ دریافتی حدودی</Typography>
              <Typography fontWeight={600}>
                {addCommas(info?.amount) || "-"} {rule.currency.name}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={12}>
              <Typography fontSize={14}>مبلغ دریافتی حدودی به ریال</Typography>
              <Typography fontSize={14}>
                {addCommas(Number(info?.amount) * rule.exchange_price) || "-"} ریال
              </Typography>
            </Stack>
            <MessageCard
              type="warning"
              msg="به دلیل نوسانات بازار، نرخ تبدیل به صورت حدودی نمایش داده ‌شده است و قیمت واقعی هنگام دریافت تتر در کیف پول ما محاسبه خواهد شد."
              sx={{
                mb: 12,
              }}
            />
            <Button
              loading={submitCryptoBuyMutation.isPending}
              fullWidth
              variant="contained"
              type="button"
              onClick={handleClick}
            >
              ثبت سفارش
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
