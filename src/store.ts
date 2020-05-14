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

type GetKeys<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? OnlyString<Module<T>[E][K]>
    : never
  : never;


type GetObject<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? Module<T>[E][K]
    : never
  : never;


/**
 * methods override ordering must be
 * mapper > keys
 * root > namespaces
 */
export class EnhanceStore<S, T extends StoreOptions<S>> {
  store: _Store<S>;
  constructor(s: T) {
    this.store = new _Store(s);
  }
  dispatch<
    E extends OnlyString<Module<T>>,
    U extends GetKeys<T, E, 'actions'>
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
  // namespace mapper
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetKeys<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: () => ReturnType<
      GetObject<T, NameSpace, 'getters'>[Map[k]]
    >;
  };
  // namespace keys
  mapGetters<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetKeys<T, NameSpace, 'getters'>
  >(
    k: NameSpace,
    u: Keys[]
  ): {
    [K in Keys]: () => ReturnType<GetObject<T, NameSpace, 'getters'>[K]>;
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
    Keys extends GetKeys<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    m: Map
  ): {
    [k in keyof Map]: PromiseAction<
      GetObject<T, NameSpace, 'actions'>[Map[k]]
    >;
  };
  // namespace keys
  mapActions<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetKeys<T, NameSpace, 'actions'>
  >(
    k: NameSpace,
    u: Keys[]
  ): { [K in Keys]: PromiseAction<GetObject<T, NameSpace, 'actions'>[K]> };
  mapActions(k: any, u?: any) {
    return mapActions(k, u);
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
  // nanespace mapper
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Map extends Record<string, Keys>,
    Keys extends GetKeys<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    m: Map
  ): { [k in keyof Map]: GetObject<T, NameSpace, 'state'>[Map[k]] };
  // namespace keys
  mapState<
    NameSpace extends OnlyString<Module<T>>,
    Keys extends GetKeys<T, NameSpace, 'state'>
  >(
    k: NameSpace,
    u: Keys[]
  ): { [K in Keys]: GetObject<T, NameSpace, 'state'>[K] };
  mapState(k: any, u?: any) {
    return mapState(k, u);
  }
}
