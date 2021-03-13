module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-grey": "#EEEEEE",
      },
      translate: {
        "2x": "200%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
