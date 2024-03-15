import { StoreOptions, ActionHandler, ActionObject } from 'vuex';

type AnyFunction = (...a: any) => any

export type Payload<T extends AnyFunction> = T extends (
  ...arg: [any, ...infer P]
) => any ? P : never;

type GetPayloadAndChangeReturn<T extends AnyFunction, NewReturn> = (...arg: Payload<T>) => NewReturn

export type PromiseAction<T> = T extends ActionHandler<any, any>
  ? GetPayloadAndChangeReturn<T, Promise<ReturnType<T>>>
  : T extends ActionObject<any, any>
  ? GetPayloadAndChangeReturn<T['handler'], Promise<ReturnType<T['handler']>>>
  : never;

export type PayloadAction<T> = T extends ActionHandler<any, any>
  ? Payload<T>
  : T extends ActionObject<any, any>
  ? Payload<T['handler']>
  : never;



  
export type Mutation<T extends (...args: any[]) => void> = GetPayloadAndChangeReturn<T, void>
export type Module<T extends StoreOptions<any>> = T['modules'];
export type Getters<T extends StoreOptions<any>> = NonNullable<T['getters']>;
export type Actions<T extends StoreOptions<any>> = T['actions'];
export type State<T extends StoreOptions<any>> = T['state'];
export type Mutations<T extends StoreOptions<any>> = NonNullable<T['mutations']>;

export type OnlyString<T> = keyof T & string;

export type GetNameSpaceKeys<
  T extends StoreOptions<any>,
  E,
  K
> = E extends OnlyString<Module<T>>
  ? K extends OnlyString<Module<T>[E]>
    ? OnlyString<Module<T>[E][K]>
    : never
  : never;

export type GetNameSpaceObject<
  T extends StoreOptions<any>,
  E,
  K
> = E extends OnlyString<Module<T>>
  ? K extends OnlyString<Module<T>[E]>
    ? Module<T>[E][K]
    : never
  : never;

export type AsFunction<T> = T extends (...args: any) => any ? T : (...args: any) => any;
