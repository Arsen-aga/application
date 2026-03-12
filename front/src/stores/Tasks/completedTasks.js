import { ref } from 'vue'
import { loadTasks, saveTasks } from '@/helpers/localStore'


export const useCompletedTasks = () => {
  const completedTask = ref(loadTasks('completedTasks'))

  const addFinishTask = (task) =>{
    completedTask.value.unshift(task)
    saveTasks('completedTasks', completedTask.value)
  }

  return {
    completedTask,
    addFinishTask
  }
}
