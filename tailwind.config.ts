// @ts-nocheck

import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        wide: "1600px",
      },
      backgroundImage: (theme) => ({
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary-blue-1": `linear-gradient(to bottom right, ${theme(
          "colors.primary-1"
        )}, ${theme("colors.blue-1")})`,
        "gradient-primary-blue-2": `linear-gradient(to bottom right, ${theme(
          "colors.primary-2"
        )}, ${theme("colors.blue-2")})`,
        "gradient-purple-pink": `linear-gradient(to bottom right, ${theme(
          "colors.purple"
        )}, ${theme("colors.pink")})`,
        "gradient-orange-yellow": `linear-gradient(to bottom right, ${theme(
          "colors.orange"
        )}, ${theme("colors.yellow")})`,
      }),
      colors: {
        // LAYOUT COLORS
        "light-1": "#FFFFFF",
        "light-2": "#C9C9C9",
        "light-3": "#9A9A9A",
        "dark-1": "#090909",
        "dark-2": "#0F0F0F",
        "dark-3": "#191919",
        "dark-4": "#292929",
        "dark-5": "#494949",
        "primary-1": "#42FFE8",
        "primary-2": "#36DAC6",
        "primary-3": "#2CA597",
        //  DENOTIVE COLORS
        success: "#30C394",
        error: "#CE6C6C",
        warning: "#CEB36C",
        // GENERAL COLORS
        "blue-1": "#42D2FF",
        "blue-2": "#42A4FF",
        "blue-3": "#3991E2",
        purple: "#A718FF",
        pink: "#DC3298",
        yellow: "#E3E652",
        orange: "#FFA500",
      },
      borderRadius: {
        xsmall: "8px",
        small: "12px",
        default: "20px",
      },
      gradientColorStops: {
        colorful: "from-purple-600 to-blue-600",
      },
      fontSize: {
        md: "16px",
      },
      boxShadow: (theme) => ({
        green: `0px 0px 35px 2px ${theme("colors.primary-1")}30`,
        blue: `0px 0px 35px 2px ${theme("colors.blue-1")}30`,
        light: `0px 0px 35px 2px ${theme("colors.light-1")}30`,
        dark: `0px 0px 35px 2px ${theme("colors.dark-5")}30`,
      }),
    },
    textShadow: {
      sm: "1px 1px 2px var(--tw-shadow-color)",
      DEFAULT: "2px 2px 4px var(--tw-shadow-color)",
      lg: "4px 4px 12px var(--tw-shadow-color)",
      xl: "4px 4px 16px var(--tw-shadow-color)",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
