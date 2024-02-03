/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    
    screens: {
      "sm": "456px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "xxl": "1920px",
    },

    extend: {
      rotate: {
        '180': '180deg',
      },
      maxHeight: {
        '100vh': '100vh',
      },
      colors: {
        'black': '#1E1E1E',
        'purple': '#C4D1FF',
        'orange': '#F77333',
        'green': '#03C15B',
        'blue': '#7690ED',
        'error': '#FF0000',
      },

      spacing: {
        '50%': '50%',
      },

      fontSize: {
        '10xl': '11rem',
        '12xl': '12.5rem',

        'landing-heading': ["9.375rem", {
          lineHeight: "5.625rem"
        }],

        'landing-basic': "1.875rem"
      },

      container: {
        center: true,
        padding: '1rem',
        screens: {
          DEFAULT: '1280px',
        },
      },

    },
  },
  plugins: [],
}
