export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	// Global page headers: https://go.nuxtjs.dev/config-head
	loading: {
		color: '#44b97c',
		height: '4px',
		duration: 3000,
	},
	head: {
		title: 'Xã Thông Minh',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Xã Thông Minh - HTX Nông Nghiệp Số',
			},
			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'keywords', content: 'Xã Thông Minh, Nông Nghiệp Số' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/css/custom.css',
		'~/assets/css/font-family.css',
		'boxicons/css/boxicons.min.css',
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/globalVariables.js',
		'~/plugins/router.js',
		'~/plugins/axios.js',
		{ src: '~/plugins/maps.js', mode: 'client' },
		'~/plugins/carousel.js',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'nuxt-vue-multiselect',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/',
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},
	transpile: [/^vue2-google-maps($|\/)/],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
	env: {
		hostApi: process.env.HOST_API,
		hostCMS: process.env.HOST_CMS,
	},
}
