<template>
    <div class="row mt-2 mb-4">
        <div class="col-sm-6 col-md-4">
            <div class="mb-2">
                <span class="font-size-18 font-weight-500 text-title">
                    <img style="height: 30px; width:40px;" src="@/assets/images/smart-solutions/rural-digital-services.png"/>
                    Dịch vụ nông thôn
                </span>
            </div>
            <MDBRadio v-for="option in options0" :key="option.value" :label="option.text" v-model="selected"
                :value="option.value" @click="handleSelect(option.value)" />
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="mb-2">
                <span class="font-size-18 font-weight-500 text-title">
                    <img style="height: 40px; width:40px;" src="@/assets/images/smart-solutions/digital-government.png"/>
                    Chính quyền số
                </span>
            </div>
            <MDBRadio v-for="option in options1" :key="option.value" :label="option.text" v-model="selected" :value="option.value" @click="handleSelect(option.value)" />
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="mb-2">
                <span class="font-size-18 font-weight-500 text-title">
                    <img style="height: 40px; width:30px;" src="@/assets/images/smart-solutions/business-services.png"/>
                    Dịch vụ doanh nghiệp
                </span>
            </div>
            <input type="checkbox" v-for="option in options2" :key="option.value" :label="option.text" v-model="selected" :value="option.value" @click="handleSelect(option.value)" />
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    components: {
    },
    props: {
        name: {
            type: String,
            required: true
        },
        options: Array,
        title: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            options0: [],
            options1: [],
            options2: [],
            selected: null,
            serviceSelect: null,
        }
    },
    watch: {
        "selected": {
            handler: function () {
                this.serviceSelect = this.selected;
            },
            deep: true,
        },
        "serviceSelect": {
            handler() {
                this.$emit("update", null);
                this.$emit("update", this.selected);
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions("serviceManagements", ["ListServiceManagements"]),
        handleSelect(value) {
            if (this.selected === value) {
                this.selected = null;
            }
        },
        async getServiceManagements() {
            const response = await this.ListServiceManagements()
            this.serviceManagements = response.data.entries
            for (const index in response.data.entries) {
                if (response.data.entries[index].service_type === 1) {
                    this.options1.push({ text: response.data.entries[index].name, value: response.data.entries[index].id })
                } else if (response.data.entries[index].service_type === 2) {
                    this.options0.push({ text: response.data.entries[index].name, value: response.data.entries[index].id })
                } else if (response.data.entries[index].service_type === 3) {
                    this.options2.push({ text: response.data.entries[index].name, value: response.data.entries[index].id })
                }
            }
        }
    },
    created() {
        this.selected = this.serviceSelect;
        this.getServiceManagements()
    },
}
</script>

<style scoped>
.text-title {
    color: #262626;
}
</style>