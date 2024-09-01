require('ts-node').register({ 
  compilerOptions: { 
    module: 'commonjs' 
  } 
})

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// module.exports = {
//   plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//   ],
// };
