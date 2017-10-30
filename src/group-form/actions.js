const action = type => payload => ({ type, payload });

export const groupFormActionTypes = {
    SET_GROUP_FORM: "SET_GROUP_FORM",
    UPDATE_GROUP_FORM_NAME: "UPDATE_GROUP_FORM_NAME",
    UPDATE_GROUP_FORM_LOCATION: "UPDATE_GROUP_FORM_LOCATION"
};

export const groupFormActions = {
    ...groupFormActionTypes,
    setGroupForm: action(groupFormActionTypes.SET_GROUP_FORM),
    updateGroupFormName: action(groupFormActionTypes.UPDATE_GROUP_FORM_NAME),
    updateGroupFormLocation: action(groupFormActionTypes.UPDATE_GROUP_FORM_LOCATION)
};

export default groupFormActions;
