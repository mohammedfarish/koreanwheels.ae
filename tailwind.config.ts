import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
        mobile: { max: "820px" },
        pc: { min: "821px" },
      },
    },
  },
  plugins: [],
} satisfies Config;
