import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login")
  },
  {
    path: "/",
    children: [
      {
        path: "",
        name: "index",
        component: () => import("../views/index")
      }
    ]
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  let user = store.getters["userModule/getUser"] || { loggedIn: false };
  if (to.path !== "/login") {
    if (user.loggedIn === true) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (!user.loggedIn) {
      next();
    } else {
      next(false);
    }
  }
});

export default router;
