<template>
    <div>
        <div v-if="!loading">
            <div class="row mb-4">
                <div class="col-12 d-block" style="gap: 16px">
                    <div id="image-container" class="float-image">
                        <div class="mb-2">
                            <img loading="lazy" alt :src="currentImage.src" class="current-image"
                                @click="showImage(currentImage.index)" @load="getImageHeight" />
                        </div>
                        <div class="sub-image-container">
                            <div v-for="(item, index) in entry.images" :key="index" class="sub-image">
                                <img loading="lazy" alt :src="item" class="device-image_hover border pointer sub-image"
                                    :class="{ 'actice-image': currentImage.index == index }"
                                    @click="changeCurrentImage(item, index)" />
                                <div v-if="index == 3 && entry.images.length > 4"
                                    class="d-none d-md-flex show-more-overlay align-items-center justify-content-center"
                                    @click="showImage(index)">
                                    <p class="text-light mb-0 text-center" style="font-weight: 700; font-size: 24px">
                                        +{{ entry.images.length - 4 }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="content-container" style="position: relative" class="max-h-none">
                        <div class="d-flex flex-column mt-4 mt-md-1" style="gap: 16px">
                            <h3 class="title-text">{{ entry.name }}</h3>
                            <p class="font-size-18 mb-0">
                                <span class="green-text">Loại thiết bị:</span>
                                {{ entry.smart_device_type.name }}
                            </p>
                            <div class="p-3" style="background: rgba(40, 102, 110, 0.15)">
                                <p class="mb-0">
                                    Giá thiết bị:
                                    <span class="green-text font-size-20">{{
                                        $filters.money(entry.price)
                                        }}</span>
                                </p>
                            </div>
                        </div>
                        <div class="px-2">
                            <div class="font-size-18 mb-0 mt-3" style="text-align: justify">
                                <span class="green-text">Chi tiết thiết bị:</span>
                                <div v-html="entry.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="sameTypeDevices.length > 1" class="mb-5 grid grid-cols-1" style="position: relative; z-index: 10">
                <div class="font-size-sm-26 font-size-xs-20 font-weight-500 mt-5 mb-2" style="color: #44494d">
                    Các thiết bị cùng loại
                </div>
                <div v-if="sameTypeDevices.length != 0">
                    <VueSlickCarousel v-bind="settings">
                        <div v-for="(device, index) in sameTypeDevices" :key="index" class="p-3"
                            @click="goDetail(device)">
                            <div class="border-solid border rounded-md p-2">
                                <div class="h-[120px] sm:h-[150px] mb-1">
                                    <img loading="lazy" :src="$addPrefixImage(device?.images?.at(0))"
                                        :alt="device?.name"
                                        class="w-full h-full object-cover rounded-md hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer" />
                                </div>
                                <div>
                                    <b class="line-clamp-1 text-[12px] sm:text-[16px] text-[#4f4f4f]">
                                        {{ device.name }}
                                    </b>
                                    <div class="overflow-hidden text-[12px] text-[#4f4f4f]">
                                        <div class="text-[#44b97c] text-[24px]">
                                            {{ $filters.money(device.price) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </VueSlickCarousel>
                </div>
                <div v-else class="ic-empty-wrapper">
                    <img class="ic-empty" src="@/assets/images/ic-empty.png" />
                    <div>Không có thiết bị nào</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
export default {
    name: "SmartDeviceDetail",
    components: {
        VueSlickCarousel
    },
    data() {
        return {
            loading: true,
            entry: {},
            showMore: false,
            contentHeight: 0,
            currentImage: { src: "", index: 0 },
            sameTypeDevices: [],
            settings: {
                edgeFriction: 0.35,
                infinite: false,
                autoplay: false,
                speed: 1000,
                slidesToShow: 4,
                slidesToScroll: 4,
                centerPadding: '50px',
                responsive: [
                    {
                        breakpoint: 1020,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: false,
                            centerPadding: '50px',
                        },
                    },
                    {
                        breakpoint: 687,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: false,
                            centerPadding: '50px',
                        },
                    },
                ],
            },
        };
    },
    head() {
		return {
			title: `${this.entry.name}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.entry.name}`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: `${this.entry.name}` },
			],
		}
	},
    watch: {
        "$route.params": {
            async handler() {
                await this.getEntry()
                this.getListSmartDevices();
            },
            deep: true
        }
    },
    async created() {
        await this.getEntry();
        this.getListSmartDevices();
    },
    methods: {
        goDetail(device) {
            this.$router.push({ path: `/${this.$slug}/thiet-bi-thong-minh/${device?.id}` })
        },
        async getEntry() {
            const response = await this.$store.dispatch("devices/GetSmartDeviceDetail", this.$route.params.slug_thiet_bi)
            if (response.code === 200) {
                this.entry = response.data.entry;
                this.currentImage.src = response.data.entry.images[0];
                this.currentImage.index = 0;
                this.loading = false;
            }
        },
        changeCurrentImage(image, index) {
            this.currentImage.src = image;
            this.currentImage.index = index;
        },
        async getListSmartDevices() {
            const response = await this.$store.dispatch("devices/ListSmartDevices", this.entry.smart_device_type_id);
            if (response.code === 200) {
                const rawData = response.data.entries;
                this.sameTypeDevices = rawData.filter(
                    (item) => item.id !== this.$route.params.slug_thiet_bi
                );
            }
        },
        async redirectToDetail(id) {
            await this.$router.push({
                name: this.$route.name,
                params: { id },
            });
            await this.getEntry();
            this.showMore = false;
            this.getImageHeight();
            this.getListSmartDevices();
        },
        showImage(index) {
            const options = {
                initialViewIndex: index,
            };
            console.log("options", options);
        },
        getImageHeight() {
            if (!this.showMore) {
                const image = document.querySelector("#image-container");
                const text = document.querySelector("#content-container");
                if (!image || !text) {
                    return
                }
                if (text.offsetHeight > this.contentHeight) {
                    this.contentHeight = text.offsetHeight;
                }
                if (this.contentHeight > image.offsetHeight + 5) {
                    text.style.maxHeight = `${image.offsetHeight}px`;
                } else {
                    const showMoreBtn = document.querySelector(".show-more-text");
                    if (showMoreBtn) {
                        showMoreBtn.style.display = "none";
                    }
                }
            }
        },
    },
};
</script>

