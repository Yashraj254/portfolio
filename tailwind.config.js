/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        floatImage: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2.4rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      typography: ({ theme }) => ({
        zinc: {
          css: {
            "--tw-prose-code": theme("colors.red[600]"),
          },
        },
      }),
      colors: {
        "bg-color": "#1f242d",
        "secondary-bg-color": "#323946",
        "main-color": "#0ef",
        "code-bg": "#27272A",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
