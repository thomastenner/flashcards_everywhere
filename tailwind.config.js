/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        perspective: {
          '1000': '1000px',
        },
        transformStyle: {
          '3d': 'preserve-3d',
        },
        backfaceVisibility: {
          'hidden': 'hidden',
        },
        rotate: {
          'y-180': 'rotateY(180deg)',
        },
      },
    },
    plugins: [],
  }