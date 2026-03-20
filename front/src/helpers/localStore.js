export const saveTasks = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}
export const loadTasks = (name) => {
  const saved = localStorage.getItem(name)
  return saved ? JSON.parse(saved) : []
}