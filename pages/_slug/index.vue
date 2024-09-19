<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'IndexSlugPage',
	mounted() {
		this.$router.push({ path: `/${this.$slug}/tong-quan` })
	},
}
</script>
