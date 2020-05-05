import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/home';
import Login from '../views/login';
import {Roles} from "../utils/auth";

Vue.use(Router);

export const routes =[
    {
        path: '/',
        meta: {
            role: Roles.none,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            role: Roles.guest,
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            role: Roles.user,
        }
    }
];

const router = new Router({
    mode: 'history',
    routes
});

export default router;
