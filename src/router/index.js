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
        component: () => import(`../views/index/tool/${f.path}`)
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
        component: () => import("../views/index"),
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
                name: "index",
                component: () => import("../views/index/dashboard")
            },
            {
                path: "report",
                name: "report",
                component: () => import("../views/index/report")
            },
            {
                path: "tool",
                component: () => import("../views/index/tool"),
                children: [
                    {
                        path: "",
                        component: () => import("../views/index/tool/all")
                    },
                    ...featureRoutes
                ]
            },
            {
                path: "account",
                name: "account",
                component: () => import("../views/index/account")
            },
            {
                path: "transaction",
                component: () => import("../views/index/transaction"),
                children: [
                    {
                        path: "add",
                        component: () => import("../views/index/transaction/add")
                    },
                    {
                        path: ":id",
                        component: () => import("../views/index/transaction/_id")
                    },
                ]
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
