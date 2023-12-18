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
    <div style=" text-align: center;">
      <input style="background-color: lightblue;" v-model="formData.id" type="text" placeholder="ID">
      <input style="background-color: lightblue;" v-model="formData.first_name" type="text" placeholder="First Name">
      <input style="background-color: lightblue;" v-model="formData.last_name" type="text" placeholder="Last Name">
      <input style="background-color: lightblue;" v-model="formData.collection" type="text" placeholder="Collection">
    </div><br>
    <nav id="aviewnav" style=" text-align: center;">
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="create">Add</v-btn>
      <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="update">Update </v-btn>
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
    background-color: gr;
  }

  th, td {
    border: 1px solid #131010;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #131010;
  }

  #aviewnav {
  }

  input {
    margin: 5px;
  }
</style>
