<template>
	<div
		v-if="entries?.length"
		class="max-w-6xl mx-auto px-3 font-inter overflow-hidden"
	>
		<home-service>
			<template #category>
				<div></div>
			</template>

			<template #content>
				<div>
					<VueSlickCarousel v-bind="settings">
						<div
							class="h-[284px] grid grid-flow-row grid-rows-3 overflow-hidden"
						>
							<div class="p-4 h-full">
								<div class="bg-[#f5f5f5] h-full p-4">
									<div
										class="text-[40px] text-[#44b97c] font-semibold mb-2"
									>
										VIDEO
									</div>
									<div
										class="text-justify text-[13px] sm:text-[14px] text-[#262626] mb-2"
									>
										Giới thiệu các video nổi bật của Xã. Tận
										hưởng vẻ đẹp tự nhiên và sự gần gũi với
										cuộc sống nông thôn qua các video đặc
										sắc. Bạn sẽ được xem video tham quan các
										lễ hội truyền thống đặc sắc.
									</div>
									<div>
										<button
											class="bg-[#44B97C] hover:bg-[#3cae73] text-white px-5 py-3 rounded-md"
										>
											Xem tất cả
										</button>
									</div>
								</div>
							</div>
						</div>
						<div
							v-for="(item, i) in entries"
							:key="i"
							class="h-[284px] overflow-hidden"
						>
							<div class="h-full p-4">
								<iframe
									title="thumbnail"
									loading="lazy"
									frameborder="0"
									allowFullScreen="true"
									webkitallowfullscreen="true"
									mozallowfullscreen="true"
									class="border rounded pointer-events-auto"
									width="100%"
									height="100%"
									:src="item.url"
								>
								</iframe>
							</div>
						</div>
					</VueSlickCarousel>
				</div>
			</template>
		</home-service>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import HomeService from './home-service.vue'
export default {
	name: 'HomeVideo',
	components: {
		VueSlickCarousel,
		HomeService,
	},
	data() {
		return {
			entries: [],
			settings: {
				edgeFriction: 0.35,
				infinite: false,
				autoplay: false,
				speed: 1000,
				slidesToShow: 3,
				slidesToScroll: 3,
				centerPadding: '50px',
				responsive: [
					{
						breakpoint: 1020,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
							infinite: false,
							centerPadding: '50px',
						},
					},
					{
						breakpoint: 687,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: false,
							centerPadding: '50px',
						},
					},
				],
			},
		}
	},
	async created() {
		await this.getListVideos()
	},
	methods: {
		getSrcYoutube(url) {
			const regExp =
				/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
			const match = url.match(regExp)
			const ID = match && match[2].length === 11 ? match[2] : null
			return 'https://www.youtube.com/embed/' + ID + '?autoPlay=0'
		},
		async getListVideos() {
			let query = { ...this.$route.query }
			if (this.$route.params.slug !== 'xathongminh') {
				query = { ...query, ward_slug: this.$route.params.slug }
			}
			const response = await this.$store.dispatch(
				'videos/ListVideos',
				query
			)
			this.entries = (
				response.data.entries.filter((_, index) => index < 5) ?? []
			).map((video) => {
				return {
					...video,
					url: this.getSrcYoutube(video.url),
				}
			})
		},
	},
}
</script>
