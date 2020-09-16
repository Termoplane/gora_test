import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";
import User from "../views/User.vue"

import store from "../store";

Vue.use(VueRouter);

// Unauthorized page protection with vue-router navigation guard
const authRequired = (to, from, next) => {
  if (!store.getters['isAuthenticated']) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authRequired
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/user",
    name: "User",
    component: User,
    beforeEnter: authRequired
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
