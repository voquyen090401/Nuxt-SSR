<template>
	<div class="bg-[rgb(68,185,124)] py-3 px-3">
		<div
			class="max-w-6xl mx-auto block sm:flex sm:justify-between sm:items-center h-full text-white text-[12px] sm:text-[14px] font-inter"
		>
			<div class="text-center sm:text-left">
				{{ GetLocationContact.address }}
			</div>
			<div>
				<span class="mr-2 block sm:inline text-center sm:text-left"
					>Email: {{ GetLocationContact.email }}</span
				>
				<span class="block sm:inline text-center sm:text-left"
					>Liên hệ: {{ GetLocationContact.phone }}</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'TopBar',
	computed: {
		...mapGetters('location', ['GetLocationContact']),
	},
}
</script>
