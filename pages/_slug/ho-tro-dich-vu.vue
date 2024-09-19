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
    name: "SupportService",
    data() {
        return {
            breadcrumb: [
                {
                    name: "Trang chủ",
                    href: "/home",
                },
                {
                    name: "Hỗ trợ dịch vụ",
                    active: true,
                },
            ],
        };
    },
    watch: {
        "$route.name": {
            handler() {
                this.handleBreadcrumb();
            },
        },
    },
    created() {
        this.handleBreadcrumb();
    },
    methods: {
        handleBreadcrumb() {
            const name = this.$route.name;
            switch (name) {
                case "slug-ho-tro-dich-vu-cau-hoi-thuong-gap":
                    this.breadcrumb = [
                        {
                            name: "Trang chủ",
                            href: "/home",
                        },
                        {
                            name: "Câu hỏi thường gặp",
                            active: true,
                        },
                    ];
                    break;
                case "slug-ho-tro-dich-vu-gop-y-dich-vu":
                    this.breadcrumb = [
                        {
                            name: "Trang chủ",
                            href: "/home",
                        },
                        {
                            name: "Góp ý dịch vụ",
                            active: true,
                        },
                    ];
                    break;
                case "slug-ho-tro-dich-vu-video-huong-dan":
                    this.breadcrumb = [
                        {
                            name: "Trang chủ",
                            href: "/home",
                        },
                        {
                            name: "Video hướng dẫn",
                            active: true,
                        },
                    ];
                    break;
            }
        },
    },
};
</script>