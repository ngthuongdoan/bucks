import firebase from "firebase";
import Vue from "vue";
import VueRouter from "vue-router";
import {isMobile} from "mobile-device-detect";
import features from "@/config/features.json"

Vue.use(VueRouter);
const getFolder = () => isMobile ? 'mobile' : 'desktop';
const featureRoutes = features.map(f => {
  return {
    path: f.path,
    component: () => import(`../views/${getFolder()}/tool/${f.path}`)
  }
})
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login")
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("../views/upload")
  },
  {
    path: "/",
    component: () => import(`../views/${getFolder()}`),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        redirect: "/dashboard"
      },
      {
        path: "dashboard",
        name: "",
        component: () => import(`../views/${getFolder()}/dashboard`)
      },
      {
        path: "report",
        name: "report",
        component: () => import(`../views/${getFolder()}/report`)
      },
      {
        path: "tool",
        component: () => import(`../views/${getFolder()}/tool`),
        children: [
          {
            path: "",
            component: () => import(`../views/${getFolder()}/tool/all`)
          },
          ...featureRoutes,
          {
            path: "debt/:id",
            component: () => import(`../views/${getFolder()}/tool/debt-loan/debt/_id`)
          },
          {
            path: "loan/:id",
            component: () => import(`../views/${getFolder()}/tool/debt-loan/loan/_id`)
          }
        ]
      },
      {
        path: "account",
        name: "account",
        component: () => import(`../views/${getFolder()}/account`)
      },
      {
        path: "transaction",
        component: () => import(`../views/${getFolder()}/transaction`),
        children: [
          {
            path: "add",
            component: () => import(`../views/${getFolder()}/transaction/add`)
          },
          {
            path: ":id",
            component: () => import(`../views/${getFolder()}/transaction/_id`)
          },
        ]
      },
      {
        path: "wallet",
        name: "wallet",
        component: () => import(`../views/${getFolder()}/wallet`),
        children: [
          {
            path: "",
            component: () => import(`../views/${getFolder()}/wallet/all`)
          },
          {
            path: "add",
            component: () => import(`../views/${getFolder()}/wallet/add`)
          },
          {
            path: ":id",
            component: () => import(`../views/${getFolder()}/wallet/_id`)
          }
        ]
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

if (process.env.VUE_APP_GUARD === "true") {
  router.beforeEach(async (to, from, next) => {
    if (to.path === "/upload") {
      await next();
      return;
    }
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !await firebase.getCurrentUser()) {
      await next("/login");
    } else {
      await next();
    }
  });
}

export default router;
