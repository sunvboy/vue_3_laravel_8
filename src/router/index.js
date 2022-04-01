
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
// page
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Dashboard from '../views/auth/Dashboard.vue';
import SurveyView from '../views/auth/SurveyView.vue';
//component
import Default from '../components/layouts/Default.vue';
import Auth from '../components/layouts/Auth.vue';
//acount
import Information from '../views/account/Information.vue';
import Address from '../views/account/Address.vue';
import Orders from '../views/account/Orders.vue';
import Favorites from '../views/account/Favorites.vue';
// Surveys
import Surveys from '../views/auth/Surveys.vue';
import SurveyViewBySlug from '../views/auth/SurveyViewBySlug.vue';
const routes = [
    {
        path: '/survey/:slug',
        name: 'SurveyViewBySlug',
        component: SurveyViewBySlug
    },
    {
        path: '/auth',
        redirect: '/auth/dashboard',
        component: Default,
        meta: { requireAuth: true },
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: Dashboard
        }, {
            path: 'surveys',
            name: 'Surveys',
            component: Surveys
        }, {
            path: 'surveys/create',
            name: 'SurveyCreate',
            component: SurveyView
        }, {
            path: 'surveys/:id',
            name: 'SurveyView',
            component: SurveyView
        }
        ]
    },
    {
        path: '/account',
        redirect: '/account/information',
        component: Default,
        meta: { requireAuth: true },
        name: 'Account',
        children: [{
            path: 'information',
            name: 'Information',
            component: Information
        }, {
            path: 'orders',
            name: 'Orders',
            component: Orders
        }, {
            path: 'address',
            name: 'Address',
            component: Address
        }, {
            path: 'favorites',
            name: 'Favorites',
            component: Favorites
        }
        ]
    },
    {
        path: '/auth',
        redirect: '/auth/login',
        component: Auth,
        meta: { isGuest: true },
        name: "Auth",
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login
            },
            {
                path: 'register',
                name: 'Register',
                component: Register
            },
        ]
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth && !store.state.user.token) {
        next({ name: 'Login' })
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({ name: 'Dashboard' })
    } else {
        next();
    }
})
export default router