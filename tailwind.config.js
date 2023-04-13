// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius , ",
        spacing: "margin, padding",
      },
    },
    screens: {
      sx: "320px",
      sl: "456px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
