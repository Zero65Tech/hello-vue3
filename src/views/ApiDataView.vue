<!-- ApiDataView.vue -->
<template>
    <div>
      <h1>{{ message }}</h1>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await fetch('http://localhost:3000/api/data');
          const data = await response.json();
          this.message = data.message;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  };
  </script>
  