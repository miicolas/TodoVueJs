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
</script>

<template>
  <Header />
  <main>
    <button @click="$router.go(-1)">Go back</button>
    <div>
      <h1>Todo Detail</h1>
      <p>ID: {{ id_todo }}</p>
      <p>Content: {{ data_todo.content }}</p>
      <p>Description: {{ data_todo.description }}</p>
      <p>Done: {{ data_todo.done }}</p>
      <p>Category: {{ data_todo.category }}</p>

      

    </div>
  </main>
</template>


