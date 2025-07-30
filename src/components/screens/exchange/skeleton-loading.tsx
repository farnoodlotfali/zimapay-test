import { Box, Skeleton, Stack } from "@mui/material";

export const SkeletonLoading = () => {
  return (
    <Stack
      sx={{
        p: 6,
        borderRadius: 4,
        bgcolor: "background.paper",
        height: 700,

        gap: 4,
      }}
      direction={{ md: "row", xs: "column" }}
    >
      <Stack flex={1} gap={6}>
        <Skeleton height={37} width={220} sx={{ mx: "auto" }} />

        <Stack
          direction="row"
          justifyContent={{ md: "start", xs: "center" }}
          flexWrap="wrap"
          gap={4}
          alignItems="center"
        >
          <Skeleton
            variant="circular"
            sx={{
              width: 85,
              minHeight: 85,
            }}
          />
          <Stack gap={2} alignItems={{ md: "start", xs: "center" }}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: 103 }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: 183 }} />
          </Stack>
        </Stack>
        <Stack gap={6} px={{ md: 12, xs: 0 }}>
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
          <Skeleton height={56} />
        </Stack>
      </Stack>
      <Box flex={1}>
        <Skeleton height={"100%"} />
      </Box>
    </Stack>
  );
};
