import {
    CHANGE_RECORD_PICKER_VALUE,
    CLEAR_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_CONFIG,
    SET_RECORD_ID,
    SET_RECORD_PICKER_INST
} from "./constants";

import { FlowAttributeChangeEvent } from "lightning/flowSupport";

const defaultConfig = {
    label: "Accounts",
    placeholder: "Search Accounts...",
    objectApiName: "Account",
    // filter : {
    //     criretia: [],
    //     filterLogic: ''
    // },
    displayInfo: {
        primaryField: "Name",
        additionalFields: ["Website"]
    },
    matchingInfo: {
        primaryField: { fieldPath: "Name", mode: "contains" },
        additionalFields: [{ fieldPath: "Website" }]
    }
};

let recordPickerInst;

function dispatchChangeEventDecorate(f) {
    return function wrapper(...args) {
        const res = f.apply(this, args);
        if (recordPickerInst) {
            const valueChangedEvent = new FlowAttributeChangeEvent(
                "recordId",
                res
            );

            recordPickerInst.dispatchEvent(valueChangedEvent);
        }
        return res;
    };
}

const configReducer = (config = defaultConfig, action) => {
    switch (action.type) {
        case SET_RECORD_PICKER_CONFIG:
            return { ...action.payload };
        default:
            return config;
    }
};

const errorReducer = (error = null, action) => {
    switch (action.type) {
        case CLEAR_RECORD_PICKER_ERROR:
            return null;
        case SET_RECORD_PICKER_ERROR:
            return { ...action.payload };
        default:
            return error;
    }
};

const recordPickerValueReducer = dispatchChangeEventDecorate(
    (value = null, action) => {
        switch (action.type) {
            case CHANGE_RECORD_PICKER_VALUE:
                return action.payload.detail.recordId;
            case SET_RECORD_ID:
                return action.payload || value;
            default:
                return value;
        }
    }
);

const recordPickerInstReducer = (inst = null, action) => {
    switch (action.type) {
        case SET_RECORD_PICKER_INST:
            recordPickerInst = action.payload;
            return action.payload;
        default:
            return inst;
    }
};

export default {
    pickerConfig: configReducer,
    recordPickerValue: recordPickerValueReducer,
    recordPickerError: errorReducer,
    recordPickerInst: recordPickerInstReducer
};
