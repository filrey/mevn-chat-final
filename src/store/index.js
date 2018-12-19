import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              data: user
            }
            console.log('New user:' + newUser)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      this.user = firebase.auth().currentUser
      console.log(this.user)
      commit('setUser', this.user)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              data: user
            }
            console.log('Set User: ' + newUser)
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { data: payload })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
