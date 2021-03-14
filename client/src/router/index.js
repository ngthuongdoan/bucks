import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
  {
    path: "/",
    component: () => import("../views/index"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        name: "index",
        component: () => import("../views/index/dashboard"),
      },
      {
        path: "report",
        name: "report",
        component: () => import("../views/index/report"),
      },
      {
        path: "tool",
        name: "tool",
        component: () => import("../views/index/tool"),
      },
      {
        path: "info",
        name: "info",
        component: () => import("../views/index/info"),
      },
    ],
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

if (process.env.VUE_APP_GUARD === "true") {
  console.log("run");
  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const currentUser = await firebase.auth().currentUser;
    if (requiresAuth && !currentUser) {
      next("/login");
    } else {
      next();
    }
  });
}

export default router;
