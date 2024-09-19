<template>
	<div
		v-if="solutions.length !== 0"
		class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
	>
		<div
			v-for="(item, index) in solutions"
			:key="index"
			class="border-[1px] border-solid border-[#ccc] rounded-md cursor-pointer"
			@click="
				$router.push({
					path: `/${$slug}/dich-vu-so-nong-thon/${item.id}`,
				})
			"
		>
			<div
				class="h-[120px] sm:h-[160px] lg:h-[200px] overflow-hidden border-b rounded-md"
			>
				<img
					loading="lazy"
					:src="item.icon"
					alt="icon"
					class="w-full h-full object-cover hover:scale-105 transition-all duration-500"
				/>
			</div>
			<div class="p-1 sm:p-2">
				<div
					class="text-[14px] sm:text-[16px] ms:text-[20px] font-medium line-clamp-1"
				>
					{{ item.name }}
				</div>
				<div class="line-clamp-3 text-[12px] sm:text-[14px]">
					{{ $filters.htmlToText(item.description) }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			solutions: [],
		}
	},
	head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Dịch vụ số nông thôn`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Dịch vụ số nông thôn`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Dịch vụ số nông thôn` },
			],
		}
	},
	created() {
		this.getListRuralServices()
	},
	methods: {
		async getListRuralServices() {
			const response = await this.$store.dispatch(
				'ruralServices/ListRuralServices'
			)
			if (response.code === 200) {
				this.solutions = response.data.entries
			}
		},
	},
}
</script>
