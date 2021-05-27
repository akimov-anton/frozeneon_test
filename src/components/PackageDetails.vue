<template>
  <v-dialog
      :fullscreen="$vuetify.breakpoint.mobile"
      max-width="600"
      :value="showDialog"
      @close="hideDialog"
      @click:outside="hideDialog"
  >
    <v-card>
      <v-list-item two-line>
        <v-list-item-content>
          <div class="overline mb-4">
            Package details
          </div>
          <v-list-item-title class="headline mb-5">
            <a :href="packageDetailsInfo.links.npm" target="_blank">
              {{ packageDetailsInfo.name }}
            </a>
          </v-list-item-title>
          <div class="d-flex">
            <div v-if="packageDetailsInfo.author" class="d-flex">
              <v-icon
                  class="mr-3"
                  small
                  color="blue darken-2"
              >
                mdi-account
              </v-icon>
              <div class="mr-4">
                {{ packageDetailsInfo.author.name }}
              </div>
            </div>
            <div>
              <v-icon
                  class="mr-3"
                  small
                  color="blue darken-2"
              >
                mdi-tag
              </v-icon>
              {{ packageDetailsInfo.version }}
            </div>
          </div>
          <v-card-text>
            <div class="mt-6">
              {{ packageDetailsInfo.description }}
            </div>
          </v-card-text>
          <div v-if="packageDetailsInfo.versions && packageDetailsInfo.versions.length" class="text-caption mt-6">
            Versions
          </div>
          <div>
            <v-chip v-for="(version, key) in packageDetailsInfo.versions"
                    :key="key"
                    class="ma-2"
                    label
            >
              {{ version }}
            </v-chip>
          </div>
          <div v-if="packageDetailsInfo.keywords && packageDetailsInfo.keywords.length" class="text-caption mt-3">
            Keywords
          </div>
          <div>
            <v-chip v-for="(keyword, key) in packageDetailsInfo.keywords"
                    :key="key"
                    class="ma-2"
                    label
            >
              {{ keyword }}
            </v-chip>
          </div>
        </v-list-item-content>

      </v-list-item>
      <v-card-actions class="justify-end">
        <v-btn
            text
            @click="hideDialog"
        >Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
import store from '../store';

export default {
  name: "PackageDetails",
  computed: mapState([
    'packageDetailsInfo',
    'showDialog'
  ]),
  methods: {
    hideDialog() {
      store.commit('setShowDialog', false);
    }
  }
}
</script>

<style scoped>

</style>
