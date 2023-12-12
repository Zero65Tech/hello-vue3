<template>
    <div>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
      };
    },
    async mounted() {
      try {
        const response = await this.$axios.get('/api/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
  </style>
  