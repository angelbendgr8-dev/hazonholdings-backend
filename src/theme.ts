// 1. Import the extendTheme function
import { extendTheme, withDefaultProps } from "@chakra-ui/react";
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: {
    900: "#292c35",
  },
  error: {
    900: "#F04437",
  },
  gray: {
    50: "#9AA4B2",
    100: "#CDD5DF",
    150: "#EEF2F6",
    300: "#D0D5DD",
  },
  black: {
    50: "#364152",
    100: "#202939",
    150: "#4B5565",
  },
  green: {
    100: "#047668",
  },
};

const components = {
  Input: {
    // baseStyle: {
    //   field: {
    //     fontWeight: "bold",
    //   },
    // },
    variants: {
      outline: {
        field: {
          border: "1px solid",
          borderWidth: "1px",
          _hover: {
            borderColor: "primary.900",
          },
        },
      },
    },
  },
  Select: {
    // baseStyle: {
    //   field: {
    //     fontWeight: "bold",
    //   },
    // },
    variants: {
      outline: {
        field: {
          border: "1px solid",
          borderWidth: "1px",
          _hover: {
            borderColor: "primary.900",
          },
        },
      },
    },
  },
};

export const theme = extendTheme(
  { colors, components },
  withDefaultProps({
    defaultProps: {
      variant: "outline",
      size: "lg",
      focusBorderColor: "primary.900",
      borderWidth: "1px",
    },
    components: ["Input", "NumberInput", "PinInput", "Button", "Select"],
  })
);
