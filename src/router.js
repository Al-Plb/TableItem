import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Profil from './views/Profil.vue'
import Admin from './views/Admin.vue'
//import ApiResult from './components/ApiResult.vue'
import TableItem from './components/TableItem.vue'
import Login from './components/Login.vue'
import store  from './store.js'


Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
                 
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          component: About
        },
        {
          path: '/tableItem',
          name: 'tableItem',
          component: TableItem
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          path: '/profil',
          name: 'profil',
          component: Profil
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          meta: { authorize: ["Admin"] } 
        },
        
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {

  

  const publicPages = ['/login', '/about', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.connected;

  if (authRequired && !loggedIn) {
    return next('/login');
  }


  // v-if="(roleUser === ('SuperAdmin && Admin'))"

  next();
})
