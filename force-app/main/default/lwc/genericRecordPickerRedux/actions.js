import {
    CHANGE_RECORD_PICKER_VALUE,
    CLEAR_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_CONFIG,
    SET_RECORD_ID,
    SET_RECORD_PICKER_INST
} from "./constants";

export const changeRecordPickerValue = (recordPickerEvent) => {
    return {
        type: CHANGE_RECORD_PICKER_VALUE,
        payload: recordPickerEvent
    };
};

export const clearRecordPickerError = () => {
    return {
        type: CLEAR_RECORD_PICKER_ERROR
    };
};

export const setRecordPickerError = (error) => {
    return {
        type: SET_RECORD_PICKER_ERROR,
        payload: error
    };
};

export const setRecordPickerConfig = (config) => {
    return {
        type: SET_RECORD_PICKER_CONFIG,
        payload: config
    };
};

export const setRecordPickerValue = (recordId) => {
    return {
        type: SET_RECORD_ID,
        payload: recordId
    };
};

export const setRecordPickerInst = (thisArg) => {
    return {
        type: SET_RECORD_PICKER_INST,
        payload: thisArg
    };
};
