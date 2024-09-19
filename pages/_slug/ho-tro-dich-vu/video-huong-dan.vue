<template>
  <div>
    <div class="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(item, index) in videos" :key="index">
        <div @click="$router.push({ name: 'web.slug.videos.detail', params: { id: item.id } })">
          <div>
            <div class="video_height" style="height: 220px;">
              <iframe title="thumbnail" frameborder="0" allowFullScreen="true" webkitallowfullscreen="true"
                mozallowfullscreen="true" class="border" width="100%" height="220" :src="getSrcYoutube(item.url)">
              </iframe>
            </div>
          </div>
          <div class="px-2 mt-2">
            <div class="text_item font-size-16 font-medium mb-2 line-2">
              {{ item.name }}
            </div>
            <div class="title_video" style="display: flex; justify-content: space-between;">
              <span class="text-[12px]">UBND xã Phong Hòa</span>
              <span class="text-[12px]">{{ $filters.dateTime(item.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SupportService",
  data() {
    return {
      videos: [],
      url: "https://youtu.be/InHd3c_8ci0",
    }
  },
  head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Video hướng dẫn`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Video hướng dẫn`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Video hướng dẫn` },
			],
		}
	},
  created() {
    this.getListVideoTutorials()
  },
  methods: {
    getSrcYoutube(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      const ID = match && match[2].length === 11 ? match[2] : null
      return 'https://www.youtube.com/embed/' + ID + '?autoPlay=0'
    },
    async getListVideoTutorials() {
      const response = await this.$store.dispatch('supportServices/ListVideoTutorials')
      if (response.code === 200) {
        this.videos = response.data.entries
      }
    }
  },
};
</script>
<style scoped>
.border {
  border-radius: 15px;
}

@media (max-width: 579px) {
  .video_height {
    height: 160px !important;
  }

  .border {
    border-radius: 8px;
    height: 160px;
  }

  .title_video {
    display: block !important;
  }

  .text_item {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
  }
}
</style>