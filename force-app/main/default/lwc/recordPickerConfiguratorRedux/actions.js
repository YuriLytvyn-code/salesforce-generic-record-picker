import {
    SET_CONFIG,
    CHANGE_LABEL,
    CHANGE_PLACEHOLDER,
    CHANGE_OBJECT_API_NAME,
    ADD_FILTER_CRITERIA,
    REMOVE_FILTER_CRITERIA,
    CHANGE_FILTER_CRITERIA_FIELD_PATH,
    CHANGE_FILTER_CRITERIA_OPERATOR,
    CHANGE_FILTER_CRITERIA_VALUE,
    CHANGE_FILTER_LOGIC,
    CHANGE_PRIMARY_DISPLAY_FIELD,
    CHANGE_ADDITIONAL_DISPLAY_FIELD,
    CHANGE_PRIMARY_MATCHING_FIELD,
    CHANGE_PRIMARY_MATCHING_FIELD_MODE,
    CHANGE_ADDITIONAL_MATCHING_FIELD,
    TOGGLE_DISPLAY_INFO,
    TOGGLE_FILTERS,
    TOGGLE_MATCHING_INFO,
    SET_CONFIGURATOR_INST,
    SET_BUILDER_CONTEXT,
    SET_RECORD_ID,
    INIT_OBJECTS_OPTIONS,
    ERROR
} from "./constants";

import getSObjectTypes from "@salesforce/apex/RecordPickerConfiguratorController.getSObjectTypes";

export const setConfig = (config) => {
    return {
        type: SET_CONFIG,
        payload: config
    };
};

export const changeLabel = (event) => {
    return {
        type: CHANGE_LABEL,
        payload: event
    };
};

export const changePlaceholder = (event) => {
    return {
        type: CHANGE_PLACEHOLDER,
        payload: event
    };
};

export const changeObjectApiName = (event) => {
    return {
        type: CHANGE_OBJECT_API_NAME,
        payload: event
    };
};

export const addFilterCriteria = () => {
    return {
        type: ADD_FILTER_CRITERIA
    };
};

export const removeFilterCriteria = (event) => {
    return {
        type: REMOVE_FILTER_CRITERIA,
        payload: event
    };
};

export const changeFilterCriteriaFieldPath = (event) => {
    return {
        type: CHANGE_FILTER_CRITERIA_FIELD_PATH,
        payload: event
    };
};

export const changeFilterCriteriaOperator = (event) => {
    return {
        type: CHANGE_FILTER_CRITERIA_OPERATOR,
        payload: event
    };
};

export const changeFilterCriteriaValue = (event) => {
    return {
        type: CHANGE_FILTER_CRITERIA_VALUE,
        payload: event
    };
};

export const changeFilterLogic = (event) => {
    return {
        type: CHANGE_FILTER_LOGIC,
        payload: event
    };
};

export const changePrimaryDisplayField = (event) => {
    return {
        type: CHANGE_PRIMARY_DISPLAY_FIELD,
        payload: event
    };
};

export const changeAdditionalDisplayField = (event) => {
    return {
        type: CHANGE_ADDITIONAL_DISPLAY_FIELD,
        payload: event
    };
};

export const changePrimaryMatchingField = (event) => {
    return {
        type: CHANGE_PRIMARY_MATCHING_FIELD,
        payload: event
    };
};

export const changePrimaryMatchingFieldMode = (event) => {
    return {
        type: CHANGE_PRIMARY_MATCHING_FIELD_MODE,
        payload: event
    };
};

export const changeAdditionalMatchingField = (event) => {
    return {
        type: CHANGE_ADDITIONAL_MATCHING_FIELD,
        payload: event
    };
};

export const toggleFilters = (event) => {
    return {
        type: TOGGLE_FILTERS,
        payload: event
    };
};

export const toggleDisplayInfo = (event) => {
    return {
        type: TOGGLE_DISPLAY_INFO,
        payload: event
    };
};

export const toggleMatchingInfo = (event) => {
    return {
        type: TOGGLE_MATCHING_INFO,
        payload: event
    };
};

export const setConfiguratorInst = (thisArg) => {
    return {
        type: SET_CONFIGURATOR_INST,
        payload: thisArg
    };
};

export const setBuilderContext = (builderContext) => {
    return {
        type: SET_BUILDER_CONTEXT,
        payload: builderContext
    };
};

export const setRecordId = (recordId) => {
    return {
        type: SET_RECORD_ID,
        payload: recordId
    };
};

export const setRecordIdFromEvent = (event) => {
    return {
        type: SET_RECORD_ID,
        payload: event.target.value
    };
};

export const setRecordIdFromResource = (event) => {
    return {
        type: SET_RECORD_ID,
        payload: event.detail.newValue
    };
};

export const initSObjectsTypes = () => {
    return (dispatch) => {
        getSObjectTypes()
            .then((result) => {
                dispatch({
                    type: INIT_OBJECTS_OPTIONS,
                    payload: JSON.parse(result)
                });
            })
            .catch((error) => {
                dispatch({
                    type: ERROR,
                    payload: error
                });
            });
    };
};
