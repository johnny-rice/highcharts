Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

// Create the chart
Highcharts.stockChart('container', {
    title: {
        text: 'Overscroll set in percentage'
    },

    xAxis: {
        overscroll: '50%'
    },

    navigator: {
        xAxis: {
            overscroll: '50%'
        }
    },

    series: [{
        name: 'Random data',
        pointStart: Date.UTC(2017, 0, 1),
        pointInterval: 1000, // 1s
        data: (function () {
            // generate an array of random data
            const data = [];

            for (let i = 0; i <= 1000; i += 1) {
                data.push(
                    Math.round(Math.random() * 100)
                );
            }
            return data;
        }())
    }]
});