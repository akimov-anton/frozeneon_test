<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="mt-6">
          <v-text-field
              label="Package name"
              outlined
              :loading="loading"
              v-model="queryString"
          ></v-text-field>
        </div>

        <v-data-table
            v-if="!error && (items.length || (!items.length && loading))"
            :headers="headers"
            :items="items"
            :server-items-length="totalItems"
            :loading="loading"
            :page="currentPage"
            :footer-props="{
              'items-per-page-options': [5, 10, 15]
            }"
            class="elevation-1"
            @pagination="changePagination"
            @update:items-per-page="changeItemsPerPage"
            @click:row="clickRow"
        >
          <template v-slot:item.name="{ item }">
            <a :href="item.links.npm">
              {{ item.name }}
            </a>
          </template>
        </v-data-table>
        <div v-if="error">Check your internet connection</div>
        <div v-if="!error && !items.length && !loading && searched">Nothing found</div>
      </v-col>
    </v-row>
    <PackageDetails/>
  </v-container>
</template>

<script>
import axios from 'axios';
import store from '../store';
import PackageDetails from './PackageDetails';

import {SEARCH_API_URL} from '@/constants';

const PAGE_SIZE = 10;

export default {
  name: 'PackageSearch',
  components: {
    PackageDetails
  },
  data: () => ({
    queryString: '',
    timer: null,
    totalItems: 0,
    items: [],
    itemsPerPage: PAGE_SIZE,
    loading: false,
    currentPage: 1,
    error: false,
    searched: false,
    headers: [
      {text: 'name', value: 'name', width: 200, sortable: false},
      {text: 'version', value: 'version', sortable: false},
      {text: 'description', value: 'description', sortable: false},
      {
        text: 'author',
        align: 'start',
        sortable: false,
        value: 'author.name',
      },
    ],
  }),
  watch: {
    queryString() {
      if (this.queryString) {
        this.currentPage = 1;
        this.getDataFromApi();
      }
    }
  },
  methods: {
    changePagination(data) {
      if (this.currentPage !== data.page) {
        this.currentPage = data.page;
        this.getDataFromApi();
      }
    },
    changeItemsPerPage(number) {
      this.itemsPerPage = number;
      this.getDataFromApi();
    },
    clickRow(data) {
      store.commit('setPackageDetails', data);
      store.commit('setShowDialog', true);
    },
    getDataFromApi() {
      if (!this.queryString) {
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.loading = true;
        axios.get(SEARCH_API_URL, {
          params: {
            text: this.queryString,
            size: this.itemsPerPage,
            from: (this.currentPage - 1) * this.itemsPerPage
          }
        }).then(data => {
          this.searched = true;
          this.error = false;
          this.items = data.data.objects.map(_ => _.package);
          this.totalItems = data.data.total;
          this.loading = false;
        }).catch(() => {
          this.error = true;
          this.loading = false;
        })
      }, 300);
    }
  }
}

</script>
