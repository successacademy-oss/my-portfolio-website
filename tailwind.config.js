/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1a3a",
          light: "#122a5c",
          dark: "#060f24",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8cc6c",
        },
        teal: {
          DEFAULT: "#2ba6a6",
          light: "#4fc3c3",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
