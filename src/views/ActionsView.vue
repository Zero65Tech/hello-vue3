<template>
    <div>
      <h2>Perform CRUD Operations</h2>
      <nav id="actionsnav">
        <router-link to="/actions/read">Read</router-link>
        <router-link to="/actions/create">Create</router-link>
        <router-link to="/actions/update">Update</router-link>
        <router-link to="/actions/delete">Delete</router-link>
      </nav>
  
      <!-- Content for CRUD operations -->
      <CrudComponent />
    </div>
  </template>
  
  <script>
  import postman from 'postman-request';
import CrudForm from '@/components/CrudForm.vue';

export default {
  components: {
    CrudForm,
  },
  data() {
    return {
      items: [],
      doclist: [],
      currentTab: 'read',
      formData: {
        name: '',
        collection: '',
      },
    };
  },
  methods: {
    createData() {
      postman.post('/Create', { json: this.formData }, (error, response, body) => {
        if (error) {
          console.error('Error creating data:', error);
        } else {
          this.items.push(body);
          this.formData = { name: '', collection: '' };
        }
      });
    },

    updateData() {
      postman.put('/Update', { json: this.formData }, (error, response, body) => {
        if (error) {
          console.error('Error updating data:', error);
        } else {
          this.formData = { name: '', collection: '' };
          this.currentTab = 'read';
        }
      });
    },

    deleteData() {
      postman.delete('/Delete', { json: this.formData }, (error, response, body) => {
        if (error) {
          console.error('Error deleting data:', error);
        } else {
          // Handle the response
          this.formData = { name: '', collection: '' };
          this.currentTab = 'read';
        }
      });
    },
  },
  computed: {
    currentTab() {
      // Logic to determine the current tab based on the route or other conditions
      return 'read'; // Replace with your logic
    },
  },
};

  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  #actionsnav {
    background-color: #333;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  #actionsnav a {
    color: white;
    text-decoration: none;
    padding: 8px 16px;
    margin: 0 8px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  #actionsnav a:hover {
    background-color: #555;
  }
  </style>