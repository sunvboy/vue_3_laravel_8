<template>
  <div class="mb-4 shadow-md p-3 rounded-md border">
    <legend class="text-lg font-semibold text-red-700">
      {{ index + 1 }}. {{ question.question }}
    </legend>
    <p class="text-gray-500">
      {{ question.description }}
    </p>
    <div class="mt-3">
      <div v-if="question.type === 'radio'">
        <div
          class="flex items-center"
          v-for="option in question.data.options"
          :key="option.uuid"
        >
          <input
            type="radio"
            :id="option.uuid"
            :value="option.text"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            :name="'question' + question.id"
            @change="emits('update:modelValue', $event.target.value)"
          />
          <label
            :for="option.uuid"
            class="ml-2 block font-medium text-gray-700"
            >{{ option.text }}</label
          >
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div
          class="flex items-center"
          v-for="option in question.data.options"
          :key="option.uuid"
        >
          <input
            type="checkbox"
            :id="option.uuid"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            @change="onCheckboxChange"
            v-model="dataCheckbox[option.text]"
          />
          <label
            :for="option.uuid"
            class="ml-2 block font-medium text-gray-700"
            >{{ option.text }}</label
          >
        </div>
      </div>
      <div v-else-if="question.type === 'select'">
        <select
          v-model="modelValue"
          @change="emits('update:modelValue', $event.target.value)"
          class="focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-full"
        >
          <option value="">Please Select</option>
          <option
            v-for="option in question.data.options"
            :key="option.uuid"
            :value="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else>
        <textarea
          class="focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-full h-40"
          v-model="modelValue"
          @keyup="emits('update:modelValue', $event.target.value)"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
});
const emits = defineEmits(["update:modelValue"]);
let dataCheckbox;
if (question.type === "checkbox") {
  dataCheckbox = ref({});
}

function shouldHaveOptions() {
  return ["select", "radio", "checkbox"].includes(question.type);
}
function onCheckboxChange($event) {
  const selectedOptions = [];
  for (let item in dataCheckbox.value) {
    if (dataCheckbox.value[item]) {
      selectedOptions.push(item);
    }
  }
  emits("update:modelValue", selectedOptions);
}
</script>
