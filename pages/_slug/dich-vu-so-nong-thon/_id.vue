<template>
	<div>
		<div v-if="entry">
			<div>
				<div>
					<div class="text-[#44b97c] font-bold text-[22px] mb-2">
						{{ entry.name }}
					</div>
					<div v-html="entry.description"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ChiTietDV',
	data() {
		return {
			entry: {},
		}
	},
	async fetch() {
		await this.getRuralService()
	},
	head() {
		return {
			title: `${this.entry.name}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.entry.name}`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: `${this.entry.name}` },
			],
		}
	},
	methods: {
		async getRuralService() {
			const response = await this.$store.dispatch(
				'ruralServices/GetRuralService',
				this.$route.params.id
			)
			if (response.code === 200) {
				this.entry = response.data.entry
			}
		},
	},
}
</script>
