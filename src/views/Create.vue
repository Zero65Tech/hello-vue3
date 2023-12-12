<template>
    <form @submit.prevent="createItem">
      <label for="itemName">Item Name:</label>
      <input v-model="itemName" type="text" id="itemName" />
      <button type="submit">Create Item</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        itemName: '',
      };
    },
    methods: {
      async createItem() {
        try {
          const response = await this.$axios.post('/api/items', { name: this.itemName });
          console.log('Item created:', response.data);
          // Optionally, you can navigate to the list view or update the data
        } catch (error) {
          console.error('Error creating item:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  form {
    margin: 20px;
  }
  label {
    margin-right: 10px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
  </style>
  