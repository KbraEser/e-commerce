import { configureStore } from '@reduxjs/toolkit'
import { logger } from 'redux-logger'
import clientReducer from './slice/clientSlice'
import productReducer from './slice/productSlice'
import shoppingCartReducer from './slice/shoppingCartSlice'

export const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;