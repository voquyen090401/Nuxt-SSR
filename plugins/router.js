const ADMIN_LOCATION = {
	id: '0',
	name: 'Nông Nghiệp Số',
	address: 'Nông Nghiệp Số',
	phone: '0966688650',
	slug: 'xathongminh',
	email: 'Office@nongnghiepso.com',
	website: 'https://www.nongnghiepso.com',
	map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14896.536707335103!2d105.7848151!3d21.0273166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xce6b843408caa651!2zSOG7o3AgdMOhYyB4w6MgTsO0bmcgbmdoaeG7h3AgU-G7kQ!5e0!3m2!1sen!2s!4v1672128536387!5m2!1sen!2s',
}

export default ({ app }) => {
	app.router.beforeEach(async (to, from, next) => {
		const slugStore = app.context.store.state.location.location.slug
		console.log('=====Start=====')
		if (!to.fullPath.includes(slugStore) && from.name !== null) {
			return next(`/${slugStore}${to.fullPath}`)
		}
		if (to.fullPath === '/' || !to.matched?.length) {
			return next(`/xathongminh/tong-quan`)
		}
		const pathTo = to.fullPath.slice(1)
		const slugPath = pathTo?.split('/')[0]
		to.params.slug = slugPath
		if(slugStore === slugPath) {
			return next()
		}
		if (slugPath && slugPath !== 'xathongminh') {
			const response = await app.context.store.dispatch(
				'location/GetLocation',
				slugPath
			)
			if (response?.code === 200) {
				const location = response.data.entry
				app.context.store.commit('location/UpdateLocation', location)
			} else {
				app.context.store.commit(
					'location/UpdateLocation',
					ADMIN_LOCATION
				)
				return next()
			}
		} else {
			app.context.store.commit('location/UpdateLocation', ADMIN_LOCATION)
			app.context.store.commit('location/UpdateContact', ADMIN_LOCATION)
		}

		return next()
	})

	app.router.afterEach((to, from) => {
		console.log('======End=======')
	})
}
