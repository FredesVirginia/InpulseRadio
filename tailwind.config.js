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
        color1: '#E04604', 
        color2: '#E08F04',
        colorPrincipal : '#E06B04',
        color3: '#E09004',
        color4: '#E0AA04',
        color5: "#F03813",
        color6: "#F01319"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        "fondo": "url('/Img/niños2.jpg')"
      },
      keyframes: {
        brillo: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(100% + 200px) 0' },
        }
      },
    },
  },
  plugins: [],
}
