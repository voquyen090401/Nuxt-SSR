<template>
    <div v-inter>
        <div>
            <div class="text-default font-size-22 font-weight-500 mt-2 mb-4">Thông tin của các giải pháp liên quan:</div>
        </div>
        <div v-if="entries.length > 0" class="solution-list">
            <div v-for="(entry, index) in entries" :key="index" class="solution" 
                @click="$router.push({ name: 'web.slug.smart-solutions.detail', params: { id: entry.id } })">
                <div class="solution-image-wrapper">
                    <img loading="lazy" class="img-cover solution-image" :src="$addPrefixImage(entry.image)"
                        alt="">
                </div>
                <div class="solution-summary">
                    <div class="solution-name line-2">{{ entry.name }}</div>
                    <time class="solution-time">{{ $filters.dateTime(entry.created_at, 'HH:mm, DD/MM/YYYY') }}</time>
                    <div class="line-2 solution-description">{{ entry.description }}</div>
                    <div class="solution-category">Lĩnh vực: <span v-color>{{ entry.tags?.join(', ') }}</span></div>
                </div>
            </div>
        </div>
        <div v-else class="ic-empty-wrapper">
            <img class="ic-empty" src="@/assets/images/ic-empty.png" />
            <div>Không có giải pháp nào</div>
        </div>
    </div>
</template> 

<script>
export default {
    props: {
        entries: {
            type: Array,
            required: true
        }
    },
    methods: {
        getTime(dateTimeString) {
            const dateTime = new Date(dateTimeString);
            const year = dateTime.getFullYear();
            const month = dateTime.getMonth() + 1;
            const day = dateTime.getDate();
            const hour = dateTime.getHours();
            const minute = dateTime.getMinutes();
            return `${hour}:${minute}, ${day}/${month}/${year}`
        },
    }
}
</script>
<style scoped>
.solution-list {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    column-gap: 1rem;
}

.solution {
    display: flex;
    row-gap: 1rem;
    column-gap: 1rem;
    cursor: pointer;
}

.solution-image-wrapper {
    width: 276px;
    height: 170px;
}

.solution-image {
    transition: ease-out 0.4s;
}

.solution-image:hover {
    transform: scale(1.05);
}

.solution-summary {
    flex: 1;
}

.solution-name {
    text-transform: capitalize;
    font-size: 23px;
    color: #4f4f4f;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.solution-time {
    display: block;
    font-size: 14px;
    color: #A3A3A3;
    margin-bottom: 0.5rem;
}

.solution-description {
    font-size: 16px;
    color: #A3A3A3;
    margin-bottom: 0.5rem;
}

.solution-category {
    font-size: 14px;
    font-weight: 500;
}

@media screen and (max-width: 768px) {

    .solution-list {
        flex-direction: row;
        flex-wrap: wrap;
        row-gap: 0.8rem;
        column-gap: 0.8rem;
    }

    .solution {
        flex-direction: column;
        width: calc(50% - 1rem);
        row-gap: 0.2rem;
    }

    .solution-image-wrapper {
        width: 100%;
    }

    .solution-name {
        text-transform: capitalize;
        font-size: 18px;
        color: #4f4f4f;
        font-weight: 700;
        margin-bottom: 0;
    }

    .solution-time {
        display: block;
        margin-bottom: 0.5rem;
    }

    .solution-description {
        margin-bottom: 0;
    }
}

@media screen and (max-width: 575px) {
    .solution-name {
        font-size: 16px;
    }

    .solution-image-wrapper {
        height: 120px;
    }

    .solution-time {
        margin-bottom: 0;
    }

    .solution-description {
        display: none;
        margin-bottom: 0;
    }
}
</style>