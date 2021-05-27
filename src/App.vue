<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        Package search
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <PackageSearch/>
    </v-main>
    <v-footer
        padless
        color="primary lighten-1"
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            color="white"
            text
            rounded
            class="my-2"
            href="https://github.com/akimov-anton/frozeneon_test"
        >
          Author - Anton Akimov
        </v-btn>
        <v-col
            class="primary lighten-2 py-4 text-center white--text"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>

  </v-app>
</template>

<script>
import PackageSearch from './components/PackageSearch';

export default {
  name: 'App',

  components: {
    PackageSearch,
  },

  data: () => ({
    //
  }),
};
</script>
