<template>
	<div v-if="entries.length" class="w-full overflow-hidden">
		<VueSlickCarousel v-bind="settings" :arrows="true">
			<div
				v-for="(banner, index) in entries"
				:key="index"
				class="h-[25vh] sm:h-[45vh] md:h-[55vh] lg:h-[70vh]"
			>
				<img
					loading="lazy"
					class="w-full h-full object-cover pointer-events-none"
					alt="Banner"
					:src="$addPrefixImage(banner.image)"
				/>
			</div>
		</VueSlickCarousel>
	</div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
	name: 'HomeBanner',
	components: { VueSlickCarousel },
	data() {
		return {
			settings: {
				dots: true,
				dotsClass: 'slick-dots custom-dot-class',
				edgeFriction: 0.35,
				infinite: true,
				autoplay: true,
				speed: 4000,
				autoplaySpeed: 4000,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
			entries: [],
		}
	},
	async fetch() {
		await this.getListBanners()
	},
	methods: {
		async getListBanners() {
			const response = await this.$store.dispatch('banners/ListBanners')
			this.entries = response.data?.entries ?? []
		},
	},
}
</script>
