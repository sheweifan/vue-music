import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters.js'
import * as actions from './actions.js'
import mutations from './mutations.js'
import state from './state.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  getters,
  actions,
  mutations,
  state,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
