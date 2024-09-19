<template>
	<div>
		<div>
			<h3 class="text-[20px] font-medium uppercase text-[#4f4f4f]">
				{{ entry.title }}
			</h3>
			<div class="my-2">
				<span>{{ $filters.dateTime(entry.created_at) }}</span>
			</div>
			<div v-html="entry.content"></div>
		</div>
		<div v-if="entries?.length">
			<div class="text-[26px] font-medium text-[#44b97c]">
				TIN TỨC KHÁC
			</div>
			<VueSlickCarousel v-bind="settings">
				<div v-for="(item, i) in entries" :key="i" class="p-2" @click="goDetailNews(item)">
					<div class="h-[120px] sm:h-[180px] cursor-pointer mb-1">
						<img draggable="false" loading="lazy" :src="$addPrefixImage(item.thumbnail)" alt="Hinh anh"
							class="w-full h-full object-cover rounded-md transition-all hover:scale-105 duration-500" />
					</div>
					<div class="text-[12px] sm:text-[14px] color-[#4f4f4f] uppercase line-clamp-2 font-bold mb-1">
						{{ item.title }}
					</div>
					<div class="text-[12px] sm:text-[14px] color-[#4f4f4f]">
						{{ $filters.date(item.created_at) }}
					</div>
				</div>
			</VueSlickCarousel>
		</div>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
	name: 'ChiTietTinTuc',
	components: { VueSlickCarousel },
	scrollToTop: true,
	data() {
		return {
			entry: {
				title: '',
				content: '',
			},
			entries: [],
			settings: {
				edgeFriction: 0.35,
				infinite: false,
				autoplay: false,
				speed: 1000,
				slidesToShow: 4,
				slidesToScroll: 4,
				centerPadding: '50px',
				responsive: [
					{
						breakpoint: 1020,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: false,
							centerPadding: '50px',
						},
					},
					{
						breakpoint: 687,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							infinite: false,
							centerPadding: '50px',
						},
					},
				],
			},
		}
	},
	async fetch() {
		await this.getNews()
	},
	head() {
		return {
			title: `${this.entry.title}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.entry.title}`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: `${this.entry.title}` },
			],
		}
	},
	watch: {
		'$route.params.slug_tim_tuc': {
			handler() {
				this.$fetch()
			},
			deep: true,
		},
	},
	created() {
		this.getListNews()
	},
	methods: {
		async getNews() {
			const response = await this.$store.dispatch(
				'news/GetNews',
				this.$route.params.slug_tin_tuc
			)
			console.log(response,'response');
			if (response?.code === 200) {
				this.entry = response.data.entry
			}
		},
		async getListNews() {
			const response = await this.$store.dispatch('news/ListNews', {
				length: 24,
			})
			this.entries = response.data.entries.filter(
				(a) => a.slug !== this.$route.params.slug_tin_tuc
			)
		},
		goDetailNews(entry) {
			this.$router.push({ path: `/${this.$slug}/tin-tuc/${entry.slug}` })
		},
	},
}
</script>
