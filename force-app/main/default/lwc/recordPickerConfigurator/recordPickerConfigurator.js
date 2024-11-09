import { LightningElement, api } from "lwc";
import { Redux } from "c/lwcRedux";

import { actions } from "c/recordPickerConfiguratorRedux";

export default class RecordPickerConfigurator extends Redux(LightningElement) {
    @api config;

    connectedCallback() {
        super.connectedCallback();

        if (this.config) this.props.setConfig(JSON.parse(this.config));
        this.props.setConfiguratorInst(this);
    }

    mapStateToProps(state) {
        return { config: state.config, util: state.util };
    }

    mapDispatchToProps() {
        return { ...actions };
    }
}
