import {
    CHANGE_RECORD_PICKER_VALUE,
    CLEAR_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_ERROR,
    SET_RECORD_PICKER_CONFIG
} from "./constants";

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

const recordPickerValueReducer = (value = null, action) => {
    switch (action.type) {
        case CHANGE_RECORD_PICKER_VALUE:
            return action.payload.detail.recordId;
        default:
            return value;
    }
};

export default {
    pickerConfig: configReducer,
    recordPickerValue: recordPickerValueReducer,
    recordPickerError: errorReducer
};
