import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/Home.vue';
import CreateProject from '../views/Project/Create.vue';
import EditProject from '../views/Project/Edit.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create Project',
    component: CreateProject,
  },
  {
    path: '/projects/:id',
    name: 'Edit Project',
    component: EditProject,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
