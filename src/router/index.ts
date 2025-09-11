import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/pageHome.vue"),
  },
  {
    path: "/about",
    component: () => import("../views/pageAbout.vue"),
  },
  {
    path: "/projects",
    component: () => import("../views/pageProjects.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
