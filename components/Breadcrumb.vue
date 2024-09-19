<template>
	<div class="flex justify-start flex-wrap py-4">
		<span
			v-for="(item, index) in value"
			:key="index"
			class="flex items-center"
		>
			<a
				:href="`/${$slug}${item.href}`"
				:class="{
					'text-[#44B97C] pointer-events-none ': item.active,
					'text-[#D4D4D4] hover:text-[#727272] pointer-events-auto cursor-pointer':
						!item.active,
				}"
				>{{ item.name }}</a
			>
			<i
				v-if="!(value.length == index + 1)"
				class="bx bx-chevron-right text-[#D4D4D4] px-1"
			></i>
		</span>
	</div>
</template>

<script>
export default {
	name: 'PageBreakcrumb',
	props: {
		value: {
			type: Array,
			default: () => [],
			require: true,
		},
	},
}
</script>
