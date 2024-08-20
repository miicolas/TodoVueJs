<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const router = useRouter();
const id_todo = ref(router.currentRoute.value.params.id);

const getLocalStorage = localStorage.getItem("todos");
const todos = ref(JSON.parse(getLocalStorage) || []);
const data_todo = ref({});

const getCategories = localStorage.getItem("categories");
const categories = JSON.parse(getCategories) || [];

todos.value.forEach((todo) => {
  if (todo.id === id_todo.value) {
    data_todo.value = { ...todo };
  }
});

const deleteTodo = () => {
  const index = todos.value.findIndex((todo) => todo.id === id_todo.value);
  if (index !== -1) {
    todos.value.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos.value));
    router.push({ path: "/home" });
  }
};

watch(
  data_todo,
  (newVal) => {
    const index = todos.value.findIndex((todo) => todo.id === id_todo.value);
    if (index !== -1) {
      todos.value[index] = { ...newVal }; //
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }
  },
  { deep: true }
);
</script>

<template>
  <Header />
  <main>
    <button
      @click="$router.go(-1)"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Go back
    </button>
    <div class="flex flex-col my-4 gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <h1 class="text-3xl font-bold">Todo Detail</h1>
          <input
            type="text"
            v-model="data_todo.content"
            class="text-slate-900 px-4 py-2 focus:outline-none focus:border-none hover:bg-slate-200 transition-all duration-300 rounded-lg"
          />
        </div>
        <input
          type="checkbox"
          v-model="data_todo.done"
          class="rounded-full w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
        />
      </div>
      <hr class="border-slate-300 my-2" />
      <div class="flex items-center gap-4">
        <h4 class="text-slate-500">Category</h4>
        <select
          v-model="data_todo.category"
          class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
        >
          <option
            disabled
            :value="data_todo.category"
            class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
          >
            {{ data_todo.category }}
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.name"
            class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex justify-center gap-4 flex-col">
        <h4 class="text-slate-500">Description</h4>
        <textarea
          v-model="data_todo.description"
          class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
        ></textarea>
      </div>
    </div>
    <button
      @click="deleteTodo"
      class="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Delete
    </button>
  </main>
</template>
