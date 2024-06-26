// Create some smooth demo data
const sine = [];
for (let x = 0; x <= 60; x++) {
    sine.push([
        x,
        Math.sin(x * Highcharts.deg2rad)
    ]);
}

Highcharts.chart('container', {

    chart: {
        zooming: {
            type: 'x'
        }
    },

    title: {
        text: 'Highcharts marker <em>enabledThreshold</em>'
    },

    subtitle: {
        text: 'Preventing too close markers for continuous data'
    },

    xAxis: {
        tickInterval: 30,
        labels: {
            format: '{value} deg'
        }
    },

    plotOptions: {
        series: {
            marker: {
                enabledThreshold: 5
            }
        }
    },

    tooltip: {
        headerFormat: '<b>{point.x} degrees</b><br>'
    },

    series: [{
        data: sine,
        name: 'Sine'
    }]
});