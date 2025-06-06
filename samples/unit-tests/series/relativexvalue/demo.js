QUnit.test(
    'Relative X value',
    function (assert) {
        const pointStart = Date.UTC(2020, 0, 1);
        const data = [
            [0, 29.9],
            [1, 29.9],
            [2, 71.5],
            [5, 106.4],
            [6, 129.2],
            [7, 144.0],
            [8, 176.0],
            [10, 135.6]
        ];
        const chart = Highcharts.chart('container', {

            xAxis: {
                type: 'datetime'
            },

            plotOptions: {
                series: {
                    pointStart,
                    relativeXValue: true,
                    pointIntervalUnit: 'day'
                }
            },

            series: [{
                data,
                type: 'column'
            }]
        });
        assert.strictEqual(
            chart.series[0].points[0].x,
            pointStart,
            'X = 0, pointStart should apply'
        );
        assert.strictEqual(
            chart.series[0].points[7].x,
            pointStart + 10 * 24 * 36e5,
            'X = 10, X value should be properly scaled by pointIntervalUnit'
        );

        chart.series[0].update({
            pointInterval: 2
        });
        assert.strictEqual(
            chart.series[0].points[7].x,
            pointStart + 2 * 10 * 24 * 36e5,
            'X = 10 and pointInterval given, X value should be properly ' +
            'scaled by pointIntervalUnit and pointInterval'
        );

        chart.series[0].points[5].graphic.marked = true;
        data[0][1] = 100;
        chart.series[0].setData(data);
        assert.ok(
            chart.series[0].points[5].graphic.marked,
            'Points should be matched and updated'
        );
    }
);

QUnit.test(
    'Relative X value with turboThreshold',
    assert => {
        const chart = Highcharts.chart('container', {
            series: [{
                data: [
                    [0, 1],
                    [1, 3],
                    [2, 2],
                    [3, 4]
                ],
                type: 'column',
                relativeXValue: true,
                turboThreshold: 1,
                pointStart: '2025-05-23',
                pointIntervalUnit: 'day'
            }],
            xAxis: {
                type: 'datetime'
            }
        });

        assert.strictEqual(
            chart.xAxis[0].tickPositions[2],
            Date.UTC(2025, 4, 25),
            'X = 2, pointStart and interval unit should apply'
        );

        assert.strictEqual(
            chart.series[0].points[2].x,
            Date.UTC(2025, 4, 25),
            'X = 2, pointStart and interval unit should apply'
        );
    }
);