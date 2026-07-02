import { configureStore } from "@reduxjs/toolkit";
import {logger} from "redux-logger";
import clientReducer from "./slice/clientSlice";
import productReducer from "./slice/productSlice";

export const store = configureStore({
  reducer: {
    client:clientReducer,
    product:productReducer,
    
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;