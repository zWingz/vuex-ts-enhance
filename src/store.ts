import {
  Store as _Store,
  StoreOptions,
  mapActions,
  mapGetters,
  mapState,
  mapMutations,
} from 'vuex';

import {
  PromiseAction,
  Mutation,
  Module,
  Getters,
  Actions,
  State,
  Mutations,
  OnlyString,
  GetNameSpaceKeys,
  GetNameSpaceObject,
  AsFunction,
} from './types';

/**
 * methods override ordering must be
 * mapper > keys
 * root > namespaces
 */
export class EnhanceStore<S, T extends StoreOptions<S>> {
  store: _Store<S>;

  constructor(s: T) {
    this.store = new _Store(s);
    this.dispatch = this.dispatch.bind(this)
  }
  // key
  dispatch<Key extends OnlyString<Actions<T>>>(
    action: Key
  ): PromiseAction<Actions<T>[Key]>;
  // namespace
  dispatch<
    NameSpace extends OnlyString<Module<T>>,
    Key extends GetNameSpaceKeys<T, NameSpace, 'actions'>
  >(
    namespace: NameSpace,
    key: Key
  ): PromiseAction<GetNameSpaceObject<T, NameSpace, 'actions'>[Key]>;
  dispatch(arg1, arg2?) {
    return (...payload: any) => {
      const { dispatch } = this.store;
      if (arg2) {
        return dispatch(`${arg1}/${arg2}`, ...payload);
      }
      return dispatch(arg1, ...payload);
    };
  }

  /**
   * mapGetters
   */
  // mapper
  mapGetters<Map extends Record<string, K>, K extends OnlyString<Getters<T>>>(
    k: Map
  ): { [k in keyof Map]: () => ReturnType<Getters<T>[Map[k]]> };

  // keys
  mapGetters<Keys extends OnlyString<Getters<T>>>(
    k: Keys[]
  ): { [k in Keys]: () => ReturnType<Getters<T>[k]> };

  // namespace mapper
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: () => ReturnType<
      AsFunction<GetNameSpaceObject<T, NameSpace, 'getters'>[Map[k]]>
    >;
  };

  // namespace keys
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    u: Keys[]
  ): {
    [K in Keys]: () => ReturnType<
      AsFunction<GetNameSpaceObject<T, NameSpace, 'getters'>[K]>
    >;
  };

  mapGetters(k: any, u?: any) {
    return mapGetters(k, u);
  }

  /**
   * mapActions
   */
  // mapper
  mapActions<Map extends Record<string, K>, K extends OnlyString<Actions<T>>>(
    k: Map
  ): { [k in keyof Map]: PromiseAction<Actions<T>[Map[k]]> };

  // keys
  mapActions<Keys extends OnlyString<Actions<T>>>(
    k: Keys[]
  ): { [k in Keys]: PromiseAction<Actions<T>[k]> };

  // namespace mapper
  mapActions<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: PromiseAction<
      GetNameSpaceObject<T, NameSpace, 'actions'>[Map[k]]
    >;
  };

  // namespace keys
  mapActions<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    u: Keys[]
  ): {
    [K in Keys]: PromiseAction<GetNameSpaceObject<T, NameSpace, 'actions'>[K]>;
  };

  mapActions(k: any, u?: any) {
    return mapActions(k, u);
  }

  /**
   * mapMutations
   */
  // mapper
  mapMutations<
    Map extends Record<string, K>,
    K extends OnlyString<Mutations<T>>
  >(k: Map): { [k in keyof Map]: Mutation<Mutations<T>[Map[k]]> };

  // keys
  mapMutations<Keys extends OnlyString<Mutations<T>>>(
    k: Keys[]
  ): { [k in Keys]: Mutation<Mutations<T>[k]> };

  // namespace mapper
  mapMutations<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'mutations'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: Mutation<
      AsFunction<GetNameSpaceObject<T, NameSpace, 'mutations'>[Map[k]]>
    >;
  };

  // namespace keys
  mapMutations<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'mutations'>
  >(
    k: NameSpace,
    u: Keys[]
  ): {
    [K in Keys]: Mutation<
      AsFunction<GetNameSpaceObject<T, NameSpace, 'mutations'>[K]>
    >;
  };
  mapMutations(k: any, u?: any) {
    return mapMutations(k, u);
  }

  /**
   * mapState
   */
  // mapper
  mapState<Map extends Record<string, K>, K extends OnlyString<State<T>>>(
    k: Map
  ): { [k in keyof Map]: () => State<T>[Map[k]] };

  // keys
  mapState<Keys extends OnlyString<State<T>>>(
    k: Keys[]
  ): { [k in Keys]: () => State<T>[k] };

  // nanespace mapper
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: () => GetNameSpaceObject<T, NameSpace, 'state'>[Map[k]];
  };

  // namespace keys
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetNameSpaceKeys<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    u: Keys[]
  ): { [K in Keys]: () => GetNameSpaceObject<T, NameSpace, 'state'>[K] };
  mapState(k: any, u?: any) {
    return mapState(k, u);
  }
}
