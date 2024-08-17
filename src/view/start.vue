<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = localStorage.getItem("name");

const input_name = ref("");
const save_name = () => {
  if (input_name.value === "") {
    alert("Please enter your name");
    return;
  }
  localStorage.setItem("name", input_name.value);
  router.push({ path: "/home" });
};

if (name) {
  router.push({ path: "/home" });
}
</script>

<template>
  <main class="h-screen flex flex-col items-center justify-center">
    <div
      class="border-2 border-slate-300 rounded-lg p-10 flex flex-col gap-4 max-w-md h-64 justify-center items-center"
    >
      <div class="flex justify-start flex-col gap-4">
        <div class="flex flex-col flex-start gap-2">
          <label for="name" class="font-bold text-lg">What is your name?</label>
          <p class="text-slate-500">
            This is your name, you can change it anytime
          </p>
        </div>
        <div class="relative mt-2">
          <input
            type="text"
            v-model="input_name"
            placeholder="Enter your name"
            class="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg border-2 border-slate-300 focus:outline-none focus:border-blue-500 hover:bg-slate-200 transition-all duration-300 w-full"
          />
          <div class="absolute right-2 top-1/2 -translate-y-1/2 ">
            <button
              @click="save_name"
              class="bg-blue-500 text-white px-2 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
