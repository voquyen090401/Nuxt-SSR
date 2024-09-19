<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <solution-description />
            </div>
            <div class="col-lg-12">
                <solution-filter />
            </div>
        </div>
    </div>
</template>

<script>
import SolutionFilter from './partials/solution-filter.vue';
import SolutionDescription from './partials/solution-description.vue';
export default {
    name: 'SmartSolutionList',
    components: {
        SolutionFilter,
        SolutionDescription
    },
    head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Giải pháp thông minh`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Giải pháp thông minh`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Giải pháp thông minh` },
			],
		}
	},
}
</script>