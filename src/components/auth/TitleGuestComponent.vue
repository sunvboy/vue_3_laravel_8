<template>
  <div>
    <img
      class="mx-auto h-12 w-auto"
      src="../../assets/images/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      {{ title }}
    </h2>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
});
</script>
