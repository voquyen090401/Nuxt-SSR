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
					name: 'Dịch vụ số nông thôn',
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
				case 'slug-dich-vu-so-nong-thon':
					this.breadcrumb = [
						{
							name: 'Trang chủ',
							href: '/tong-quan',
						},
						{
							name: 'Dịch vụ số nông thôn',
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
							name: 'Dịch vụ số nông thôn',
							href: '/dich-vu-so-nong-thon',
						},
						{
							name: 'Chi tiết dịch vụ',
							active: true,
						},
					]
			}
		},
	},
}
</script>
