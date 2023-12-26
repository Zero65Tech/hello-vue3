<script>
import axios from 'axios';

export default {
  data() {
    return {
      documentList: [],
      formData: {
        id: null,
        first_name: "",
        last_name: "",
        collection: null
      }
    };
  },
  mounted() {
    this.fetchDocumentList();
  },
  methods: {
    fetchDocumentList() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          this.documentList = response.data;
        })
        .catch(error => {
          console.error('Error fetching document list:', error);
        });
    },
    create() {
      axios.post('http://localhost:3000/users', this.formData)
        .then(response => {
          console.log('Document added successfully:', response.data);
          this.fetchDocumentList(); 
        })
        .catch(error => {
          console.error('Error adding document:', error);
          
        });
    },
    update() {
      axios.put(`http://localhost:3000/users/${this.formData.id}`, this.formData)
        .then(response => {
          console.log('Document updated successfully:', response.data);
          this.fetchDocumentList();
        })
        .catch(error => {
          console.error('Error updating document:', error);
        });
    },
    deleteDocument() {
      axios.delete(`http://localhost:3000/users/${this.formData.id}`)
        .then(response => {
          console.log('Document deleted successfully');
          this.fetchDocumentList();
        })
        .catch(error => {
          console.error('Error deleting document:', error);
        });
    }
  }
};
</script>


<template>
  <div>
    <div class="input-group">
      <label for="id">ID:</label>
      <input v-model="formData.id" type="text" id="id" class="styled-input" placeholder="Enter ID">
    </div>
    <div class="input-group">
      <label for="first_name">First Name:</label>
      <input v-model="formData.first_name" type="text" id="first_name" class="styled-input" placeholder="Enter First Name">
    </div>
    <div class="input-group">
      <label for="last_name">Last Name:</label>
      <input v-model="formData.last_name" type="text" id="last_name" class="styled-input" placeholder="Enter Last Name">
    </div>
    <div class="input-group">
      <label for="collection">Collection:</label>
      <input v-model="formData.collection" type="text" id="collection" class="styled-input" placeholder="Enter Collection">
    </div>
    <nav id="aviewnav" class="action-buttons">
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="create">Add</v-btn>
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="update">Update</v-btn>
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="deleteDocument">Delete</v-btn>
    </nav>
    <br>

    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Collection</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(document, index) in documentList" :key="index">
            <td>{{ document.id }}</td>
            <td>{{ document.collection }}</td>
            <td>{{ document.first_name + ' ' + document.last_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #131010;
    color: white;
  }

  .input-group {
    display: inline-block;
    margin-right: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .styled-input {
    width: 150px;
    padding: 8px;
    border: 1px solid #494848;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .action-buttons {
    display: inline-block;
    margin-top: 20px;
  }

  v-btn {
    background-color: #2ecc71;
    color: white;
  }
</style>
