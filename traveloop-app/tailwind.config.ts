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
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Primary gradient start
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#4f46e5', // Primary gradient end (indigo)
        },
        accent: {
          amber: '#F59E0B',
          teal: '#0D9488',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(to right, #7C3AED, #4F46E5)",
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
