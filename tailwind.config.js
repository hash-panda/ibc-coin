module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // colors: require('../colors'),
            fontFamily: {
                title: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        styled: true,
        themes: ['dark'],
        base: true,
        utils: true,
        logs: true,
        rtl: false
    }
};
