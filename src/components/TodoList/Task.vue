<script setup>
import { computed, ref } from 'vue'
import { useTasksStore } from '@/stores/Tasks'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconCart from '@/components/icons/IconCart.vue'
import AdditionForm from '@/components/TodoList/AdditionForm.vue'
import Modal from '@/components/UI/Modal.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  edit: {
    type: Boolean,
    default: false,
  },
})
const tasksStore = useTasksStore()

const emit = defineEmits(['closeForm'])

const isChecked = ref(false)
const isAnimate = ref(false)
const isOpenModal = ref(false)

const isChangeTask = computed(() => tasksStore.editingTaskId === props.task.id)

const finishTask = (task) => {
  isChecked.value = true
  isAnimate.value = true
  setTimeout(() => {
    isChecked.value = false
  }, 500)
  tasksStore.updateTaskList(task)
}
const changeTask = () => {
  // isChangeTask.value = true
  emit('closeForm', false)
  tasksStore.setEditingTask(props.task.id)
}

const saveTask = () => {
  // isChangeTask.value = false
  tasksStore.clearEditingTask()
}

const openDeleteTaskModal = () => (isOpenModal.value = true)

const closeModal = () => (isOpenModal.value = false)

const deleteTask = (task) => {
  isChecked.value = true
  setTimeout(() => {
    isChecked.value = false
  }, 500)
  tasksStore.deleteTask(task)
  closeModal()
}
</script>
<template>
  <div>
    <div class="task" v-if="!isChangeTask" :class="{ checked: isChecked }">
      <div
        class="check"
        v-if="edit"
        :class="{ checked: isAnimate }"
        @click="finishTask(task)"
      ></div>
      <div class="right">
        <h4 class="title">{{ task.title }}</h4>
        <p class="descr">{{ task.description }}</p>
      </div>
      <IconEdit
        v-if="edit"
        @click="changeTask(task)"
        class="edit"
        current-color="hsla(160, 100%, 37%, 1)"
      />
      <IconCart
        v-if="edit"
        @click="openDeleteTaskModal"
        class="edit"
        current-color="hsla(160, 100%, 37%, 1)"
      />
    </div>
    <AdditionForm v-if="isChangeTask" :edit-task="task" @closeForm="saveTask" />
    <Modal v-if="isOpenModal" @closeModal="closeModal">
      <h3 class="task-modal-title">Удалить задачу?</h3>
      <div class="task-modal-btns">
        <div class="task-modal-btn" @click="closeModal">Отмена</div>
        <div class="task-modal-btn" @click="deleteTask(task)">Удалить</div>
      </div>
    </Modal>
  </div>
</template>
<style scoped>
.task {
  display: flex;
  gap: 15px;
  width: 100%;
  padding: 25px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.task.checked {
  scale: 1.05;
}

.task:hover .edit {
  opacity: 1;
}

.check {
  transition: all 0.3s ease-in-out;
  margin-top: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.check.checked,
.check:hover {
  scale: 1.05;
  background-color: hsla(160, 100%, 37%, 1);
}

.title {
  color: var(--vt-c-black);
  font-weight: 700;
  font-size: 24px;
}

.descr {
  font-size: 18px;
  color: var(--vt-c-black);
}

.edit {
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.task-modal-title {
  text-align: center;
  font-weight: 600;
  color: #191919;
}

.task-modal-btns {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.task-modal-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  max-width: 250px;
  width: 100%;
  height: 40px;
  border: none;
  transition: all 0.5s ease-in-out;
  color: hsla(160, 100%, 37%, 1);
  border: 1px solid hsla(160, 100%, 37%, 1);
}

.task-modal-btn:not(:disabled):hover {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
}
</style>
