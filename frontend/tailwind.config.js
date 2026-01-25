/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'heritage-red': '#8B0000', // Deep red common in temples
                'heritage-gold': '#FFD700', // Gold accents
                'heritage-clay': '#B5651D', // Brick color
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
