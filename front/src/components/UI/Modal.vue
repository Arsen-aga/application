<script setup>
import { onMounted, onUnmounted } from 'vue'
const emit = defineEmits(['close-modal'])

const closeModal = () => {
  emit('close-modal', false)
  document.body.style.overflow = ''
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close-modal', false)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="modal" @click="closeModal">
    <div class="modal__content">
      <div class="modal__block" @click.stop>
        <div class="modal__close" @click="closeModal">x</div>
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
  min-height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.modal__content {
  position: relative;
  padding: 100px 0;
  height: 100%;
  max-height: 100%;
  width: 100%;
  z-index: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.modal__block {
  position: relative;
  max-width: 900px;
  width: 100%;
  background-color: #fff;
  border-radius: 16px;
  padding: 40px;
  height: fit-content;
  cursor: initial;
}

.modal__close {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #ec1111;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
}

.modal__close:hover {
  scale: 1.1;
  opacity: 1;
}
</style>
