import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromApp from './app.reducers';

export interface State {
  app: fromApp.AppState;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
