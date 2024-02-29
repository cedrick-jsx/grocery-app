/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: `url("/src/assets/images/background/login.webp")`,
      },
      dropShadow: {
        slogan: ["0 0 1px #0E185F", "0 0 1px #0E185F", "0 0 1px #0E185F"],
      },
      screens: {
        "3xs": { max: "300px" },
        "2xs": { min: "300px", max: "480px" },
        xs: { min: "480px", max: "640px" },
        sm: { min: "640px", max: "768px" },
        md: { min: "768px", max: "1024px" },
        lg: { min: "1024px", max: "1280px" },
        xl: { min: "1280px", max: "1536px" },
        "2xl": { min: "1536px" },
      },
    },
  },
  plugins: [],
};
