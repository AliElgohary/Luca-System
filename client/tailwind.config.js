/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "white",
        primary: {
          0: "var(--gray-0)",
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
        },
        secondary: {
          1: "var(--dodgerBlue-1)",
          2: "var(--dodgerBlue-2)",
          3: "var(--dodgerBlue-3)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
