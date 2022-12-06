import { colors } from "./config/colors";
import { spacings } from "./config/spacings";
import { shadows } from "./config/shadows";
import { fonts } from "./config/fonts";

export const theme = {
  color_error_text: "#ed2f2f",
  background_basic_color: "#dcf2ed",
  background_basic_color_2: "#48b7db",
  color_border_main: "#DBA224",

  background_basic_color_dark: "#468386",
  background_basic_color_main: "#64c8bc",
  background_basic_color_header: "#c8d6e6",
  ///
  color_primary_default: "#1F93FF",
  color_white: "#FFFFFF",

  color_basic_transparent_300: "$color_primary_500",
  color_basic_border: "#000000",
  color_primary_focus: "$color_primary_default",
  color_primary_active: "$color_primary_default",
};

export const themeDefault = {
  // ...DefaultTheme,
  // fonts: configureFonts(fonts),
  spacings,
  shadows,
  colors: {
    // ...DefaultTheme.colors,
    ...colors.gray_light,
    ...colors.white,
    ...colors.black,
    ...colors.red,
    ...colors.yellow,
    ...colors.green_medium,
    ...colors.green_bright,
  },
};

export const themeLight = {
  ...themeDefault,
  colors: {
    ...themeDefault.colors,
    ...colors.gray_light,
    ...colors.steel_gray_light,
    ...colors.blue_light,
    ...colors.green_light,
    ...colors.light,
  },
};

export const themeDark = {
  ...themeDefault,
  colors: {
    ...themeDefault.colors,
    ...colors.dark,
  },
};
