import Vuex from 'vuex'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: {
      
      current_user: null, // ?, line object for access user
      accessibiltyLv: 0,
      menus:[
        { title: "Home",
          icon: "home",
          url:"/",
          parentMenu: null,
          requireAccessLv: 0
        },
        { title: "User",
          icon: "assignment",
          url:"/user",
          parentMenu: null,
          requireAccessLv: 1
        },
        { title: "Service",
          icon: "assignment",
          url:"/Service",
          parentMenu: null,
          requireAccessLv: 0
        },
         { title: "Booking",
          icon: "shop",
          url:"/Booking",
          parentMenu: null,
          requireAccessLv: 0
        },
        
          { title: "Playground",
          icon: "assignment",
          url:"/playgroud",
          parentMenu: null,
          requireAccessLv: 0
        },
        
        
        //=========sub menu
            
        { title: "User Info",
          icon: "assignment",
          url:"/sss",
          parentMenu: "User",
          requireAccessLv: 1
        },
        { title: "UserRole",
          icon: "assignment",
          url:"/userrole",
          parentMenu: "User",
          requireAccessLv: 2
        },
        
    
        
      ],
      shopname : 'nothing'
    },
    mutations: {
      set_current_user(state,user){
                console.log('--[$sotre.mutations]setUser')
                state.current_user = user
                // state.idToken = user.id_token
            },
      clearUser(state){
               // console.log('--[$sotre.mutations]setLineuser')
                state.current_user = null
                // state.idToken = user.id_token
            },
      
      addshop (state,payload) {
        state.shopname = payload;
      }
    },
     actions:{
        nuxtServerInit(vuexContext,context){
                console.log('--[$sotre.nextServerInit]')
                if (context.req.session.current_user) {
                    // vuexContext.commit('setLineuser', context.req.session.lineuser)
                    vuexContext.state.current_user = context.req.session.current_user;
                    vuexContext.state.accessibiltyLv = parseInt(context.req.session.current_user.accessibiltyLv);
                }
                else{
                    vuexContext.state.current_user = null;
                    vuexContext.state.accessibiltyLv = 0;
                    console.log('---[$sotre.nextServerInit] no euser')
                }
            },
     },
     getters :{
        currentUser(state){
                return state.current_user
            },
            isAuthenticated(state){
                return state.current_user !=null
            },
       
       getmenus: (state) => (accessLV) => {
         //filter all menuseby accessLv
          var menusHolder = _.filter(state.menus, function(o) { return o.requireAccessLv <= accessLV; });
         return menusHolder;
            }
     }
  })
}

export default createStore