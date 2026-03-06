<script setup>
import { onMounted, ref } from 'vue'
import { useTasksStore } from '@/stores/Tasks'

const props = defineProps({
  editTask: {
    type: Object,
    default: null,
  },
})

const tasksStore = useTasksStore()
const emit = defineEmits(['closeForm'])
const closeForm = () => emit('closeForm', false)

const descriptionInput = ref('')
const newTask = ref({
  id: new Date().getTime(),
  title: '',
  description: '',
})

const resetForm = () => {
  newTask.value = {
    id: new Date().getTime(),
    title: '',
    description: '',
  }
}

const addTask = () => {
  tasksStore.addTask(newTask.value)
  resetForm()
}
const saveTask = () => {
  tasksStore.changeTask(newTask.value)
  emit('closeForm', false)
  resetForm()
}

const handleLoginEnter = () => {
  if (newTask.value.title.trim() !== '') {
    descriptionInput.value.focus()
  }
}

onMounted(() => {
  if (props.editTask) {
    newTask.value = props.editTask
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && newTask.value.title.trim() !== '')
      props.editTask ? saveTask() : addTask()
    else if (e.key === 'Escape' && newTask.value.title.trim() === '') closeForm()
  })
})
</script>
<template>
  <form class="addition-form">
    <input
      type="text"
      v-model="newTask.title"
      @keyup.enter="handleLoginEnter"
      class="input"
      placeholder="Название задачи"
    />
    <input
      type="text"
      ref="descriptionInput"
      v-model="newTask.description"
      class="input"
      placeholder="Описание задачи"
      @keyup.enter="editTask ? saveTask() : addTask()"
    />

    <div class="buttons">
      <button class="button" @click="closeForm" type="button">Отмена</button>
      <button
        class="button"
        v-if="!editTask"
        @click="addTask"
        :disabled="newTask.title === ''"
        type="button"
      >
        Добавить
      </button>
      <button
        class="button"
        v-else
        @click="saveTask"
        :disabled="newTask.title === ''"
        type="button"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>
<style scoped>
.addition-form {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 25px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
.input {
  padding: 10px 10px 5px 0;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  outline: none;
}
.buttons {
  display: flex;
  gap: 10px;
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
