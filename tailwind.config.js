/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./api/**/*.ts"],
  theme: {
    extend: {
      // Add any custom extensions here
    },
  },
  plugins: [require("tw-animate-css")],
};
