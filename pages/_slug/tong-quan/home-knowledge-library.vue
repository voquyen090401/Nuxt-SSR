<template>
	<div class="max-w-6xl px-3 mx-auto" style="min-height: 300px">
		<HomeService>
			<template #category>
				<HomeHeaderCategory
					title="THƯ VIỆN KIẾN THỨC"
					:categories="categories"
					@update="updateEntry"
					@viewAll="
						$router.push({ path: `/${$slug}/thu-vien-kien-thuc` })
					"
				/>
			</template>

			<template #content>
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
					<div
						v-for="(entry, index) in entries"
						:key="entry.id"
						:class="{ 'col-12': index == NEWS_LENGTH - 1 }"
						@click="
							$router.push({
								path: `/${$slug}/thu-vien-kien-thuc/${entry.id}`,
								query: {
									category: entry?.category_id,
									type: 1,
								},
							})
						"
					>
						<div
							class="h-[140px] sm:h-[160px] md:h-[200px] xl:h-[260px] mb-4"
						>
							<img
								loading="lazy"
								alt="Hình ảnh"
								class="w-full h-full object-cover rounded-sm hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer"
								:src="$addPrefixImage(entry?.avatar)"
							/>
						</div>
						<div>
							<div
								class="text-[#4f4f4f] font-medium line-clamp-1 overflow-ellipsis uppercase"
							>
								{{ entry?.title }}
							</div>
							<div class="text-[14px] text-[#737373]">
								{{
									$filters.dateTime(
										entry?.created_at,
										'HH:mm DD/MM/YYYY'
									)
								}}
							</div>
							<div
								class="text-[#a3a3a3] line-clamp-2 sm:line-clamp-3 overflow-ellipsis"
							>
								{{ $filters.htmlToText(entry?.content) }}
							</div>
						</div>
					</div>
				</div>
			</template>
		</HomeService>
	</div>
</template>

<script>
import HomeService from './home-service.vue'
import HomeHeaderCategory from './home-header-category.vue'
export default {
	name: 'HomeKnowledgeLib',
	components: { HomeService, HomeHeaderCategory },
	data() {
		return {
			entries: [],
			categories: [],
			loading: false,
			NEWS_LENGTH: 3,
		}
	},
	async created() {
		await this.getListCategories()
		await this.getData()
	},
	methods: {
		updateEntry(v) {
			this.getData({ 'category-id': v.id })
		},
		async getListCategories() {
			const response = await this.$store.dispatch(
				'knowledgeLibrary/ListCategoryknowledgeLibrary'
			)
			this.categories = response.data.entries
		},
		async getData(options) {
			this.loading = true
			let cloneOptions = options
			if (!cloneOptions) {
				cloneOptions = { 'category-id': this.categories[0].id }
			}
			const response = await this.$store.dispatch(
				'knowledgeLibrary/ListknowledgeLibrary',
				cloneOptions
			)
			this.entries =
				(response.data.entries ?? [])?.filter(
					(_, index) => index < this.NEWS_LENGTH
				) ?? []
			this.loading = false
		},
	},
}
</script>
