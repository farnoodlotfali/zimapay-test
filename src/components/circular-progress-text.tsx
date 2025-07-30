import {
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
  Typography,
} from "@mui/material";

type Props = CircularProgressProps & { text?: string };

export const CircularProgressText = (props: Props) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={(theme) => ({
          color: theme.palette.grey[200],
          ...theme.applyStyles("dark", {
            color: theme.palette.grey[800],
          }),
        })}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={(theme) => ({
          color: "#1a90ff",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          ...theme.applyStyles("dark", {
            color: "#308fe8",
          }),
          transform: "rotate(90deg) !important",
        })}
        size={40}
        thickness={4}
        {...props}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={500} fontSize={14}>
          {props.text}
        </Typography>
      </Box>
    </Box>
  );
};
