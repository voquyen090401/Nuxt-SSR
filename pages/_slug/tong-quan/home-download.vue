<template>
	<div class="bg-[#f2f2f2] py-3">
		<div class="max-w-6xl mx-auto px-0 md:px-3 py-3">
			<div class="background-download h-[180px] sm:h-[327px]">
				<div class="grid grid-cols-12 h-full">
					<div
						class="col-start-5 sm:col-start-6 col-span-7 sm:col-span-6"
					>
						<div class="flex items-center h-full">
							<div>
								<div
									class="text-[#1e6d5b] text-[16px] sm:text-[24px] lg:text-[30px] font-bold py-1 sm:py-2 lg:py-3"
								>
									Tải ứng dụng ngay nào !!!
								</div>
								<div class="text-white py-0 sm:py-2 lg:py-3">
									<div class="flex items-center">
										<img
											class="w-4 h-3 sm:w-[20px] sm:h-[20px]"
											width="14"
											height="12"
											loading="lazy"
											src="@/assets/images/check.png"
											alt="thumbnail"
										/>
										<span
											class="text-[11px] sm:text-[13px] lg:text-[16px]"
											>Theo dõi và cập nhật thông tin phản
											ánh một cách dễ dàng</span
										>
									</div>
								</div>
								<div class="text-white py-0 sm:py-2 lg:py-3">
									<div class="flex items-center">
										<img
											class="w-4 h-3 sm:w-[25px] sm:h-[25px]"
											width="14"
											height="12"
											loading="lazy"
											src="@/assets/images/check.png"
											alt="thumbnail"
										/>
										<span
											class="text-[11px] sm:text-[13px] lg:text-[16px]"
											>Theo dõi và cập nhật thông tin phản
											ánh một cách dễ dàng</span
										>
									</div>
								</div>
								<div class="text-white py-0 sm:py-2 lg:py-3">
									<div class="flex items-center">
										<img
											class="w-4 h-3 sm:w-[25px] sm:h-[25px]"
											width="14"
											height="12"
											loading="lazy"
											src="@/assets/images/check.png"
											alt="thumbnail"
										/>
										<span
											class="text-[11px] sm:text-[13px] lg:text-[16px]"
											>Theo dõi và cập nhật thông tin phản
											ánh một cách dễ dàng</span
										>
									</div>
								</div>
								<div class="flex mt-1">
									<a
										aria-label="link"
										:href="LINK_IOS"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											alt="thumbnail"
											loading="lazy"
											src="@/assets/images/app-store.png"
										/>
									</a>
									<a
										aria-label="link"
										:href="LINK_ANDROID"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											loading="lazy"
											src="@/assets/images/ch_play.png"
											alt="thumbnail"
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { LINK_IOS, LINK_ANDROID } from '@/constants/link_app'
</script>

<style scoped>
.background-download {
	width: 100%;
	background: url('@/assets/images/bg-download.png') no-repeat center
		center/cover;
}
</style>
