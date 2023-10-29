<template>
  <v-app>
    <v-navigation-drawer app :value="isSidebarOpen" class="sidebar">
      <v-list dense>
        <v-list-item-group v-model="selectedItem">
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/about">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <!-- Add more sidebar items here -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-btn icon @click="toggleSidebar">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <router-link to="/">
        <img alt="Logo" src="@/assets/logo.svg" width="40" />
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView :doGet="doGet" :doPost="doPost" />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="2500">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import axios from 'axios';

export default {
  data() {
    return {
      location: undefined,
      session: undefined,
      snackbar: false,
      snackbarText: '',
      isSidebarOpen: false,
      selectedItem: null,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  transition: width 0.3s ease-in-out;
}

.sidebar .v-list-item__title {
  font-size: 18px;
}

.sidebar .v-icon {
  margin-right: 10px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
}
</style>
