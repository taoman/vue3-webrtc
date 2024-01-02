import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/videoVoice",
    name: "VideoVoice",
    component: () => import("../components/VideoVoice.vue"),
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes,
});
