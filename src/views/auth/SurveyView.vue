<template>
  <PageComponent>
    <MyEditor />
    <template v-slot:header>
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : "Create a Survey" }}
        </h1>
        <a
          v-if="model.id"
          href=""
          @click.prevent="deleteSurvey"
          class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600 flex gap-1"
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
          Delete Survey
        </a>
      </div>
    </template>
    <form class="mt-5" @submit.prevent="saveSurvey">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!-- start: survey fields -->
        <div class="bg-white space-y-6 sm:p-6">
          <!-- start: Image -->
          <div>
            <label class="block text-xl font-medium text-gray-700">
              Hình ảnh
            </label>
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover rounded-xl"
              />
              <span
                v-else
                class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"
              >
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <div class="mt-1 flex items-center">
                <button
                  type="button"
                  class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                >
                  <input
                    type="file"
                    @change="onImageChoose"
                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                  />
                  Chọn hình ảnh
                </button>
              </div>
            </div>
          </div>
          <!-- start: Title -->
          <div>
            <label class="block text-xl font-medium text-gray-700">
              Tiêu đề
            </label>
            <input
              type="text"
              class="mt-1 focus:ring-indigo-500 focus:border-r-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              v-model="model.title"
              placeholder="Title"
            />
          </div>
          <!-- start: Description -->
          <div>
            <label class="block text-xl font-medium text-gray-700">
              Mô tả
            </label>
            <quill-editor
              ref="quill"
              :modules="modules"
              :toolbar="toolbar"
              v-model:content="model.description"
              contentType="html"
            />
          </div>
          <!-- start: Expire date -->
          <div>
            <label class="block text-xl font-medium text-gray-700">
              Expire date
            </label>
            <input
              type="date"
              class="mt-1 focus:ring-indigo-500 focus:border-r-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              v-model="model.expire_date"
              placeholder="Expire date"
            />
          </div>
          <!--  start: status -->
          <div class="flex gap-2">
            <input
              id="model_status"
              type="checkbox"
              class="mt-1 focus:border-0 block shadow-sm sm:text-sm border-gray-300 rounded-md"
              v-model="model.status"
            />
            <label for="model_status">Active</label>
          </div>
          <!--start: questions -->
          <div class="bg-white sm:p-6">
            <h3
              class="text-2xl font-semibold flex items-center justify-between mb-4"
            >
              Danh sách câu hỏi
              <button
                type="button"
                @click="addQuestion()"
                class="flex items-center text-sm py-1 px-4 rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thêm mới câu hỏi
              </button>
            </h3>
            <!--start: list questions -->
            <div v-if="!model.questions" class="text-center text-gray-600">
              You don't have any questions created'
            </div>
            <div v-else>
              <div
                class="p-3 shadow-lg mb-5"
                v-for="(question, index) in model.questions"
                :key="question.id"
              >
                <QuestionEditor
                  :question="question"
                  :index="index"
                  @change="questionChange"
                  @addQuestion="addQuestion"
                  @deleteQuestion="deleteQuestion"
                />
              </div>
            </div>
            <!--end: list questions -->
          </div>
          <!--end: questions -->
          <!-- start: buton submit -->
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>
<script setup>
import { DELETE_SURVEY } from "../../constants";
import { computed, ref, watch } from "vue";
import store from "../../store";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import PageComponent from "../../components/PageComponent.vue";
import QuestionEditor from "../../components/QuestionEditor.vue";
const route = useRoute();
const router = useRouter();
// khai báo editor
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import { nextTick } from "vue";
const quill = ref(null);
const modules = {
  module: BlotFormatter,
};
const toolbar = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  ["link", "image", "video"],
  ["clean"],
];
// end
watch(
  () => store.state.detailSurvey,
  (newVal, oldVal) => {
    model.value = {
      ...newVal,
      status: !!newVal.status,
    };
    quill.value.setHTML(newVal.description);
    nextTick(() => {
      let q = quill.value.getQuill();
      q.setSelection(newVal.description.length, 0, "api");
      q.focus();
    });
  }
);
//create survey
const model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

if (route.params.id) {
  store.dispatch("getDetailSurvey", route.params.id).then((res) => {
    if (!res.status) {
      router.push({ name: "Surveys" });
    }
  });
}
//upload Image
function onImageChoose(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;
    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}
//end
function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}
function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}
function questionChange(question) {
  // Important to explicitelly assign question.data.options, because otherwise it is a Proxy object
  // and it is lost in JSON.stringify()
  if (question.data.options) {
    question.data.options = [...question.data.options];
  }
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}
function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then((res) => {
    if (res.status) {
      router.push({
        name: "Surveys",
        params: { id: res.data.data.id },
      });
    } else {
      store.commit("notify", {
        type: "danger",
        message: "ERROR!!!",
      });
    }
  });
}
function deleteSurvey() {
  if (confirm(DELETE_SURVEY)) {
    store.dispatch("deleteSurvey", route.params.id).then((res) => {
      router.push({ name: "Surveys" });
    });
  }
}
</script>
