/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./(app|src)/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
    colors: {
      stale: {
        100: '#C3C8D4',
        700: '#224957',
        800: '#093545',
        900: '#092C39',
      },
    },
    fontSize: {
      sm: ['0.75rem', '1.5rem'],
      xl: ['1rem', '1.5rem'],
      '2xl': ['1.25rem', '1.5rem'],
      '3xl': ['1.5rem', '2rem'],
      '4xl': ['2rem', '2.5rem'],
      '5xl': ['3rem', '3.5rem'],
      '6xl': ['4rem', '5rem'],
    },
    fontFamily: {
      sans: ['var(--font-montserrat)'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2BD17E',
          secondary: '#FFF',
          accent: '#093545',
          neutral: '#FFF',
          'base-100': '#FFF',
          'base-content': '#092C39',
          info: '#7B6EF6',
          success: '#2BD17E',
          warning: '#224957',
          error: '#EB5757',
          '.btn': {
            color: '#FFF',
            'font-size': '1rem',
            'line-height': '1.5rem',
            height: '4rem',
          },
          '.btn-outline': {
            'border-style': 'solid',
          },
          '.btn-outline:hover': {
            // 'background-color': '#22495780',
          },
          '.btn-outline:focus-visible': {
            // 'outline-color': '#224957',
          },
          '.input': {
            'background-color': '#224957',
            color: '#FFF',
            'font-weight': 300,
          },
          'input::placeholder': {
            color: '#FFF',
          },
        },
      },
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root',
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
};
