<template>
  <div>
    <h2>{{ operation }} Data</h2>
    <form @submit.prevent="onSubmitData">
      <label for="name">Name:</label>
      <input v-model="formData.name" type="text" id="name" required>

      <label for="collection">Collection:</label>
      <input v-model="formData.collection" type="text" id="collection" required>

      <button type="submit">{{ operation }}</button>
    </form>
  </div>
</template>

<script>
import postman from 'postman-request'; // Assuming postman is installed as a Node module

export default {
  props: ['formData', 'operation'],
  methods: {
    onSubmitData() {
      // Add any validation or custom logic here
      // Use postman for the HTTP request
      postman.post('/Create', { json: this.formData }, (error, response, body) => {
        // Handle the response
      });

      // Optionally, reset the form after submitting
      this.formData = { name: '', collection: '' };
    },
  },
};
</script>
