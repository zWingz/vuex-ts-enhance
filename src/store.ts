import {
  Store as _Store,
  StoreOptions,
  mapActions,
  mapGetters,
  mapState,
  ActionHandler,
  ActionObject,
} from 'vuex';

type PromiseAction<T> = T extends ActionHandler<any, any>
  ? (...args: any) => Promise<ReturnType<T>>
  : T extends ActionObject<any, any>
  ? (...args: any) => Promise<ReturnType<T['handler']>>
  : never;

type Module<T extends StoreOptions<any>> = T['modules'];
type Getters<T extends StoreOptions<any>> = T['getters'];
type Actions<T extends StoreOptions<any>> = T['actions'];
type State<T extends StoreOptions<any>> = T['state'];

type OnlyString<T> = keyof T & string;

type SelectKey<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? OnlyString<Module<T>[E][K]>
    : never
  : never;
type SelectObject<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? Module<T>[E][K]
    : never
  : never;

export class EnhanceStore<S, T extends StoreOptions<S>> {
  store: _Store<S>;
  constructor(s: T) {
    this.store = new _Store(s);
  }
  dispatch<
    E extends OnlyString<Module<T>>,
    U extends SelectKey<T, E, 'actions'>
  >(k: E, u: U, payload?: any) {
    if (Array.isArray(u)) {
      return this.store.dispatch(`${k}/${u}`, payload);
    }
    return this.store.dispatch(k, payload);
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
  // namespace keys
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends SelectKey<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    u: Keys[]
  ): {
    [K in Keys]: () => ReturnType<SelectObject<T, NameSpace, 'getters'>[K]>;
  };
  // namespace mapper
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends SelectKey<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: () => ReturnType<
      SelectObject<T, NameSpace, 'getters'>[Map[k]]
    >;
  };
  mapGetters(k: any, u?: any) {
    if (u) {
      return mapGetters(k, u);
    }
    return mapGetters(k);
  }
  /**
   * mapActions
   */
  // keys
  mapActions<Keys extends OnlyString<Actions<T>>>(
    k: Keys[]
  ): { [k in Keys]: PromiseAction<Actions<T>[k]> };
  // mapper
  mapActions<Map extends Record<string, K>, K extends OnlyString<Actions<T>>>(
    k: Map
  ): { [k in keyof Map]: PromiseAction<Actions<T>[Map[k]]> };
  // namespace keys
  mapActions<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends SelectKey<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    u: Keys[]
  ): { [K in Keys]: PromiseAction<SelectObject<T, NameSpace, 'actions'>[K]> };
  // namespace mapper
  mapActions<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends SelectKey<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: PromiseAction<
      SelectObject<T, NameSpace, 'actions'>[Map[k]]
    >;
  };
  mapActions(k: any, u?: any) {
    if (u) {
      return mapActions(k, u);
    }
    return mapActions(k);
  }
  /**
   * mapState
   */
  // mapper
  mapState<Map extends Record<string, K>, K extends OnlyString<State<T>>>(
    k: Map
  ): { [k in keyof Map]: State<T>[Map[k]] };
  // keys
  mapState<Keys extends OnlyString<State<T>>>(
    k: Keys[]
  ): { [k in Keys]: State<T>[k] };
  // namespace keys
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends SelectKey<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    u: Keys[]
  ): { [K in Keys]: SelectObject<T, NameSpace, 'state'>[K] };
  // nanespace mapper
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends SelectKey<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    m: Map
  ): { [k in keyof Map]: SelectObject<T, NameSpace, 'state'>[Map[k]] };
  mapState(k: any, u?: any) {
    if (u) {
      return mapState(k, u);
    }
    return mapState(k);
  }
}
