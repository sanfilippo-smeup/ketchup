const baseConfig = {
    type: 'Hbar',
    axe: 'Col1',
    series: ['Col2', 'Col3'],
};

// HBAR
const hbar = document.getElementById('hbar');
hbar.config = baseConfig;

// VBAR
const vbar = document.getElementById('vbar');
vbar.config = {
    ...baseConfig,
    type: 'Vbar',
};
document
    .getElementById('vbar-stacked')
    .addEventListener('change', ({ target }) => {
        vbar.config = {
            ...vbar.config,
            stacked: target.checked,
        };
    });

// PIE
const pie = document.getElementById('pie');
pie.config = {
    ...baseConfig,
    series: ['Col2'],
    type: 'Pie',
};
document.getElementById('pie-aspect').addEventListener('change', (e) => {
    pie.config = {
        ...pie.config,
        asp: e.target.checked ? '3D' : '',
    };
});

// custom colors
document.getElementById('colors').addEventListener('change', ({ target }) => {
    const charts = document.querySelectorAll('ketchup-chart');

    charts.forEach((chart) => {
        const config = { ...chart.config };

        if (target.checked) {
            config.colors = ['#ccc', '#333', '#666'];
        } else {
            delete config['colors'];
        }

        chart.config = config;
    });
});

// custom size
document.getElementById('size').addEventListener('change', ({ target }) => {
    const charts = document.querySelectorAll('ketchup-chart');

    charts.forEach((chart) => {
        const config = { ...chart.config };

        if (target.checked) {
            config.width = config.height = 400;
        } else {
            delete config['width'];
            delete config['height'];
        }

        chart.config = config;
    });
});

// enable / disable legend
document.getElementById('legend').addEventListener('change', ({ target }) => {
    const charts = document.querySelectorAll('ketchup-chart');

    charts.forEach((chart) => {
        chart.config = {
            ...chart.config,
            leg: target.checked,
        };
    });
});

// title
document.getElementById('title').addEventListener('change', ({ target }) => {
    const charts = document.querySelectorAll('ketchup-chart');

    charts.forEach((chart) => {
        chart.config = {
            ...chart.config,
            title: target.value,
        };
    });
});
