import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

import type { AppState } from '../store';
import { resetAfterSubmit } from './resetAfterSubmitAction';

export interface Customer {
  id: string;
  selected: boolean;
  name: string;
}

export const CUSTOMERS_FEATURE_KEY = 'customers' as const;

type CustomerState = Customer[];

interface CustomerCaseReducers extends SliceCaseReducers<CustomerState> {
  markCustomerAsSelected(
    state: CustomerState,
    action: PayloadAction<string>,
  ): CustomerState;
}

const initialCustomersState: CustomerState = [
  {
    id: 'b176a363-2e24-473d-8383-950e08a9779d',
    name: 'John',
    selected: true,
  },
  {
    id: 'f3dc78a0-0a9d-4d25-990e-d19a5c1de722',
    name: 'Mark',
    selected: false,
  },
];

const customersSlice = createSlice<CustomerState, CustomerCaseReducers>({
  name: CUSTOMERS_FEATURE_KEY,
  initialState: initialCustomersState,
  reducers: {
    markCustomerAsSelected(state, action) {
      return state.map((customer) => ({
        ...customer,
        selected: customer.id === action.payload,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAfterSubmit, () => initialCustomersState);
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(markCustomerAsSelected('f3dc78a0-0a9d-4d25-990e-d19a5c1de722'));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const { markCustomerAsSelected } = customersSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(customersSelector);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const customersSelector = (rootState: AppState): CustomerState =>
  rootState[CUSTOMERS_FEATURE_KEY];

export const selectedCustomerSelector = (
  rootState: AppState,
): Customer | undefined =>
  rootState[CUSTOMERS_FEATURE_KEY].find((c) => c.selected);

/*
 * Export reducer for store configuration.
 */
export default customersSlice.reducer;
