<script>
export default {
  data() {
    return {
      documentList: [],
    };
  },
  mounted() {
    // Fetch the document list from the server
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) {
        throw new Error( `HTTP error! Status: ${response.status}`);
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
  methods: {
    create() {
        document.getElementById("add").type="text";
        document.getElementById("update").type="hidden";
        
      },
      update(){
        document.getElementById("update").type="text";
        document.getElementById("add").type="hidden";
      },
      delete(){
        document.getElementById("delete").type="text";
      }
  }
};
</script>

<template>
    <div>
        <nav id="aviewnav">
            <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="create">Add</v-btn>
            <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="update">Update </v-btn>
            <v-btn :exact="true" variant="flat" :ripple="false" class="ml-4" @click="delete">Delete</v-btn>
        </nav>
        
    </div>
    <div><br>
        <input type="hidden" id="add" value="Input Here"> 
        <input type="hidden" id="update" value="Update Here">
        <input type="hidden" id="delete" value="Enter ID to delete"></div>
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
            <td>{{ document.first_name+ document.last_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #131010;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #131010;
  }
  #aviewnav{
   
  }
  #add{
    background-color: aliceblue;
  }
  #update{
    background-color: rgb(203, 229, 252);
  }
  </style>