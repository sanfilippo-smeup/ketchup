import {Component, Event, EventEmitter, Method, Prop, State, Watch} from '@stencil/core';
import { generateUniqueId } from "../../utils/utils";
import { KetchupFldChangeEvent, KetchupFldSubmitEvent } from "./ketchup-fld-declarations";

@Component({
    tag: 'ketchup-fld',
    styleUrl: 'ketchup-fld.scss',
    shadow: true
})
export class KetchupFld {
    /**
     * Data the FLD must parse to fully be configured.
     * It must be either an Object or a JSON parsable string
     */
    @Prop() config: string | object = '';

    /**
     * Effective data to pass to the component
     */
    @Prop() data: any;

    //-- Reflect config to internal state --
    @Watch('config')
    updateInternalState() {
        // Controls type of data passed to the config parameter and if necessary parses it
        let currentData;
        if (typeof this.config === 'string' && this.config) {
            currentData = JSON.parse(this.config);
        } else {
            currentData = this.config;
        }

        // Assigns given values to the state
        const keys = Object.keys(currentData);
        let propagate = {};
        keys.forEach(key => {
            // Detects if a given key is present in the component as a @State variable
            if (key in this) {
                this[key] = currentData[key];
            } else {
                // if key is not present, it will be passed down to the component
                propagate[key] = currentData[key];
            }
        });
        this.propagate = propagate;
    }

    //---- Internal state ----
    /**
     * The type of the FLD
     */
    @State() type: string;
    /**
     * Chooses if there is the need to show the submit button or not
     */
    @State() showSubmit: boolean = false;
    /**
     * Chooses the submit button label to show
     */
    @State() submitLabel: string = '';
    /**
     * Chooses the submit button position
     */
    @State() submitPos: string = 'right'; // "left / right / top"
    /**
     * Chooses the label to show
     * If set to empty or has only white space chars, the label get removed
     */
    @State() label: string = ''; // Example "Insert user name"
    /**
     * Chooses label position
     */
    @State() labelPos: string = 'left'; // 'left / right / top'
    /**
     * Unsupported props gets propagated down to dynamic component
     */
    @State() propagate: any = {};
    /**
     * Other configurations
     */
    @State() extensions: {
        minQueryLength?: number;
        forceSelection?: boolean;
    } = {};

    //-- Not reactive --
    radioGeneratedName = generateUniqueId('value');
    currentValue: object | string = null;

    // Generates an instance of the event handler while binding the current component as its this value
    // This is done once per component to improve performance speed
    onChangeInstance = this.onChange.bind(this);
    onSubmitInstance = this.onSubmit.bind(this);

    //---- Events ----
    /**
     * Launched when the value of the current FLD changes.
     */
    @Event({
        eventName: 'ketchupFldChanged',
        composed: true,
        cancelable: false,
        bubbles: true
    })
    ketchupFldChanged: EventEmitter<KetchupFldChangeEvent>;

    /**
     * Launched when the FLD values are confirmed and a submit event is triggered.
     */
    @Event({
        eventName: 'ketchupFldSubmit',
        composed: true,
        cancelable: false,
        bubbles: true
    })
    ketchupFldSubmit: EventEmitter<KetchupFldSubmitEvent>;

    //---- Life cycle hooks ----
    componentWillLoad() {
        // Mandatory, since on first render the watch directive will not be triggered
        // therefore preventing component to display data
        this.updateInternalState();
    }

    //---- Methods ----

    // When a change or update event must be launched as if it's coming from the Fld itself
    onChange(event: CustomEvent) {
        const { value } = event.detail;
        this.ketchupFldChanged.emit({
            originalEvent: event,
            oldValue: this.currentValue,
            value
        });
        this.currentValue = value;
    }

    // When a submit event must be launched as if it's coming from the Fld itself
    onSubmit(event: CustomEvent) {
        this.ketchupFldSubmit.emit({
            originalEvent: event,
            value: this.currentValue,
        });
    }

    //-- Public --

    /**
     * Provides an interface to get the current value programmatically
     * @method getCurrentValue
     * @returns {any}
     */
    @Method()
    async getCurrentValue() {
        return this.currentValue;
    }

    //---- Rendering functions ----
    render() {
        let toRender = [];
        const baseClass = 'ketchup-fld';
        let label = null;
        let submit = null;

        //-- Label --
        if (this.label.trim().length) {
            label =
                <label
                    class={baseClass + '__label' + ' ' + baseClass + '--' + this.labelPos}>
                    {this.label}
                </label>
            ;
        }

        //-- Submit --
        if (this.showSubmit) {
            submit =
                <ketchup-button
                    class={baseClass + '__submit' + ' ' + baseClass + '--' + this.submitPos}
                    label={this.submitLabel}
                    onKetchupButtonClicked={this.onSubmitInstance}/>
        }

        //-- If a component must be positioned on top of the dynamic one --
        const labelIsTop = this.labelPos === 'top';
        const submitIsTop = this.submitPos === 'top';

        if (labelIsTop || submitIsTop) {
            toRender.push(
                <div class={baseClass + '__top-container'}>
                    {labelIsTop && label ? label : null}
                    {submitIsTop && submit ? submit : null}
                </div>
            );
        }

        //-- Outputs the main dynamic component to render --
        if (!labelIsTop && label) {
            toRender.push(label);
        }

        /**
         * JSX dynamic component notation
         * @see: https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name
         */
        let type: string = '';
        let confObj : {[key: string]: any} = {};
        switch (this.type) {
            case 'cmb':
                confObj.displayedField = 'value';
                confObj.valueField = 'value';
                confObj.onKetchupComboSelected = this.onChangeInstance;
                type = 'combo';
                break;
            case 'rad':
                confObj.valueField = 'obj';
                confObj.radioName = this.radioGeneratedName; // TODO this must be changed to use a proper data field
                confObj.onKetchupRadioChanged = this.onChangeInstance;
                type = 'radio';
                break;
            case 'itx':
            case 'Itx':
                confObj.onKetchupTextInputUpdated = this.onChangeInstance;
                // When FLD has the text form, it should submit also when a user presses Enter on the text field
                confObj.onKetchupTextInputSubmit = this.onSubmitInstance;
                type = 'text-input';
                break;
        }

        const $DynamicComponent = ('ketchup-' + type) as any; // TODO check if there is a better typing
        toRender.push(
            <$DynamicComponent
                class={baseClass + '__component'}
                items={this.data}
                {...confObj}
                {...this.propagate}
            />
        );

        if (!submitIsTop && submit) {
            toRender.push(submit);
        }

        return toRender;
    }
}
