<template>
    <div id="app">
        <k-label/>
        <k-label message="aspetta" color="red"/>
        <k-input :value="inputValue" @customInput="onInput"/>
        <p>{{inputValue}}</p>

        <div class="cmp-wrapper">
            <div>
                <label>Bold</label>
                <input type="checkbox" v-model="bold">
            </div>
            <div>
                <label>Columns</label>
                <input type="number" min="0" max="10" v-model="columns">
            </div>
            <div>
                <label>Background Color</label>
                <input type="color" v-model="backgroundColor">
            </div>
            <div>
                <label>Color</label>
                <input type="color" v-model="color">
            </div>
            <div>
                <label>Fillspace</label>
                <input type="checkbox" v-model="fillspace">
            </div>
            <div>
                <label>Flat</label>
                <input type="checkbox" v-model="flat">
            </div>
            <div>
                <label>Horizontal</label>
                <input type="checkbox" v-model="horizontal">
            </div>
            <div>
                <label>HorizontalAlign</label>
                <select v-model="horizontalAlignment">
                    <option value="center">Center</option>
                    <option value="flex-start">Left</option>
                    <option value="flex-end">Right</option>
                </select>
            </div>
            <div>
                <label>IsMenu</label>
                <input type="checkbox" v-model="isMenu">
            </div>
            <div>
                <label>Menu Label</label>
                <input type="text" v-model="menuLabel">
            </div>
            <div>
                <label>Outline</label>
                <input type="checkbox" v-model="outline">
            </div>
            <div>
                <label>Rounded</label>
                <input type="checkbox" v-model="rounded">
            </div>
            <div>
                <label>Show Selection</label>
                <input type="checkbox" v-model="showSelection">
            </div>
            <div>
                <label>Selection Color</label>
                <input type="color" v-model="selectionColor">
            </div>
            <div>
                <label>Text Align</label>
                <select v-model="textAlign">
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
            <div>
                <label>TextMode</label>
                <select v-model="textMode">
                    <option value="normal">Normal</option>
                    <option value="hint">Hint</option>
                </select>
            </div>
        </div>
        <k-button-panel :buttons="buttonsConf.buttons"
                :bold="bold"
                :backgroundColor="backgroundColor"
                :color="color"
                :columns="columns"
                :fillspace="fillspace"
                :horizontalAlignment="horizontalAlignment"
                :rounded="rounded"
                :flat="flat"
                :horizontal="horizontal"
                :isMenu="isMenu"
                :menuLabel="menuLabel"
                :outline="outline"
                :selectionColor="selectionColor"
                :showSelection="showSelection"
                :textMode="textMode"
                :textAlign="textAlign"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import KLabel from "./components/KLabel/KLabel.vue";
    //import KInput from "./components/KInput";
    import KButtonPanel, { KButton } from './components/KButtonPanel/KButtonPanel.vue';

    @Component({
        name: 'app',
        components: {
            KLabel,
            KButtonPanel,
        //    KInput,
        },
    })
    export default class App extends Vue {
        //---- Data ----
        inputValue = 'Input iniziale';

        // Data to configure the component
        bold = false;
        backgroundColor = '#4e908f';
        color = '#ffffff';
        columns = 2;
        fillspace = false;
        flat = false;
        isMenu = false;
        horizontal = true;
        horizontalAlignment = 'flex-start';
        menuLabel = 'Menu';
        outline = false;
        selectionColor = '#ffc107';
        showSelection = false;
        rounded = false;
        textAlign = 'center';
        textMode = 'normal';

        //  data to configure the button panel test
        buttonsConf = {
            buttons: [
                {
                    id: 1,
                    //icon: 'mdi mdi-circle',
                    text: 'Click me',
                },
                {
                    id: 2,
                    icon: 'mdi mdi-home',
                    iconColor: 'red',
                    name: 'fool',
                    text: 'Click me 2',
                },
                {
                    id: 3,
                    icon: 'mdi mdi-circle',
                    text: 'Click me 3',
                },
                {
                    id: 4,
                    icon: 'mdi mdi-home',
                    iconColor: 'red',
                    name: 'fool',
                    text: 'Click me 4',
                },
                {
                    id: 5,
                    icon: 'mdi mdi-circle',
                    text: 'Click me 5',
                },
                {
                    id: 6,
                    icon: 'mdi mdi-home',
                    iconColor: 'red',
                    name: 'fool',
                    text: 'Click me 6',
                },
            ],
        };

        onInput(e:any) {
            this.inputValue = e.detail[0];
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .cmp-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 40px;

        > div {
            align-items: center;
            display: inline-flex;
            justify-content: flex-start;
            min-width: 200px;
            width: 25%;
        }

        label {
            font-size: 18px;
            margin: 12px;
        }

        [type="text"],
        [type="number"],
        select {
            border: 1px solid #000000;
            padding: 4px;
            max-width: 50%;
        }
    }
</style>
