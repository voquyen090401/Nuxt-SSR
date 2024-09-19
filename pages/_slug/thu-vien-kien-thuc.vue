<template>
	<div class="max-w-6xl px-3 mx-auto">
		<Breadcrumb :value="breadcrumb" />
		<div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'TinTuc',
	data() {
		return {
			breadcrumb: [
				{
					name: 'Trang chủ',
					href: '/tong-quan',
				},
				{
					name: 'Thư viện kiến thức',
					active: true,
				},
			],
		}
	},
	watch: {
		$route: {
			handler() {
				this.handleBreadcrumb()
			},
		},
	},
	created() {
		this.handleBreadcrumb()
	},
	methods: {
		handleBreadcrumb() {
			const name = this.$route.name
			switch (name) {
				case 'slug-thu-vien-kien-thuc':
					this.breadcrumb = [
						{
							name: 'Trang chủ',
							href: '/tong-quan',
						},
						{
							name: 'Thư viện kiến thúc',
							active: true,
						},
					]
					break
				default:
					this.breadcrumb = [
						{
							name: 'Trang chủ',
							href: '/tong-quan',
						},
						{
							name: 'Thư viện kiến thức',
							href: '/thu-vien-kien-thuc',
						},
						{
							name: 'Chi tiết',
							active: true,
						},
					]
			}
		},
	},
}
</script>
