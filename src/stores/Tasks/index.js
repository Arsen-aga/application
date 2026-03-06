import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  const defaultTasks = [
    {
      id: 1,
      title: 'title 1',
      description: 'description 1',
    },
    {
      id: 2,
      title: 'title 2',
      description: 'description 2',
    },
  ]
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(taskList.value))
  }
  const loadTasks = () => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : defaultTasks
  }

  const taskList = ref(loadTasks())
  const editingTaskId = ref(null)

  const updateTaskList = (checkedTask) => {
    setTimeout(() => {
      taskList.value = taskList.value.filter((task) => task.id !== checkedTask.id)
      saveTasks()
    }, 1000)
  }
  const addTask = (newTask) => {
    console.log('taskList', taskList.value)
    taskList.value.push(newTask)
    saveTasks()
  }
  const changeTask = (editTask) => {
    const index = taskList.value.findIndex((task) => task.id === editTask.id)
    if (index !== -1) {
      taskList.value[index] = editTask
      saveTasks()
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
    changeTask,
    setEditingTask,
    clearEditingTask,
  }
})
