import { EnhanceStore } from '../src/store';
import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const state = {
  state: {
    name: 'this is name',
  },
  actions: {
    setName({ commit }, payload) {
      commit('setName', payload);
      return 1
    },
    setName2({ commit }, payload) {
      commit('setName', payload);
      return 1
    },
  },
  mutations: {
    setName(state, payload) {
      state.name = payload;
    },
  },
  getters: {
    getName(state) {
      return state.name as string;
    },
    getName2(state) {
      return state.name as string;
    },
  },
  modules: {
    user: {
      namespaced: true,
      state: {
        username: 'this is username',
        meta: {
          age: 20,
          address: 'address'
        }
      },
      actions: {
        updateUsername({ commit }, payload: string) {
          commit('setUsername', payload);
        },
        updateUserMeta({ commit }, payload: { age?: number; address?: string }) {
          commit('setUsername', payload);
        },
      },
      mutations: {
        setUsername(state, payload) {
          state.username = payload
        },
        setUserMeta(state, payload: { age?: number; address?: string }) {
          state.meta = {
            ...state.meta,
            ...payload
          };
        }
      },
      getters: {
        getUsername(state) {
          return state.username as string
        },
        getUsername2(state) {
          return state.username as string
        }
      }
    },
  },
};

const s = new EnhanceStore(state);
export const { mapGetters, store, mapActions, mapMutations, mapState } = s;
