import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOG_IN:             type('[Auth] Log In'),
  LOG_IN_SUCCESS:     type('[Auth] Log In Success'),
  LOG_IN_FAIL:        type('[Auth] Log In Fail')
};

export class LogInAction implements Action {
  type = ActionTypes.LOG_IN;
  constructor() { }
}

export class LogInSuccessAction implements Action {
  type = ActionTypes.LOG_IN_SUCCESS;
  constructor() { }
}

export class LogInFailAction implements Action {
  type = ActionTypes.LOG_IN_FAIL;
  constructor() { }
}

export type Actions
  = LogInAction
  | LogInSuccessAction
  | LogInFailAction;
