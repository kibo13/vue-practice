module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#69f0ae',
        secondary: {
          100: '#E2E2D5',
          200: '#888883'
        }
      },

      fontFamily: {
        base: ['Nunito']
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: []
}
