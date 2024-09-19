<template>
	<div class="container">
		<div class="home-header-wrapper">
			<h3 class="home-header-title">{{ title }}</h3>
			<div class="home-header-category">
				<div
					v-for="(item, index) in categories"
					:key="index"
					class="home-header-category-item"
					:class="{ 'category-selected': selected == index }"
					@click="update(item, index)"
				>
					{{ item.name }}
				</div>
			</div>
			<div
				v-if="viewAll"
				class="home-header-all"
				@click="$emit('viewAll')"
			>
				<span class="home-header-all-text">Xem tất cả</span>
				<i class="bx bx-chevrons-right ic-home-all"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HomeCategory',
	props: {
		categories: {
			type: Array,
			require: true,
			default: () => [],
		},
		title: {
			type: String,
			require: true,
			default: '',
		},
		viewAll: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			selected: 0,
		}
	},
	methods: {
		update(item, index) {
			if (this.selected === index) return
			this.selected = index
			this.$emit('update', item)
		},
	},
}
</script>

<style scoped>
.category-selected {
	color: #44b97c;
	border-bottom: 2px solid #44b97c;
}

.home-header-wrapper {
	display: flex;
	justify-content: space-between;
	column-gap: 0.5rem;
	align-items: center;
}

.home-header-title {
	color: #44b97c;
	font-size: 28px;
	font-weight: 700;
	white-space: nowrap;
}

.home-header-category {
	display: flex;
	justify-content: center;
	flex: 1;
	width: fit-content;
	overflow: auto;
}

.home-header-category-item {
	padding: 0 0.5rem;
	white-space: nowrap;
	cursor: pointer;
}

.home-header-category-item:hover {
	color: #48916b;
}

.home-header-all {
	white-space: nowrap;
	color: #44b97c;
	display: flex;
	align-items: center;
	cursor: pointer;
}

.home-header-all-text {
}

.ic-home-all {
}

@media screen and (max-width: 991px) {
	.home-header-category {
		display: flex;
		justify-content: space-between;
		column-gap: 0.5rem;
		align-items: flex-start;
	}
}

@media screen and (max-width: 767px) {
	.home-header-title {
		font-size: 22px;
	}

	.home-header-category {
		padding-top: 1rem;
		min-width: 575px;
		order: 1;
	}

	.home-header-wrapper {
		flex-wrap: wrap;
	}
}

@media screen and (max-width: 575px) {
	.home-header-title {
		font-size: 20px;
	}

	.home-header-category {
		min-width: 420px;
		order: 1;
	}
}

@media screen and (max-width: 420px) {
	.home-header-title {
		font-size: 18px;
	}

	.home-header-all {
		font-size: 14px;
	}

	.home-header-category {
		min-width: 280px;
		order: 1;
	}

	.home-header-category-item {
		font-size: 14px;
	}
}
</style>
