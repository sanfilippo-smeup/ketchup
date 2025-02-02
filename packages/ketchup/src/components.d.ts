/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ButtonConfig,
} from './components/ketchup-btn/ketchup-btn-declarations';
import {
  ChartConfig,
} from './components/ketchup-chart/ketchup-chart-declarations';
import {
  ComboItem,
} from './components/ketchup-combo/ketchup-combo-declarations';
import {
  Column,
  GenericMap,
  GroupObject,
  PaginatorPos,
  Row,
  SortObject,
  TotalsMap,
} from './components/ketchup-data-table/ketchup-data-table-declarations';
import {
  EventEmitter,
} from '@stencil/core';
import {
  KetchupFldChangeEvent,
  KetchupFldSubmitEvent,
} from './components/ketchup-fld/ketchup-fld-declarations';
import {
  ElementOffset,
} from './utils/offset';
import {
  KetchupRadioElement,
} from './components/ketchup-radio/ketchup-radio-declarations';
import {
  KetchupTextInputEvent,
} from './components/ketchup-text-input/ketchup-text-input-declarations';


export namespace Components {

  interface KetchupBtn {
    'buttons': any[];
    'config': ButtonConfig;
  }
  interface KetchupBtnAttributes extends StencilHTMLAttributes {
    'buttons'?: any[];
    'config'?: ButtonConfig;
  }

  interface KupButton {
    'align': string;
    'buttonClass': string;
    'fillspace': boolean;
    'flat': boolean;
    'iconClass': string;
    'iconUrl': string;
    'label': string;
    'rounded': boolean;
    'showicon': boolean;
    'showtext': boolean;
    'textmode': string;
    'transparent': boolean;
  }
  interface KupButtonAttributes extends StencilHTMLAttributes {
    'align'?: string;
    'buttonClass'?: string;
    'fillspace'?: boolean;
    'flat'?: boolean;
    'iconClass'?: string;
    'iconUrl'?: string;
    'label'?: string;
    'onKetchupButtonClicked'?: (event: CustomEvent<{
      id: string;
    }>) => void;
    'rounded'?: boolean;
    'showicon'?: boolean;
    'showtext'?: boolean;
    'textmode'?: string;
    'transparent'?: boolean;
  }

  interface KetchupChart {
    'config': ChartConfig;
    'data': any;
  }
  interface KetchupChartAttributes extends StencilHTMLAttributes {
    'config'?: ChartConfig;
    'data'?: any;
  }

  interface KetchupCombo {
    /**
    * Programmatically close the combo box
    */
    'closeCombo': () => void;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField': string;
    /**
    * Allows to pass an initial selected item for the combobox
    */
    'initialValue': ComboItem;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable': boolean;
    /**
    * Items which can be selected
    */
    'items': ComboItem[];
    /**
    * Label to describe the radio group
    */
    'label': string;
    /**
    * Programmatically opens the combo box
    */
    'openCombo': () => void;
    /**
    * If true, the combobox uses a Stencil portal to create the menu. Please use this feature carefully, only if needed.
    */
    'usePortal': boolean;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField': string;
  }
  interface KetchupComboAttributes extends StencilHTMLAttributes {
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField'?: string;
    /**
    * Allows to pass an initial selected item for the combobox
    */
    'initialValue'?: ComboItem;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable'?: boolean;
    /**
    * Items which can be selected
    */
    'items'?: ComboItem[];
    /**
    * Label to describe the radio group
    */
    'label'?: string;
    /**
    * When an element has been selected
    */
    'onKetchupComboSelected'?: (event: CustomEvent<{
      value: ComboItem;
    }>) => void;
    /**
    * If true, the combobox uses a Stencil portal to create the menu. Please use this feature carefully, only if needed.
    */
    'usePortal'?: boolean;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField'?: string;
  }

  interface KupDash {
    'fontsize': string;
    'layout': string;
  }
  interface KupDashAttributes extends StencilHTMLAttributes {
    'fontsize'?: string;
    'layout'?: string;
    'onKetchupDashClicked'?: (event: CustomEvent<{
    }>) => void;
  }

