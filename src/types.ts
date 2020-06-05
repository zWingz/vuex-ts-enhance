import {
  StoreOptions,
  ActionHandler,
  ActionObject,
} from 'vuex';

export type PromiseAction<T> = T extends ActionHandler<any, any>
  ? Parameters<T>[1] extends undefined
    ? T extends ActionObject<any, any>
      ? (...args: any) => Promise<ReturnType<T['handler']>>
      : () => Promise<ReturnType<T>>
    : (data: Parameters<T>[1]) => Promise<ReturnType<T>>
  : never;

export type Mutation<T> = T extends (...args: any[]) => void
  ? Parameters<T>[1] extends undefined
    ? () => void
    : (data: Parameters<T>[1]) => void
  : never;

export type Module<T extends StoreOptions<any>> = T['modules'];
export type Getters<T extends StoreOptions<any>> = T['getters'];
export type Actions<T extends StoreOptions<any>> = T['actions'];
export type State<T extends StoreOptions<any>> = T['state'];
export type Mutations<T extends StoreOptions<any>> = T['mutations'];

export type OnlyString<T> = keyof T & string;

export type GetKeys<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? OnlyString<Module<T>[E][K]>
    : never
  : never;


export type GetObject<T extends StoreOptions<any>, E, K> = E extends OnlyString<
  Module<T>
>
  ? K extends OnlyString<Module<T>[E]>
    ? Module<T>[E][K]
    : never
  : never;
