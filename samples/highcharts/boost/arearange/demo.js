function getData(n) {
    const arr = [];
    let a,
        b,
        c,
        low,
        spike;
    for (let i = 0; i < n; i = i + 1) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        low = 2 * Math.sin(i / 100) + a + b + c + spike + Math.random();
        arr.push([
            i,
            low,
            low + 5 + 5 * Math.random()
        ]);
    }
    return arr;
}
const n = 500000,
    data = getData(n);


console.time('arearange');
Highcharts.chart('container', {

    chart: {
        type: 'arearange',
        zooming: {
            type: 'x'
        },
        panning: true,
        panKey: 'shift'
    },

    boost: {
        useGPUTranslations: true
    },

    title: {
        text: 'Highcharts drawing ' + n + ' points'
    },

    xAxis: {
        crosshair: true
    },

    subtitle: {
        text: 'Using the Boost module'
    },

    tooltip: {
        valueDecimals: 2
    },

    series: [{
        data: data
    }]

});
console.timeEnd('arearange');
