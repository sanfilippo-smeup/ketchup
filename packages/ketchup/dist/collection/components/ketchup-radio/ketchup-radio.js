import { generateUniqueId } from "../../utils/utils";
export class KetchupRadio {
    constructor() {
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * Direction in which the radio elements must be placed
         */
        this.direction = 'horizontal';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.displayedField = 'id';
        /**
         * Radio elements to display
         */
        this.items = [];
        /**
         * Radio elements value
         */
        this.radioName = '';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.valueField = 'id';
        //---- Internal state ----
        this.selectedRadio = null;
    }
    //---- Validating props ----
    checkDirection(newVal) {
        if (!/horizontal|vertical/.test(newVal)) {
            throw new Error('ketchup-radio: direction must be horizontal or vertical.');
        }
    }
    // Typing for input element UIEvent & {target: HTMLInputElement}
    onRadioChanged(radio) {
        this.ketchupRadioChanged.emit({
            value: radio,
            oldValue: this.selectedRadio,
        });
        this.selectedRadio = radio;
    }
    //---- Rendering functions ----
    radioElementsComposer() {
        return this.items.map((radio) => {
            // The id is necessary for the label to be associated with the input
            // TODO Anyway this can be extracted into another map object to avoid creating a new id each time the component is painted.
            const uId = generateUniqueId(radio[this.valueField]);
            return h("li", { class: 'ketchup-radio__item' + (this.selectedRadio && this.selectedRadio[this.valueField] === radio[this.valueField] ? ' ketchup-radio__item--selected' : '') },
                h("div", null,
                    h("input", { id: uId, type: "radio", name: this.radioName, value: radio[this.valueField], onChange: this.onRadioChanged.bind(this, radio) })),
                h("label", { htmlFor: uId }, radio[this.displayedField]));
        });
    }
    render() {
        let classRadioGroup = 'ketchup-radio__group';
        // When direction is horizontal
        if (this.direction === 'horizontal') {
            classRadioGroup += ' ketchup-radio__group--horizontal';
        }
        return (h("div", null,
            this.label ? h("p", null, this.label) : null,
            h("ul", { class: classRadioGroup }, this.radioElementsComposer())));
    }
    static get is() { return "ketchup-radio"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "direction": {
            "type": String,
            "attr": "direction",
            "watchCallbacks": ["checkDirection"]
        },
        "displayedField": {
            "type": String,
            "attr": "displayed-field"
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "radioName": {
            "type": String,
            "attr": "radio-name"
        },
        "selectedRadio": {
            "state": true
        },
        "valueField": {
            "type": String,
            "attr": "value-field"
        }
    }; }
    static get events() { return [{
            "name": "ketchupRadioChanged",
            "method": "ketchupRadioChanged",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ketchup-radio:**/"; }
}
