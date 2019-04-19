import { Component, Prop } from '@stencil/core';

import { ChartConfig, ChartType } from './ketchup-chart-declarations';

declare const google: any;

@Component({
    tag: 'ketchup-chart',
    styleUrl: 'ketchup-chart.scss',
    shadow: true,
})
export class KetchupChart {
    @Prop() data = {
        columns: [
            {
                name: 'Col1',
                title: 'Person',
                size: '10',
            },
            {
                name: 'Col2',
                title: 'Value',
                size: '10',
            },
            {
                name: 'Col3',
                title: 'Value2',
                size: '10',
            },
        ],
        rows: [
            {
                cells: {
                    Col1: {
                        obj: {
                            t: 'CN',
                            p: 'COL',
                            k: 'CASFRA',
                        },
                        value: 'CASFRA',
                    },
                    Col2: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '10',
                        },
                        value: '10',
                    },
                    Col3: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '100.60',
                        },
                        value: '100.60',
                    },
                },
            },
            {
                cells: {
                    Col1: {
                        obj: {
                            t: 'CN',
                            p: 'COL',
                            k: 'DELGIO',
                        },
                        value: 'DELGIO',
                    },
                    Col2: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '6',
                        },
                        value: '6',
                    },
                    Col3: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '67.8',
                        },
                        value: '67.8',
                    },
                },
            },
            {
                cells: {
                    Col1: {
                        obj: {
                            t: 'CN',
                            p: 'COL',
                            k: 'PARFRA',
                        },
                        value: 'PARFRA',
                    },
                    Col2: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '5',
                        },
                        value: '5',
                    },
                    Col3: {
                        obj: {
                            t: 'NR',
                            p: '',
                            k: '120.06',
                        },
                        value: '120.06',
                    },
                },
            },
        ],
    };

    @Prop() config: ChartConfig = {
        type: ChartType.Hbar,
        axe: 'Col1',
        series: ['Col2', 'Col3'],
    };

    private chartContainer?: HTMLDivElement;

    private gChart: any;

    static convertColumns(data: any, config: ChartConfig) {
        if (!data || !config || !config.series) {
            return [];
        }

        const columns: Array<string> = [];

        // axe
        columns.push(config.axe);

        // series
        config.series.map((serie: string) => {
            // searching colum
            let c: any;

            for (let i = 0; i < data.columns.length; i++) {
                const column = data.columns[i];
                if (serie === column.name) {
                    c = column;
                    break;
                }
            }

            if (c) {
                columns.push(c.name);
            }
        });

        return columns;
    }

    static convertRows(data: any, series: Array<string>) {
        if (!data) {
            return [];
        }

        const rows = [];

        if (data.rows) {
            data.rows.forEach((r) => {
                const cells = r.cells;

                const currentRow = [];

                // adding series
                series.forEach((serie) => {
                    const cell = cells[serie];

                    if (cell && cell.obj) {
                        if ('NR' === cell.obj.t) {
                            currentRow.push(parseFloat(cell.obj.k));
                        } else {
                            currentRow.push(cell.obj.k);
                        }
                    }
                });

                rows.push(currentRow);
            });
        }

        return rows;
    }

    componentDidLoad() {
        if (!this.config.axe || !this.config.series) {
            // cannot create chart
            return;
        }

        // loading charts
        if (google) {
            try {
                this._loadGoogleChart();
            } catch (err) {
                console.log(err);
            }
        }
    }

    componentWillUpdate() {
        if (this.gChart) {
            this.gChart.clearChart();
        }
    }

    componentDidUpdate() {
        this._loadGoogleChart();
    }

    private _loadGoogleChart() {
        google.charts.setOnLoadCallback(this._createChart.bind(this));
    }

    private _createGoogleChart() {
        switch (this.config.type) {
            case ChartType.Area:
                return new google.visualization.AreaChart(this.chartContainer);

            case ChartType.Bubble:
                return new google.visualization.BubbleChart(
                    this.chartContainer
                );

            case ChartType.Cal:
                return new google.visualization.Calendar(this.chartContainer);

            case ChartType.Candlestick:
                return new google.visualization.CandlestickChart(
                    this.chartContainer
                );

            case ChartType.Combo:
                return new google.visualization.ComboChart(this.chartContainer);

            case ChartType.Geo:
                return new google.visualization.GeoChart(this.chartContainer);

            case ChartType.Hbar:
                return new google.visualization.BarChart(this.chartContainer);

            case ChartType.Line:
                return new google.visualization.LineChart(this.chartContainer);

            case ChartType.Pie:
                return new google.visualization.PieChart(this.chartContainer);

            case ChartType.Sankey:
                return new google.visualization.Sankey(this.chartContainer);

            case ChartType.Scatter:
                return new google.visualization.ScatterChart(
                    this.chartContainer
                );

            default:
                return new google.visualization.ColumnChart(
                    this.chartContainer
                );
        }
    }

    private _createGoogleChartOptions() {
        if (!this.config) {
            return {};
        }

        const opts: any = {};

        // 2d vs 3d
        opts.is3D = '3D' === this.config.asp;

        if (this.config.colors) {
            opts.colors = this.config.colors;
        }

        if (this.config.width) {
            try {
                opts.width = this.config.width;
            } catch (e) {
                console.error(e);
            }
        }

        if (this.config.height) {
            try {
                opts.height = this.config.height;
            } catch (e) {
                console.error(e);
            }
        }

        // wtf check for legend
        if (this.config.hasOwnProperty('leg') && !this.config.leg) {
            opts.legend = {
                position: 'none',
            };
        }

        if (
            this.config.stacked &&
            (ChartType.Hbar === this.config.type ||
                ChartType.Vbar === this.config.type)
        ) {
            opts.isStacked = true;
        }

        if (this.config.title) {
            opts.title = this.config.title;
        }

        return opts;
    }

    private _createChart() {
        const tableColumns = KetchupChart.convertColumns(
            this.data,
            this.config
        );

        const tableRows = KetchupChart.convertRows(this.data, tableColumns);

        const dataTable = new google.visualization.arrayToDataTable([
            tableColumns,
            ...tableRows,
        ]);

        this.gChart = this._createGoogleChart();

        const options = this._createGoogleChartOptions();

        this.gChart.draw(dataTable, options);
    }

    render() {
        return (
            <div
                id="chart"
                ref={(el) => (this.chartContainer = el as HTMLDivElement)}
            />
        );
    }
}
