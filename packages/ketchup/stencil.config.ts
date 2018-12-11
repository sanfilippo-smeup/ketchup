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
        {
            type: 'www',
            // uncomment the following line to disable service workers in production
            // serviceWorker: null
        }
    ],
    plugins: [
        sass()
    ],
    testing: {
        reporters: [
            "default",
        
            [
              "jest-junit",
              {
                output: "target/test/unit/junit/junit.xml",
                classNameTemplate: "K unit - {classname}",
                titleTemplate: "{classname} - {title}"
              }
            ],
        
            [
              "./node_modules/jest-html-reporter",
              {
                pageTitle: "Jest Unit Test Report",
                outputPath: "target/test/unit/html/index.html"
              }
            ]
          ],
          coverageReporters: ["text", "cobertura", "html"],
          coverageDirectory: "target/test/unit/coverage",
          // todo: rise them!
          coverageThreshold: {
            global: {
              branches: 0,
              functions: 1,
              lines: 1,
              statements: 1
            }
          },
          collectCoverage: true,
          collectCoverageFrom: ["src/**/*.tsx", "src/**/*.ts"]
    }
};
