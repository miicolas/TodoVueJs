<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";

const router = useRouter();
const todos = ref([]);

const categories = ref([
  { id: 1, name: "Personal" },
  { id: 2, name: "Work" },
]);

localStorage.setItem("categories", JSON.stringify(categories.value));

todos.value = JSON.parse(localStorage.getItem("todos")) || [];

const name = localStorage.getItem("name");

if (!name) {
  router.push({ path: "/" });
}

const sort_todo = computed(() =>
  todos.value.sort((a, b) => {
    return a.todos - b.todos;
  })
);

const input_content = ref("");
const input_description = ref("");
const input_add_category = ref("");
const input_category = ref("");

const addCategory = () => {
  if (input_add_category.value) {
    categories.value.push({
      id: Math.random().toString(36).substring(2, 15),
      name: input_add_category.value,
    });
    localStorage.setItem("categories", JSON.stringify(categories.value));
    input_add_category.value = "";
  }
};

const addTodo = () => {
  if (input_content.value) {
    todos.value.push({
      id: Math.random().toString(36).substring(2, 15),
      content: input_content.value,
      description: input_description.value,
      createAt: new Date().toLocaleString(),
      category: input_category.value,
      done: false,
    });
    input_content.value = "";
    input_description.value = "";
  }
};

/* const deleteTodo = (todo) => {
  todos.value = todos.value.filter((item) => item.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const editTodo = (todo) => {
  router.push({ path: `/todos/edit/${todo.id}` });
}; */

const viewTodo = (todo) => {
  router.push({ name: "todoDetail", params: { id: todo.id } });
};

watch(
  todos,
  (newValue) => {
    localStorage.setItem("todos", JSON.stringify(newValue));
  },
  { deep: true }
);
</script>

<template>
  <Header />
  <main>
    <section>
      <form @submit.prevent="addTodo" class="flex flex-col gap-4">
        <h4>Create Todo</h4>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-4">
            <input
              type="text"
              v-model="input_content"
              placeholder="Make a video"
              class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
            />
            <div class="flex items-center gap-4">
              <select v-model="input_category">
                <option disabled value="">Please select one category</option>
                <option v-for="category in categories" :key="category.id">
                  {{ category.name }}
                </option>
              </select>
              <div>
                <input type="text" placeholder="Add Category" v-model="input_add_category"/>
                <button @click="addCategory">Add</button>
              </div>
            </div>
            <textarea
              v-model="input_description"
              placeholder="Description"
              class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
            ></textarea>
          </div>
          <input
            type="submit"
            value="add Todo"
            class="bg-slate-600 border-2 border-slate-300 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 hover:bg-slate-700 transition-all duration-300"
          />
        </div>
      </form>
    </section>
    <section class="my-4">
      <h4>Todos</h4>
      <ul>
        <li
          v-for="todo in sort_todo"
          :key="todo.id"
          class="flex items-center gap-4 border border-slate-200 rounded-lg p-4 justify-between"
        >
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              v-model="todo.done"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              v-model="todo.content"
              class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
            />
          </div>
          <div class="flex items-center gap-4 flex-wrap">
            <span>{{ todo.createAt }}</span>
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-lg"
              @click.stop="viewTodo(todo)"
            >
              View
            </button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
