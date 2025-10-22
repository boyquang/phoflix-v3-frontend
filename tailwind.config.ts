import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
      },
      screens: {
        xs: "28.5rem", // 456px
        sm: "40rem", // 640px
        md: "48rem", // 768px
        lg: "64rem", // 1024px
        xl: "80rem", // 1280px
        "2xl": "96rem", // 1536px
        "3xl": "108.75rem", // 1740px
        "4xl": "120rem", // 1920px
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },

      },
      animation: {
        "slide-in": "slide-in 0.8s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "fade-out": "fade-out 0.3s ease-out forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
