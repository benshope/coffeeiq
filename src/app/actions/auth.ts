import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  LOG_IN:             type('[Auth] Log In'),
  LOG_IN_SUCCESS:     type('[Auth] Log In Success'),
  LOG_IN_FAIL:        type('[Auth] Log In Fail'),
  LOG_OUT:            type('[Auth] Log Out'),
  LOG_OUT_SUCCESS:    type('[Auth] Log Out Success'),
  LOG_OUT_FAIL:       type('[Auth] Log Out Fail'),
};

export class LogInAction implements Action {
  type = ActionTypes.LOG_IN;
  constructor(public payload?: boolean) { }
}

export class LogInSuccessAction implements Action {
  type = ActionTypes.LOG_IN_SUCCESS;
  constructor(public payload: string) { }
}

export class LogInFailAction implements Action {
  type = ActionTypes.LOG_IN_FAIL;
  constructor(public payload?: any) { }
}

export class LogOutAction implements Action {
  type = ActionTypes.LOG_OUT;
  constructor(public payload?: any) { }
}

export class LogOutSuccessAction implements Action {
  type = ActionTypes.LOG_OUT_SUCCESS;
  constructor(public payload?: any) { }
}

export class LogOutFailAction implements Action {
  type = ActionTypes.LOG_OUT_FAIL;
  constructor(public payload?: any) { }
}

export type Actions
  = LogInAction
  | LogInSuccessAction
  | LogInFailAction
  | LogOutAction
  | LogOutSuccessAction
  | LogOutFailAction;
