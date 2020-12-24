module.exports = {
  purge: ['client/src/**/*.{js,ts,jsx,tsx}', 'client/src/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        screen: '100vh',
      },
      minHeight: {
        24: '6rem',
      },
      minWidth: {
        44: '11rem',
      },
      gridTemplateColumns: {
        '1/9': '1fr 9fr',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled'],
      boxShadow: ['disabled'],
    },
  },
  plugins: [],
}
