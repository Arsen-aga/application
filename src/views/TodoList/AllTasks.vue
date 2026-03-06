<script setup>
import AdditionForm from '@/components/TodoList/AdditionForm.vue'
import Task from '@/components/TodoList/Task.vue'
import { useTasksStore } from '@/stores/Tasks'
import { ref } from 'vue'

const tasksStore = useTasksStore()
const isFormOpen = ref(false)
const openForm = () => {
  isFormOpen.value = !isFormOpen.value
  tasksStore.clearEditingTask()
}
const closeForm = (value) => (isFormOpen.value = value)

const showAllTasks = () => console.log('tasksStore', tasksStore.taskList)
</script>
<template>
  <div class="todo-list">
    <h1 class="title">Текущие задачи</h1>
    <div class="list">
      <Task
        :task="task"
        v-for="task in tasksStore.taskList"
        @closeForm="closeForm"
        :key="task.id"
        :edit="true"
      />
    </div>
    <div class="add-task" v-if="!isFormOpen" @click="openForm"><span>+</span>Добавить задачу</div>
    <AdditionForm v-if="isFormOpen" @closeForm="closeForm" />
    <div class="add-task" @click="showAllTasks">Показать все задачи</div>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 15px;
  text-align: center;
}
.todo-list {
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
