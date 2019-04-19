export class KetchupPortalInstance {
    constructor() {
        /**
         * Specifies if the current portal instance should be displayed or not.
         */
        this.isVisible = false;
        /**
         * Virtual node list the KetchupPortalInstance must render
         */
        this.vNodes = null;
    }
    //---- Life cycle ----
    componentWillUpdate() {
        if (!this.port.shadowRoot.querySelector('style[data-portal-style]')) {
            this.port.shadowRoot.insertBefore(this.styleNode, this.port.shadowRoot.querySelector('style'));
        }
    }
    /**
     * When loading the frame has thrown an error

    @Event({
        eventName: 'ketchupHtmlError',
        composed: true,
        cancelable: false,
        bubbles: true
    })
    ketchupHtmlError: EventEmitter;

    onFrameError() {
        this.ketchupHtmlError.emit();
    }*/
    //---- Rendering functions ----
    // This is portal component, which does not need any rendering
    render() {
        console.log("portal instance", this.vNodes);
        return this.vNodes;
    }
    static get is() { return "ketchup-portal-instance"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "isVisible": {
            "type": Boolean,
            "attr": "is-visible",
            "reflectToAttr": true
        },
        "port": {
            "elementRef": true
        },
        "styleNode": {
            "type": "Any",
            "attr": "style-node"
        },
        "vNodes": {
            "type": "Any",
            "attr": "v-nodes"
        }
    }; }
    static get style() { return "/**style-placeholder:ketchup-portal-instance:**/"; }
}
