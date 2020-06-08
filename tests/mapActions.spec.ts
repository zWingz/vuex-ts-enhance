import { EnhanceStore } from '../src/store';
const state = {
  actions: {
    setName({ commit }, payload) {
    },
    setName2({ commit }, payload) {
    },
  },
  modules: {
    user: {
      namespaced: true,
      actions: {
        updateUsername({ commit }, payload: string) {},
        updateUserMeta(
          { commit },
          payload: { age?: number; address?: string }
        ) {},
        test: {
          root: true,
          handler({ commit }, payload: string) {},
        },
      },
    },
  },
};

const s = new EnhanceStore(state);
export const { mapGetters, store, mapActions, mapMutations, mapState } = s;

mapActions('user', ['updateUserMeta']).updateUserMeta({ age: 1 });
mapActions('user', ['updateUsername']).updateUsername('123');
mapActions('user', ['test']).test('fd');
