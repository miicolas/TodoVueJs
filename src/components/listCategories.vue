<script setup>
import { ref } from "vue";

const categories = ref([]);

const getCategories = localStorage.getItem("categories");
categories.value = JSON.parse(getCategories) || [];

const deleteCategoy = (category) => {
  const index = categories.value.findIndex(
    (category) => category.id === category.id
  );
  if (index !== -1) {
    categories.value.splice(index, 1);
    localStorage.setItem("categories", JSON.stringify(categories.value));
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 my-4">
    <div
      v-for="category in categories"
      :key="category.id"
      class="flex items-center gap-2"
    >
      <div class="flex items-center gap-2 cursor-not-allowed">
        <p class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {{ category.name }}
        </p>
        <button
          @click="deleteCategoy"
          class="text-slate-900 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
