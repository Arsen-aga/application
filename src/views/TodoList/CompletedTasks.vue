<script setup>
import Task from '@/components/TodoList/Task.vue'
import { useTasksStore } from '@/stores/Tasks'
import { ref } from 'vue'

const tasksStore = useTasksStore()
const closeForm = (value) => (isFormOpen.value = value)

const showAllTasks = () => console.log('tasksStore', tasksStore.completedTask)
</script>
<template>
  <div class="completed-tasks">
    <h1 class="title">Выполненные задачи</h1>
    <div class="list">
      <Task
        :task="task"
        v-for="task in tasksStore.completedTask"
        @closeForm="closeForm"
        :key="task.id"
      />
    </div>
    <div class="add-task" @click="showAllTasks">Показать все задачи</div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 15px;
  text-align: center;
}
.completed-tasks {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60vw;
}
.list {
  width: 100%;
  display: grid;
  gap: 10px;
}

.add-task {
  padding: 20px;
  display: block;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.add-task:hover {
  color: hsla(160, 100%, 37%, 1);
}
.add-task:hover span {
  border-color: hsla(160, 100%, 37%, 1);
}
.add-task span {
  margin-right: 5px;
  font-size: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid hsla(160, 100%, 37%, 0);
  transition: all 0.5s ease-in-out;
}
</style>
