<template>
  <div id="app">
    <header class="header">
      <h1>Tugas Kelas 4A</h1>
      <div class="input-container">
        <input v-model="newTask" placeholder="Apa Tugasku...?" />
        <button @click="addTask">Tambah</button>
      </div>
    </header>
    <main>
      <p>Kamu Memiliki {{ incompleteTasks }} Tugas Yang Harus Di Kerjakan</p>
      <div class="tasks-container">
        <div v-for="(task, index) in tasks" :key="index" class="task">
          <div class="task-text" :class="{ completed: task.completed }" @click="toggleTaskCompletion(index)">
            {{ task.text }}
          </div>
          <div class="task-buttons">
            <button @click="removeTask(index)" class="delete-button">🗑️</button>
            <button @click="toggleFavorite(index)" class="favorite-button" :class="{ favorite: task.favorite }">❤️</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from './stores/todo';

export default {
  setup() {
    const store = useTodoStore();
    const newTask = ref('');

    const addTask = () => {
      if (newTask.value.trim()) {
        store.addTask(newTask.value);
        newTask.value = '';
      }
    };

    const removeTask = (index) => {
      store.removeTask(index);
    };

    const toggleTaskCompletion = (index) => {
      store.toggleTaskCompletion(index);
    };

    const toggleFavorite = (index) => {
      store.toggleFavorite(index);
    };

    const incompleteTasks = computed(() => {
      return store.tasks.filter(task => !task.completed).length;
    });

    return {
      newTask,
      tasks: store.tasks,
      incompleteTasks,
      addTask,
      removeTask,
      toggleTaskCompletion,
      toggleFavorite,
    };
  },
};
</script>
<style>
.favorite-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.favorite-button.favorite {
  color: purple; /* Change color to purple when favorited */
}
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 50px;
  height: 50px;
}

.input-container {
  display: flex;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #ff9800;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #e68900;
}

main {
  background-color: #ffffff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.task:hover {
  background-color: #f9f9f9;
}

.completed {
  text-decoration: line-through;
}

.task-text {
  flex-grow: 1;
}

.task-buttons {
  display: flex;
  gap: 10px;
}

.delete-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
