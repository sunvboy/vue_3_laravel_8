<template>
  <PageComponent title="DASHBOARD">
    <div v-if="data" class="container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2"
        >
          <h3 class="text-2xl font-semibold">Total Surveys</h3>
          <div
            class="text-8xl font-semibold flex-1 flex items-center justify-center"
          >
            {{ data.totalSurveys }}
          </div>
        </div>
        <div
          class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4"
        >
          <h3 class="text-2xl font-semibold">Total Answers</h3>
          <div
            class="text-8xl font-semibold flex-1 flex items-center justify-center"
          >
            {{ data.totalAnswers }}
          </div>
        </div>
        <div class="bg-white shadow-md p-3 row-span-2 order-3 lg:order-1">
          <h3 class="text-2xl font-semibold mb-3">Latest Surveys</h3>
          <div v-if="data.latestSurvey">
            <img
              :src="data.latestSurvey.image_url"
              class="w-full mx-auto"
              alt=""
            />
            <h3 class="font-bold text-xl my-3">
              {{ data.latestSurvey.title }}
            </h3>
            <div class="flex justify-between text-sm mb-1">
              <div>Create Date:</div>
              <div>{{ data.latestSurvey.created_at }}</div>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <div>Expire Date:</div>
              <div>{{ data.latestSurvey.expire_date }}</div>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <div>Status:</div>
              <div>{{ data.latestSurvey.status ? "Active" : "Draft" }}</div>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <div>Questions:</div>
              <div>{{ data.latestSurvey.questions }}</div>
            </div>
            <div class="flex justify-between text-sm mb-3">
              <div>Answers:</div>
              <div>{{ data.latestSurvey.answers }}</div>
            </div>
            <div class="flex justify-between items-center gap-2">
              <router-link
                :to="{
                  name: 'SurveyView',
                  params: { id: data.latestSurvey.id },
                }"
                class="bg-green-600 text-white px-3 py-2 rounded-md border border-transparent uppercase flex gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                edit
              </router-link>
              <router-link
                :to="{
                  name: 'SurveyViewBySlug',
                  params: { slug: data.latestSurvey.slug },
                }"
                class="bg-green-600 text-white px-3 py-2 rounded-md border border-transparent uppercase flex gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Read more
              </router-link>
            </div>
          </div>
          <div v-else>Loading...</div>
        </div>
        <div class="bg-white shadow-md p-3 row-span-2 order-4 lg:order-3">
          <div class="flex justify-between items-center mb-3 px-2">
            <h3 class="text-2xl font-semibold">Latest Answers</h3>
            <a
              v-if="data.latestAnswers"
              href="javascript:void(0)"
              class="text-sm text-blue-500 hover:decoration-blue-500"
            >
              View all
            </a>
          </div>
          <div v-if="data.latestAnswers" class="text-left">
            <a
              href="#"
              v-for="answer of data.latestAnswers"
              :key="answer.id"
              class="block p-2 hover:bg-gray-100/90"
            >
              <div class="font-semibold">{{ answer.survey.title }}</div>
              <small>
                Answer Made at:
                <i class="font-semibold">{{ answer.end_date }}</i>
              </small>
            </a>
          </div>
          <div v-else class="text-gray-600 text-center py-16">
            Your don't have answers yet
          </div>
        </div>
      </div>
    </div>
  </PageComponent>
</template>
<script setup>
import { EyeIcon, PencilIcon } from "@heroicons/vue/solid";
import { computed } from "@vue/runtime-core";
import PageComponent from "../../components/PageComponent.vue";
import store from "../../store";
store.dispatch("getDataDashboard");
const data = computed(() => store.state.dashboard);
</script>
