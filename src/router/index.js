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
        component: () => import("../views/index/tool"),
        children: [
          // {
          //   path: ":feature",
          //   component: () => import("../views/all/tool/_feature")
          // }
          {
            path: "",
            component: () => import("../views/index/tool/all")
          },
          {
            path: "exchange",
            component: () => import("../views/index/tool/exchange")
          }
        ]
      },
      {
        path: "account",
        name: "account",
        component: () => import("../views/index/account"),
      },
      {
        path: "transaction",
        name: "transaction",
        component: () => import("../views/index/transaction"),
      },
      {
        path: "wallet",
        name: "wallet",
        component: () => import("../views/index/wallet"),
        children: [
          {
            path: "",
            component: () => import("../views/index/wallet/all")
          },
          {
            path: "add",
            component: () => import("../views/index/wallet/add")
          },
          {
            path: ":id",
            component: () => import("../views/index/wallet/_id")
          },
        ]
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
