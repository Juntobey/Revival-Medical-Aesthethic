/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headers: ["Cormorant Garamond", "serif"],
        paragraph: ["Lato", "sans-serif"],
        cta: ["Raleway", "sans-serif"],
      },
      colors: {
        darkgreen: "#1B2E22",
        almond: "#EDE1D2",
        red: "#470A12",
        darkbrown: "#412F26",
        lightbrown: "#AF937B",
        luxwhite: "#FAFAFA",
      },
      fontSize: {
        h1: ["70px", { lineHeight: "1.2", fontWeight: "700" }], // 70px bold
        h2: ["58px", { lineHeight: "1.2", fontWeight: "700" }], // 58px bold
        h3: ["48px", { lineHeight: "1.2", fontWeight: "700" }], // 48px bold
        p: ["16px", { lineHeight: "1.6", fontWeight: "400" }], // 16px regular
      },
    },
  },
  plugins: [],
};
