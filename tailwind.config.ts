import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-visitors': "url('/images/bg-visitors.webp')",
      },
      fontFamily: {
        handwriting: ['Sacramento', 'cursive'],
      },
      colors: {
        primary: '#800000',
        secondary: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
