import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'camelcase';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', false, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = camelCase(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'));
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = new Vuex.Store({
    modules,
});

export default store;
