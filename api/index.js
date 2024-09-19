/* eslint-disable no-prototype-builtins */
const config = {
	host: process.env.hostApi,
	host_cms: process.env.hostCMS,
	api: process.env.hostApi,

	GetWard: '/api/web/wards-slug/{slug}',
	// Home banner
	ListBanners: '/api/web/configs/main-banner-images',
	GetBanner: '/api/user/banners/{id}',

	// Menu
	ListMenu: '/api/web/menus',

	ListImages: '/api/web/images',
	GetImage: '/api/web/images/{id}',

	ListSmartDevices: '/api/web/smart-devices',
	GetSmartDeviceDetail: '/api/web/smart-devices/{id}',
	SmartDeviceType: '/api/web/smart-device-types',

	ListNews: '/api/web/articles',
	GetNews: '/api/web/slug-article/{slug}',

	ListArticleTypes: '/api/web/article-category',

	ListRuralNetworks: '/api/web/rural-networks',

	ListVideos: '/api/web/videos',

	GetSmartSolutionHome: '/api/web/home-smart-solutions',

	ListRuralServices: '/api/web/rural-digital-services',
	GetRuralService: '/api/web/rural-digital-services/{id}',

	ListServiceManagements: '/api/web/service-management',

	ListProvinces: '/api/web/provinces',
	ListDistricts: '/api/web/districts',
	ListWards: '/api/web/wards',

	ListFreqAskedQuestions: '/api/web/freq-asked-questions',
	ListVideoTutorials: '/api/web/video-tutorials',
	CreateFeedbacks: '/api/web/feedbacks',

	ListSmartSolutions: '/api/web/smart-solutions',
	GetSmartSolutions: '/api/web/smart-solutions/{id}',

	GetContact: '/api/web/contact/{slug}',
	CreateContact: '/api/web/ward-contact',

	GetDistrict: '/api/web/districts/{id}',
	ListNotifications: '/api/web/notifications',
	GetNotificationDetail: '/api/web/notification/{id}',

	ListknowledgeLibraryArticles: '/api/web/library-articles',
	ListknowledgeLibraryVideos: '/api/web/library-videos',
	GetknowledgeLibraryArticle: '/api/web/library-article/{id}',
	GetknowledgeLibraryVideo: '/api/web/library-video/{id}',
	ListCategoryknowledgeLibrary: '/api/web/knowledge-categories',
}

const api = new Proxy(config, {
	get(target, name) {
		if (name === 'host_cms') return Reflect.get(target, name)
		if (name !== 'params') {
			return (
				Reflect.get(target, 'api').replace(/\/$/, '') +
				Reflect.get(target, name)
			)
		} else {
			return Reflect.get(target, name)
		}
	},
})

api.params = (name, options) => {
	try {
		let endpoint = api[name]
		for (const value in options) {
			if (value && options.hasOwnProperty(value)) {
				endpoint = endpoint.replace(`{${value}}`, options[value])
			}
		}
		return endpoint
	} catch (e) {
		console.log(e)
	}
}

export default api
