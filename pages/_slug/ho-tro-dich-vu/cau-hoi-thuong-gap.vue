<template>
  <div class="mb-5" style="min-height: 50vh;">
    <div class="col-lg-6 col-md-6 mb-5">
      <input v-model="searchInput"  class="feedback-input" label="Tìm kiếm..."  @input="debounceInput" />
    </div>
    <div v-if="questionsSearch.length > 0">
      <div v-for="(item, index) in questionsSearch" :key="index" class="total"
        style="overflow: hidden; height: fit-content;">
        <div :id="'ques' + index" class="p-2 bg-custom cursor-pointer" style="font-size: 16px; color: #404040; font-weight: 500;"
          @click="updateIndexShow(index)" >
          <span class="collapsed" style="color: #44B97C; margin-right: 4px;">
            <i class='bx bx-chevrons-up arrowicon' :class="indexShow != (index) ? 'when-closed' : ''"></i>
            <i class='bx bx-chevrons-down arrowicon' :class="indexShow != (index) ? '' : 'when-closed'"></i>
          </span>
          {{ item.question }}
        </div>
        <div id="collapse-question" class="p-2 pb-4" :class="{ 'show-answer': indexShow == index }"
          style="color: #737373; text-align: justify; padding-left: 20px !important;">
          {{ item.answer }}
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center" style="font-weight: 500; font-size: 20px;">Không tìm thấy dữ liệu</p>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: "SupporService",
  data() {
    return {
      questions: [],
      indexShow: 0,
      searchInput: '',
      questionsSearch: [],
    };
  },
  head() {
		return {
			title: ` ${this.$store.state.location.location.name} - Câu hỏi thường gặp`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: ` ${this.$store.state.location.location.name} - Câu hỏi thường gặp`,
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{ name: 'keywords', content: ` ${this.$store.state.location.location.name} - Câu hỏi thường gặp` },
			],
		}
	},
  created() {
    this.getListFreqAskedQuestions();
  },
  methods: {
    updateIndexShow(index) {
      if (this.indexShow === index) {
        return this.indexShow - 1
      }
      this.indexShow = index;
      const screenWidth = window.innerWidth;
      if (screenWidth < 992) {
        const tag = document.getElementById('ques' + index)
        window.scrollTo(0, tag.offsetTop - 20)
      }
    },
    async getListFreqAskedQuestions() {
      const response = await this.$store.dispatch(
        "supportServices/ListFreqAskedQuestions"
      );
      if (response.code === 200) {
        this.questions = response.data.entries;
        this.questionsSearch = response.data.entries
      }
    },
    debounceInput: _.debounce(function () {
      this.questionsSearch = this.questions.filter((event) => {
        return event.question
          .toLowerCase()
          .match(this.searchInput.toLowerCase())
      })
    }, 500),
  },
};
</script>

<style>
#collapse-question {
  transform: scaleY(0);
  transform-origin: 0% 0%;
  height: 0px;
}

.show-answer {
  transform: scaleY(1) !important;
  height: 100% !important;
}

.bg-custom {
  background-color: #f1f1f1c3;
  border-radius: 10px;
}

.arrow_button {
  background-color: #f1f7f4;
  border: none;
  border-radius: 50%;
  height: 35px;
  box-shadow: none;
}

.arrowicon {
  padding: 5px;
  background: white;
  border-radius: 100px;
}

.collapsed>.when-closed,
:not(.collapsed)>.when-opened {
  display: none;
}

@media (max-width: 992px) {
  .arrow_button {
    display: none;
  }
}
</style>