import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCompletedTasks } from './completedTasks'
import { loadTasks, saveTasks } from '@/helpers/localStore'

export const useTasksStore = defineStore('tasks', () => {

  const completedTasksModule = useCompletedTasks()
  const taskList = ref(loadTasks('tasks'))
  const editingTaskId = ref(null)

  const updateTaskList = (checkedTask) => {
    deleteTask(checkedTask)
    completedTasksModule.addFinishTask(checkedTask)
  }
  const addTask = (newTask) => {
    console.log('taskList', taskList.value)
    taskList.value.push(newTask)
    saveTasks('tasks', taskList.value)
  }
  const deleteTask = (checkedTask) => {
    setTimeout(() => {
      taskList.value = taskList.value.filter((task) => task.id !== checkedTask.id)
      saveTasks('tasks', taskList.value)
    }, 1000)
  }
  const changeTask = (editTask) => {
    const index = taskList.value.findIndex((task) => task.id === editTask.id)
    if (index !== -1) {
      taskList.value[index] = editTask
      saveTasks('tasks', taskList.value)
    }
  }
  const setEditingTask = (taskId) => {
    editingTaskId.value = taskId
  }
  const clearEditingTask = () => {
    editingTaskId.value = null
  }

  return {
    taskList,
    editingTaskId,
    updateTaskList,
    addTask,
    deleteTask,
    changeTask,
    setEditingTask,
    clearEditingTask,

    completedTask: completedTasksModule.completedTask,
    addFinishTask: completedTasksModule.addFinishTask
  }
})
