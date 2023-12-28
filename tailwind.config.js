/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [[require("daisyui")]],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#c60d0d", // Red
          "secondary": "#ffffff", // White (You can set a secondary color if needed)
          "accent": "#ff0000", // Red (or another shade of red)
          "neutral": "#000000", // Black
          "base-100": "#ffffff", // White
        },
      },
      "dark",
      "cupcake",
    ],
    styled: false,
    rtl: false,
  },
};
