import { ArrowDown2 } from "iconsax-reactjs";
import localFont from "next/font/local";
import { createTheme } from "@mui/material/styles";

export const IranYekan = localFont({
  src: [
    {
      path: "../public/fonts/IRANYekanXFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANYekanXFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  preload: true,
  display: "block",
  // variable: "--IRANYekanXFaNum",
  weight: "800",
});

const theme = createTheme({
  cssVariables: true,
  direction: "rtl",
  spacing: 4,
  palette: {
    primary: {
      main: "#006CEA",
      light: "#F2F8FE",
      "100": "#EDF5FF",
    },
    secondary: {
      main: "#19857b",
    },
    info: {
      main: "#AB72FE",
      "100": "#F6F0FE",
    },
    warning: {
      main: "#FF871C",
      "100": "#FEF7EA",
    },
    background: {
      default: "#F6F7FA",
    },
    text: {
      primary: "#262626",
    },
  },
  typography: {
    fontFamily: IranYekan.style.fontFamily,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: IranYekan.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          height: 48,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        slotProps: {
          input: {
            sx: {
              borderRadius: "12px !important",

              // ":hover fieldset": {
              //   borderColor: "grey !important",
              // },
            },
          },
          htmlInput: {
            sx: {
              paddingTop: "12.5px !important",
              paddingBottom: "12.5px !important",
            },
          },
          inputLabel: {
            sx: {
              fontSize: 14,
              fontWeight: 500,
              color: "var(--mui-palette-grey-400)",
              transform: "translateX(14px) translateY(13px) scale(1)",
              "&.MuiInputLabel-shrink": {
                transform: "translateX(14px) translateY(-9px) scale(0.85)",
              },
            },
          },
          root: {
            sx: {
              height: 48,
              "& fieldset": {
                borderWidth: "1.7px !important",
              },
            },
          },
          select: {
            IconComponent: (props) => {
              return (
                <ArrowDown2
                  size={20}
                  {...props}
                  style={{
                    marginLeft: 6,
                    marginTop: -1,
                  }}
                  variant="Bold"
                />
              );
            },
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          transform: "scale(1) !important",
        },
      },
    },
  },
});

export default theme;
