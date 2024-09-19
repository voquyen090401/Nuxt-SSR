<template>
	<div class="max-w-6xl px-3 mx-auto">
		<home-service>
			<template #category>
				<home-header-category
					title="HỖ TRỢ DỊCH VỤ"
					:view-all="false"
				/>
			</template>

			<template #content>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 gap-5"
					:class="{ 'sm:grid-cols-3': GetLocation.slug === 'xathongminh' }"
				>
					<template v-for="item in entries">
						<div
							v-if="
								item.title != 'Góp ý dịch vụ' ||
								(item.title === 'Góp ý dịch vụ' &&
									GetLocation.slug === 'xathongminh')
							"
							:key="item.title"
							class="service-wrapper flex justify-center"
						>
							<div
								class="service-item col-lg-4 px-1"
								@click="$router.push({ path: `/${$slug}${item.path}` })"
							>
								<div class="service-image-wrapper">
									<img
										loading="lazy"
										:src="item.image"
										alt="Hỗ trợ dịch vụ"
										class="img-cover service-image"
									/>
									<div class="service-line"></div>
								</div>
								<div class="service-title">
									{{ item.title }}
								</div>
							</div>
						</div>
					</template>
				</div>
			</template>
		</home-service>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeService from './home-service.vue'
import HomeHeaderCategory from './home-header-category.vue'

export default {
	name: 'HomeSupportService',
	components: { HomeService, HomeHeaderCategory },
	data() {
		return {
			entries: [
				{
					title: 'Câu hỏi thường gặp',
					image: require('@/assets/images/freq-asked-question.png'),
					path: '/ho-tro-dich-vu/cau-hoi-thuong-gap',
				},
				{
					title: 'Góp ý dịch vụ',
					image: require('@/assets/images/feedback.png'),
					path: '/ho-tro-dich-vu/gop-y-dich-vu',
				},
				{
					title: 'Video hướng dẫn',
					image: require('@/assets/images/video-tutorial.png'),
					path: '/ho-tro-dich-vu/video-huong-dan',
				},
			],
		}
	},
	computed: {
		...mapGetters('location', ['GetLocation']),
	},
}
</script>

<style scoped>
.service-wrapper {
	justify-content: space-evenly;
	row-gap: 2rem;
}

.service-item {
	flex: 1;
	max-width: 280px;
	cursor: pointer;
}

.service-item:hover .service-image {
	transform: scale(1.04);
	filter: drop-shadow(1px 1px 2px #44b97c);
}

.service-image-wrapper {
	padding: 1.5rem;
	height: 280px;
	border: 3px solid #44b97c;
}

.service-image {
	transition: ease-in-out 0.4s;
}

.service-title {
	color: #fff;
	font-size: 22px;
	font-weight: 500;
	text-align: center;
	background-color: #44b97c;
	padding-top: 0.3rem;
	padding-bottom: 1.8rem;
	clip-path: polygon(0 0%, 100% 0%, 100% 70%, 50% 100%, 0 70%);
}

.service-line {
	height: 3px;
	background-color: #44b97c;
	border-radius: 2rem;
}

@media screen and (max-width: 991px) {
	.service-item {
		max-width: 220px;
	}

	.service-title {
		font-size: 18px;
	}

	.service-image-wrapper {
		padding: 1.5rem;
		height: 220px;
		border: 2px solid #44b97c;
	}
}

@media screen and (max-width: 767px) {
	.service-item {
		max-width: 200px;
	}

	.service-title {
		font-size: 17px;
	}

	.service-image-wrapper {
		padding: 1rem;
		height: 200px;
	}
}

@media screen and (max-width: 575px) {
	.service-item {
		max-width: 160px;
	}

	.service-title {
		font-size: 15px;
	}

	.service-image-wrapper {
		padding: 1rem;
		height: 160px;
	}
}

@media screen and (max-width: 500px) {
	.service-item {
		flex: none;
		width: 100%;
		min-width: 210px;
	}

	.service-title {
		font-size: 19px;
	}

	.service-image-wrapper {
		padding: 1rem;
		height: 200px;
	}
}
</style>
