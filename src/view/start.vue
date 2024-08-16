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
  <div>NAME</div>
  <input type="text" v-model="input_name" placeholder="Enter your name" />
  <button @click="save_name">Save</button>
</template>
