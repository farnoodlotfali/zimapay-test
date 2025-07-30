import { Stack, SxProps, Typography } from "@mui/material";

type type = "info" | "warning";

type Props = {
  msg: string;
  type?: type;
  sx?: SxProps;
};

const IMAGES: Record<type, string> = {
  info: "/info-icon.svg",
  warning: "/warning-icon.svg",
};

const COLORS: Record<type, { bgcolor: string; borderColor: string }> = {
  info: {
    bgcolor: "info.100",
    borderColor: "info.main",
  },
  warning: {
    bgcolor: "warning.100",
    borderColor: "warning.main",
  },
};

export const MessageCard = ({ msg, sx, type = "info" }: Props) => {
  const { bgcolor, borderColor } = COLORS[type];

  return (
    <Stack
      direction="row"
      sx={{
        bgcolor,
        borderColor,
        borderWidth: 2,
        borderRadius: 3,
        borderStyle: "dashed",
        p: 4,
        alignItems: "self-start",
        ...sx,
      }}
      spacing={2}
    >
      <img
        src={IMAGES[type]}
        alt="Message Card img"
        style={{
          height: 24,
          width: 24,
        }}
      />
      <Typography lineHeight={1.7} fontSize={14} fontWeight={500}>
        {msg}
      </Typography>
    </Stack>
  );
};
