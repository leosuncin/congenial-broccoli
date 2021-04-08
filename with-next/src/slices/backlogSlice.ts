import {
  PayloadAction,
  SliceCaseReducers,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';

import type { AppState } from '../store';
import type { Order } from './ordersSlice';

export interface AddEntry {
  customer: string;
  time: string;
  list: Order[];
}

export interface BacklogEntry {
  id: string;
  customer: string;
  time: string;
  list: Order[];
}

export const BACKLOG_FEATURE_KEY = 'backlog' as const;

type BacklogState = BacklogEntry[];

interface BacklogCaseReducers extends SliceCaseReducers<BacklogState> {
  submitOrder(state: BacklogState, action: PayloadAction<AddEntry>): void;
  markOrderAsDone(
    state: BacklogState,
    action: PayloadAction<string>,
  ): BacklogState;
}

const initialBacklogState: BacklogState = [];

const backlogSlice = createSlice<BacklogState, BacklogCaseReducers>({
  name: BACKLOG_FEATURE_KEY,
  initialState: initialBacklogState,
  reducers: {
    submitOrder(state, action) {
      state.push({
        ...action.payload,
        id: nanoid(),
      });
    },
    markOrderAsDone(state, action) {
      return state.filter((order) => order.id !== action.payload);
    },
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(backlogActions.addBacklog([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const { submitOrder, markOrderAsDone } = backlogSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectBacklogEntities);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const backlogSelector = (rootState: AppState): BacklogState =>
  rootState[BACKLOG_FEATURE_KEY];

export const countOrdersSelector = (rootState: AppState): number =>
  rootState[BACKLOG_FEATURE_KEY].length;

/*
 * Export reducer for store configuration.
 */
export default backlogSlice.reducer;
