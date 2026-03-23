<script setup>
import axios from 'axios'
import { ref } from 'vue'

const dataTest = ref(null)
const dataItems = ref(null)
const dataItem = ref(null)
const counter = ref(1)
const newDataItem = ref({ title: '', description: '' })
const idDataItem = ref(null)
const api = 'http://localhost:3000'

// запросы

const getData = async (url = '', headers = false) => {
  try {
    const response = await axios.get(`${api}/${url}`)
    console.log(response)
    return headers ? response : response.data
  } catch (error) {
    console.log(error)
  }
}
const postData = async (url, data) => {
  try {
    const response = await axios.post(`${api}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const patchData = async (url, data) => {
  try {
    const response = await axios.patch(`${api}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const deleteData = async (url = '', headers = false) => {
  try {
    const response = await axios.delete(`${api}/${url}`)
    console.log(response)
    return headers ? response : response.data
  } catch (error) {
    console.log(error)
  }
}

const getHello = async () => {
  try {
    const response = await getData()
    dataTest.value = response.message
  } catch (error) {
    console.log(error)
  }
}
const getItems = async () => {
  try {
    const response = await getData('tasks')
    dataItems.value = response
  } catch (error) {
    console.log(error)
  }
}
const getItem = async () => {
  try {
    const response = await getData(`tasks/${counter.value}`, true)
    dataItem.value = response.data
    counter.value++
  } catch (error) {
    console.log(error)
    counter.value = 1
    getItem()
  }
}
const createItem = async () => {
  if (newDataItem.value.title === '' && newDataItem.value.description === '') return
  try {
    const response = await postData(`tasks`, newDataItem.value)
    dataItem.value = response
    if (response) {
      newDataItem.value.title = ''
      newDataItem.value.description = ''
    }
  } catch (error) {
    console.log(error)
  }
  counter.value++
}
const changeItem = async () => {
  console.log('idDataItem.value', idDataItem.value)
  if (!idDataItem.value) return
  if (newDataItem.value.title === '' && newDataItem.value.description === '') return

  try {
    const response = await patchData(`tasks/${idDataItem.value}`, newDataItem.value)
    dataItem.value = response
    if (response) {
      newDataItem.value.title = ''
      newDataItem.value.description = ''
    }
  } catch (error) {
    console.log(error)
  }
}
const deleteItem = async () => {
  if (!idDataItem.value) return

  try {
    const response = await deleteData(`tasks/${idDataItem.value}`, true)
    console.log('response', response)
    alert(`Удалена задача ${idDataItem.value}`)
  } catch (error) {
    console.log(error)
  }
}
const getItemCategory = async () => {
  if (!idDataItem.value) return

  try {
    // получение категории задачи
    const response = await getData(`tasks/${idDataItem.value}/category/5`)
    console.log('response', response)
  } catch (error) {
    console.log(error)
  }
}

const getItemsQuery = async () => {
  try {
    // получение 5 задач с первой страницы с категориями learn и build, используя query параметры
    const response = await getData('tasks?limit=5&page=1&category=learn&category=build')
    dataItems.value = response
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="test-api">
    <h1 class="title">Страница с тестами</h1>
    <div class="btns">
      <div class="btn" @click="() => getHello()">Получить сообщение</div>
      <div class="btn" @click="() => getItems()">Получить задачи</div>
      <div class="btn" @click="() => getItem()">Получить одну задачу</div>
    </div>
    <hr />
    <div class="btns">
      <div class="btn" @click="() => getItemCategory()">
        Тестовый запрос с дополнительными параметрами
      </div>
      <div class="btn" @click="() => getItemCategory()">
        Тестовый запрос с дополнительными параметрами
      </div>
      <div class="btn" @click="() => getItemsQuery()">Тестовый запрос с query параметрами</div>
    </div>
    <hr />
    <form>
      <input type="text" placeholder="Название задачи" v-model="newDataItem.title" />
      <input type="text" placeholder="Описание задачи" v-model="newDataItem.description" />
      <input type="number" placeholder="id задачи" v-model="idDataItem" />
      <div class="btns">
        <div class="btn" @click="() => createItem()">Создать задачу</div>
        <div class="btn" @click="() => changeItem()">Редактировать задачу</div>
        <div class="btn" @click="() => deleteItem()">Удалить задачу</div>
      </div>
    </form>
    <div class="content-wrapper">
      <div class="content-message" v-if="dataTest">{{ dataTest }}</div>
      <div class="content-item" v-if="dataItem">
        <h4 class="item-title">{{ dataItem.id }}. {{ dataItem.title }}</h4>
        <p class="item-description">{{ dataItem.description }}</p>
      </div>
      <template v-if="dataItems">
        <div class="content" v-for="item in dataItems" :key="item.id">
          <h4 class="item-title">{{ item.id }}. {{ item.title }}</h4>
          <p class="item-description">{{ item.description }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.test-api {
  padding-right: 40px;
}
.title {
  margin-bottom: 15px;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  max-width: 250px;
  width: 100%;
  min-height: 40px;
  border: none;
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
  color: rgb(35, 183, 133);
  font-weight: 500;
  opacity: 0.7;
  padding: 5px;
  transition: all 0.3s ease-in-out;
}
.btn:hover {
  opacity: 1;
}

.content-wrapper {
  margin-top: 15px;
  display: grid;
  gap: 10px;
}

.content-item,
.content-message {
  background-color: #fff;
  color: black;
  padding: 5px 10px;
}
.content {
  padding: 5px 10px;
  border: 1px solid #fff;
}
.item-title {
  font-weight: 500;
}
.item-description {
  margin-left: 20px;
  padding-top: 5px;
}
</style>
