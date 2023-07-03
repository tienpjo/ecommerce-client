import { localStorageSync } from 'ngrx-store-localstorage';
import * as ProductReducer from './product.reducer';
import * as AuthReducer from './auth.reducer';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { State } from '../state/app.state';
export { ProductReducer };

export const reducers: ActionReducerMap<State> = {
  product: ProductReducer,
  user: AuthReducer,
};
const reducerKeys = ['product'];

export const localStorageSyncReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return localStorageSync({ keys: reducerKeys })(reducer);
};
