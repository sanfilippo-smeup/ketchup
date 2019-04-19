import { eventFromElement } from "../../utils/utils";
import { getElementOffset } from "../../utils/offset";
/*
 * TODO: Control if there can be issues with z-index and elements not correctly triggering the functions to close the combo box list
 * See this article here to use the method to get the current position and avoid opening the menu in the wrong direction
 * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
 */
export class KetchupCombo {
    constructor() {
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.displayedField = 'id';
        /**
         * Chooses which field of an item object should be used to create the list and be filtered.
         */
        this.valueField = 'id';
        /**
         * Allows to pass an initial selected item for the combobox
         */
        this.initialValue = {};
        /**
         * Marks the field as clearable, allowing an icon to delete its content
         */
        this.isClearable = false;
        /**
         * Items which can be selected
         */
        this.items = [];
        /**
         * Label to describe the radio group
         */
        this.label = '';
        /**
         * If true, the combobox uses a Stencil portal to create the menu.
         * Please use this feature carefully, only if needed.
         * @see ketchup-portal readme for more details.
         */
        this.usePortal = false;
        //-- Validating props --
        //---- Internal state ----
        // Keeps current value based on selectedElement -> shortcut for some controls
        this.value = '';
        // Keeps string for filtering elements when filter mode is active
        this.filter = '';
        // Keeps track when the combobox menu is open or closed
        this.isOpen = false;
        this.portalRef = null;
        /**
         * Creates a variable with an instance of the handler for the click event and binds this instance of the combo box to it.
         * This is used to add and more importantly remove events listeners attached to the body.
         * Sets listener on document to check if a click originated elsewhere
         * In that case closes the combo
         */
        this.clickFunction = this.onDocumentClick.bind(this);
        // Determines the position on which the menu will be open
        this.comboPosition = {
            isRight: false,
            isTop: false
        };
        //-- Constants --
        this.baseClass = 'ketchup-combo';
    }
    //---- Lifecycle Hooks  ----
    componentWillLoad() {
        // When the component is going to be loaded, if there is an initial value set, we can reflect it to internal state
        // This is used because when component is instantiated it does NOT run watchers.
        this.reflectInitialValue(this.initialValue);
    }
    componentDidLoad() {
        // When component is created, then the listener is set. @See clickFunction for more details
        document.addEventListener('click', this.clickFunction);
    }
    componentDidUnload() {
        // When component is destroyed, then the listener is removed. @See clickFunction for more details
        document.removeEventListener('click', this.clickFunction);
    }
    //---- Public Methods ----
    /**
     * Programmatically close the combo box
     * @method closeCombo
     */
    closeCombo() {
        this.isOpen = false;
    }
    /**
     * Programmatically opens the combo box
     * @method openCombo
     */
    openCombo() {
        this.comboPosition = this.calcBoxPosition();
        this.isOpen = true;
    }
    //---- Private methods ----
    // Always reflect changes of initialValue to value element
    reflectInitialValue(newValue, oldValue) {
        // When a new initial value is passed, we control that the new item is different from the old one before updating the state
        if (!oldValue || newValue[this.valueField] !== oldValue[this.valueField]) {
            this.value = newValue[this.valueField];
            this.selected = newValue;
            this.onComboSelected(newValue);
        }
    }
    // When valueField changes, then reflects the changes also inside the value prop
    reflectValueField(newValue) {
        this.value = this.selected ? this.selected[newValue] : '';
    }
    // Calculates where the box must be positioned according to the position the text input is placed
    calcBoxPosition() {
        const windowX = document.documentElement.clientWidth;
        const windowY = document.documentElement.clientHeight;
        const { height, left, top, width } = this.comboText.getBoundingClientRect();
        return {
            isRight: left + width / 2 > windowX / 2,
            isTop: top + height / 2 > windowY / 2
        };
    }
    //---- Events and handlers ----
    /**
     * Clear the current content inside the the text input
     * @method onClearClick
     */
    onClearClick() {
        this.value = '';
        this.selected = null;
        this.onComboSelected(null);
    }
    /**
     * Opens the combo box when clicked
     * @method onComboClick
     */
    onComboClick() {
        this.openCombo();
    }
    /**
     * Function to trigger when document is clicked.
     * If the event does not come from within the element, then the list is closed.
     *
     * To check when the event comes from this element, you can't rely on event.target.
     * That's because, as stated by ShadowDOM specs, event targets gets rewritten.
     * @see https://polymer-library.polymer-project.org/3.0/docs/devguide/shadow-dom
     * The event.path property is for Chrome only (maybe also Opera) and it is not standard.
     *
     * The specs also specify that the correct way to get from which element the event was effectively originated,
     * the correct and standard method to use is event.composedPath(), which return an array of the elements the event has traversed.
     * In this way, you can correctly detect when to close the menu or not.
     *
     * However, composed path is not supported by all browser, especially those which do not support ShadowDOM.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
     * But in that case you can traverse the DOM starting from the target element and going up.
     */
    async onDocumentClick(event) {
        let response = null;
        if (this.usePortal) {
            response = await this.portalRef.getPortalInstance();
        }
        try {
            if (event.composedPath().indexOf(this.comboEl) < 0 && event.composedPath().indexOf(response) < 0) {
                this.closeCombo();
            }
        }
        catch (e) {
            const ele = event.target;
            if (!eventFromElement(this.comboEl, ele) && !eventFromElement(response, ele)) {
                this.closeCombo();
            }
        }
    }
    /**
     * Function which gets triggered when filter changes
     * @param event
     */
    onFilterUpdate(event) {
        console.log(event);
        this.filter = event.detail.value.toLowerCase();
    }
    /**
     * When an item gets selected
     * @param item
     */
    onItemSelected(item) {
        if (item[this.valueField] !== this.value) {
            this.onComboSelected(item);
            this.selected = item;
            this.value = item[this.valueField];
        }
        this.closeCombo();
    }
    onComboSelected(item) {
        this.ketchupComboSelected.emit({
            value: item,
        });
    }
    //---- Rendering functions ----
    // Creates the menu and its items
    composeList() {
        return h("div", { class: this.baseClass + '__menu' + (this.isOpen ? ' is-open' : '') +
                (this.comboPosition.isRight ? ' is-right' : '') + (this.comboPosition.isTop ? ' is-top' : '')
                + (this.usePortal ? ' is-using-portal' : '') },
            h("div", { class: this.baseClass + '__filter' },
                h("ketchup-text-input", { onKetchupTextInputUpdated: this.onFilterUpdate.bind(this) })),
            h("ul", { class: this.baseClass + '__list' }, this.items.filter(item => !this.filter || item[this.displayedField].toLowerCase().indexOf(this.filter) >= 0)
                .map(item => h("li", { onClick: () => this.onItemSelected(item) },
                h("span", null, item[this.displayedField])))));
    }
    render() {
        const containerClass = this.baseClass + '__container';
        return ([
            h("div", { class: containerClass + (this.isClearable ? ' ' + containerClass + '--clearable' : ''), ref: (el) => this.comboText = el },
                h("span", { class: this.baseClass + '__current-value', onClick: this.onComboClick.bind(this) },
                    this.selected[this.displayedField],
                    h("svg", { class: this.baseClass + '__icon ' + this.baseClass + '__chevron' + (this.isOpen ? ' ' + this.baseClass + '__chevron--open' : ''), viewBox: "0 0 24 24" },
                        h("path", { d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" }))),
                this.isClearable ?
                    h("button", { "aria-label": "Close", class: this.baseClass + '__clear', role: "button", onClick: this.onClearClick.bind(this) },
                        h("svg", { class: this.baseClass + '__icon', viewBox: "0 0 24 24" },
                            h("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }))) :
                    null),
            this.usePortal ?
                h("ketchup-portal", { cssVarsRef: this.comboEl, isVisible: this.isOpen, mirroredCssVars: ['--cmb_menu-background', '--cmb_tr-duration'], nodes: this.composeList(), ref: el => this.portalRef = el, refOffset: getElementOffset(this.comboEl, this.comboPosition), styleNode: this.comboEl.shadowRoot.querySelector('style') })
                :
                    this.composeList()
        ]);
    }
    static get is() { return "ketchup-combo"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "closeCombo": {
            "method": true
        },
        "comboEl": {
            "elementRef": true
        },
        "displayedField": {
            "type": String,
            "attr": "displayed-field"
        },
        "filter": {
            "state": true
        },
        "initialValue": {
            "type": "Any",
            "attr": "initial-value",
            "watchCallbacks": ["reflectInitialValue"]
        },
        "isClearable": {
            "type": Boolean,
            "attr": "is-clearable"
        },
        "isOpen": {
            "state": true
        },
        "items": {
            "type": "Any",
            "attr": "items"
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "openCombo": {
            "method": true
        },
        "usePortal": {
            "type": Boolean,
            "attr": "use-portal"
        },
        "value": {
            "state": true
        },
        "valueField": {
            "type": String,
            "attr": "value-field",
            "watchCallbacks": ["reflectValueField"]
        }
    }; }
    static get events() { return [{
            "name": "ketchupComboSelected",
            "method": "ketchupComboSelected",
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:ketchup-combo:**/"; }
}
