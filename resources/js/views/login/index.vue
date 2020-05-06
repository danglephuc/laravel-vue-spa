<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{ $t('login.title') }}</div>

                    <div class="card-body">
                        <template v-if="!isShowViewerLoginForm">
                            <button type="button" class="btn btn-primary"
                                    @click="handleLoginAsPresenter">
                                Login as presenter
                            </button>
                            <button type="button" class="btn btn-primary"
                                    @click="showViewerLoginForm">
                                Login as viewer
                            </button>
                        </template>
                        <form v-else>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" v-model="loginForm.email" required autocomplete="email" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" v-model="loginForm.password" required autocomplete="current-password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" v-model="loginForm.rememberMe">

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="button" class="btn btn-primary" @click="handleLogin">
                                        Login
                                    </button>
                                    <button type="button" class="btn btn-secondary" @click="hideViewerLoginForm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {csrf} from "../../api/auth";
    import {setLogged} from "../../utils/auth";

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    email: '',
                    password: '',
                    rememberMe: false,
                },
                redirect: undefined,
                otherQuery: {},
                isShowViewerLoginForm: false,
            };
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query;
                    if (query) {
                        this.redirect = query.redirect;
                        this.otherQuery = this.getOtherQuery(query);
                    }
                },
                immediate: true,
            }
        },
        mounted() {
            // TODO: work with redirect
            if (this.otherQuery.zoom_auth === 'success') {
                setLogged('1');
                this.$router.push(
                    {
                        path: '/home',
                    },
                    onAbort => {
                    }
                );
            }
        },
        methods: {
            handleLoginAsPresenter() {
                csrf().then(() => {
                    window.location = 'https://zoom.us/oauth/authorize?response_type=code&client_id=8QHnB_v0SqGoHAhKQSRHtA&redirect_uri=http%3A%2F%2F192.168.99.100%3A8000%2Fzoom-auth'
                })
            },
            showViewerLoginForm() {
                this.isShowViewerLoginForm = true;
            },
            hideViewerLoginForm() {
                this.isShowViewerLoginForm = false;
            },
            handleLogin() {
                csrf().then(() => {
                    this.$store.dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push(
                                {
                                    path: this.redirect || '/',
                                    query: this.otherQuery,
                                },
                                onAbort => {
                                }
                            );
                        })
                        .catch(() => {

                        });
                });
            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur];
                    }
                    return acc;
                }, {});
            },
        }
    }
</script>
