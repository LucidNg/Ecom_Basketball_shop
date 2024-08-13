import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        mainBanner: "url('/mainBanner.svg')",
      },
    },
  },
  colors: {
    primary: "#ebebd3",
    secondary: "#f4d35e",
    accent: "#d72638",
    neutral: "#083d77",
    // Add more colors as needed
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ebebd3",
          "primary-content": "#1e1e1e",
          secondary: "#f4d35e",
          "secondary-content": "#083d77",
          accent: "#d72638",
          "accent-content": "#fffbfa",
          neutral: "#083d77",
          "neutral-content": "#ebebd3",
          "base-100": "#fffbfa",
          "base-200": "#ebebd3",
          "base-300": "#bebebe",
          "base-content": "#1e1e1e",
          info: "#083d77",
          "info-content": "#fffbfa",
          success: "#00ff00",
          "success-content": "#001600",
          warning: "#00ff00",
          "warning-content": "#001600",
          error: "#ff0000",
          "error-content": "#160000",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    function ({ addBase, theme }: PluginAPI) {
      addBase({
        ":root": {
          "--color-primary": theme("colors.primary"),
          "--color-secondary": theme("colors.secondary"),
          "--color-accent": theme("colors.accent"),
          "--color-neutral": theme("colors.neutral"),
          // Add more custom properties for other colors
        },
      });
    },
  ],
};
export default config;
