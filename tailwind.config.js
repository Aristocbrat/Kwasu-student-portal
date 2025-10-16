/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "xxs":"320px",
      'xs': '480px',     
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1700px',    
    },
    extend: {
      fontFamily:{
          kwasuHead:[ "Bricolage Grotesque", "sans-serif" ],
          italo:["Italianno", "cursive"]
      },
      animation: {
  'fade-in-out': 'fadeInOut 3s ease-in-out',
    },
keyframes: {
  fadeInOut: {
    '0%, 100%': { opacity: 0 },
    '10%, 90%': { opacity: 1 },
  },
}

    },
  },
  plugins: [require("daisyui")],
}