  interface KupDataTable {
    'columnsWidth': Array<{
      column: string;
      width: number;
    }>;
    'data': { columns?: Array<Column>; rows?: Array<Row> };
    'filters': GenericMap;
    'globalFilter': boolean;
    'groups': Array<GroupObject>;
    'multiSelection': boolean;
    'paginatorPos': PaginatorPos;
    'rowsPerPage': number;
    'selectRow': number;
    'showFilters': boolean;
    'showGrid': boolean;
    'showHeader': boolean;
    'sort': Array<SortObject>;
    'sortEnabled': boolean;
    'totals': TotalsMap;
  }
  interface KupDataTableAttributes extends StencilHTMLAttributes {
    'columnsWidth'?: Array<{
      column: string;
      width: number;
    }>;
    'data'?: { columns?: Array<Column>; rows?: Array<Row> };
    'filters'?: GenericMap;
    'globalFilter'?: boolean;
    'groups'?: Array<GroupObject>;
    'multiSelection'?: boolean;
    /**
    * When a row is selected
    */
    'onKupRowSelected'?: (event: CustomEvent<Array<Row>>) => void;
    'paginatorPos'?: PaginatorPos;
    'rowsPerPage'?: number;
    'selectRow'?: number;
    'showFilters'?: boolean;
    'showGrid'?: boolean;
    'showHeader'?: boolean;
    'sort'?: Array<SortObject>;
    'sortEnabled'?: boolean;
    'totals'?: TotalsMap;
  }

  interface KetchupFld {
    /**
    * Data the FLD must parse to fully be configured. It must be either an Object or a JSON parsable string
    */
    'config': string | object;
    /**
    * Effective data to pass to the component
    */
    'data': any;
    /**
    * Provides an interface to get the current value programmatically
    */
    'getCurrentValue': () => Promise<string | object>;
  }
  interface KetchupFldAttributes extends StencilHTMLAttributes {
    /**
    * Data the FLD must parse to fully be configured. It must be either an Object or a JSON parsable string
    */
    'config'?: string | object;
    /**
    * Effective data to pass to the component
    */
    'data'?: any;
    /**
    * Launched when the value of the current FLD changes.
    */
    'onKetchupFldChanged'?: (event: CustomEvent<KetchupFldChangeEvent>) => void;
    /**
    * Launched when the FLD values are confirmed and a submit event is triggered.
    */
    'onKetchupFldSubmit'?: (event: CustomEvent<KetchupFldSubmitEvent>) => void;
  }

  interface KetchupHtml {
    /**
    * If true, the ketchup-html takes the shape of a button
    */
    'isButton': boolean;
    /**
    * The label to show when button isButton is active
    */
    'label': string;
    /**
    * The address which must be referenced by the iframe
    */
    'src': string;
  }
  interface KetchupHtmlAttributes extends StencilHTMLAttributes {
    /**
    * If true, the ketchup-html takes the shape of a button
    */
    'isButton'?: boolean;
    /**
    * The label to show when button isButton is active
    */
    'label'?: string;
    /**
    * When loading the frame has thrown an error
    */
    'onKetchupHtmlError'?: (event: CustomEvent) => void;
    /**
    * When the iframe has been loaded
    */
    'onKetchupHtmlLoaded'?: (event: CustomEvent) => void;
    /**
    * The address which must be referenced by the iframe
    */
    'src'?: string;
  }

  interface KupPaginator {
    'currentPage': number;
    'max': number;
    'perPage': number;
    'selectedPerPage': number;
  }
  interface KupPaginatorAttributes extends StencilHTMLAttributes {
    'currentPage'?: number;
    'max'?: number;
    /**
    * When the current page change
    */
    'onKupPageChanged'?: (event: CustomEvent<{ newPage: number }>) => void;
    /**
    * When the rows per page change
    */
    'onKupRowsPerPageChanged'?: (event: CustomEvent<{ newRowsPerPage: number }>) => void;
    'perPage'?: number;
    'selectedPerPage'?: number;
  }

