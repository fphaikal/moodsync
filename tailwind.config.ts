import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#50E3C2",
        accent: "#F5A623 ",
        background: "#F7F8FA",
        dark: "#020617",
        light: "#FFFFFF",
        border: "#E1E8ED",
        mood: {
          happy: "#FFECB3",
          sad: "#BBDEFB",
          party: "#FFCDD2",
          chill: "#C8E6C9",
          study: "#D1C4E9",
          sleep: "#F8BBD0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
