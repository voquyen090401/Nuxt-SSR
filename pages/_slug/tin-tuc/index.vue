<template>
	<div>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			<div
				v-for="(entry, index) in entries"
				:key="index"
				@click="goDetailNews(entry)"
			>
				<div>
					<div class="h-[150px] mb-1">
						<img
							loading="lazy"
							:src="$addPrefixImage(entry?.thumbnail)"
							alt="Hinh anh"
							class="w-full h-full object-cover rounded-md hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer"
						/>
					</div>
					<div>
						<b
							class="line-clamp-3 sm:line-clamp-2 text-[12px] sm:text-[16px] text-[#4f4f4f]"
							>{{ entry.title }}</b
						>
						<div
							class="hidden sm:block overflow-hidden text-[12px] text-[#4f4f4f]"
						>
							<div class="line-clamp-2">
								{{ $filters.htmlToText(entry.content) }}
							</div>
						</div>
						<div class="text-[12px] text-[#4f4f4f]">
							{{ $filters.date(entry.created_at) }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="text-center">
			<Pagination :pagination="pagination" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewsContent',
	data() {
		return {
			pagination: {
				deleted: false,
				length: 20,
				order_by: 'created_at',
				order_dir: 'desc',
				search: '',
				page: 1,
				total: 35,
			},
			entries: [],
		}
	},
	async fetch() {
		await this.getListNews()
	},
	head() {
		return {
			title: `${this.$store.state.location.location.name} - Tin tức`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.$store.state.location.location.name} - Tin tức`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					name: 'keywords',
					content: `${this.$store.state.location.location.name}`,
				},
			],
		}
	},
	watch: {
		'$route.query': {
			handler() {
				this.getListNews()
			},
			deep: true,
		},
		$route: {
			handler: function (newVal, oldVal) {
				if (newVal.query.page === oldVal.query.page) {
					this.$router.push({
						name: this.$route.name,
						query: { ...this.$route.query, page: 1 },
					})
				}
				this.getData()
			},
			deep: true,
		},
	},
	methods: {
		async getListNews() {
			const response = await this.$store.dispatch(
				'news/ListNews',
				this.$route.query
			)
			this.entries = response.data.entries
			this.pagination = response.data.pagination
		},
		goDetailNews(entry) {
			this.$router.push({ path: `/${this.$slug}/tin-tuc/${entry.slug}` })
		},
	},
}
</script>
