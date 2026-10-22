/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          DEFAULT: '#ee4d2d',
          dark: '#d73211',
          light: '#f05d40',
          bg: '#fef6f5',
          yellow: '#ffbf00',
          gray: '#f5f5f5',
          border: '#e8e8e8',
          text: '#222222',
          subtext: '#757575',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'Roboto', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'shopee': '0 1px 2px 0 rgba(0,0,0,.13)',
        'shopee-hover': '0 2px 10px 0 rgba(0,0,0,.15)',
        'card': '0 1px 1px 0 rgba(0,0,0,.05)',
      }
    },
  },
  plugins: [],
}
