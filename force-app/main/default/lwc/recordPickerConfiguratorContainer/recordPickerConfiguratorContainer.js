import { LightningElement, api } from "lwc";
import { createStore, combineReducers, createLogger } from "c/lwcRedux";

import { reducers } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfiguratorContainer extends LightningElement {
    @api store;

    @api
    get inputVariables() {
        return this._inputVariables;
    }

    set inputVariables(variables) {
        this._inputVariables = variables || [];
    }

    get config() {
        return this._inputVariables?.find(
            (variable) => variable.name === "config"
        )?.value;
    }

    _inputVariables = [];

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
