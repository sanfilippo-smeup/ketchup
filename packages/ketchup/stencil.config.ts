import {Config} from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    namespace: 'ketchup',
    outputTargets: [
        {
            type: 'dist',
        },
        /*{
            type: 'www',
            // uncomment the following line to disable service workers in production
            // serviceWorker: null
        }*/
    ],
    plugins: [
        sass()
    ],
};