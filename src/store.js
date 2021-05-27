import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showDialog: false,
        packageDetailsInfo: {
            name: '',
            description: '',
            author: {
                name: ''
            },
            date: '',
            keywords: [],
            links: {
                npm: '',
                homepage: '',
            },
            tags: {},
            versions: [],
            version: ''
        }
    },
    mutations: {
        setShowDialog(state, value) {
            state.showDialog = value;
        },
        setPackageDetails(state, data) {
            state.packageDetailsInfo = data;
        },
        setPackageTags(state, data) {
            state.packageDetailsInfo.tags = data;
        },
        setPackageVersions(state, data) {
            state.packageDetailsInfo = {
                ...state.packageDetailsInfo,
                versions: data
            }
        }
    }
})
export default store;
