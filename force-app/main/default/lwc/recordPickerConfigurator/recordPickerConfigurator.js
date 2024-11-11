import { LightningElement, api } from "lwc";
import { Redux } from "c/lwcRedux";

import { actions } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfigurator extends Redux(LightningElement) {
    @api config;
    @api recordId;
    @api builderContext;

    connectedCallback() {
        super.connectedCallback();

        if (this.config) this.props.setConfig(JSON.parse(this.config));
        this.props.setConfiguratorInst(this);
        this.props.setBuilderContext(this.builderContext);
        this.props.setRecordId(this.recordId);
    }

    mapStateToProps(state) {
        return {
            config: state.config,
            util: state.util,
            builderContext: state.builderContext,
            selectedRecordId: state.selectedRecordId
        };
    }

    mapDispatchToProps() {
        return { ...actions };
    }
}
