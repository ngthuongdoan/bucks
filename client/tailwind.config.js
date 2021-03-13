module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-grey": "#EEEEEE",
        control: {
          DEFAULT: "#FFD369",
          light: "#FFEAB7",
        },
      },
      boxShadow: {
        negative: "-1px -1px 20px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
