import { LightningElement, api } from "lwc";
import { createStore, combineReducers, createLogger } from "c/lwcRedux";

import { reducers } from "c/genericRecordPickerRedux";

export default class GenericRecordPickerContainer extends LightningElement {
    @api store;

    @api
    set config(value) {
        this._config = JSON.parse(value);
    }

    get config() {
        return JSON.stringify(this._config);
    }

    _config = {
        label: "Accounts",
        placeholder: "Search Accounts...",
        objectApiName: "Account",
        displayInfo: {
            primaryField: "Name"
        },
        matchingInfo: {
            primaryField: { fieldPath: "Name", mode: "contains" },
            additionalFields: [{ fieldPath: "Website" }]
        }
    };

    initialize() {
        let logger;

        logger = createLogger({
            duration: true,
            diff: true
        });

        const combineReducersInstance = combineReducers(reducers);
        this.store = createStore(combineReducersInstance, logger);
    }
}
