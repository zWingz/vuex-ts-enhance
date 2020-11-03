import Vue from 'vue';
import Vuex from 'vuex';
import { EnhanceStore } from '../src/store';
Vue.use(Vuex);
const state = {
  state: {
    rootState: 1,
  },
  actions: {
    setName({ commit }, payload?: number) {
      commit('setName', payload);
      return 'setName';
    },
    setName2({ commit }, payload: any) {
      return 'setName2';
    },
  },
  mutations: {
    root(state, payload: string) {
      return 'root-mutations';
    },
    setName(state, payload: string) {
      state.rootState = payload;
    },
  },
  getters: {
    rootGetter() {
      return '1';
    },
  },
  modules: {
    user: {
      namespaced: true,
      state: {
        userState: 'userState',
      },
      actions: {
        updateUsername({ commit }, payload: string) {
          commit('updateUsername', payload);
          return payload;
        },
        updateUserMeta(
          { commit },
          payload: { age?: number; address?: string }
        ) {
          return 'alias';
        },
        test: {
          root: true,
          handler({ commit }, payload: string) {},
        },
      },
      getters: {
        getterUser() {
          return 1;
        },
      },
      mutations: {
        test(state, payload?: number) {
          return 'user-mutations';
        },
        updateUsername(state, payload) {
          state.userState = payload;
        },
      },
    },
  },
};

const s = new EnhanceStore(state);
export const {
  mapGetters,
  store,
  mapActions,
  mapMutations,
  mapState,
  dispatch,
} = s;

describe('test EnhanceStore', () => {
  it('test mapState', () => {
    const vm = new Vue({
      store,
      computed: {
        ...mapState('user', ['userState']),
        ...mapState(['rootState']),
      },
    });
    expect(vm.userState).toEqual('userState');
    expect(vm.rootState).toEqual(1);
  });
  it('test mapGetters', () => {
    const vm = new Vue({
      store,
      computed: {
        ...mapGetters('user', ['getterUser']),
        ...mapGetters(['rootGetter']),
      },
    });
    expect(vm.getterUser).toEqual(1);
    expect(vm.rootGetter).toEqual('1');
  });
  it('test mapActions', async () => {
    const vm = new Vue({
      store,
      methods: {
        ...mapActions('user', ['updateUsername']),
        ...mapActions(['setName']),
        ...mapActions('user', {
          alias: 'updateUserMeta',
        }),
        ...mapActions({
          test: 'setName2',
        }),
      },
    });
    expect(await vm.updateUsername('123')).toEqual('123');
    expect(await vm.setName()).toEqual('setName');
    expect(await vm.test(1)).toEqual('setName2');
    expect(await vm.alias({ address: '' })).toEqual('alias');
  });
  it('test mapMutations', async () => {
    const vm = new Vue({
      store,
      methods: {
        ...mapMutations('user', ['test']),
        ...mapMutations(['root']),
        ...mapMutations('user', {
          alias: 'test',
        }),
        ...mapMutations({
          rootAlias: 'root',
        }),
      },
    });
    expect(await vm.test(123)).toEqual(undefined);
    expect(await vm.alias(123)).toEqual(undefined);
    expect(await vm.root('21')).toEqual(undefined);
    expect(await vm.rootAlias('1')).toEqual(undefined);
  });
  it('test dispatch', async () => {
    const vm = new Vue({
      store,
      computed: {
        ...mapState('user', ['userState']),
        ...mapState(['rootState']),
      },
    });
    let data = await dispatch('user', 'updateUsername')('1');
    expect(data).toEqual('1');
    await Vue.nextTick();
    expect(vm.userState).toEqual('1');
    data = await dispatch('setName')(132);
    expect(data).toEqual('setName');
    await Vue.nextTick();
    expect(vm.rootState).toEqual(132);
  });
});
