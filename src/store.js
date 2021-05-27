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
            version: ''
        }
    },
    mutations: {
        setShowDialog(state, value) {
            state.showDialog = value;
        },
        setPackageDetails(state, data) {
            state.packageDetailsInfo = data;
        }
    }
})
export default store;
