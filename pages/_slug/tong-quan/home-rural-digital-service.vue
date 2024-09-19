<template>
	<div v-if="categories.length > 0" class="max-w-6xl mx-auto px-3">
		<home-service>
			<template #category>
				<home-header-category
					title="DỊCH VỤ SỐ NÔNG THÔN"
					:categories="categories"
					:view-all="true"
					@viewAll="
						$router.push({ path: `/${$slug}/dich-vu-so-nong-thon` })
					"
					@update="update"
				/>
			</template>

			<template v-if="entry" #content>
				<div
					class="grid grid-cols-2 cursor-pointer"
					@click="
						$router.push({
							path: `/${$slug}/dich-vu-so-nong-thon/${entry.id}`,
						})
					"
				>
					<div>
						<div class="text-[22px] text-[#4f4f4f] font-bold mb-2">
							{{ entry.name }}
						</div>
						<div class="text-[18px] font-light text-justify">
							{{ $filters.htmlToText(entry.description) }}
						</div>
					</div>
					<div class="max-h-[400px] p-5">
						<img
							loading="lazy"
							:src="$addPrefixImage(entry.image)"
							alt="Hình ảnh"
							class="w-full h-full object-cover self-center"
						/>
					</div>
				</div>
			</template>
		</home-service>
	</div>
</template>

<script>
import HomeService from './home-service.vue'
import HomeHeaderCategory from './home-header-category.vue'
export default {
	name: 'HomeRuralDigitalService',
	components: { HomeService, HomeHeaderCategory },
	data() {
		return {
			categories: [],
			entry: {
				name: '',
				description: '',
			},
		}
	},
	async created() {
		await this.getListRuralServices()
	},
	methods: {
		async getListRuralServices() {
			const response = await this.$store.dispatch(
				'ruralServices/ListRuralServices'
			)
			this.categories = response.data.entries.filter(
				(_, index) => index < 4
			)
			this.entry = this.categories[0]
		},
		update(value) {
			this.entry = value
		},
	},
}
</script>
