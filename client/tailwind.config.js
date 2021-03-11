module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#EEEEEE",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};