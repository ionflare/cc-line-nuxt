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
          url:"/users/profile",
          parentMenu: null,
          requireAccessLv: 1
        },
        { title: "Service",
          icon: "assignment",
          url:"/services",
          parentMenu: null,
          requireAccessLv: 3
        },
         { title: "Booking",
          icon: "shop",
          url:"/Booking",
          parentMenu: null,
          requireAccessLv: 0
        },
        
         { title: "Settings",
          icon: "settings",
          url:"/settings",
          parentMenu: null,
          requireAccessLv: 0
        },
        
          { title: "Playground",
          icon: "assignment",
          url:"/playground",
          parentMenu: null,
          requireAccessLv: 0
        },
        
        
        //=========sub menu
            
        { title: "All User Info (As Admin)",
          icon: "assignment",
          url:"/users/userlists",
          parentMenu: "User",
          requireAccessLv: 3
        },
        { title: "User Role",
          icon: "assignment",
          url:"/users/userroles",
          parentMenu: "User",
          requireAccessLv: 3
        },
         { title: "Profile",
          icon: "assignment",
          url:"/users/profile",
          parentMenu: "User",
          requireAccessLv: 0
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