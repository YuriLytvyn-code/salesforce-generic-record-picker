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
    INIT_FIELDS_OPTIONS
} from "./constants";

const defaultConfig = {
    label: "Accounts",
    placeholder: "Search Accounts...",
    objectApiName: "Account"
};

let configurator;

function dispatchEditorChangeEventDecorate(
    attrName,
    dataType = "String",
    stringify = false,
    f
) {
    return function wrapper(...args) {
        const res = f.apply(this, args);
        if (configurator) {
            const valueChangedEvent = new CustomEvent(
                "configuration_editor_input_value_changed",
                {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {
                        name: attrName,
                        newValue: stringify ? JSON.stringify(res) : res,
                        newValueDataType: dataType
                    }
                }
            );

            configurator.dispatchEvent(valueChangedEvent);
        }
        return res;
    };
}

const configReducer = dispatchEditorChangeEventDecorate(
    "config",
    "String",
    true,
    (config = defaultConfig, action) => {
        switch (action.type) {
            case SET_CONFIG:
                return {
                    ...(action.payload ?? config)
                };
            case SET_CONFIGURATOR_INST:
                configurator = action.payload;
                return { ...config };
            case CHANGE_LABEL:
                return {
                    ...config,
                    label: action.payload.target.value
                };
            case CHANGE_PLACEHOLDER:
                return {
                    ...config,
                    placeholder: action.payload.target.value
                };
            case CHANGE_OBJECT_API_NAME:
                return {
                    ...config,
                    objectApiName: action.payload.target.value
                };
            case ADD_FILTER_CRITERIA:
                return {
                    ...config,
                    filter: {
                        ...config.filter,
                        criteria: [
                            ...config.filter.criteria,
                            {
                                index: config.filter.criteria.length + 1,
                                fieldPath: "",
                                operator: "",
                                value: ""
                            }
                        ]
                    }
                };
            case REMOVE_FILTER_CRITERIA:
                config.filter.criteria.splice(
                    action.payload.target.dataset.index - 1,
                    1
                );

                return {
                    ...config,
                    filter: {
                        ...config.filter,
                        criteria: [...config.filter.criteria].map(
                            (criteria, index) => ({
                                ...criteria,
                                index: index + 1
                            })
                        )
                    }
                };
            case CHANGE_FILTER_CRITERIA_FIELD_PATH:
                config.filter.criteria[
                    action.payload.target.dataset.index - 1
                ].fieldPath = action.payload.target.value;

                return {
                    ...config,
                    filter: {
                        ...config.filter
                    }
                };
            case CHANGE_FILTER_CRITERIA_OPERATOR:
                config.filter.criteria[
                    action.payload.target.dataset.index - 1
                ].operator = action.payload.target.value;

                return {
                    ...config,
                    filter: {
                        ...config.filter
                    }
                };
            case CHANGE_FILTER_CRITERIA_VALUE:
                config.filter.criteria[
                    action.payload.target.dataset.index - 1
                ].value = action.payload.target.value;

                return {
                    ...config,
                    filter: {
                        ...config.filter
                    }
                };
            case CHANGE_FILTER_LOGIC:
                return {
                    ...config,
                    filter: {
                        ...config.filter,
                        filterLogic: action.payload.target.value
                    }
                };
            case CHANGE_PRIMARY_DISPLAY_FIELD:
                return {
                    ...config,
                    displayInfo: {
                        ...config.displayInfo,
                        primaryField: action.payload.target.value
                    }
                };
            case CHANGE_ADDITIONAL_DISPLAY_FIELD:
                return {
                    ...config,
                    displayInfo: {
                        ...config.displayInfo,
                        additionalFields: [action.payload.target.value]
                    }
                };
            case CHANGE_PRIMARY_MATCHING_FIELD:
                return {
                    ...config,
                    matchingInfo: {
                        ...config.matchingInfo,
                        primaryField: {
                            ...config.matchingInfo.primaryField,
                            fieldPath: action.payload.target.value
                        }
                    }
                };
            case CHANGE_PRIMARY_MATCHING_FIELD_MODE:
                return {
                    ...config,
                    matchingInfo: {
                        ...config.matchingInfo,
                        primaryField: {
                            ...config.matchingInfo.primaryField,
                            mode: action.payload.target.value
                        }
                    }
                };
            case CHANGE_ADDITIONAL_MATCHING_FIELD:
                return {
                    ...config,
                    matchingInfo: {
                        primaryField: { ...config.matchingInfo?.primaryField },
                        additionalFields: [
                            { fieldPath: action.payload.target.value }
                        ]
                    }
                };
            case TOGGLE_DISPLAY_INFO:
                if (!action.payload.target.checked) {
                    delete config.displayInfo;
                } else {
                    config.displayInfo = {
                        primaryField: "",
                        additionalFields: [""]
                    };
                }

                return {
                    ...config,
                    includeDisplayInfo: action.payload.target.checked
                };
            case TOGGLE_FILTERS:
                if (!action.payload.target.checked) {
                    delete config.filter;
                } else {
                    config.filter = {
                        criteria: []
                    };
                }

                return {
                    ...config,
                    includeFilters: action.payload.target.checked
                };
            case TOGGLE_MATCHING_INFO:
                if (!action.payload.target.checked) {
                    delete config.matchingInfo;
                } else {
                    config.matchingInfo = {
                        primaryField: { fieldPath: "", mode: "" },
                        additionalFields: [{ fieldPath: "" }]
                    };
                }

                return {
                    ...config,
                    includeMatchingInfo: action.payload.target.checked
                };
            default:
                return config;
        }
    }
);

