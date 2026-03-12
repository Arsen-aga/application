<script setup>
import Sidebar from '@/components/TodoList/Sidebar.vue'
</script>
<template>
  <div class="wrapper">
    <Sidebar />
    <RouterView />
  </div>
</template>
<style scoped>
.wrapper {
  padding: 0;
}
</style>
