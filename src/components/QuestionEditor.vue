<template>
  <div class="">
    <!-- Question index -->
    <div class="grid gap-3 grid-cols-5 items-center justify-between">
      <h3 class="text-lg font-bold col-span-4">
        {{ index + 1 }}. {{ model.question }}
      </h3>
      <div class="flex flex-center">
        <!-- start: add new question -->
        <button
          type="button"
          @click="addQuestion()"
          class="flex items-center text-sm py-1 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 mr-2"
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
          ADD
        </button>
        <!-- end: add new question -->
        <!-- start: delete question -->
        <button
          type="button"
          @click="deleteQuestion()"
          class="flex items-center text-cs py-1 px-3 mr-2 rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          Delete
        </button>
        <!-- end: delete question -->
      </div>
    </div>
    <div class="grid gap-3 grid-cols-12">
      <div class="mt-3 col-span-9">
        <label
          :for="`question_text_${model.data}`"
          class="block text-sm font-medium text-gray-700"
          >Tiêu đề câu hỏi</label
        >
        <input
          type="text"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          :name="`question_text_${model.data}`"
          v-model="model.question"
          @change="dataChange"
          :id="`question_text_${model.data}`"
        />
      </div>
      <!-- start: question type -->
      <div class="mt-3 col-span-3">
        <label class="block text-sm font-medium text-gray-700"
          >Chọn kiểu câu hỏi</label
        >
        <select
          name="question_type"
          v-model="model.type"
          @change="typeChange"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        >
          <option v-for="type in questionTypes" :key="type" :value="type">
            {{ upperCaseFirst(type) }}
          </option>
        </select>
      </div>
      <!-- end: question type -->
      <!-- start: question description -->
      <div class="mt-3 col-span-12">
        <label
          :for="`question_description_${model.id}`"
          class="block text-sm font-medium text-gray-700"
          >Mô tả câu hỏi</label
        >
        <textarea
          type="text"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-40"
          :name="`question_description_${model.id}`"
          v-model="model.description"
          @change="dataChange"
          :id="`question_description_${model.id}`"
        ></textarea>
        <!-- end: question description -->
      </div>
      <!-- end: question description -->
    </div>
    <!-- start: question data -->
    <div v-if="shouldHaveOptions()" class="mt-3">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options
        <!--Add new option-->
        <button
          @click="addOption()"
          type="button"
          class="flex items-center text-sm py-1 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-700 mr-2"
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
            ></path>
          </svg>
          Thêm mới options
        </button>
        <!--/ Add new option-->
      </h4>
      <div
        v-if="!model.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You doens not have any options defined
      </div>
      <div
        v-for="(option, i) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-7 text-sm">{{ i + 1 }}. </span>
        <input
          type="text"
          v-model="option.text"
          @change="dataChange"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mr-4"
        />
        <button
          type="button"
          class="h-[38px] w-[38px] flex items-center justify-center border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- end: question data -->
  </div>
</template>
<script setup>
import store from "../store";
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  question: Object,
  index: Number,
});
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);
const model = ref(JSON.parse(JSON.stringify(props.question)));
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getOptions() {
  return model.value.data.options;
}
function setOptions(options) {
  model.value.data.options = options;
}
// Check if the question should have options
function shouldHaveOptions() {
  return ["select", "radio", "checkbox"].includes(model.value.type);
}
// Add option
function addOption() {
  setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
  dataChange();
}
// Remove option
function removeOption(op) {
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}
function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}
// Emit the data change
function dataChange() {
  const data = model.value;
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }
  emit("change", data);
}
function addQuestion() {
  emit("addQuestion", props.index + 1);
}
function deleteQuestion() {
  emit("deleteQuestion", props.question);
}
</script>
