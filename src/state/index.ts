import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';

import {
  persistStore,
  persistReducer
} from 'redux-persist';

import thunk from 'redux-thunk';

import reducers from './reducers';

import * as storage from './../utils/storage';

const createStoreAsync = (
  applyMiddleware(thunk)(createStore)
)

const opts:any = {
  blacklist: [],
  key: `AppStore`,
  storage: storage
}

const _reducers_ = (
  combineReducers(reducers)
)

const storeAsyncOpts = (
  persistReducer(opts, _reducers_)
)

const store:any = (
  createStoreAsync(storeAsyncOpts)
)

export const persist = persistStore(store);

export default store;
