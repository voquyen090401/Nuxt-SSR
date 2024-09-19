import api from '@/api'

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

export default {
	state() {
		return {
			location: {
				id: '0',
				name: 'Nông Nghiệp Số',
				address: 'Nông Nghiệp Số',
				phone: '0966688650',
				slug: 'xathongminh',
				email: 'Office@nongnghiepso.com',
				website: 'https://www.nongnghiepso.com',
				map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14896.536707335103!2d105.7848151!3d21.0273166!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xce6b843408caa651!2zSOG7o3AgdMOhYyB4w6MgTsO0bmcgbmdoaeG7h3AgU-G7kQ!5e0!3m2!1sen!2s!4v1672128536387!5m2!1sen!2s',
			},
			contact: {},
		}
	},
	getters: {
		GetLocation: (state) => {
			return state.location
		},
		GetLocationContact: (state) => {
			return state.contact
		},
	},
	mutations: {
		UpdateLocation(state, newLocation) {
			state.location = newLocation
		},
		GetLocation: (state) => {
			return state.location
		},
		UpdateContact(state, newContact) {
			state.contact = newContact
		},
	},
	actions: {
		async GetLocation({ dispatch }, slug) {
			try {
				const response = await this.$axios({
					method: 'GET',
					url: api.params('GetWard', {
						slug,
					}),
				})
				const slugResponse = response.data?.data?.entry?.slug

				await dispatch('UpdateLocationContact', slugResponse)

				return response.data
			} catch {
				return {
					code: 400,
					message: 'Not Found!',
				}
			}
		},
		async UpdateLocationContact({ commit }, slug) {
			try {
				const response = await this.$axios({
					method: 'GET',
					url: api.params('GetContact', {
						slug,
					}),
				})
				if (response.data.code === 200) {
					commit('UpdateContact', response.data.data.entry)
				} else {
					commit('UpdateContact', ADMIN_LOCATION)
				}
			} catch {
				commit('UpdateContact', ADMIN_LOCATION)
			}
		},
	},
}
