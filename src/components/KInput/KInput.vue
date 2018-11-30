<template>
    <div class="k-input">
        <input
                type="text"
                :name="kname"
                :value="value"
                @input="emitInput">
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        name: 'k-label',
    })
    export default class KInput extends Vue {
        @Prop({default: 'Messaggio iniziale'}) private value!: string;
        @Prop({default: 'text'}) private kname!: string;


        emitInput(event: any) {
            this.$emit('input', event.target.value)
        }
    }
</script>

<style lang="scss">
    .k-input {
        display: inline-block;
        font-size: 18px;
        font-weight: 500;
    }
</style>