import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'kup-matrix',
    styleUrl: 'kup-matrix.scss',
    shadow: true
})
export class KupMatrix {
    @Prop() text: string = 'KetchUP Matrix';

    render() {
        return (
            <table class="kup-matrix">
                <thead>
                    <tr>
                        <td>Caption 1</td>
                        <td>Caption 2</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ this.text }</td>
                        <td>{ this.text }</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>fine 1</td>
                        <td>fine 2</td>
                    </tr>
                </tfoot>
            </table>
        );
    }
}