import router from './router';
import store from './store';
// progress bar
import NProgress from 'nprogress';
// progress bar style
import 'nprogress/nprogress.css';
import {isLogged, Roles} from "./utils/auth";

// NProgress Configuration
NProgress.configure({ showSpinner: false });

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();

    const role = to.meta.role;

    if (role === Roles.none) {
        // go directly
        next();
        NProgress.done();
    } else {
        // determine whether the user has logged in
        const isUserLogged = isLogged();

        if (isUserLogged) {
            if (role === Roles.guest) {
                // if is logged in, redirect to the home page
                next({path: '/'});
                NProgress.done();
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken');
                    next(`/login?redirect=${to.path}`);
                    NProgress.done();
                }
            }
        } else {
            if (role !== Roles.guest) {
                next(`/login?redirect=${to.path}`);
            } else {
                next();
            }
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
