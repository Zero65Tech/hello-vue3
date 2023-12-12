<template>
    <div>
      <button @click="deleteItem">Delete Item</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async deleteItem() {
        try {
          await this.$axios.delete(`/api/items/${itemId}`);
          console.log('Item deleted successfully');
          // Optionally, you can navigate to the list view or update the data
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  button {
    background-color: #ff4d4d; /* Red color for delete */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
  </style>
  