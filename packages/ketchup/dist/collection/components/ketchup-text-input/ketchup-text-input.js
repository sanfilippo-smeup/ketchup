export class KetchupTextInput {
    constructor() {
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.initialValue = '';
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.isClearable = false;
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * The max length of the text field.
         * Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
         */
        this.maxLength = 524288;
        //-- Validating props --
        //---- Internal state ----
        this.value = '';
        //-- Constants --
        this.classInputText = 'ketchup-input-text';
    }
    //---- Lifecycle Hooks  ----
    componentWillLoad() {
        // Sets initial value inside the element
        this.value = this.initialValue;
    }
    //---- Public Methods ----
    /**
     * Triggers the focus event on the input text
     * @method triggerFocus
     */
    triggerFocus() {
        // For focus issues, maybe have a look here
        // https://github.com/ionic-team/stencil/issues/180
        // https://github.com/ionic-team/stencil/issues/1008
        this.inputEl.focus();
        this.textInput.focus();
    }
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     */
    onClearClick() {
        this.value = '';
        setTimeout(() => this.triggerFocus(), 10);
    }
    /**
     * Listens for keydown events to get when 'Enter' is pressed, firing a submit event.
     */
    onKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.ketchupTextInputSubmit.emit({
                value: this.value
            });
        }
    }
    onInputBlurred(event) {
        const { target } = event;
        this.inputBlur.emit({
            value: target.value,
            oldValue: this.value,
        });
        this.value = target.value;
    }
    onInputFocused(event) {
        const { target } = event;
        this.inputFocused.emit({
            value: target.value,
            oldValue: this.value,
        });
        this.value = target.value;
    }
    onInputUpdated(event) {
        const { target } = event;
        this.ketchupTextInputUpdated.emit({
            value: target.value,
            oldValue: this.value,
        });
        this.value = target.value;
    }
    //---- Rendering functions ----
    render() {
        const containerClass = this.classInputText + '__container';
        return (h("div", { class: containerClass + (this.isClearable ? ' ' + containerClass + '--clearable' : '') },
            h("input", { class: this.classInputText + (this.isClearable ? ' ' + this.classInputText + '--clearable' : ''), maxlength: this.maxLength, ref: (el) => this.textInput = el, tabindex: "0", value: this.value, onBlur: this.onInputBlurred.bind(this), onInput: this.onInputUpdated.bind(this), onFocus: this.onInputFocused.bind(this), onKeyDown: this.onKeyDown.bind(this) }),
            this.isClearable ?
                h("button", { "aria-label": "Close", class: this.classInputText + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                    h("svg", { viewBox: "0 0 24 24" },
                        h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) :
                null));
    }
    static get is() { return "ketchup-text-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "initialValue": {
            "type": String,
            "attr": "initial-value"
        },
        "inputEl": {
            "elementRef": true
        },
        "isClearable": {
            "type": Boolean,
            "attr": "is-clearable"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "maxLength": {
            "type": Number,
            "attr": "max-length"
        },
        "triggerFocus": {
            "method": true
        },
        "value": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "ketchupTextInputBlurred",
            "method": "inputBlur",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputFocused",
            "method": "inputFocused",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputSubmit",
            "method": "ketchupTextInputSubmit",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, {
            "name": "ketchupTextInputUpdated",
            "method": "ketchupTextInputUpdated",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ketchup-text-input:**/"; }
}
