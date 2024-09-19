/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./pages/*.{js,jsx,ts,tsx,vue}',
		'./pages/**/*.{js,jsx,ts,tsx,vue}',
		'./pages/**/**/*.{js,jsx,ts,tsx,vue}',
		'./components/*.{js,jsx,ts,tsx,vue}',
		'./components/**/*.{js,jsx,ts,tsx,vue}',
		'./layouts/*.{js,jsx,ts,tsx,vue}',
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			maxWidth: {
				'6xl': '76rem',
			},
		},
	},
	plugins: [],
}
