import { Action } from '@ngrx/store';
import { Group } from '../models/group';
import { type } from '../util';


export const ActionTypes = {
  ADD_GROUP:             type('[Collection] Add Group'),
  ADD_GROUP_SUCCESS:     type('[Collection] Add Group Success'),
  ADD_GROUP_FAIL:        type('[Collection] Add Group Fail'),
  REMOVE_GROUP:          type('[Collection] Remove Group'),
  REMOVE_GROUP_SUCCESS:  type('[Collection] Remove Group Success'),
  REMOVE_GROUP_FAIL:     type('[Collection] Remove Group Fail'),
  LOAD:                 type('[Collection] Load'),
  LOAD_SUCCESS:         type('[Collection] Load Success'),
  LOAD_FAIL:            type('[Collection] Load Fail'),
};


/**
 * Add Group to Collection Actions
 */
export class AddGroupAction implements Action {
  type = ActionTypes.ADD_GROUP;

  constructor(public payload: Group) { }
}

export class AddGroupSuccessAction implements Action {
  type = ActionTypes.ADD_GROUP_SUCCESS;

  constructor(public payload: Group) { }
}

export class AddGroupFailAction implements Action {
  type = ActionTypes.ADD_GROUP_FAIL;

  constructor(public payload: Group) { }
}


/**
 * Remove Group from Collection Actions
 */
export class RemoveGroupAction implements Action {
  type = ActionTypes.REMOVE_GROUP;

  constructor(public payload: Group) { }
}

export class RemoveGroupSuccessAction implements Action {
  type = ActionTypes.REMOVE_GROUP_SUCCESS;

  constructor(public payload: Group) { }
}

export class RemoveGroupFailAction implements Action {
  type = ActionTypes.REMOVE_GROUP_FAIL;

  constructor(public payload: Group) { }
}

/**
 * Load Collection Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Group[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}


export type Actions
  = AddGroupAction
  | AddGroupSuccessAction
  | AddGroupFailAction
  | RemoveGroupAction
  | RemoveGroupSuccessAction
  | RemoveGroupFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
