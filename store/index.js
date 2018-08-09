import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      shopname : 'nothing'
    },
    mutations: {
      addshop (state,payload) {
        state.shopname = payload;
      }
    },
     actions:{
        nuxtServerInit(vuexContext,context){
        }
     }
  })
}

export default createStore