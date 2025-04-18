// Prepare demo data
const data = [{
    'hc-key': 'ca-5682',
    color: 'red'
},
{
    'hc-key': 'ca-bc',
    value: 1
},
{
    'hc-key': 'ca-nu',
    color: 'green'
},
{
    'hc-key': 'ca-nt',
    color: 'green'
},
{
    'hc-key': 'ca-ab',
    value: 4
},
{
    'hc-key': 'ca-nl',
    value: 5
},
{
    'hc-key': 'ca-sk',
    value: 6
},
{
    'hc-key': 'ca-mb',
    value: 7
},
{
    'hc-key': 'ca-qc',
    value: 8
},
{
    'hc-key': 'ca-on',
    value: 9
},
{
    'hc-key': 'ca-nb',
    value: 10
},
{
    'hc-key': 'ca-ns',
    value: 11
},
{
    'hc-key': 'ca-pe',
    value: 12
},
{
    'hc-key': 'ca-yt'
}
];

Highcharts.mapChart('container', {
    title: {
        text: 'B3 : Map'
    },

    legend: {
        enabled: false
    },


    series: [{
        data: data,
        mapData: Highcharts.maps['countries/ca/ca-all'],
        joinBy: 'hc-key',
        name: 'Province',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        },
        tooltip: {
            headerFormat: 'Name of the province:<br/>',
            pointFormat: '<b>{point.name} </b>'
        }
    }, {
        type: 'pie',
        name: 'Canadian demographics',
        center: ['75%', '18%'],
        size: 100,
        innerSize: '50%',
        tooltip: {
            valueSuffix: '%',
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.name}: {point.y}'
        },
        data: [{
            name: 'The rest of the population 95%',
            y: 95
        },
        {
            name: 'First nations population 5%',
            y: 5,
            color: 'green'
        }
        ],
        dataLabels: {
            enabled: true
        }
    }]
});
