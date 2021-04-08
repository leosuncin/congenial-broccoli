import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import ordersReducer, { ORDERS_FEATURE_KEY } from './slices/ordersSlice';
import customersReducer, {
  CUSTOMERS_FEATURE_KEY,
} from './slices/customersSlice';
import backlogReducer, { BACKLOG_FEATURE_KEY } from './slices/backlogSlice';
import searchReducer, { SEARCH_FEATURE_KEY } from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    [ORDERS_FEATURE_KEY]: ordersReducer,
    [CUSTOMERS_FEATURE_KEY]: customersReducer,
    [BACKLOG_FEATURE_KEY]: backlogReducer,
    [SEARCH_FEATURE_KEY]: searchReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
