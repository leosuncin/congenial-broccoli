import {
  Draft,
  PayloadAction,
  SliceCaseReducers,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import type { AppState } from '../store';
import { backlogSelector } from './backlogSlice';

export const SEARCH_FEATURE_KEY = 'search' as const;

interface SearchCaseReducers extends SliceCaseReducers<string> {
  changeSearchTerm(state: Draft<string>, action: PayloadAction<string>): string;
}

export const searchSlice = createSlice<string, SearchCaseReducers>({
  name: SEARCH_FEATURE_KEY,
  initialState: '',
  reducers: {
    changeSearchTerm(state, action) {
      return action.payload;
    },
  },
});

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(changeSearchTerm('search'));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const { changeSearchTerm } = searchSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(searchTermSelector);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const searchTermSelector = (state: AppState): string =>
  state[SEARCH_FEATURE_KEY];
export const searchResultsSelector = createSelector(
  backlogSelector,
  searchTermSelector,
  (backlog, searchTerm) =>
    backlog.filter((order) =>
      order.list.find((item) => RegExp(searchTerm, 'i').test(item.order)),
    ),
);

/*
 * Export reducer for store configuration.
 */
export default searchSlice.reducer;