  interface KetchupPortalInstance {
    /**
    * Specifies if the current portal instance should be displayed or not.
    */
    'isVisible': boolean;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode': HTMLStyleElement;
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'vNodes'?: JSX.Element[] | JSX.Element;
  }
  interface KetchupPortalInstanceAttributes extends StencilHTMLAttributes {
    /**
    * Specifies if the current portal instance should be displayed or not.
    */
    'isVisible'?: boolean;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode'?: HTMLStyleElement;
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'vNodes'?: JSX.Element[] | JSX.Element;
  }

  interface KetchupPortal {
    /**
    * Reference to the html element from which CSS Custom Properties must be derived
    */
    'cssVarsRef': HTMLElement;
    /**
    * Returns the root node instance of the KetchupPortalInstance element
    */
    'getPortalInstance': () => Promise<HTMLElement>;
    /**
    * Tells the portal instance if it can be visible or not
    */
    'isVisible': boolean;
    /**
    * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
    */
    'mirroredCssVars': string[];
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'nodes': JSX.Element[] | JSX.Element;
    /**
    * The HTML element on which the virtual node must be appended
    */
    'portalRootNode': HTMLElement;
    /**
    * Calculated offset of where the portal must be positioned
    */
    'refOffset': ElementOffset;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode': HTMLStyleElement;
  }
  interface KetchupPortalAttributes extends StencilHTMLAttributes {
    /**
    * Reference to the html element from which CSS Custom Properties must be derived
    */
    'cssVarsRef'?: HTMLElement;
    /**
    * Tells the portal instance if it can be visible or not
    */
    'isVisible'?: boolean;
    /**
    * Array of custom css vars which needs to be mirrored. Their value is computed from cssVarsRef
    */
    'mirroredCssVars'?: string[];
    /**
    * Virtual node list the KetchupPortalInstance must render
    */
    'nodes'?: JSX.Element[] | JSX.Element;
    /**
    * When loading the frame has thrown an error
    */
    'onKetchupHtmlError'?: (event: CustomEvent) => void;
    /**
    * When the iframe has been loaded
    */
    'onKetchupHtmlLoaded'?: (event: CustomEvent) => void;
    /**
    * The HTML element on which the virtual node must be appended
    */
    'portalRootNode'?: HTMLElement;
    /**
    * Calculated offset of where the portal must be positioned
    */
    'refOffset'?: ElementOffset;
    /**
    * A style node to be copied into the KetchupPortalInstance
    */
    'styleNode'?: HTMLStyleElement;
  }

  interface KetchupRadio {
    /**
    * Direction in which the radio elements must be placed
    */
    'direction': string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField': string;
    /**
    * Allows to pass an initial selected item for the Radio group
    */
    'initialValue': KetchupRadioElement;
    /**
    * Radio elements to display
    */
    'items': KetchupRadioElement[];
    /**
    * Label to describe the radio group
    */
    'label': string;
    /**
    * Radio elements value
    */
    'radioName': string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField': string;
  }
  interface KetchupRadioAttributes extends StencilHTMLAttributes {
    /**
    * Direction in which the radio elements must be placed
    */
    'direction'?: string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'displayedField'?: string;
    /**
    * Allows to pass an initial selected item for the Radio group
    */
    'initialValue'?: KetchupRadioElement;
    /**
    * Radio elements to display
    */
    'items'?: KetchupRadioElement[];
    /**
    * Label to describe the radio group
    */
    'label'?: string;
    /**
    * When currently selected radio button has been changed.
    */
    'onKetchupRadioChanged'?: (event: CustomEvent<{
      value: KetchupRadioElement;
      oldValue: KetchupRadioElement;
    }>) => void;
    /**
    * Radio elements value
    */
    'radioName'?: string;
    /**
    * Chooses which field of an item object should be used to create the list and be filtered.
    */
    'valueField'?: string;
  }

