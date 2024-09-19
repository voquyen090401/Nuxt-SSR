<template>
	<footer class="font-inter bg-[#44b97c]">
		<div class="col-10 mx-auto text-white style-border-top px-0 pb-4 pt-2">
			<div class="d-flex flex-column flex-lg-row justify-content-between">
				<span class="font-xs-10 pointer"
					>Nền tảng tích hợp dịch vụ nông thôn thông minh (Phiên bản:
					1.0.0)</span
				>
				<span class="font-xs-10 text-right pointer"
					>© Bản quyền thuộc về Nông Nghiệp Số, 2022</span
				>
			</div>
		</div>
	</footer>
</template>

<script>
import { LINK_IOS, LINK_ANDROID } from '@/constants/link_app'
export default {
	name: 'AppFooter',
	data() {
		return {
			LINK_IOS,
			LINK_ANDROID,
		}
	},
}
</script>

<script>
export default {
	name: 'FooterComponent',
}
</script>

<style scoped>
.style-border-top {
	border-top: 3px solid #fff;
}

.img-download {
	width: 180px;
}

.contact-icon {
	width: 170px;
}

span {
	font-style: normal;
	font-weight: 400;
	line-height: 21px;
}

.flex-gap {
	align-items: center;
}

.py-5 {
	padding-bottom: 1.5rem !important;
}

@media (max-width: 575px) {
	.col-xs-0 {
		display: none;
	}

	.col-xs-center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.style-col-xs {
		display: block;
		text-align: center;
	}

	.py-xs {
		padding-top: 1rem !important;
		padding-bottom: 1rem !important;
	}

	.font-xs-10 {
		font-size: 10px;
		text-align: center !important;
	}

	.img-download {
		width: 140px;
	}

	.contact-icon {
		width: 140px;
	}

	.flex-xs-center {
		justify-content: center;
	}

	.mx-xs-center {
		margin: 0 auto;
	}
}

@media (max-width: 400px) {
	.font {
		font-size: 13.5px;
	}

	.flex-xs-center {
		justify-content: stretch;
	}

	.footer_flex {
		display: flex;
		text-align: center;
	}

	.contact-icon {
		display: block !important;
		text-align: right;
	}

	.footer {
		font-size: 16px;
	}

	.footer-icon {
		font-size: 22px;
		margin-right: 8px;
	}

	.mx-xs-center {
		margin: 0;
	}

	.py-xs {
		padding: 0;
	}

	.flex-column {
		flex-direction: initial !important;
	}

	.mb-3 {
		margin-bottom: 0;
	}

	.mb-3 {
		padding-bottom: 0 !important;
	}

	.img-download {
		width: 140px !important;
		height: 45px !important;
	}
}
</style>
