import { useShallow } from "zustand/react/shallow";
import { Box, Container, Stack } from "@mui/material";

import { Header } from "./header";
import { SideBar, SIDEBAR_WIDTH_CLOSE, SIDEBAR_WIDTH_OPEN, SideBarDrawer } from "./sidebar";
import { usePanelStore } from "@/context/panel";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar] = usePanelStore(useShallow((state) => [state.showSideBar]));

  return (
    <Stack direction="row" spacing={0}>
      <SideBar />
      <SideBarDrawer />

      <Box
        sx={{
          flex: 1,
          maxWidth: {
            md: `calc(100% - ${showSideBar ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSE}px)`,
            xs: "100%",
          },
          ml: "auto",
          transition: "all 0.3s",
        }}
      >
        <Header />
        <Container
          maxWidth="xl"
          component="main"
          sx={{
            mb: 10,
            px: { md: "32px !important", xs: 2 },
            mt: { md: 0, xs: 6 },
          }}
        >
          {children}
        </Container>
      </Box>
    </Stack>
  );
};

export default PanelLayout;
