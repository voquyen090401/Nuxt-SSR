<template>
	<ul
		v-if="
			pagination.page < total + 1 && pagination.total <= pagination.limit
		"
		class="pagination pagination-rounded justify-content-center my-2"
		:class="{ 'd-none': total < 2 }"
	>
		<li v-if="toogleFirtPagination" class="page-item">
			<a
				class="page-link"
				href="javascript: void(0);"
				aria-label="Previous"
				@click="firstPage"
			>
				<img
					loading="lazy"
					src="@/assets/images/chevron-double-left.svg"
					alt=""
				/>
			</a>
		</li>
		<li v-if="pagination.page > 1" class="page-item">
			<a
				class="page-link"
				href="javascript: void(0);"
				aria-label="Previous"
				@click="prevPage"
			>
				<img
					loading="lazy"
					src="@/assets/images/chevron-left.svg"
					alt=""
				/>
			</a>
		</li>
		<li
			v-if="total === pagination.page && total > 2"
			class="page-item"
			@click="prevTwoPage"
		>
			<a
				aria-label="link"
				class="page-link"
				href="javascript: void(0);"
				>{{ pagination.page - 2 }}</a
			>
		</li>
		<li
			v-if="
				pagination.page === 2 ||
				(pagination.page > total - 2 && total >= 3)
			"
			class="page-item"
			@click="prevPage"
		>
			<a aria-label="link" class="page-link" href="javascript: void(0);"
				>{{ pagination.page - 1 }}
			</a>
		</li>
		<li class="page-item">
			<a
				aria-label="link"
				class="page-link active"
				href="javascript: void(0);"
				>{{ pagination.page }}</a
			>
		</li>
		<li
			v-if="
				(pagination.page < total - 1 && pagination.page !== 2) ||
				(total <= 3 && pagination.page < 2 && total !== 1) ||
				(total <= 4 && total - pagination.page === 2)
			"
			class="page-item"
			@click="nextPage"
		>
			<a
				aria-label="link"
				class="page-link"
				href="javascript: void(0);"
				>{{ pagination.page + 1 }}</a
			>
		</li>
		<li v-if="total - pagination.page > 2 && total > 3" class="page-item">
			<a
				aria-label="link"
				class="page-link dot"
				href="javascript: void(0);"
				>...</a
			>
		</li>
		<li
			v-if="total > 2 && pagination.page !== total"
			class="page-item"
			@click="lastPage"
		>
			<a
				aria-label="link"
				class="page-link"
				href="javascript: void(0);"
				>{{ total }}</a
			>
		</li>
		<li
			v-if="
				pagination.page < total &&
				pagination.page !== total &&
				total > 2
			"
			class="page-item"
			:class="{
				disabled: !(total - pagination.page),
			}"
		>
			<a
				class="page-link"
				href="javascript: void(0);"
				aria-label="Next"
				@click="nextPage"
			>
				<img
					loading="lazy"
					src="@/assets/images/chevron-right.svg"
					alt=""
				/>
			</a>
		</li>
		<li v-if="pagination.page > 0" class="page-item">
			<a
				v-if="toogleLastPagination"
				class="page-link"
				href="javascript: void(0);"
				aria-label="Previous"
				@click="lastPage"
			>
				<img
					loading="lazy"
					src="@/assets/images/chevron-double-right.svg"
					alt=""
				/>
			</a>
		</li>
	</ul>
</template>
<script>
export default {
	name: 'TablePagination',
	props: {
		allowedExport: {
			type: Boolean,
			default: false,
		},
		pagination: {
			type: Object,
			default: function () {
				return {}
			},
		},
	},
	data() {
		return {
			total: 0,
			page: 1,
			limit: 12,
		}
	},
	computed: {
		toogleFirtPagination() {
			// const query = { ...this.$route.query };
			const currentPage = Math.ceil(
				this.pagination.total / this.pagination.length
			)
			let toogle = null
			if (
				// query.page === 1 ||
				currentPage === 1 ||
				(this.pagination.page <= 3 && currentPage <= 3) ||
				this.pagination.page <= 2
			) {
				// console.log("false");
				toogle = false
			} else {
				toogle = true
			}
			return toogle
		},
		toogleLastPagination() {
			// const query = { ...this.$route.query };
			const currentPage = Math.ceil(
				this.pagination.total / this.pagination.length
			)
			let toogle = null
			if (currentPage - this.pagination.page <= 2 || currentPage < 3) {
				toogle = false
			} else {
				toogle = true
			}

			return toogle
		},
	},
	watch: {
		pagination: {
			handler(newVal, oldVal) {
				this.total = Math.ceil(
					this.pagination.total / this.pagination.length
				)
				if (newVal.page !== oldVal.page) {
					window.scrollTo(0, 0)
				}
			},
			deep: true,
		},
	},

	created() {
		// console.log(this.total);
	},
	mounted() {
		this.total = Math.ceil(this.pagination.total / this.pagination.length)
		// console.log(this.total);
	},
	methods: {
		firstPage() {
			const query = { ...this.$route.query }
			query.page = 1
			this.$router.replace({
				name: this.$route.name,
				query,
				params: this.$route.params,
			})
		},
		nextPage() {
			const canNext =
				Math.ceil(this.pagination.total / this.pagination.length) -
				this.pagination.page
			if (canNext) {
				const query = {
					...this.$route.query,
				}
				query.page = 1 + this.pagination.page
				this.$router.replace({
					name: this.$route.name,
					query,
					params: this.$route.params,
				})
			}
		},
		lastPage() {
			const canNext =
				Math.ceil(this.pagination.total / this.pagination.length) -
				this.pagination.page
			if (canNext) {
				const query = {
					...this.$route.query,
				}
				query.page = Math.ceil(
					this.pagination.total / this.pagination.length
				)
				this.$router.replace({
					name: this.$route.name,
					query,
					params: this.$route.params,
				})
			}
		},
		prevPage() {
			const query = {
				...this.$route.query,
			}
			query.page = this.pagination.page - 1
			this.$router.replace({
				name: this.$route.name,
				query,
				params: this.$route.params,
			})
		},
		prevTwoPage() {
			const query = {
				...this.$route.query,
			}
			query.page = this.pagination.page - 2
			this.$router.replace({
				name: this.$route.name,
				query,
				params: this.$route.params,
			})
		},
	},
}
</script>

<style scoped>
.page-item {
	border-radius: 5px !important;
	margin: 0.125rem;
}

.page-link {
	background: rgba(3, 147, 42, 0.05) !important;
	font-size: 0.875rem;
	color: #333333;
	border-radius: 5px !important;
	width: 40px;
	height: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.1s ease-in;
}

.page-link:hover:not(.dot):not(.active) {
	background: rgba(3, 147, 42, 0.4) !important;
	transform: scale(1.1);
}

.active {
	background: #18a55b !important;
	color: #fff;
}

i {
	font-size: 1.5rem;
}
</style>
