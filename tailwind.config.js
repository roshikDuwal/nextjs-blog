/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        blue: "#108ffc",
        darkblue: " #17222b",
        red: "#fe4554",
        lightblack: "#17222b",
        bgcolor: "#fcfcfc",
        footerbg:"#17222b"
      },
    },
  },

  plugins: [],
};
