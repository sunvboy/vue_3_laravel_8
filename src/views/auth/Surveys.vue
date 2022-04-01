<template>
  <PageComponent>
    <template v-slot:header>
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div v-if="!loading">
      <div class="mt-5 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem
          v-for="survey in surveys.data"
          :key="survey.id"
          :survey="survey"
          @delete="deleteSurvey(survey.id)"
        />
      </div>
      <div class="flex justify-center mt-5" v-if="surveys.links.length > 3">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            v-for="(link, i) of surveys.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click.prevent="getForPage(link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === surveys.links.length - 1 ? 'rounded-r-md' : '',
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
    </div>
  </PageComponent>
</template>
<script setup>
import store from "../../store";
import { computed } from "vue";
import { DELETE_SURVEY } from "../../constants";
import PageComponent from "../../components/PageComponent.vue";
import SurveyListItem from "../../components/surveys/SurveyListItem.vue";
store.dispatch("getSurveys");
const surveys = computed(() => store.state.surveys);
const loading = computed(() => store.state.isLoading);
function deleteSurvey(id) {
  if (confirm(DELETE_SURVEY)) {
    store.dispatch("deleteSurvey", id);
  }
}
function getForPage(link) {
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getSurveys", { url: link.url });
}
</script>
