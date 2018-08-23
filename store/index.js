import Vuex from 'vuex'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: {
      
      lineuser: null, // ?, line object for access user
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
      setLineuser(state,user){
                console.log('--[$sotre.mutations]setLineuser')
                state.lineuser = user
                // state.idToken = user.id_token
            },
      clearUser(state){
               // console.log('--[$sotre.mutations]setLineuser')
                state.lineuser = null
                // state.idToken = user.id_token
            },
      
      addshop (state,payload) {
        state.shopname = payload;
      }
    },
     actions:{
        nuxtServerInit(vuexContext,context){
                console.log('--[$sotre.nextServerInit]')
                if (context.req.session.lineuser) {
                    // vuexContext.commit('setLineuser', context.req.session.lineuser)
                    vuexContext.state.lineuser = context.req.session.lineuser;
                    vuexContext.state.accessibiltyLv = 4;
                }
                else{
                    vuexContext.state.lineuser = null;
                    vuexContext.state.accessibiltyLv = 0;
                    console.log('---[$sotre.nextServerInit] no lineuser')
                }
            },
     },
     getters :{
        currentUser(state){
                return state.lineuser
            },
            isAuthenticated(state){
                return state.lineuser !=null
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