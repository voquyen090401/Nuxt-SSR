<template>
    <div>
        <div v-if="!loading">
            <div class="font-size-24 font-weight-500">{{ entry.name }}</div>
            <div class="my-2 font-size-16">{{ $filters.dateTime(entry.created_at, "HH:mm, DD/MM/YYYY") }}</div>
            <div class="font-size-16 mt-2 mb-2">Lĩnh vực:
                <span v-for="(tag, index) in entry.tags" :key="'tag' + index" class="text-default">
                    {{ index == 0 ? tag : ", " + tag }}
                </span>
            </div>
            <div style="color: #28666E">{{ entry.description.slice(0, 1).toUpperCase() + entry.description.slice(1) }}
            </div>
            <div>
                <div v-if="contentCount > 1" class="d-flex flex-column position-relative mb-2 mr-3 content-list">
                    <div v-for="(content, index) in entry.content" :key="index" class="d-flex"
                        style="gap: 10px; cursor: pointer;" @click="goToContent(index + 1)">
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-center align-items-center">
                                <img loading="lazy" src="@/assets/images/solution/logo.png" :alt="content.title"
                                    style="width: 26px; height: 26px; background-color: #fff; border-radius: 50%;">
                            </div>
                            <span v-if="index < (entry.content.length - 1)" class="span-link mx-auto"
                                :class="{ 'active-span-link': index == selected }"></span>
                        </div>
                        <div :id="'contentText' + index" class="font-size-16 position-relative mb-1"
                            style="width: fit-content; font-weight: 500;">
                            <a class="solution-color" aria-label="link" :href="'#' + (index + 1)"
                                @click.prevent="goToContent(index + 1)">
                                {{ content.title }}
                            </a>
                        </div>
                    </div>
                    <div class="solution-border position-absolute" style="margin-top: 12px;">
                    </div>
                </div>
                <div v-for="(content, index) in entry.content" :key="index" class="pt-3 pt-md-1 pb-md-2">
                    <div :id="index + 1" class="font-weight-bold mb-2 font-size-20 solution-color">{{ content.title }}
                    </div>
                    <div class="text-justify solution-color font-size-16" v-html="content.sub_content"></div>
                </div>
            </div>
            <hr>
            <div v-if="sameFieldEntries.length != 0" class="font-size-20 font-size-xs-20 font-weight-500 text-default mt-2 mb-2">GIẢI PHÁP CÙNG LĨNH VỰC
            </div>
            <div v-if="sameFieldEntries.length != 0" class="mb-5">
                <swiper :breakpoints="breakpoints" :slides-per-view="1" :modules="modules" :navigation="false"
                    :pagination="{
                        clickable: true,
                    }" :autoplay="{
                        delay: 3000,
                        disableOnInteraction: true,
                    }">
                    <swiper-slide v-for="(item, index) in sameFieldEntries" :key="'sameCate' + index"
                        @click="$router.push({ name: 'web.slug.smart-solutions.detail', params: { id: item.id } })">
                        <div class="more-solution-item">
                            <div class="more-solution-image-wrapper">
                                <img loading="lazy" class="img-cover more-solution-image" :src="item.image"
                                    :alt="item.name">
                            </div>
                            <div class="more-solution-name text-truncate">
                                {{ item.name }}
                            </div>
                            <div class="more-solution-time">
                                {{ $filters.dateTime(item.created_at, "HH:mm, DD/MM/YYYY") }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SmartSolutionDetail',
    data() {
        return {
            entry: {},
            sameFieldEntries: [],
            time: '',
            contentCount: 0,
            loading: true,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    slidesPerGroup: 2
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    slidesPerGroup: 3
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                    slidesPerGroup: 3
                },
                1199: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    slidesPerGroup: 4
                }
            },
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            }
        }
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
        "$route.params.id": {
            handler() {
                this.getSmartSolutionDetail()
            },
            deep: true,
        }
    },
    created() {
        this.getSmartSolutionDetail()
    },
    methods: {
        goToContent(id) {
            const tag = document.getElementById(id + '')
            window.scrollTo(0, tag.offsetTop - 20)
        },
        async getSmartSolutionDetail() {
            const response = await this.$store.dispatch("smartSolutions/GetSmartSolutionDetail", this.$route.params.slug_giai_phap)
            if (response.code === 200) {
                this.entry = await response.data.entry
                this.contentCount = this.entry.content ? this.entry.content.length : 0
                this.getTheSameFieldSolution(this.entry.tag_ids[0])
                this.loading = false
            }
        },
        async getTheSameFieldSolution(fieldId) {
            const option = {
                'tag-id': fieldId
            }
            const response = await this.$store.dispatch("smartSolutions/ListSmartSolutions", option)
            this.sameFieldEntries = response.data.entries.filter(item => item.id !== this.entry.id);
        },
    },

}
</script>

<style scoped>
.solution-color {
    color: #28666E;
}

.line-height-26 {
    line-height: 26px;
}

.line-17 {
    line-height: 1.7;
}

.solution-border {
    border-bottom: 1px solid #737373;
    top: 100%;
    left: -10px;
    right: 0;
}

a {
    text-decoration: none;
}

.description {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #28666E;
}

.content-list {
    margin-left: 15px;
}

.span-link {
    height: 100%;
    min-height: 10px;
    width: 4px;
    background-color: rgb(40, 102, 110);
}

@media only screen and (min-width: 768px) {

    .content-list {
        width: fit-content;
        float: left;
        margin: 15px;
        margin-bottom: 0;
        max-width: 350px;
    }
}

/* more solution */

.more-solution-item {
    cursor: pointer;
}

.more-solution-image-wrapper {
    height: 180px;
    margin-bottom: 0.2rem;
}

.more-solution-image-wrapper:hover .more-solution-image {
    transform: scale(1.03);
}

.more-solution-image {
    transition: ease-in-out 0.4s;
    border-radius: 4px;
}

.more-solution-name {
    font-size: 18px;
    font-weight: 500;
    text-transform: capitalize;
}

.more-solution-time {
    font-size: 14px;
}

@media screen and (max-width: 575px) {
    .more-solution-name {
        font-size: 16px;
    }

    .more-solution-image-wrapper {
        height: 140px;
    }

    .font-size-xs-20 {
        font-size: 20px;
    }
}
</style>