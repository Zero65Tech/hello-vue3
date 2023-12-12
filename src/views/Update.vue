<template>
    <form @submit.prevent="updateItem">
      <label for="itemName">Updated Item Name:</label>
      <input v-model="updatedItemName" type="text" id="itemName" />
      <button type="submit">Update Item</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        updatedItemName: '',
      };
    },
    methods: {
      async updateItem() {
        try {
          const response = await this.$axios.patch(`/api/items/${itemId}`, { name: this.updatedItemName });
          console.log('Item updated successfully:', response.data);
          // Optionally, you can navigate to the list view or update the data
        } catch (error) {
          console.error('Error updating item:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  form {
    margin-top: 20px;
  }
  
  label {
    margin-right: 10px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 5px;
  }
  
  button {
    background-color: #3498db; /* Blue color for update */
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
  }
  </style>
  