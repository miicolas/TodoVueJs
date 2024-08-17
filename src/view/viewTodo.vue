<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const router = useRouter();

const id_todo = ref(router.currentRoute.value.params.id);

const getLocalStorage = localStorage.getItem("todos");
const todos = JSON.parse(getLocalStorage);
const data_todo = ref({});

todos.forEach((todo) => {
  if (todo.id === id_todo.value) {
    data_todo.value = todo;
  }
});

const editTodo = () => {
  router.push({ name: "editTodo", params: { id: id_todo.value } });
};

const deleteTodo = () => {
  const todosList = JSON.parse(localStorage.getItem("todos"));
  console.log(todosList);
  todosList.forEach((todo, index) => {
    if (todo.id === id_todo.value) {
      todosList.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todosList));
  router.push({ path: "/home" });
  
};
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
    <div>
      <h1 class="text-3xl font-bold">Todo Detail</h1>
      <p class="text-slate-500">ID: {{ id_todo }}</p>
      <p class="text-slate-500">Content: {{ data_todo.content }}</p>
      <p class="text-slate-500">Description: {{ data_todo.description }}</p>
      <p class="text-slate-500">Done: {{ data_todo.done }}</p>
      <p class="text-slate-500">Category: {{ data_todo.category }}</p>
    </div>
    <button @click="editTodo" class="bg-gray-500 text-white px-4 py-2 rounded-lg">Edit</button>
    <button @click="deleteTodo" class="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
  </main>
</template>
