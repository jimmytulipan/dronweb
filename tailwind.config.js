/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Skenuje všetky JS/JSX súbory v src
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F0F0F', // Tmavšia šedá pre pozadie (môže byť aj #333333)
        'secondary-dark': '#1A1A1A',
        'dark-gray': '#181818',
        'light-gray': '#AAAAAA',
        'pure-white': '#FFFFFF', // Biela pre text
        'primary-red': '#FF0000', // Jasná červená
        'accent-red': '#FF3333',  // Tmavšia červená pre hover efekty
      },
      fontFamily: {
        // Pridajme Montserrat ako príklad moderného písma
        sans: ['Montserrat', 'sans-serif'],
        barlow: ['Barlow Condensed', 'sans-serif'],
        // Môžeš pridať aj futuristické písmo ako Orbitron, ak ho naimportuješ
        // orbitron: ['Orbitron', 'sans-serif'],
      },
      // Príklad pre blur efekt (ak ho chceš použiť napr. na pozadí modalu)
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
} 