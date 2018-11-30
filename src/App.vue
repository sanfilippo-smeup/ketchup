<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
        <k-label/>
        <k-label message="aspetta" color="red"/>
        <k-input v-model="inputValue"/>
        <p>{{inputValue}}</p>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HelloWorld from "./components/HelloWorld.vue";
    import KLabel from "./components/KLabel/KLabel.vue";
    import KInput from "./components/KInput";

    @Component({
        name: 'app',
        components: {
            HelloWorld,
            KLabel,
            KInput,
        },
    })
    export default class App extends Vue {
        inputValue = 'Input iniziale';
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
</style>
