<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'IndexPage',
	mounted() {
		this.$router.push({ path: `/${this.$slug}/tong-quan` })
	},
}
</script>
