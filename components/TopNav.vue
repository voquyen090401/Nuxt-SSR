<template>
	<div class="nav-wrapper">
		<nav class="nav max-w-6xl mx-auto px-3">
			<div class="nav-branding-wrapper">
				<div
					class="nav-logo-warpper"
					@click="$router.push({ name: 'web.slug.home' })"
				>
					<img
						class="nav-logo"
						loading="lazy"
						src="~/assets/images/logo_header.png"
						alt="logo"
					/>
				</div>
				<Explore ref="explore"></Explore>
				<div class="nav-web-name-wrapper">
					<h1 class="nav-web-name">Xã Thông Minh</h1>
					<div
						class="nav-explore-wrapper"
						@click.prevent="openExplore"
					>
						<span class="nav-explore-name">Khám phá</span
						><i class="bx bx-right-arrow-alt ic-explore"></i>
					</div>
				</div>
			</div>
			<div class="ic-mobile-wrapper">
				<label for="ip-toggle-menu">
					<i class="bx bx-menu ic-mobile-toggle"></i>
				</label>
			</div>
			<input id="ip-toggle-menu" type="checkbox" />
			<label class="overlay-close-menu" for="ip-toggle-menu"> </label>
			<ul class="nav-list-wrapper-lv1">
				<div class="nav-list-branding">
					<label for="ip-toggle-menu">
						<i class="bx bx-x ic-close-nav"></i>
					</label>
					<img
						class="nav-list-branding-logo"
						loading="lazy"
						src="~/assets/images/logo_header.png"
						alt="logo"
					/>
					<h2 class="nav-list-branding-name">XÃ THÔNG MINH</h2>
				</div>
				<li
					v-for="(item_lv1, index_lv1) in menu"
					:key="`${index_lv1}_lv1`"
					class="nav-item-lv1"
				>
					<label
						:for="`${index_lv1}_lv1`"
						class="nav-item-wrapper-lv1"
						@click="handleRedirect(item_lv1)"
					>
						<span class="nav-item-name-lv1">{{
							item_lv1.name
						}}</span>
						<i
							v-if="hasChildren(item_lv1)"
							class="bx bxs-down-arrow ic-arrow-down"
						></i>
						<i
							v-if="hasChildren(item_lv1)"
							class="bx bx-chevron-right ic-arrow-down-mobile"
						></i>
					</label>
					<input
						:id="`${index_lv1}_lv1`"
						class="checked-input"
						type="radio"
						name="rad"
					/>
					<ul
						v-if="hasChildren(item_lv1)"
						class="nav-list-wrapper-lv2"
					>
						<li
							v-for="(item_lv2, index_lv2) in item_lv1.children"
							:key="`${index_lv2}_lv2`"
							class="nav-item-lv2"
							@click="handleRedirect(item_lv2)"
						>
							<span class="nav-item-name-lv2">{{
								item_lv2.name
							}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'HeaderNavbar',
	data() {
		return {
			menu: {},
			entries: [],
		}
	},
	async fetch() {
		await this.getMenu()
	},
	methods: {
		...mapActions('menu', ['ListMenu']),
		openExplore() {
			this.$refs.explore.openModal()
		},
		closeExplore() {
			this.$refs.explore.closeModal()
		},
		hasChildren(parent) {
			return !!parent?.children?.length
		},
		isHashUrl(url) {
			return url === '#'
		},
		isAdminUrl(url) {
			return url.startsWith('https://cms.xathongminh.com')
		},
		handleRedirect(item) {
			if (this.isAdminUrl(item.url)) {
				window.open(item.url, '_blank')
			} else if (!this.isHashUrl(item.url)) {
				this.$router.push({ path: `/${this.$slug}${item.url}` })
			}
		},
		async getMenu() {
			const response = await this.ListMenu()
			if (response.code === 200) {
				this.entries = response.data.entries
			}
			this.setMenu()
		},
		setMenu() {
			if (
				this.$route.params.slug !== 'xathongminh' &&
				this.$route.params.slug
			) {
				this.menu = this.entries.find(
					(item) => item.name === 'Menu xã'
				).content
			} else {
				this.menu = this.entries.find(
					(item) => item.name === 'Menu admin'
				).content
			}
		},
	},
}
</script>

<style>
:root {
	--green-500: #44b97c;
	--green-600: #03803f;
	--orange-600: #e6a11b;
	--transition-slow: 0.15s;
	--gray-100: #ebebeb;
	--gray-400: #252525;
	--top-nav-height: 52px;
}

@media screen and (min-width: 768px) {
	.nav-explore .modal-content {
		width: 700px;
	}
}
</style>

