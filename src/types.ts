import { StoreOptions, ActionHandler, ActionObject } from 'vuex';


type Payload<T> = T extends (arg1: any, arg2: any) => any ? Parameters<T>[1] : never


export type PromiseAction<T> = T extends ActionHandler<any, any>
  ? Payload<T> extends undefined
    ? () => Promise<ReturnType<T>>
    : (payload: Payload<T>) => Promise<ReturnType<T>>
  : T extends ActionObject<any, any>
  ? Payload<T['handler']> extends undefined 
  ? () => Promise<ReturnType<T['handler']>>
  : (payload: Payload<T['handler']>) => Promise<ReturnType<T['handler']>>
  : never;

export type Mutation<T> = T extends (...args: any[]) => void
  ? Payload<T> extends undefined
    ? () => void
    : (payload: Payload<T>) => void
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
