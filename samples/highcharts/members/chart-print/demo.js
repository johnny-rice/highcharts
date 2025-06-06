const chart = Highcharts.chart('container', {
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 0, 300],
            stops: [
                [0, '#FFFFFF'],
                [1, '#E0E0E0']
            ]
        }
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'
        ]
    },
    series: [{
        data: [
            29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
            95.6, 54.4
        ]
    }],
    navigation: {
        buttonOptions: {
            enabled: false
        }
    }
});

// the button handler
document.getElementById('button').addEventListener('click', () => {
    chart.exporting.print();
});
