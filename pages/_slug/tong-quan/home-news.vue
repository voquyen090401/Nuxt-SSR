<template>
	<div class="max-w-6xl mx-auto font-inter px-3">
		<home-service>
			<template #category>
				<home-header-category
					title="TIN TỨC"
					@viewAll="$router.push({ path: `/${$slug}/tin-tuc` })"
				/>
			</template>

			<template v-if="articles?.length" #content>
				<div>
					<div
						class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4"
					>
						<div
							v-for="(article, index) in articles"
							:key="index"
							:class="{ 'col-span-2 sm:col-span-1': index === 2 }"
							@click="goDetailNews(article)"
						>
							<div
								class="h-[140px] sm:h-[160px] md:h-[200px] xl:h-[260px] mb-4"
								:class="{ 'h-[200px]': index === 2 }"
							>
								<img
									loading="lazy"
									alt="Hình ảnh"
									class="object-cover w-full h-full rounded-md hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer"
									:src="$addPrefixImage(article?.thumbnail)"
								/>
							</div>
							<div>
								<div
									class="text-[#4f4f4f] font-medium line-clamp-1 overflow-ellipsis uppercase"
								>
									{{ article?.title }}
								</div>
								<div class="text-[14px] text-[#737373]">
									{{
										$filters.dateTime(
											article?.created_at,
											'HH:mm DD/MM/YYYY'
										)
									}}
								</div>
								<div
									class="text-[#a3a3a3] line-clamp-2 sm:line-clamp-3 overflow-ellipsis"
								>
									{{ $filters.htmlToText(article?.content) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>

			<template v-if="!articles?.length">
				<div class="ic-empty-wrapper">
					<img class="ic-empty" src="@/assets/images/ic-empty.png" />
					<div>Không có tin tức nào</div>
				</div>
			</template>
		</home-service>
	</div>
</template>

<script>
import HomeService from './home-service.vue'
import HomeHeaderCategory from './home-header-category.vue'

export default {
	name: 'HomeNews',
	components: { HomeService, HomeHeaderCategory },
	data() {
		return {
			articles: [],
			NEWS_LENGTH: 3,
		}
	},
	async created() {
		await this.getListNews()
	},
	methods: {
		async getListNews() {
			const response = await this.$store.dispatch('news/ListNews')
			this.articles = response.data.entries.filter(
				(_, index) => index < this.NEWS_LENGTH
			)
		},
		goDetailNews(entry) {
			this.$router.push({ path: `/${this.$slug}/tin-tuc/${entry.slug}` })
		},
	},
}
</script>