<style scoped>
@keyframes animateSubMenu {
	from {
		opacity: 0;
		transform: translateY(20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.nav-wrapper {
	box-shadow: 0px -1px 2px 1px rgba(0, 0, 0, 0.1),
		0px 1px 1px 1px rgba(0, 0, 0, 0.05);
}

.overlay-close-menu {
	position: fixed;
	left: 0;
	top: 0;
	width: 0%;
}

.ic-mobile-wrapper,
.nav-list-branding,
.ic-arrow-down-mobile,
.nav-list-branding-logo {
	display: none;
}

.checked-input {
	position: fixed;
	right: 9999px;
	opacity: 0;
	transform: scale(0);
}

#ip-toggle-menu {
	position: fixed;
	transform: scale(0);
	right: 999999;
}

.nav {
	padding-top: 8px;
	padding-bottom: 8px;
	color: var(--green-500);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav-logo {
	width: 46px;
	height: 46px;
}

.nav-web-name {
	font-size: 22px;
	font-weight: 700;
}

.nav-branding-wrapper {
	display: flex;
	column-gap: 10px;
	align-items: center;
	cursor: pointer;
}

.nav-explore-wrapper {
	display: flex;
	align-items: center;
	column-gap: 4px;
	width: fit-content;
}

.nav-explore-name {
	font-size: 18px;
	color: var(--orange-600);
}

.ic-explore {
	font-size: 20px;
}

.nav-list-wrapper-lv1 {
	display: flex;
	column-gap: 24px;
}

.nav-item-lv1 {
	position: relative;
}

.nav-item-wrapper-lv1 {
	display: flex;
	align-items: center;
	column-gap: 6px;
	padding: 12px 0;
	cursor: pointer;
}

.nav-item-wrapper-lv1:hover .nav-item-name-lv1 {
	color: var(--green-600);
}

.nav-item-wrapper-lv1:hover .ic-arrow-down {
	transform: translateY(2px);
}

.nav-list-wrapper-lv2 {
	display: none;
	position: absolute;
	z-index: 999;
	left: 0;
	border-radius: 8px;
	min-width: 200px;
	background-color: #fff;
	box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.1);
	animation: animateSubMenu var(--transition-slow) ease-in-out;
}

.nav-item-lv2 {
	padding: 12px 16px;
	cursor: pointer;
	white-space: nowrap;
	transition: ease-in-out var(--transition-slow);
}

.nav-item-lv2:hover .nav-item-name-lv2 {
	color: var(--green-600);
}

.nav-item-name-lv2 {
	color: #000;
}

.ic-arrow-down {
	font-size: 11px;
	color: var(--green-600);
	transition: ease-in-out var(--transition-slow);
	transform: translateY(1px);
}

@media screen and (min-width: 992px) {
	.nav-item-lv1:hover .nav-list-wrapper-lv2 {
		display: block;
	}

	.nav-item-lv1:last-child {
		display: flex;
		align-items: center;
	}

	.nav-item-lv1:last-child .nav-item-wrapper-lv1 {
		background-color: var(--green-500);
		padding: 6px 8px;
		border-radius: 4px;
		transition: ease-in-out var(--transition-slow);
	}

	.nav-item-lv1:last-child .nav-item-wrapper-lv1:hover {
		background-color: var(--green-600);
	}

	.nav-item-lv1:last-child .nav-item-name-lv1 {
		color: #fff;
	}
}

/* md-screen */

@media screen and (max-width: 991px) {
	.ic-mobile-wrapper {
		display: block;
	}

	.ic-arrow-down {
		display: none;
	}

	.ic-arrow-down-mobile {
		display: block;
		color: #000;
		font-weight: 700;
		font-size: 20px;
		margin-right: 28px;
	}

	.checked-input:checked + .nav-list-wrapper-lv2 {
		display: block;
	}

	.nav-list-branding {
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 10px;
		padding: 28px 0;
		border-bottom: 1px solid var(--gray-100);
		position: relative;
	}

	.ic-close-nav {
		position: absolute;
		top: calc(50% + 1px);
		right: 0px;
		transform: translateY(-50%);
		padding: 6px;
		color: var(--gray-400);
		font-size: 34px;
	}

	.nav-list-branding-logo {
		display: block;
		width: 32px;
		height: 32px;
		position: absolute;
		left: 34px;
		top: 50%;
		transform: translateY(-50%);
	}

	.nav-list-branding-name {
		text-align: center;
		font-size: 18px;
		font-weight: 700;
	}

	.ic-mobile-toggle {
		color: var(--gray-400);
		font-size: 40px;
	}

	.nav-list-wrapper-lv1 {
		position: fixed;
		right: -100%;
		top: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		width: 100%;
		max-width: 300px;
		transition: ease-out var(--transition-slow);
	}

	#ip-toggle-menu:checked ~ .nav-list-wrapper-lv1 {
		right: 0;
		box-shadow: -2px 2px 1000px 10px rgba(0, 0, 0, 0.6);
	}

	#ip-toggle-menu:checked ~ .overlay-close-menu {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: 99;
	}

	.nav-item-lv1 {
		border-bottom: 1px solid var(--gray-100);
	}

	.nav-item-lv1:hover .ic-arrow-down-mobile {
		transform: rotate(90deg);
		color: var(--green-600);
	}

	.nav-item-name-lv1 {
		padding-left: 28px;
	}

	.nav-item-wrapper-lv1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-item-name-lv1 {
		color: #000;
	}

	.nav-list-wrapper-lv2 {
		position: unset;
		width: 100%;
		box-shadow: none;
	}

	.nav-item-lv2 {
		padding-left: 40px;
		font-size: 14px;
	}
}
</style>
