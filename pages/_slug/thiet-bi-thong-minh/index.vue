<template>
    <div class="grid grid-cols-1">
        <smart-device-filters />
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            <div v-for="(entry, index) in entries" :key="index" class="border-solid border rounded-md p-3"
                @click="goDetail(entry)">
                <div class="p-2">
                    <div class="h-[150px] mb-1">
                        <img loading="lazy" :src="$addPrefixImage(entry?.images?.at(0))" :alt="entry?.name"
                            class="w-full h-full object-cover rounded-md hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer" />
                    </div>
                    <div>
                        <b class="line-clamp-1 text-[12px] sm:text-[16px] text-[#4f4f4f]">
                            {{ entry.name }}
                        </b>
                        <div class="overflow-hidden text-[12px] text-[#4f4f4f]">
                            <div class="text-[#44b97c] text-[24px]">
                                {{ $filters.money(entry.price) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center">
            <Pagination :pagination="pagination" />
        </div>
    </div>
</template>

<script>
import SmartDeviceFilters from "./partials/smart-device-filters.vue"
export default {
    name: 'DevicesList',
    components: {
        SmartDeviceFilters
    },
    data() {
        return {
            pagination: {
                deleted: false,
                length: 12,
                order_by: "created_at",
                order_dir: "desc",
                search: "",
                page: 1,
                total: 35
            },
            entries: [],
        }
    },
    head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Thiết bị thông minh`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Thiết bị thông minh`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Thiết bị thông minh` },
			],
		}
	},
    watch: {
        "$route.query": {
            handler() {
                this.getListSmartDevices()
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        async getListSmartDevices() {
            const response = await this.$store.dispatch('devices/ListSmartDevices', this.$route.query)
            if (response.code === 200) {
                this.entries = response.data.entries
                this.pagination = response.data.pagination
            }
        },
        goDetail(entry) {
            this.$router.push({ path: `/thiet-bi-thong-minh/${entry?.id}` })
        },
    },
}
</script>