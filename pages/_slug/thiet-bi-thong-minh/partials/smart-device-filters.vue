<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <multiselect v-model="typeSelected" label="name" track-by="id" :allow-empty="true" :clear-on-select="false"
                placeholder="Loại thiết bị"  :show-labels="false" :searchable="true"
                :options="listTypes">
                <template #noResult><span>Không có dữ liệu</span></template>
                <template #noOptions><span>Không có dữ liệu</span></template>
            </multiselect>
            <multiselect v-model="priceSelected" label="name" track-by="name" :allow-empty="true" :clear-on-select="false"
                placeholder="Giá thiết bị"   :show-labels="false" :searchable="true" 
                :options="listPrices">
                <template #noResult><span>Không có dữ liệu</span></template>
                <template #noOptions><span>Không có dữ liệu</span></template>
            </multiselect>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            listTypes: [],
            typeSelected: null,
            priceSelected: null,
            listPrices: [
                {
                    name: 'Dưới 1 triệu',
                    value: {
                        "min-price": null,
                        "max-price": '1000000'
                    }
                },
                {
                    name: 'Từ 1 triệu đến 3 triệu',
                    value: {
                        "min-price": '1000000',
                        "max-price": '3000000'
                    }
                },
                {
                    name: 'Từ 3 triệu đến 5 triệu',
                    value: {
                        "min-price": '3000000',
                        "max-price": '5000000'
                    }
                },
                {
                    name: 'Từ 5 triệu đến 10 triệu',
                    value: {
                        "min-price": '5000000',
                        "max-price": '10000000'
                    }
                },
                {
                    name: 'Trên 10 triệu',
                    value: {
                        "min-price": '10000000',
                        "max-price": null,
                    }
                },
            ]
        }
    },
    watch: {
        "typeSelected": {
            handler() {
                const option = {
                    ...this.$route.query
                }
                if (this.typeSelected?.id) {
                    option['smart-device-type'] = this.typeSelected.id
                }
                else {
                    delete option['smart-device-type']
                }
                this.$router.push({ name: this.$route.name, query: option })
            },
            deep: true
        },
        "priceSelected": {
            handler() {
                const option = {}
                if (this.$route.query['smart-device-type']) {
                    option['smart-device-type'] = this.$route.query['smart-device-type']
                }
                const fromPrice = this.priceSelected?.value['min-price'] ?? null
                const toPrice = this.priceSelected?.value['max-price'] ?? null
                if (fromPrice) {
                    option['min-price'] = fromPrice
                }
                if (toPrice) {
                    option['max-price'] = toPrice
                }
                this.$router.push({ name: this.$route.name, query: option })
            },
            deep: true
        }
    },
    async created() {
        await this.getSmartDeviceType()
        if (this.$route.query['smart-device-type']) {
            this.typeSelected = this.listTypes.find(item => item.id === this.$route.query['smart-device-type'])
        }
        const option = {}
        option['min-price'] = this.$route.query["min-price"] !== "" ? this.$route.query['min-price'] : null
        option['max-price'] = this.$route.query["max-price"] !== "" ? this.$route.query['max-price'] : null
        if (option['min-price'] || option['max-price']) {
            this.priceSelected = this.listPrices.find(item => item.value['min-price'] === option['min-price'] && item.value['max-price'] === option['max-price'])
        }
    },
    methods: {
        async getSmartDeviceType() {
            const response = await this.$store.dispatch('devices/SmartDeviceType')
            if (response.code === 200) {
                this.listTypes = response.data.entries
            }
        }
    },
}

</script>