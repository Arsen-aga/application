<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="wrapper">
    <Sidebar />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  padding-left: 360px;
}
</style>
