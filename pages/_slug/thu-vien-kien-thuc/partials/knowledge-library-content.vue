<template>
	<div>
		<div
			v-if="
				(entries.length != 0 || isLoading == true) &&
				$route.query.type == 1
			"
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
		>
			<div
				v-for="(item, index) in entries"
				:key="index"
				class="border border-solid border-[#ccc] rounded-md shadow-md"
				@click="goDetail(item.id)"
			>
				<div
					class="h-[100px] sm:h-[140px] lg:h-[180px] overflow-hidden self-center"
				>
					<img
						loading="lazy"
						:src="$addPrefixImage(item?.avatar)"
						alt="Hinh anh"
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="text-[#4f4f4f] p-1">
					<h3 class="text-[16px] line-clamp-1 font-semibold">
						{{ item.title }}
					</h3>
					<div class="line-clamp-2 text-[14px]">
						{{ $filters.htmlToText(item.content) }}
					</div>
					<div class="text-[14px]">
						{{ $filters.date(item.created_at) }}
					</div>
				</div>
			</div>
			<div>
				<Pagination :pagination="pagination" />
			</div>
		</div>
		<div
			v-else-if="
				(entries.length != 0 || isLoading == true) &&
				$route.query.type == 2
			"
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
		>
			<div
				v-for="(item, index) in entries"
				:key="index"
				class="border border-solid border-[#ccc] rounded-md shadow-md"
				@click="goDetail(item.id)"
			>
				<div
					class="h-[140px] sm:h-[160px] lg:h-[180px] overflow-hidden self-center"
				>
					<iframe
						title="thumbnail"
						frameborder="0"
						allowFullScreen="true"
						webkitallowfullscreen="true"
						mozallowfullscreen="true"
						class="border"
						width="100%"
						height="100%"
						:src="getSrcYoutube(item.link)"
					>
					</iframe>
				</div>
				<div class="text-[#4f4f4f] p-1">
					<h3 class="text-[16px] line-clamp-1 font-semibold">
						{{ item.title }}
					</h3>
					<div class="line-clamp-2 text-[14px]">
						{{ $filters.htmlToText(item.description) }}
					</div>
					<div class="text-[14px]">
						{{ $filters.date(item.created_at) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NoiDung',
	data() {
		return {
			isLoading: true,
			pagination: {
				deleted: false,
				length: 12,
				order_by: 'created_at',
				order_dir: 'desc',
				search: '',
				page: 1,
				total: 35,
			},
			entries: [],
			categories: [],
		}
	},
	watch: {
		'$route.query': {
			handler() {
				this.getContent()
			},
			deep: true,
		},
	},
	methods: {
		getSrcYoutube(url) {
			const newUrl = url || ''
			const regExp =
				/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
			const match = newUrl.match(regExp)
			const ID = match && match[2].length === 11 ? match[2] : null
			return 'https://www.youtube.com/embed/' + ID + '?autoPlay=0'
		},
		async getContent() {
			const response = await this.$store.dispatch(
				'knowledgeLibrary/ListknowledgeLibrary',
				this.$route.query
			)
			this.entries = response.data.entries ?? []
			this.pagination = response.data.pagination
		},
		async getListCategories() {
			const response = await this.$store.dispatch(
				'knowledgeLibrary/ListCategoryknowledgeLibrary'
			)
			this.categories = response.data.entries ?? []
		},
		goDetail(id) {
			this.$router.push({
				path: `/${this.$slug}/thu-vien-kien-thuc/${id}`,
				query: this.$route.query,
			})
		},
	},
	async created() {
		await this.getListCategories()
		await this.getContent()
		this.isLoading = false
	},
}
</script>
