<script setup>
import Sidebar from '@/components/TodoList/Sidebar.vue'
const date0 = new Date('2025')
const date = new Date('2026')
const date1 = new Date('2027')
const date2 = new Date('2028')
const date3 = new Date('2029')
function getWeekdaysCountOptimized(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  start.setHours(0, 0, 0, 0)
  end.setHours(0, 0, 0, 0)

  const totalDays = Math.round((end - start) / (1000 * 60 * 60 * 24))
  const fullWeeks = Math.floor(totalDays / 7)
  const remainingDays = totalDays % 7

  // Будних дней в полных неделях
  let weekdays = fullWeeks * 5

  // Добавляем оставшиеся дни
  let currentDay = start.getDay()
  for (let i = 0; i < remainingDays; i++) {
    const dayOfWeek = (currentDay + i) % 7
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdays++
    }
  }

  return weekdays
}

const weekdaysOptimized = getWeekdaysCountOptimized(date0, date)
const weekdaysOptimized1 = getWeekdaysCountOptimized(date, date1)
const weekdaysOptimized2 = getWeekdaysCountOptimized(date1, date2)
const weekdaysOptimized3 = getWeekdaysCountOptimized(date2, date3)
console.log('Будних дней (оптимизировано) 25-26:', weekdaysOptimized)
console.log('Будних дней (оптимизировано) 26-27:', weekdaysOptimized1)
console.log('Будних дней (оптимизировано) 27-28:', weekdaysOptimized2)
console.log('Будних дней (оптимизировано) 28-29:', weekdaysOptimized3)
</script>
<template>
  <div class="wrapper">
    <Sidebar />
    <RouterView />
  </div>
</template>
<style scoped>
.wrapper {
  padding: 0;
}
</style>
