const state = {
    language: 'en',
};

const getters = {
    language: state => {
        return state.language;
    }
};

const actions = {
    setLanguage({commit}, language) {
        commit('SET_LANGUAGE', language)
    }
};

const mutations = {
    SET_LANGUAGE: (state, language) => {
        state.language = language;
        // Cookies.set('language', language);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
