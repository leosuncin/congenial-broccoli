import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import type { AppState } from '../store';
import { resetAfterSubmit } from './resetAfterSubmitAction';

export interface Order {
  id: string;
  order: string;
  amount: number;
}

export interface CreateOrder {
  order: string;
  amount: number;
}

export const ORDERS_FEATURE_KEY = 'orders' as const;

type OrderState = Order[];

interface OrderCaseReducer extends SliceCaseReducers<OrderState> {
  addOrder(state: OrderState, action: PayloadAction<CreateOrder>): void;
  deleteOrder(state: OrderState, action: PayloadAction<string>): OrderState;
}

export const initialOrdersState: OrderState = [];

export const orderSlice = createSlice<OrderState, OrderCaseReducer>({
  name: ORDERS_FEATURE_KEY,
  initialState: initialOrdersState,
  reducers: {
    addOrder(state, action) {
      state.push({
        order: action.payload.order,
        amount: Number(action.payload.amount),
        id: nanoid(),
      });
    },
    deleteOrder(state, action: PayloadAction<string>) {
      return state.filter((order) => order.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(resetAfterSubmit, () => initialOrdersState);
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(addOrder([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const { addOrder, deleteOrder } = orderSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(getOrdersState);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const ordersSelector = (rootState: AppState): OrderState =>
  rootState[ORDERS_FEATURE_KEY];

/*
 * Export reducer for store configuration.
 */
export default orderSlice.reducer;
