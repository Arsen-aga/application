<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="sidebar">
    <nav class="menu">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
      <RouterLink class="link" to="/test-api">Test Api</RouterLink>
      <RouterLink class="link" to="/todolist">todolist</RouterLink>
    </nav>
  </div>
</template>
<style lang="css" scoped>
.sidebar {
  font-size: 1rem;
  position: fixed;
  left: 0;
  height: 100vh;
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-template: 10px;
  width: 100%;
  height: 100%;
}

.link.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

.link.router-link-exact-active:hover {
  background-color: transparent;
}

.link {
  display: inline-block;
  padding: 0 1rem;
}
</style>
