<template>
  <div
    class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]"
  >
    <img
      :src="survey.image_url"
      :alt="survey.title"
      class="h-48 w-full object-cover"
    />
    <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
    <div v-html="survey.description" class="flex-1 overflow-hidden mt-1"></div>
    <div class="flex justify-between items-center mt-3">
      <div class="flex justify-between items-center gap-2">
        <router-link
          :to="{ name: 'SurveyView', params: { id: survey.id } }"
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
          :to="{ name: 'SurveyViewBySlug', params: { slug: survey.slug } }"
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
      <button
        @click="emit('delete', survey.id)"
        type="button"
        class="text-red-700 hover:text-red-600 hover:translate-x-0"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  survey: Object,
});
const emit = defineEmits(["delete"]);
</script>
