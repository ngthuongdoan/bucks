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

console.log(typeof process.env.VUE_APP_GUARD);
if (process.env.VUE_APP_GUARD === "true") {
  console.log("run");
  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const currentUser = await firebase.auth().currentUser;
    console.log(requiresAuth, currentUser);
    if (requiresAuth && !currentUser) {
      next("/login");
    } else {
      next();
    }
  });
}

export default router;
