import { LightningElement, api } from "lwc";
import { Redux } from "c/lwcRedux";

import { actions } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfigurator extends Redux(LightningElement) {
    @api inputVariables = [];
    saveIntervalId;

    connectedCallback() {
        super.connectedCallback();
        if (this.inputVariables?.[0]?.value) {
            this.props.setConfig(JSON.parse(this.inputVariables[0].value));
        }

        this.saveIntervalId = setInterval(() => {
            const valueChangedEvent = new CustomEvent(
                "configuration_editor_input_value_changed",
                {
                    bubbles: true,
                    cancelable: false,
                    composed: true,
                    detail: {
                        name: "config",
                        newValue: JSON.stringify(this.props.config),
                        newValueDataType: "String"
                    }
                }
            );

            this.dispatchEvent(valueChangedEvent);
        }, 1000);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.saveIntervalId);
    }

    mapStateToProps(state) {
        return { config: state.config, util: state.util };
    }

    mapDispatchToProps() {
        return {
            setConfig: actions.setConfig,
            changeLabel: actions.changeLabel,
            changePlaceholder: actions.changePlaceholder,
            changeObjectApiName: actions.changeObjectApiName,
            addFilterCriteria: actions.addFilterCriteria,
            removeFilterCriteria: actions.removeFilterCriteria,
            changeFilterCriteriaFieldPath:
                actions.changeFilterCriteriaFieldPath,
            changeFilterCriteriaOperator: actions.changeFilterCriteriaOperator,
            changeFilterCriteriaValue: actions.changeFilterCriteriaValue,
            changeFilterLogic: actions.changeFilterLogic,
            changePrimaryDisplayField: actions.changePrimaryDisplayField,
            changeAdditionalDisplayField: actions.changeAdditionalDisplayField,
            changePrimaryMatchingField: actions.changePrimaryMatchingField,
            changePrimaryMatchingFieldMode:
                actions.changePrimaryMatchingFieldMode,
            changeAdditionalMatchingField:
                actions.changeAdditionalMatchingField,
            toggleDisplayInfo: actions.toggleDisplayInfo,
            toggleFilters: actions.toggleFilters,
            toggleMatchingInfo: actions.toggleMatchingInfo
        };
    }
}
