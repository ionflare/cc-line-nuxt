import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _48d1f768 = () => import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */).then(m => m.default || m)
const _1b6612e4 = () => import('../pages/signup/index.vue' /* webpackChunkName: "pages/signup/index" */).then(m => m.default || m)
const _47f3d389 = () => import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */).then(m => m.default || m)
const _37c50b94 = () => import('../pages/services/index.vue' /* webpackChunkName: "pages/services/index" */).then(m => m.default || m)
const _626f5432 = () => import('../pages/userroles/index.vue' /* webpackChunkName: "pages/userroles/index" */).then(m => m.default || m)
const _224e6f5d = () => import('../pages/shops/index.vue' /* webpackChunkName: "pages/shops/index" */).then(m => m.default || m)
const _5951b132 = () => import('../pages/bookinginfo/index.vue' /* webpackChunkName: "pages/bookinginfo/index" */).then(m => m.default || m)
const _42a88339 = () => import('../pages/booking/index.vue' /* webpackChunkName: "pages/booking/index" */).then(m => m.default || m)
const _7a80003e = () => import('../pages/booking/_id.vue' /* webpackChunkName: "pages/booking/_id" */).then(m => m.default || m)
const _959d2d9a = () => import('../pages/users/index_ori2.vue' /* webpackChunkName: "pages/users/index_ori2" */).then(m => m.default || m)
const _50c810f8 = () => import('../pages/shops/index_ori.vue' /* webpackChunkName: "pages/shops/index_ori" */).then(m => m.default || m)
const _0065467e = () => import('../pages/results/_id.vue' /* webpackChunkName: "pages/results/_id" */).then(m => m.default || m)
const _33d4cae4 = () => import('../pages/bookinginfo/index_ori.vue' /* webpackChunkName: "pages/bookinginfo/index_ori" */).then(m => m.default || m)
const _d672aa00 = () => import('../pages/results/ori_id.vue' /* webpackChunkName: "pages/results/ori_id" */).then(m => m.default || m)
const _b30ab5f6 = () => import('../pages/shops/_id.vue' /* webpackChunkName: "pages/shops/_id" */).then(m => m.default || m)
const _5c1f1596 = () => import('../pages/index_ori.vue' /* webpackChunkName: "pages/index_ori" */).then(m => m.default || m)
const _3927666f = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/users",
			component: _48d1f768,
			name: "users"
		},
		{
			path: "/signup",
			component: _1b6612e4,
			name: "signup"
		},
		{
			path: "/login",
			component: _47f3d389,
			name: "login"
		},
		{
			path: "/services",
			component: _37c50b94,
			name: "services"
		},
		{
			path: "/userroles",
			component: _626f5432,
			name: "userroles"
		},
		{
			path: "/shops",
			component: _224e6f5d,
			name: "shops"
		},
		{
			path: "/bookinginfo",
			component: _5951b132,
			name: "bookinginfo"
		},
		{
			path: "/booking",
			component: _42a88339,
			name: "booking"
		},
		{
			path: "/booking/:id",
			component: _7a80003e,
			name: "booking-id"
		},
		{
			path: "/users/index:ori2",
			component: _959d2d9a,
			name: "users-indexori2"
		},
		{
			path: "/shops/index:ori",
			component: _50c810f8,
			name: "shops-indexori"
		},
		{
			path: "/results/:id?",
			component: _0065467e,
			name: "results-id"
		},
		{
			path: "/bookinginfo/index:ori",
			component: _33d4cae4,
			name: "bookinginfo-indexori"
		},
		{
			path: "/results/ori:id?",
			component: _d672aa00,
			name: "results-oriid"
		},
		{
			path: "/shops/:id",
			component: _b30ab5f6,
			name: "shops-id"
		},
		{
			path: "/index:ori",
			component: _5c1f1596,
			name: "indexori"
		},
		{
			path: "/",
			component: _3927666f,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
