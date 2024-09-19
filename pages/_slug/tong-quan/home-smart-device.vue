<template>
	<div v-if="entries?.length" class="max-w-6xl px-3 mx-auto overflow-hidden font-inter">
		<HomeService>
			<template #category>
				<HomeHeaderCategory title="THIẾT BỊ THÔNG MINH"
					@viewAll="$router.push({ path: `/${$slug}/thiet-bi-thong-minh` })" />
			</template>

			<template v-if="entries?.length" #content>
				<VueSlickCarousel v-bind="settings">
					<div v-for="(item, index) in entries" :key="index" class="p-1">
						<div class="border-[1px] border-solid border-[#ccc] overflow-hidden rounded-md" @click.prevent="
							$router.push({ path: `/${$slug}/thiet-bi-thong-minh/${item.id}` })
							">
							<div class="h-[130px] sm:h-[170px] overflow-hidden">
								<img draggable="false" loading="lazy" :src="$addPrefixImage(item.images[0])"
									alt="Hình ảnh"
									class="object-cover w-full h-full rounded-sm hover:scale-105 cursor-pointer transition-all ease-in-out duration-500" />
							</div>
							<div class="p-2">
								<div
									class="text-[#44b97c] font-medium capitalize line-clamp-1 text-ellipsis overflow-hidden">
									{{ item.name }}
								</div>
								<div class="text-[#4f4f4f] text-[18px] font-semibold">
									{{ $filters.money(item.price) }}
								</div>
							</div>
						</div>
					</div>
				</VueSlickCarousel>
			</template>
		</HomeService>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import HomeService from './home-service.vue'
import HomeHeaderCategory from './home-header-category.vue'
export default {
	name: 'HomeSmartDevice',
	components: { VueSlickCarousel, HomeService, HomeHeaderCategory },
	data() {
		return {
			entries: [],
			settings: {
				edgeFriction: 0.35,
				infinite: false,
				// autoplay: true,
				speed: 1000,
				// autoplaySpeed: 6000,
				slidesToShow: 4,
				slidesToScroll: 4,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
							infinite: false,
							centerPadding: '50px',
						},
					},
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: false,
							centerPadding: '50px',
						},
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							infinite: false,
							centerPadding: '50px',
						},
					},
					{
						breakpoint: 576,
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
	async created() {
		await this.getListSmartDevices()
	},
	methods: {
		async getListSmartDevices() {
			const response = await this.$store.dispatch(
				'devices/ListSmartDevices'
			)
			this.entries = response.data.entries
		},
	},
}
</script>

<style scoped>
.slick-slide {
	padding: 100px !important;
}
</style>
