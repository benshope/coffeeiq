const action = type => payload => ({ type, payload });

export const formsActionTypes = {
  UPDATE_GROUP_FORMS: "UPDATE_GROUP_FORMS",
  UPDATE_GROUP_FORMS_NAME: "UPDATE_GROUP_FORMS_NAME",
  UPDATE_GROUP_FORMS_LOCATION: "UPDATE_GROUP_FORMS_LOCATION"
};

export const formsActions = {
  ...formsActionTypes,
  updateGroupForms: action(formsActionTypes.UPDATE_GROUP_FORMS),
  updateGroupFormsName: action(formsActionTypes.UPDATE_GROUP_FORMS_NAME),
  updateGroupFormsLocation: action(formsActionTypes.UPDATE_GROUP_FORMS_LOCATION)
};

export default formsActions;
