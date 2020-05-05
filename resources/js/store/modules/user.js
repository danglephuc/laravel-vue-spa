import {getInfo, login} from "../../api/auth";
import {removeToken, setLogged} from "../../utils/auth";

const state = {
    id: null,
    name: '',
    email: '',
};

const getters = {
    userId: state => {
        return state.id;
    }
};

const actions = {
    login({commit}, data) {
        const {email, password} = data;
        return new Promise((resolve, reject) => {
            login({
                email: email,
                password: password,
            }).then(response => {
                setLogged('1');
                resolve();
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        });
    },
    getUserInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response;

                if (!data) {
                    reject('Verification failed, please Login again.');
                }

                commit('SET_NAME', data.name);
                commit('SET_EMAIL', data.email);
                commit('SET_ID', data.id);

                resolve(data);
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        });
    },
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken();
            resolve();
        });
    }
};

const mutations = {
    SET_ID: (state, id) => {
        state.id = id;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_EMAIL: (state, email) => {
        state.email = email;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
