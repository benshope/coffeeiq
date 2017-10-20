const action = type => payload => ({ type, payload });

export const groupFormActionTypes = {
    UPDATE_GROUP_FORM: "UPDATE_GROUP_FORM",
    UPDATE_GROUP_FORM_NAME: "UPDATE_GROUP_FORM_NAME",
    UPDATE_GROUP_FORM_LOCATION: "UPDATE_GROUP_FORM_LOCATION"
};

export const groupFormActions = {
    ...groupFormActionTypes,
    updateGroupForm: action(groupFormActionTypes.UPDATE_GROUP_FORM),
    updateGroupFormName: action(groupFormActionTypes.UPDATE_GROUP_FORM_NAME),
    updateGroupFormLocation: action(groupFormActionTypes.UPDATE_GROUP_FORM_LOCATION)
};

export default groupFormActions;
