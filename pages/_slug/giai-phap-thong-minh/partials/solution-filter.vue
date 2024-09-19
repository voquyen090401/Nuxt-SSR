<template>
    <div class="mb-3">
        <div>
            <div class="text-default font-size-22 font-weight-500">Danh sách giải pháp thông minh:</div>
            <div class="mt-1">
                <div class="col-lg-4 col-sm-6 col-12 px-0">
                    <input v-model="search" style="height: 40px; font-size: 14px; box-shadow: none;"
                        placeholder="Tìm kiếm..." type="text">
                    </input>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div class="text-default font-size-22 font-weight-500">Lĩnh vực theo chuyên mục:</div>
            <solution-group v-model="serviceSelect" @update="(value) => (serviceSelect = value)" />
        </div>
        <hr>
        <div>
            <solution-filter-result :entries="entries" />
        </div>
        <div>
            <Pagination :pagination="pagination" />
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import SolutionGroup from './solution-group.vue'
import SolutionFilterResult from './solution-filter-result.vue'

export default {
    components: {
        SolutionGroup,
        SolutionFilterResult,
    },
    data() {
        return {
            search: '',
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
            serviceSelect: null
        };
    },
    methods: {
        ...mapActions('smartSolutions', ['ListSmartSolutions']),
        async getEntry(option = { ...this.$route.query }) {
            const response = await this.ListSmartSolutions({
                ...option,
                search: this.search
            })
            this.entries = response.data.entries
            this.pagination = response.data.pagination
        },
    },
    watch: {
        "serviceSelect": {
            handler() {
                const option = {
                    ...this.$route.query,
                    'tag-id': this.serviceSelect
                }
                this.getEntry(option)
            },
            deep: true,
        },
        "$route.query.page": {
            handler() {
                this.getEntry({
                    ...this.$route.query,
                    'tag-id': this.serviceSelect
                })
            }
        },
        search() {
            this.getEntry({
                ...this.$route.query,
                'tag-id': this.serviceSelect
            })
        }
    },
    created() {
        this.getEntry()
    }
}
</script>
<style>
.form-check-input[type=radio]:checked:after {
    border-color: #44B97C !important;
    background-color: #44B97C !important;
}

.form-check-input:checked {
    border-color: #44B97C !important;
}
.form-check-input {
    overflow: hidden;
}
</style>