const builderContexReducer = (builderContext = {}, action) => {
    switch (action.type) {
        case SET_BUILDER_CONTEXT:
            return action.payload;
        default:
            return builderContext;
    }
};

const utilReducer = (util = {}, action) => {
    switch (action.type) {
        default:
            return { ...util, key: "1" };
    }
};

const selectedRecordIdReducer = dispatchEditorChangeEventDecorate(
    "recordId",
    "String",
    false,
    (selectedRecordId = null, action) => {
        switch (action.type) {
            case SET_RECORD_ID:
                return action.payload ?? null;
            default:
                return selectedRecordId;
        }
    }
);

const sobjectTypesReducer = (sobjectTypes = [], action) => {
    switch (action.type) {
        case INIT_OBJECTS_OPTIONS:
            return (
                action.payload?.map((sobjType) => ({
                    label: sobjType,
                    value: sobjType
                })) ?? []
            );
        default:
            return sobjectTypes;
    }
};

const sobjectFieldsReducer = (sobjectFields = [], action) => {
    switch (action.type) {
        case INIT_FIELDS_OPTIONS:
            return (
                action.payload?.map((sobjField) => ({
                    label: sobjField,
                    value: sobjField
                })) ?? []
            );
        default:
            return sobjectFields;
    }
};

const criteriaOperatorOptionsReducer = (
    criteriaOperatorOptions = [
        {
            label: "Equal to",
            value: "eq"
        },
        {
            label: "Not Equal to",
            value: "ne"
        },
        {
            label: "Less Than",
            value: "lt"
        },
        {
            label: "Greater Than",
            value: "gt"
        },
        {
            label: "Less Than or Equal to",
            value: "lte"
        },
        {
            label: "Greater Than or Equal to",
            value: "gte"
        },
        {
            label: "In",
            value: "in"
        },
        {
            label: "Not In",
            value: "nin"
        },
        {
            label: "Like",
            value: "like"
        },
        {
            label: "Includes",
            value: "includes"
        },
        {
            label: "Exclues",
            value: "excludes"
        }
    ],
    action
) => {
    switch (action.type) {
        default:
            return criteriaOperatorOptions;
    }
};

const matchingInfoModeOptionsReducer = (
    matchingInfoModeOptions = [
        {
            label: "Starts With",
            value: "startsWith"
        },
        {
            label: "Contains",
            value: "contains"
        }
    ],
    action
) => {
    switch (action.type) {
        default:
            return matchingInfoModeOptions;
    }
};

export default {
    config: configReducer,
    util: utilReducer,
    builderContext: builderContexReducer,
    selectedRecordId: selectedRecordIdReducer,
    sobjectTypes: sobjectTypesReducer,
    sobjectFields: sobjectFieldsReducer,
    criteriaOperatorOptions: criteriaOperatorOptionsReducer,
    matchingInfoModeOptions: matchingInfoModeOptionsReducer
};
