<template>
    <label
        class="v-label"
        :style="{color: color}">
        {{ message }}
    </label>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        name: 'k-label',
    })
    export default class KLabel extends Vue {
        @Prop({default: 'Messaggio iniziale'}) private message!: string;
        @Prop({default: 'magenta'}) private color!: string;
    }
</script>

<style lang="scss">
    .k-label {
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
    }
</style>