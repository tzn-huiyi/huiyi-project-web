import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        nickname:''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token',token);
        },
        clearToken(state){
            state.token = '';
            localStorage.removeItem('token');
        }
    },
    actions: {
        //登录后记录token
        login({ commit }, token) {
            commit('setToken', token);
        },
        //注销时清除token
        logout({ commit }){
            commit('clearToken')
        }
    },
});
