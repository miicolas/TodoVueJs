<script setup>
import Button from "./buttons/buttonsComponent.vue";

const name = localStorage.getItem("name");
</script>

<template>

<header class="flex items-center justify-between p-4">
  <h1 class="text-3xl font-bold">Todo VueJs</h1>
  <nav>
    <ul class="flex items-center gap-4">
      <li><a href="#">Home</a></li>
      <li><Button :name="name"></Button></li>
    </ul>
  </nav>
</header>

</template>