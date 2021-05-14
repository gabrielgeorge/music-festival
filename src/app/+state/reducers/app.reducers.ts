import { Action, createReducer, on } from "@ngrx/store";
import * as appActions from '../actions/app.actions';

export interface AppState {

}

export const initialState: AppState = {

}

const appReducer = createReducer(
  initialState,
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
