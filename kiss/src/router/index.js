import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index.vue"
import List from "../components/List.vue"
import Login from "../components/Login.vue"
import OrderForm from "../components/OrderForm.vue"
import Details from "../components/details.vue"
import Cart from "../components/Cart.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Index.vue')
  },
  {path:"/list/:clsid",name:"list",component:List,props: true},
  {path:"/login",component:Login},
  {path:"/orderform",component:OrderForm},
  {path:"/details/:id",name:"details",component:Details,props: true},
  {path:"/cart",component:Cart},
]
const router = new VueRouter({
  routes
})

export default router