  interface KupTextInput {
    /**
    * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
    */
    'debounce': number;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'initialValue': string;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable': boolean;
    /**
    * Label to describe the radio group
    */
    'label': string;
    /**
    * The max length of the text field. Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
    */
    'maxLength': number;
    /**
    * Triggers the focus event on the input text
    */
    'triggerFocus': () => void;
  }
  interface KupTextInputAttributes extends StencilHTMLAttributes {
    /**
    * Set the amount of time, in milliseconds, to wait to trigger the `ketchupTextInputUpdated` event after each keystroke.
    */
    'debounce'?: number;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'initialValue'?: string;
    /**
    * Marks the field as clearable, allowing an icon to delete its content
    */
    'isClearable'?: boolean;
    /**
    * Label to describe the radio group
    */
    'label'?: string;
    /**
    * The max length of the text field. Default value copied from here: https://www.w3schools.com/tags/att_input_maxlength.asp
    */
    'maxLength'?: number;
    /**
    * When text field loses focus (blur)
    */
    'onKetchupTextInputBlurred'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
    /**
    * When the text input gains focus
    */
    'onKetchupTextInputFocused'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
    /**
    * When a keydown enter event occurs it generates
    */
    'onKetchupTextInputSubmit'?: (event: CustomEvent<{
      value: string;
    }>) => void;
    /**
    * When the input text value gets updated
    */
    'onKetchupTextInputUpdated'?: (event: CustomEvent<KetchupTextInputEvent>) => void;
  }

  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'KetchupBtn': Components.KetchupBtn;
    'KupButton': Components.KupButton;
    'KetchupChart': Components.KetchupChart;
    'KetchupCombo': Components.KetchupCombo;
    'KupDash': Components.KupDash;
    'KupDataTable': Components.KupDataTable;
    'KetchupFld': Components.KetchupFld;
    'KetchupHtml': Components.KetchupHtml;
    'KupPaginator': Components.KupPaginator;
    'KetchupPortalInstance': Components.KetchupPortalInstance;
    'KetchupPortal': Components.KetchupPortal;
    'KetchupRadio': Components.KetchupRadio;
    'KupTextInput': Components.KupTextInput;
    'MyComponent': Components.MyComponent;
  }

  interface StencilIntrinsicElements {
    'ketchup-btn': Components.KetchupBtnAttributes;
    'kup-button': Components.KupButtonAttributes;
    'ketchup-chart': Components.KetchupChartAttributes;
    'ketchup-combo': Components.KetchupComboAttributes;
    'kup-dash': Components.KupDashAttributes;
    'kup-data-table': Components.KupDataTableAttributes;
    'ketchup-fld': Components.KetchupFldAttributes;
    'ketchup-html': Components.KetchupHtmlAttributes;
    'kup-paginator': Components.KupPaginatorAttributes;
    'ketchup-portal-instance': Components.KetchupPortalInstanceAttributes;
    'ketchup-portal': Components.KetchupPortalAttributes;
    'ketchup-radio': Components.KetchupRadioAttributes;
    'kup-text-input': Components.KupTextInputAttributes;
    'my-component': Components.MyComponentAttributes;
  }


  interface HTMLKetchupBtnElement extends Components.KetchupBtn, HTMLStencilElement {}
  var HTMLKetchupBtnElement: {
    prototype: HTMLKetchupBtnElement;
    new (): HTMLKetchupBtnElement;
  };

  interface HTMLKupButtonElement extends Components.KupButton, HTMLStencilElement {}
  var HTMLKupButtonElement: {
    prototype: HTMLKupButtonElement;
    new (): HTMLKupButtonElement;
  };

  interface HTMLKetchupChartElement extends Components.KetchupChart, HTMLStencilElement {}
  var HTMLKetchupChartElement: {
    prototype: HTMLKetchupChartElement;
    new (): HTMLKetchupChartElement;
  };

  interface HTMLKetchupComboElement extends Components.KetchupCombo, HTMLStencilElement {}
  var HTMLKetchupComboElement: {
    prototype: HTMLKetchupComboElement;
    new (): HTMLKetchupComboElement;
  };

  interface HTMLKupDashElement extends Components.KupDash, HTMLStencilElement {}
  var HTMLKupDashElement: {
    prototype: HTMLKupDashElement;
    new (): HTMLKupDashElement;
  };

  interface HTMLKupDataTableElement extends Components.KupDataTable, HTMLStencilElement {}
  var HTMLKupDataTableElement: {
    prototype: HTMLKupDataTableElement;
    new (): HTMLKupDataTableElement;
  };

  interface HTMLKetchupFldElement extends Components.KetchupFld, HTMLStencilElement {}
  var HTMLKetchupFldElement: {
    prototype: HTMLKetchupFldElement;
    new (): HTMLKetchupFldElement;
  };

  interface HTMLKetchupHtmlElement extends Components.KetchupHtml, HTMLStencilElement {}
  var HTMLKetchupHtmlElement: {
    prototype: HTMLKetchupHtmlElement;
    new (): HTMLKetchupHtmlElement;
  };

  interface HTMLKupPaginatorElement extends Components.KupPaginator, HTMLStencilElement {}
  var HTMLKupPaginatorElement: {
    prototype: HTMLKupPaginatorElement;
    new (): HTMLKupPaginatorElement;
  };

  interface HTMLKetchupPortalInstanceElement extends Components.KetchupPortalInstance, HTMLStencilElement {}
  var HTMLKetchupPortalInstanceElement: {
    prototype: HTMLKetchupPortalInstanceElement;
    new (): HTMLKetchupPortalInstanceElement;
  };

  interface HTMLKetchupPortalElement extends Components.KetchupPortal, HTMLStencilElement {}
  var HTMLKetchupPortalElement: {
    prototype: HTMLKetchupPortalElement;
    new (): HTMLKetchupPortalElement;
  };

  interface HTMLKetchupRadioElement extends Components.KetchupRadio, HTMLStencilElement {}
  var HTMLKetchupRadioElement: {
    prototype: HTMLKetchupRadioElement;
    new (): HTMLKetchupRadioElement;
  };

  interface HTMLKupTextInputElement extends Components.KupTextInput, HTMLStencilElement {}
  var HTMLKupTextInputElement: {
    prototype: HTMLKupTextInputElement;
    new (): HTMLKupTextInputElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLElementTagNameMap {
    'ketchup-btn': HTMLKetchupBtnElement
    'kup-button': HTMLKupButtonElement
    'ketchup-chart': HTMLKetchupChartElement
    'ketchup-combo': HTMLKetchupComboElement
    'kup-dash': HTMLKupDashElement
    'kup-data-table': HTMLKupDataTableElement
    'ketchup-fld': HTMLKetchupFldElement
    'ketchup-html': HTMLKetchupHtmlElement
    'kup-paginator': HTMLKupPaginatorElement
    'ketchup-portal-instance': HTMLKetchupPortalInstanceElement
    'ketchup-portal': HTMLKetchupPortalElement
    'ketchup-radio': HTMLKetchupRadioElement
    'kup-text-input': HTMLKupTextInputElement
    'my-component': HTMLMyComponentElement
  }

  interface ElementTagNameMap {
    'ketchup-btn': HTMLKetchupBtnElement;
    'kup-button': HTMLKupButtonElement;
    'ketchup-chart': HTMLKetchupChartElement;
    'ketchup-combo': HTMLKetchupComboElement;
    'kup-dash': HTMLKupDashElement;
    'kup-data-table': HTMLKupDataTableElement;
    'ketchup-fld': HTMLKetchupFldElement;
    'ketchup-html': HTMLKetchupHtmlElement;
    'kup-paginator': HTMLKupPaginatorElement;
    'ketchup-portal-instance': HTMLKetchupPortalInstanceElement;
    'ketchup-portal': HTMLKetchupPortalElement;
    'ketchup-radio': HTMLKetchupRadioElement;
    'kup-text-input': HTMLKupTextInputElement;
    'my-component': HTMLMyComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
