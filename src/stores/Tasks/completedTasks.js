import { ref } from 'vue'

export const useCompletedTasks = (smeta) => {
  const completedTask = ref()

  return {
    changeDelivery,
    changePromotion,
    changePayment,
  }
}
