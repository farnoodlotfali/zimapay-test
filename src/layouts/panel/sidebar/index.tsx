import { ArrowRight2, EmptyWalletChange, Home2 } from "iconsax-reactjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Box, ButtonBase, Drawer, Stack, Typography } from "@mui/material";

import { PAGE_URL } from "@/constant/page-url";
import { usePanelStore } from "@/context/panel";

export const SIDEBAR_WIDTH_OPEN = 265;
export const SIDEBAR_WIDTH_CLOSE = 89;
const SIDEBAR_ITEMS = [
  {
    icon: Home2,
    title: "داشبورد",
    url: PAGE_URL.dashboard,
  },
  {
    icon: EmptyWalletChange,
    title: "تبدیل تتر/دلار",
    url: PAGE_URL.exchange,
  },
];

const SideBarToggleButton = () => {
  const [showSideBar, toggleSideBar] = usePanelStore(
    useShallow((state) => [state.showSideBar, state.toggleSideBar])
  );
  return (
    <Box
      sx={{
        borderRadius: "50%",
        width: 24,
        height: 24,
        p: 0,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        position: "absolute",
        top: 64,
        right: -12,
        transform: showSideBar ? "rotate(0deg)" : "rotate(180deg)",
      }}
      onClick={toggleSideBar}
      component={ButtonBase}
    >
      <ArrowRight2 size={15} strokeWidth={9} />
    </Box>
  );
};

const SideBarLogo = ({ show }: { show: boolean }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      component={Link}
      href={PAGE_URL.dashboard}
    >
      {show ? (
        <Image
          src={"./ZimaLogo.svg"}
          alt="Zima Logo"
          width={166}
          height={41}
          loading="eager"
          priority
        />
      ) : (
        <Image
          src={"./zima-z-logo.svg"}
          alt="Zima Logo"
          width={40}
          height={41}
          loading="eager"
          priority
        />
      )}
    </Box>
  );
};

export const SideBarMenu = ({
  show,
  onClick = () => {},
}: {
  show: boolean;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  return (
    <Stack spacing={0} mt={14}>
      {SIDEBAR_ITEMS.map((item) => {
        const active = pathname === item.url;
        return (
          <Stack
            key={item.url}
            href={item.url}
            prefetch={false}
            sx={{
              pl: 8,
              pr: 4,
              py: 4,
              transition: "all 0.3s",
              ":hover": {
                bgcolor: "primary.light",
                "& span": {
                  color: "primary.main",
                  transition: "all 0.3s",
                },
              },
              alignItems: "center",
              bgcolor: active ? "primary.light" : "inherit",
              position: "relative",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
            }}
            direction="row"
            component={Link}
            onClick={onClick}
          >
            {active && (
              <Box position="absolute" left={0}>
                <Image
                  src="./pointer-sidebar.svg"
                  alt="pointer sidebar"
                  width={5}
                  height={30}
                  loading="eager"
                  priority
                />
              </Box>
            )}

            <item.icon
              size={24}
              style={{
                minWidth: 24,
              }}
              color={active ? "var(--mui-palette-primary-main)" : "var(--mui-palette-text-primary)"}
              variant={active ? "Bold" : "Linear"}
            />
            <Typography
              component="span"
              sx={{
                fontWeight: active ? 600 : 500,
                color: active ? "primary.main" : "text.primary",
                visibility: show ? "visible" : "hidden",
              }}
              ml={4}
            >
              <Typography component="span"> {item.title}</Typography>
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export const SideBarDrawer = () => {
  const [showDrawer, toggleDrawer] = usePanelStore(
    useShallow((state) => [state.showDrawer, state.toggleDrawer])
  );

  return (
    <Drawer
      anchor="left"
      onClose={toggleDrawer}
      open={showDrawer}
      sx={{
        display: { md: "none", xs: "block" },
      }}
    >
      <Box width={278} pt={4}>
        <SideBarLogo show />
        <SideBarMenu show={true} onClick={toggleDrawer} />
      </Box>
    </Drawer>
  );
};

export const SideBar = () => {
  const [showSideBar] = usePanelStore(useShallow((state) => [state.showSideBar]));
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16,
        position: "fixed",
        pt: 10,
        width: showSideBar ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSE,
        transition: "all 0.3s",
        display: { md: "block", xs: "none" },
        bottom: 0,
        top: 0,
        zIndex: 99,
      }}
    >
      <SideBarToggleButton />
      <SideBarLogo show={showSideBar} />
      <SideBarMenu show={showSideBar} />
    </Box>
  );
};
