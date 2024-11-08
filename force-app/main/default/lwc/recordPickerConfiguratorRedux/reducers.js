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
    CHANGE_ADDITIONAL_MATCHING_FIELD
} from "./constants";

const defaultConfig = {
    label: "Accounts",
    placeholder: "Search Accounts...",
    objectApiName: "Account",
    filter: { criteria: [] },
    displayInfo: {},
    matchingInfo: {}
};

const configReducer = (config = defaultConfig, action) => {
    switch (action.type) {
        case SET_CONFIG:
            return {
                ...(action.payload ?? config),
                filter: {
                    ...(action.payload?.filter || config.filter)
                },
                displayInfo: {
                    ...(action.payload?.displayInfo || config.displayInfo)
                },
                matchingInfo: {
                    ...(action.payload?.matchingInfo || config.matchingInfo)
                }
            };
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
                    criteria: [
                        ...(config.filter?.criteria || []),
                        {
                            index: (config.filter?.criteria?.length || 0) + 1,
                            fieldPath: "",
                            operator: "",
                            value: ""
                        }
                    ],
                    filterLogic: config.filter?.filterLogic || ""
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
                    criteria: [...config.filter.criteria].map(
                        (criteria, index) => ({ ...criteria, index: index + 1 })
                    ),
                    filterLogic: config.filter?.filterLogic || ""
                }
            };
        case CHANGE_FILTER_CRITERIA_FIELD_PATH:
            config.filter.criteria[
                action.payload.target.dataset.index - 1
            ].fieldPath = action.payload.target.value;

            return {
                ...config,
                filter: {
                    criteria: [...config.filter.criteria],
                    filterLogic: config.filter?.filterLogic || ""
                }
            };
        case CHANGE_FILTER_CRITERIA_OPERATOR:
            config.filter.criteria[
                action.payload.target.dataset.index - 1
            ].operator = action.payload.target.value;

            return {
                ...config,
                filter: {
                    criteria: [...config.filter.criteria],
                    filterLogic: config.filter?.filterLogic || ""
                }
            };
        case CHANGE_FILTER_CRITERIA_VALUE:
            config.filter.criteria[
                action.payload.target.dataset.index - 1
            ].value = action.payload.target.value;

            return {
                ...config,
                filter: {
                    criteria: [...config.filter.criteria],
                    filterLogic: config.filter?.filterLogic || ""
                }
            };
        case CHANGE_FILTER_LOGIC:
            return {
                ...config,
                filter: {
                    criteria: [...config.filter.criteria],
                    filterLogic: action.payload.target.value
                }
            };
        case CHANGE_PRIMARY_DISPLAY_FIELD:
            return {
                ...config,
                displayInfo: {
                    primaryField: action.payload.target.value,
                    additionalField: config.displayInfo?.additionalField,
                    additionalFields: config.displayInfo?.additionalFields
                }
            };
        case CHANGE_ADDITIONAL_DISPLAY_FIELD:
            return {
                ...config,
                displayInfo: {
                    primaryField: config.displayInfo?.primaryField,
                    additionalField: action.payload.target.value,
                    additionalFields: [action.payload.target.value]
                }
            };
        case CHANGE_PRIMARY_MATCHING_FIELD:
            return {
                ...config,
                matchingInfo: {
                    primaryField: action.payload.target.value,
                    primaryFieldMode: config.matchingInfo?.primaryFieldMode,
                    additionalField: config.matchingInfo?.additionalField,
                    additionalFields: config.matchingInfo?.additionalFields
                }
            };
        case CHANGE_PRIMARY_MATCHING_FIELD_MODE:
            return {
                ...config,
                matchingInfo: {
                    primaryField: config.matchingInfo?.primaryField,
                    primaryFieldMode: action.payload.target.value,
                    additionalField: config.matchingInfo?.additionalField,
                    additionalFields: config.matchingInfo?.additionalFields
                }
            };
        case CHANGE_ADDITIONAL_MATCHING_FIELD:
            return {
                ...config,
                matchingInfo: {
                    primaryField: config.matchingInfo?.primaryField,
                    primaryFieldMode: config.matchingInfo?.primaryFieldMode,
                    additionalField: action.payload.target.value,
                    additionalFields: [action.payload.target.value]
                }
            };
        default:
            return config;
    }
};

export default {
    config: configReducer
};
