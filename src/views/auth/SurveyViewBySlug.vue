<template>
  <div class="py-5 px-8">
    <form @submit.prevent="submitSurvey" class="container mx-auto">
      <div class="grid grid-cols-6 mb-5">
        <div class="mr-4">
          <img :src="survey.image_url" :alt="survey.title" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3 font-semibold">{{ survey.title }}</h1>
          <p class="text-gray-500" v-html="survey.description"></p>
        </div>
      </div>
      <div
        v-if="surveyFinished"
        class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto rounded-md"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <div v-for="(question, ind) of survey.questions" :key="question.id">
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="ind"
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import store from "../../store";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import QuestionViewer from "../../components/QuestionViewer.vue";
const route = useRoute();
const router = useRouter();
if (route.params.slug) {
  store.dispatch("getDetailSurveySlug", route.params.slug).then((res) => {
    if (!res.status) {
      router.push({ name: "Surveys" });
    }
  });
}
const survey = computed(() => store.state.detailSurvey);
const loading = computed(() => store.state.isLoading);
const surveyFinished = ref(false);
const answers = ref({});
function submitSurvey() {
  store
    .dispatch("saveSurveyAnswer", {
      surveyId: survey.value.id,
      answers: answers.value,
    })
    .then((res) => {
      if (res.status) {
        surveyFinished.value = true;
      }
    });
}
function submitAnotherResponse() {
  answers.value = {};
  surveyFinished.value = false;
}
</script>
