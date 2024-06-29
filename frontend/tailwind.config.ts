import type { Config } from "tailwindcss";

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
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ebebd3",
          "primary-content": "#1e1e1e",
          "secondary": "#f4d35e",
          "secondary-content": "#083d77",
          "accent": "#d72638",
          "accent-content": "#fffbfa",
          "neutral": "#fffbfa",
          "neutral-content": "#ebebd3",
          "base-100": "#fffbfa",
          "base-200": "#ebebd3",
          "base-300": "#bebebe",
          "base-content": "#1e1e1e",
          "info": "#10AD53",
          "info-content": "#fffbfa",
          "success": "#00ff00",
          "success-content": "#001600",
          "warning": "#00ff00",
          "warning-content": "#001600",
          "error": "#ff0000",
          "error-content": "#160000",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
