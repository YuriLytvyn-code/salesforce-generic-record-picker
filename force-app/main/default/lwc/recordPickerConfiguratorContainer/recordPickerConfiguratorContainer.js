import { LightningElement, api } from "lwc";
import { createStore, combineReducers, createLogger } from "c/lwcRedux";

import { reducers } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfiguratorContainer extends LightningElement {
    @api store;
    @api builderContext;

    @api
    get inputVariables() {
        return this._inputVariables;
    }

    set inputVariables(variables) {
        this._inputVariables = variables || [];
    }

    _inputVariables = [];

    get config() {
        return this._inputVariables?.find(
            (variable) => variable.name === "config"
        )?.value;
    }

    get recordId() {
        return this._inputVariables?.find(
            (variable) => variable.name === "recordId"
        )?.value;
    }

    connectedCallback() {
        console.log(this.builderContext);
    }

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
