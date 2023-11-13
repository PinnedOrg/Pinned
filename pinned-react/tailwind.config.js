/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",    
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        actionOrange: '#fd7d62',
      },
    },
  },
  
  
  mode: 'jit',
  purge: ['./src/**/*.js', './src/**/*.jsx', './public/index.html'],
  plugins: [],
}

