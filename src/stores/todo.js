import { reactive } from 'vue';

const state = reactive({
  tasks: [],
});

export const useTodoStore = () => {
  const addTask = (text) => {
    state.tasks.push({
      text,
      completed: false,
      favorite: false, // Add favorite property
    });
  };

  const removeTask = (index) => {
    state.tasks.splice(index, 1);
  };

  const toggleTaskCompletion = (index) => {
    state.tasks[index].completed = !state.tasks[index].completed;
  };

  const toggleFavorite = (index) => {
    state.tasks[index].favorite = !state.tasks[index].favorite; // Toggle favorite status
  };

  return {
    tasks: state.tasks,
    addTask,
    removeTask,
    toggleTaskCompletion,
    toggleFavorite,
  };
};