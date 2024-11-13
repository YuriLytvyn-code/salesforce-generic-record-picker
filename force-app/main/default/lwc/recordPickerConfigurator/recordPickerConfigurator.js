import { LightningElement, api } from "lwc";
import { Redux } from "c/lwcRedux";

import { actions } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfigurator extends Redux(LightningElement) {
    @api config;
    @api recordId;
    @api builderContext;

    connectedCallback() {
        super.connectedCallback();

        this.props.setRecordId(this.recordId);
        if (this.config) this.props.setConfig(JSON.parse(this.config));
        this.props.setConfiguratorInst(this);
        this.props.setBuilderContext(this.builderContext);
        this.props.initSObjectsTypes();
        this.props.initSobjectFieldNames();
    }

    mapStateToProps(state) {
        return { ...state };
    }

    mapDispatchToProps() {
        return { ...actions };
    }
}
