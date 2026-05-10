import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF8F0',
          100: '#F9ECDA',
          200: '#F0D5B0',
          300: '#E8C9A0',
          400: '#D4A574',
          500: '#B8865A',
          600: '#A0724B', // Primary gradient start (warm cocoa)
          700: '#8B5E3C',
          800: '#6B4226',
          900: '#5C3A2E',
          950: '#8B6914', // Primary gradient end (deep gold)
        },
        accent: {
          amber: '#F5C842',   // Butter yellow
          teal: '#2D6A4F',    // Sage green
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(to right, #A0724B, #8B6914)",
      },
      fontFamily: {
        heading: ['var(--font-clash-display)', 'sans-serif'],
        body: ['var(--font-cabinet-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
