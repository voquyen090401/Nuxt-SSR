<template>
	<div
		v-if="open === true"
		class="fixed top-0 right-0 bottom-0 left-0 bg-black/30 z-[98] overflow-hidden"
		@click="closeModal()"
	>
		<div
			class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white w-[700px] max-w-full max-h-full rounded-lg z-[99] p-4"
			@click.stop.prevent="() => {}"
		>
			<div class="flex items-center justify-between mb-6">
				<div class="flex items-center gap-x-1">
					<img
						width="34px"
						height="34px"
						src="~/assets/images/logo_header.png"
						alt="XTM"
						loading="lazy"
					/>
					<h3 class="text-[#28666e] font-inter font-bold">
						XÃ THÔNG MINH
					</h3>
				</div>
				<i
					class="bx bx-x text-xl hover:text-[#28666e]"
					@click="closeModal()"
				></i>
			</div>
			<div class="px-2">
				<div class="mb-6">
					<h5 class="text-[#14a44d] text-[20px]">
						Mô hình Xã Thông Minh được xây dựng dựa trên các yếu tố
						thế mạnh và nhu cầu của từng địa phương
					</h5>
				</div>
				<div class="grid-cols-12 gap-x-4 mb-4 grid">
					<p
						class="hidden sm:block col-span-12 sm:col-span-7 text-[#2e3235] text-[14px] text-justify"
					>
						Các giải pháp của mô hình Xã Thông Minh được lựa chọn,
						xây dựng và triển khai dựa trên các yếu tố thế mạnh về
						văn hóa, kinh tế xã hội,... và nhu cầu của người dân,
						cán bộ chính quyền ở khu vực nông thôn.
					</p>
					<div class="col-span-12 sm:col-span-5 justify-self-center">
						<img
							src="~/assets/images/explore.png"
							alt="explore"
							loading="lazy"
						/>
					</div>
				</div>
				<div class="mb-4">
					<div
						class="text-[18px] text-[#4f4f4f] font-semibold text-center"
					>
						Chọn địa điểm bạn cần đến để khám phá
					</div>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-x-1 gap-y-2">
					<div>
						<multiselect
							v-model="province"
							label="name"
							track-by="id"
							:allow-empty="false"
							:clear-on-select="false"
							placeholder="Chọn Tỉnh/Thành"
							:show-labels="false"
							:searchable="true"
							:options="provinces"
						>
							<template #noResult
								><span>Không có dữ liệu</span></template
							>
							<template #noOptions
								><span>Không có dữ liệu</span></template
							>
						</multiselect>
					</div>
					<div>
						<multiselect
							v-model="district"
							label="name"
							track-by="id"
							:allow-empty="false"
							:clear-on-select="false"
							placeholder="Chọn Quận/Huyện"
							:show-labels="false"
							:searchable="true"
							:options="districts"
						>
							<template #noResult
								><span>Không có dữ liệu</span></template
							>
							<template #noOptions
								><span>Không có dữ liệu</span></template
							>
						</multiselect>
					</div>
					<div>
						<multiselect
							v-model="ward"
							label="name"
							track-by="id"
							:allow-empty="false"
							:clear-on-select="false"
							placeholder="Chọn Phường/xã"
							:show-labels="false"
							:searchable="true"
							:options="wards"
						>
							<template #noResult
								><span>Không có dữ liệu</span></template
							>
							<template #noOptions
								><span>Không có dữ liệu</span></template
							>
						</multiselect>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'
export default {
	name: 'ExploreModal',
	components: {
		Multiselect,
	},
	data() {
		return {
			provinces: [],
			districts: [],
			wards: [],
			province: null,
			district: null,
			ward: null,
			open: false,
		}
	},
	watch: {
		province: {
			handler() {
				this.districts = []
				this.district = null
				if (this.province) {
					this.getDistricts(this.province.id)
				}
			},
			deep: true,
		},
		district: {
			handler() {
				this.wards = []
				this.ward = null
				if (this.district) {
					this.getWards(this.district.id)
				}
			},
			deep: true,
		},
		ward: {
			handler() {
				if (this.ward) {
					console.log(`/${this.ward.slug}/tong-quan`)
					window.location.href = `/${this.ward.slug}/tong-quan`
				}
			},
		},
		deep: true,
	},
	created() {
		this.getProvinces()
	},
	methods: {
		...mapActions('address', [
			'ListProvinces',
			'ListDistricts',
			'ListWards',
		]),
		async getProvinces() {
			const response = await this.ListProvinces()
			if (response.code === 200) {
				this.provinces = response.data.entries
			}
		},
		async getDistricts(options) {
			const response = await this.ListDistricts(options)
			if (response.code === 200) {
				this.districts = response.data.entries
			}
		},
		async getWards(options) {
			const response = await this.ListWards(options)
			if (response.code === 200) {
				this.wards = response.data.entries
			}
		},
		toggleScrollHtml() {
			console.log('ok')
			document.querySelector('#__nuxt').classList.toggle('h-[100vh]')
			document
				.querySelector('#__nuxt')
				.classList.toggle('overflow-hidden')
		},
		openModal() {
			this.open = true
			this.toggleScrollHtml()
		},
		closeModal() {
			this.open = false
			this.toggleScrollHtml()
		},
		toggleModal() {
			if (this.open === true) {
				this.closeModal()
			} else {
				this.openModal()
			}
		},
	},
}
</script>
