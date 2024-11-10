import { LightningElement, api } from "lwc";
import { Redux } from "c/lwcRedux";

import { actions } from "c/genericRecordPickerRedux";

export default class GenericRecordPicker extends Redux(LightningElement) {
    @api config;
    @api recordId;

    connectedCallback() {
        super.connectedCallback();
        this.props.setRecordPickerConfig(this.config);
        this.props.setRecordPickerInst(this);
        this.props.setRecordPickerValue(this.recordId);
    }

    mapStateToProps(state) {
        return {
            config: state.pickerConfig,
            value: state.recordPickerValue,
            error: state.recordPickerError
        };
    }

    mapDispatchToProps() {
        return {
            changeRecordPickerValue: actions.changeRecordPickerValue,
            setRecordPickerError: actions.setRecordPickerError,
            setRecordPickerConfig: actions.setRecordPickerConfig,
            setRecordPickerValue: actions.setRecordPickerValue,
            setRecordPickerInst: actions.setRecordPickerInst
        };
    }
}
