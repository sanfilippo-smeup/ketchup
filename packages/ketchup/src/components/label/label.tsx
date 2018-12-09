import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'kup-label',
    styleUrl: 'label.scss',
    shadow: true
})
export class Label {
    @Prop() text: string = 'KetchUP label';

    render() {
        return (
            <label class="kup-label">{ this.text }</label>
        );
    }
}
