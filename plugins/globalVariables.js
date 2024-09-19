import moment from 'moment'
const addPrefixImage = (
	url,
	defaultImg = require('@/assets/images/no_image.png')
) => {
	if (!url) {
		return defaultImg
	}
	if (url.startsWith('http')) {
		return url
	}
	return process.env.hostApi + url
}

const filters = {
	dateTime: (value, format = 'DD/MM/YYYY HH:mm') => {
		return moment(value).utcOffset(7).format(format)
	},
	date: (value) => {
		return moment(value).utcOffset(7).format('DD/MM/YYYY')
	},
	htmlToText: (content) => {
		const cloneContent = content || ''
		return cloneContent.replace(/<[^>]*>/g, '').replaceAll('&nbsp;', '')
	},
	money: (money) => {
		return money.toLocaleString('en-US').replace(/,/g, '.') + 'đ'
	},
}

export default ({ app }, inject) => {
	inject('addPrefixImage', addPrefixImage)
	app.addPrefixImage = addPrefixImage

	inject('filters', filters)
	app.filters = filters

	inject('slug', app.context.store.state.location.location.slug)
	app.slug = app.context.store.state.location.location.slug
}
