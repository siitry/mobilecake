import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    show:false,
    np:"",
    cartCount:0,
  },
  mutations: {
    show(state){
      state.show=true;
    }
  },
  getters:{
    show(state){return state.show}
  },
  actions: {
  },
  modules: {
  }
})
