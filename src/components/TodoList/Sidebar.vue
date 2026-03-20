<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const isShowBeforeSidebar = ref(false)
const showBeforeSidebar = () => (isShowBeforeSidebar.value = true)
</script>
<template>
  <div class="sidebar" :class="{ active: !isShowBeforeSidebar }">
    <nav class="menu">
      <button class="button" @click="showBeforeSidebar">Меню</button>
      <RouterLink class="link" to="/todolist/all-tasks">Все задачи</RouterLink>
      <RouterLink class="link" to="/todolist/completed">Выполнено</RouterLink>
    </nav>
  </div>
</template>
<style lang="css" scoped>
.sidebar {
  font-size: 1rem;
  position: fixed;
  left: 0;
  height: 100vh;
  background-color: #181818;
  transition: all 0.3s ease-in-out;
  transform: scaleX(0);
  transform-origin: left;
}
.sidebar.active {
  transform: scaleX(1);
}
nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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
.button {
  display: block;
  cursor: pointer;
  max-width: 250px;
  width: 100%;
  height: 40px;
  border: none;
  transition: all 0.5s ease-in-out;
}
.button:not(:disabled):hover {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
}
</style>
