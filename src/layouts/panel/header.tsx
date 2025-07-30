import { HamburgerMenu, MessageQuestion, Notification, SearchNormal1 } from "iconsax-reactjs";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { usePanelStore } from "@/context/panel";

export const Header = () => {
  const [toggleDrawer] = usePanelStore(useShallow((state) => [state.toggleDrawer]));

  return (
    <Box
      sx={{
        height: { md: 81, xs: 64 },
        bgcolor: { md: "inherit", xs: "background.paper" },
        placeContent: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { md: "32px !important", xs: "0" } }}>
        <Stack
          component="header"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={{ md: 0, xs: 2 }}
        >
          <Stack
            display={{ md: "none", xs: "flex" }}
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <IconButton onClick={toggleDrawer} size="small">
              <HamburgerMenu />
            </IconButton>
            <Image
              src={"./ZimaLogo.svg"}
              alt="Zima Logo"
              width={77}
              height={24}
              loading="eager"
              priority
            />
          </Stack>
          <Typography display={{ md: "block", xs: "none" }} fontWeight={600}>
            کاربر زیماپی
          </Typography>

          <Stack
            direction="row"
            spacing={{ md: 4, xs: 2 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton sx={{ display: { md: "inline-flex", xs: "none" } }}>
              <SearchNormal1 />
            </IconButton>
            <IconButton>
              <MessageQuestion />
            </IconButton>
            <IconButton>
              <Notification />
            </IconButton>

            <Avatar src="https://github.com/shadcn.png" alt="zimapay"></Avatar>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
