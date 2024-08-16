<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const todos = ref([]);

todos.value = JSON.parse(localStorage.getItem("todos")) || [];

const sort_todo = computed(() =>
  todos.value.sort((a, b) => {
    return a.todos - b.todos;
  })
);

const input_content = ref("");
const input_description = ref("");

const addTodo = () => {
  if (input_content.value) {
    todos.value.push({
      id: Math.random().toString(36).substring(2, 15),
      content: input_content.value,
      description: input_description.value,
      createAt: new Date().toLocaleString(),
      done: false,
    });
    input_content.value = "";
    input_description.value = "";
  }
};

const deleteTodo = (todo) => {
  todos.value = todos.value.filter((item) => item.id !== todo.id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

const editTodo = (todo) => {
  router.push({ path: `/todos/edit/${todo.id}` });
};

const viewTodo = (todo) => {
  console.log(todo.id);
  router.push({ path: `/todos/${todo.id}`, name: "todoDetail" });
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
  <section>
    <form @submit.prevent="addTodo" class="flex flex-col gap-4">
      <h4>Create Todo</h4>
      <div class="flex items-center gap-4">
        <input
          type="text"
          v-model="input_content"
          placeholder="Make a video"
          class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
        />
        <textarea
          v-model="input_description"
          placeholder="description"
          class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300"
        ></textarea>
        <input
          type="submit"
          value="add Todo"
          class="bg-slate-600 hover:border-2 border-slate-300 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 hover:bg-slate-700 transition-all duration-300"
        />
      </div>
    </form>
  </section>
  <section>
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
        <div class="flex items-center gap-4">
          <span>{{ todo.createAt }}</span>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
            @click.stop="editTodo(todo)"
          >
            Edit
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded-lg"
            @click.stop="deleteTodo(todo)"
          >
            Delete Todo
          </button>
          <RouterLink
            :to="`/todos/${todo.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Voir
          </RouterLink>
        </div>
      </li>
    </ul>
  </section>
</template>
