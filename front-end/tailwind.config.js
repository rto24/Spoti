const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter, sans-serif', { fontFeatureSettings: '"cv11"' }],
      },
      backgroundImage: {
        'signin-bg': "url('./src/assets/bg_cars.jpg')", // Define a custom class for your background
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = config