<style>
.swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    text-align: center;
    line-height: 14px;
    font-size: 0px;
    color: transparent;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-active {
    color: transparent;
    background: #42b983;
}

@media screen and (max-width: 768px) {
    .swiper-pagination {
        display: none;
    }
}

.swiper-wrapper {
    padding-bottom: 44px;
}
</style>

<style scoped>
ul,
li {
    list-style: circle;
}

.title-text {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0;
}

.current-image {
    width: 100%;
    height: 350px;
    max-height: 350px;
    object-fit: contain;
    object-position: center;
}

.sub-image {
    width: 88px;
    height: 88px;
    object-fit: cover;
    border-radius: 3px;
    border-width: 2px !important;
    display: inline-block;
    position: relative;
}

.rounded {
    border-radius: 20px !important;
}

.device-image_hover:hover {
    border-color: rgba(0, 0, 0, 0.612) !important;
}

.device-image_hover {
    transition: all 0.3s ease;
}

.green-text {
    color: #44b97c;
    font-weight: 500;
}

.actice-image {
    border-color: #44b97c !important;
}

.float-image {
    position: relative;
    z-index: 10;
    width: 100%;
}

.sub-image-container {
    display: flex;
    gap: 8px;
    overflow-y: auto;
}

.show-more-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.516);
    cursor: pointer;
}

.show-more-text:hover {
    color: #199857;
    cursor: pointer;
}

.hide-content-container {
    overflow: hidden;
    text-overflow: ellipsis;
}

.show-more-wrapper {
    position: absolute;
    right: 0;
    bottom: -6px;
    background-color: #fff;
    padding-left: 16px;
}

.max-h-none {
    max-height: none !important;
}

@media screen and (min-width: 768px) {
    .sub-image {
        width: 72px;
        height: 72px;
    }

    .sub-image-container {
        overflow: hidden;
    }

    .float-image {
        width: 320px;
        margin-right: 10px !important;
        float: left;
    }

    .current-image {
        width: 320px;
        height: 290px;
        max-height: 350px;
        object-fit: cover;
        object-position: center;
    }

    .show-more-wrapper {
        bottom: -5px;
    }
}

@media screen and (min-width: 992px) {
    .sub-image {
        width: 100px;
        height: 100px;
    }

    .float-image {
        width: 424px;
        margin-right: 15px !important;
    }

    .current-image {
        width: 424px;
        height: 350px;
    }

    .show-more-wrapper {
        bottom: -3px;
    }

}

/* custom */
.device-wrapper {
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    border: 1px solid #dedede;
}

.device-name {
    font-size: 20px;
}

.device-price {
    font-size: 24px;
}

.device-image {
    border-radius: 4px;
    transition: ease-in-out 0.3s;
}

.device-image:hover {
    transform: scale(1.05);
}

.device-image-wrapper {
    height: 160px;
}

.font-size-sm-26 {
    font-size: 26px;
}

@media screen and (max-width: 768px) {
    .mt-sm-2 {
        margin-top: 1rem;
    }

    .device-name {
        font-size: 16px;
    }

    .device-price {
        font-size: 18px;
    }

    .device-wrapper {
        padding: 0.5rem;
    }

    .device-image-wrapper {
        height: 130px;
    }
}

@media screen and (max-width: 575px) {
    .font-size-xs-20 {
        font-size: 20px;
    }

    .mt-xs-0 {
        margin-top: 0rem;
    }

    .device-wrapper {
        padding: 0;
        overflow: hidden;
        border-radius: 4px;
    }

    .p-xs-1 {
        padding: 0.2rem;
    }

    .device-name {
        font-size: 14px;
        font-weight: 600;
    }

    .device-price {
        font-size: 16px;
    }

    .device-image-wrapper {
        height: 100px;
    }

    .device-image {
        border-radius: 0;
    }
}
</style>