<script>
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
      fetch('http://localhost:3000/users')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.documentList = data;
        })
        .catch(error => {
          console.error('Error fetching document list:', error);
          // Handle errors here
        });
    },
    create() {
      
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Document added successfully:', data);
          this.fetchDocumentList(); // Refresh the document list after adding
        })
        .catch(error => {
          console.error('Error adding document:', error);
          // Handle errors here
        });
    },
    update() {
      
      fetch(`http://localhost:3000/users/${this.formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Document updated successfully:', data);
          this.fetchDocumentList(); 
        })
        .catch(error => {
          console.error('Error updating document:', error);
          // Handle errors here
        });
    },
    deleteDocument() {
      
      fetch(`http://localhost:3000/users/${this.formData.id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
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
