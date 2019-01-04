<template>
    <div  v-if="!isMenu"
            class="k-button-panel"
            v-cloak>
        <div v-for="rowIndex in rowsToPaint"
                class="k-button-panel-row"
                :key="rowIndex"
                ref="panel"
                :style="buttonPanelStyle">
            <v-btn v-for="(button, index) in buttonsOfRow(rowIndex)"
                   class="k-button__item"
                   :class="[button.id == selectedButton && showSelection ? 'btn-selected' : '']"
                   :color="!(button.id == selectedButton && showSelection) ? backgroundColor : selectionColor"
                   :flat="flat"
                   :key="button.id"
                   :icon="modeIsHint"
                   :outline="outline"
                   :round="rounded"
                   :style="buttonStyle"
                   :title="button.text && modeIsHint ? button.text : ''"
                   @click="clickedButton({id: button.id})"
                   @focus="focusedButton({id: button.id})"
            >
                <i v-if="button.icon"
                   class="k-button__icon"
                   :class="[iconClass, button.icon]"
                   :style="composeIconStyle(button)"></i>
                <span v-if="button.text && !modeIsHint"
                      class="k-button__text"
                      :style="textStyle"
                >{{ button.text }}</span>
            </v-btn>
        </div>
    </div>
    <!-- append-icon is mandatory to allow visualization of material design icons and not material icons -->
    <v-menu v-else
            append-icon="mdi mdi-chevron-down"
            class="k-button-menu">
        <v-btn  slot="activator"
                class="k-button__item"
                :color="!showSelection ? backgroundColor : selectionColor"
                :flat="flat"
                :icon="modeIsHint"
                :outline="outline"
                :round="rounded"
                :style="buttonStyle"
                :title="menuLabel && modeIsHint ? menuLabel : ''"
            >
            <i class="k-button__icon mdi mdi-menu-down"
                    :class="[iconClass]"
                    :style="composeIconStyle({iconColor: color})"></i>
            <span v-if="!modeIsHint"
                  class="k-button__text"
                  :style="textStyle"
            >{{ menuLabel }}</span>
        </v-btn>
        <ul class="k-button__list">
            <li v-for="button in buttons"
                    :key="button.id"
                    @click="clickedButton({id: button.id})">
                <i v-if="button.icon"
                   class="k-button__icon"
                   :class="[iconClass, button.icon]"
                   :style="composeIconStyle(button)"></i>
                <span v-if="button.text && !modeIsHint"
                      class="k-button__text"
                      :style="textStyle"
                >{{ button.text }}</span>
            </li>
        </ul>
    </v-menu>
</template>

