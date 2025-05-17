import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'max-1670': { 'max': '1670px' },
        'extrasm': { 'max': '585px' },
      }
    },
    screens: {
      '2xl': {'max': '1667px'},
      'xl': {'max': '1320px'},
      'lg': {'max': '1125px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
} satisfies Config;
