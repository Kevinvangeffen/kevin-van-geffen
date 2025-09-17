/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#060605',
        foreground: '#ffffff',
        'gold-start': '#cb9f41',
        'gold-end': '#8d6524',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #cb9f41 0%, #8d6524 100%)',
      },
    },
  },
  plugins: [],
}