<script lang="ts">
    import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
    import Vuetify, { VBtn, VMenu } from 'vuetify/lib';

    Vue.use(Vuetify);

    // Interface for a single button element to be used
    export interface KButton {
        id: string;
        name?: string;
        icon?: string;
        iconColor?: string;
        text?: string;
    }

    @Component({
        name: 'k-button-panel',
        components: {
            VBtn,
            VMenu,
        },
    })
    export default class KInput extends Vue {
        //---- Properties (props) ----
        // List of buttons and their associated properties
        // When defaulting an object or an array, always use a factory function
        @Prop({default: () => []}) private buttons!: KButton[];
        // default color for the text
        @Prop({default: '#4e908f'}) private backgroundColor!: string;
        // Sets font weight to bold
        @Prop({default: false}) private bold!: boolean;
        // default color for the text
        @Prop({default: '#ffffff'}) private color!: string;
        // number of buttons on the same row
        @Prop({default: 0}) private columns!: number;
        // Buttons must take all available space
        @Prop({default: false}) private fillspace!: boolean;
        // buttons must be flat
        @Prop({default: false}) private flat!: boolean;
        // if buttons must be displayed horizontally or vertically
        @Prop({default: true}) private horizontal!: boolean;
        // sets how buttons must be aligned inside the container
        @Prop({default: 'flex-start'}) private horizontalAlignment!: string;
        // when buttons must be displayed as a menu
        @Prop({default: false}) private isMenu!: boolean;
        // menu label
        @Prop({default: 'Menu'}) private menuLabel!: string;
        // shows only the outline
        @Prop({default: false}) private outline!: boolean;
        // buttons must have rounded corners
        @Prop({default: false}) private rounded!: boolean;
        // selection color
        @Prop({default: '#ffc107'}) private selectionColor!: string;
        // show selected button
        @Prop({default: false}) private showSelection!: boolean;
        // button text alignment
        @Prop({default: 'center'}) private textAlign!: string;
        // sets the visualization mode
        @Prop({default: 'normal'}) private textMode!: string;

        //---- Data ----
        // Lateral margin of the buttons elements
        margin = 8;
        // When in panel mode, keeps track of last selected button
        selectedButton: string = '';

        //---- Computed ----

        // sets style of the panel
        get buttonPanelStyle() {
            return {
                'flex-direction': this.horizontal ? 'row' : 'column',
                'justify-content': this.horizontalAlignment,
            };
        }

        // common button styles
        get buttonStyle() {
            // Declares all index of given object are strings with a string value
            let sobj: {[index: string]: string} = {};

            // Controls fillspace - It must not be in Icon mode
            if (this.fillspace && !this.modeIsHint) {
                // If there are columns, then each item has a certain width
                if (this.columns > 0) {
                    sobj.width = 'calc((100% ' + ' - ' + this.margin.toString() + 'px*(' + this.columns.toString() + ' * 2))'
                        + ' / ' + this.columns.toString() + ')';
                }
                // otherwise all space is taken
                else {
                    sobj.width = 'calc(100% - 2*' + this.margin.toString() + 'px)';
                }
            }

            // Returns configuration object
            return sobj;
        }

        // returns the number of items per row
        // If columns number is <= 0, all items are positioned inside one row
        get maxButtonsPerRow() {
            return this.columns > 0 ? this.columns : this.buttons.length;
        }

        // base icon classes
        get iconClass() {
            return {
                'k-button__icon--no-margin': this.modeIsHint,
            };
        }

        // controls if the current mode is hint
        get modeIsHint() {
            return this.textMode === 'hint';
        }

        // columns to paint
        get rowsToPaint() {
            // There must always be a column
            // The number of rows must always be rounded up the the upper integer if able
            return Math.ceil(this.buttons.length / Math.max(this.columns,1));
        }

        // set basic text style of each button component
        get textStyle() {
            return {
                'color': this.color,
                'font-weight': this.bold ? '700' : '400',
                'text-align': this.textAlign,
                'text-decoration': this.flat ? 'underline' : 'none',
            }
        }

        //---- LifeCycle hooks ----


        //---- Methods ----

        // Gets an array of buttons buttons per name
        buttonsOfRow(rowIndex: number) {
            // Rows always starts from 1 so we have to decrement it by 1
            const trueRow = rowIndex - 1;
            // This parse int is mandatory because computed property returns a string
            // So the whole expression will be changed to string at run time
            // bypassing TypeScript and generating an error
            // In addition, TS requires that element is first set as unknow and then to string
            const maxButtons = parseInt((this.maxButtonsPerRow as unknown) as string);
            let buttons = [];
            for (let i = trueRow * maxButtons; i < (trueRow * maxButtons + maxButtons) && i < this.buttons.length; i++) {
                buttons.push(this.buttons[i]);
            }
            return buttons;
        }

        // Handler for the clicked button
        clickedButton(event: any) {
            // Selects the button and emits event
            //this.selectedButton = event.id.toString();
            this.emitClickedButton({
                id: event.id,
            });
        }

        // compose icon style
        composeIconStyle(button: KButton) {
            const icoColor = button.iconColor ? button.iconColor : '#fff';
            return {
                color: icoColor,
                fill: icoColor,
            }
        };

        // Payload event has a default type
        emitClickedButton(payload: any) {
            this.$emit('btnpanel-clickedbtn', payload);
        }

        // Handler for when the button gets focused
        focusedButton(event: any) {
            this.selectedButton = event.id.toString();
        }

        //---- Watched properties ----
    }
</script>

<style lang="scss">
    //-- Main container of the button panel --
    .k-button-panel {
        padding: 8px;

        &[v-cloak] {
            opacity: 0;
        }
    }

    // Each row containing buttons
    .k-button-panel-row {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
    }

    // Customization class for button item
    .k-button__item {
        .v-btn__content {
            width: 100%;
        }
    }

    // The icon button class
    $icon-size: 16px;
    $icon-margin: 8px;
    .k-button__icon {
        flex-shrink: 0;
        flex-basis: $icon-size;
        font-size: $icon-size;
        margin-right: $icon-margin;

        // If there is only the icon
        &--no-margin {
            margin: 0;
        }

        // When there is an icon, reduce width of element
        ~ span {
            max-width: calc(100% - #{$icon-size + $icon-margin}); // -16px*2 must NOT be included
        }
    }

    // The text inside the button
    .k-button__text {
        display: inline-block;
        flex-grow: 1;
        max-width: 100%;
        text-transform: none;
    }

    .panel-menu {
        position: relative;
        width: 500px;
    }

    //-- Style for the menu --
    // This is mandatory for the having a correctly positioned dropdown element list
    // Otherwise it will be positioned well beyond the bottom of the page due to some strange
    // Vuetify calculations
    /*.k-button-menu {
        .v-menu__content {
            top: 50px !important;
        }
    }*/

    .k-button__list {
        background-color: #ffffff;
        padding: 0;
        margin: 0;

        > li {
            background-color: transparent;
            box-sizing: border-box;
            display: flex;
            list-style-type: none;
            padding: 12px 16px;
            transition: background-color .3s;

            &:hover {
                background-color: rgba(0,0,0,.12);
                cursor: pointer;
            }
        }
    }
</style>

<style lang="stylus">
    // To only import the mandatory styles, manually requires the correct style files
    @import '~vuetify/src/stylus/app.styl';
    @import '~vuetify/src/stylus/components/_buttons.styl';
    @import '~vuetify/src/stylus/components/_menus.styl';
    @import '~vuetify/src/stylus/components/_ripples.styl';
</style>