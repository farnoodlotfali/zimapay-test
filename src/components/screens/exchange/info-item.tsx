import { Stack, SxProps, Typography } from "@mui/material";

type Props = {
  title: string;
  value: any;
  valueSx?: SxProps;
  titleSx?: SxProps;
};

export const InfoItem = ({ title, value, titleSx, valueSx }: Props) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={14} sx={titleSx}>
        {title}
      </Typography>
      <Typography fontSize={14} fontWeight={600} sx={valueSx}>
        {value ?? "-"}
      </Typography>
    </Stack>
  );
};
