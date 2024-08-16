
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  };
  </script>

<template>
    <button class="bg-blue-500 rounded-md p-2 text-white">{{ name }}</button>
  </template>