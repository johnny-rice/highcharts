import DataTable from '/base/code/es-modules/Data/DataTable.js';
import DataTableHelper from '/base/code/dashboards/es-modules/Dashboards/SerializeHelper/DataTableHelper.js';

QUnit.test('JSON serializer for DataTable', function (assert) {
    const customID = 'myCustomID';
    const table = new DataTable({
        columns: {
            values: [
                null,
                void 0,
                NaN,
                1,
                '',
                'a',
                new DataTable({
                    columns: {
                        works: [true]
                    }
                })
            ]
        },
        id: customID
    });
    const columns = table.getColumns();
    const json = DataTableHelper.toJSON(table);
    const table2 = DataTableHelper.fromJSON(json);

    // columns

    assert.deepEqual(
        Object.keys(json.columns),
        Object.keys(columns),
        'JSON should contain all columns.'
    );

    assert.deepEqual(
        json.columns['values'].length,
        columns['values'].length,
        'JSON should contain all rows.'
    );

    assert.deepEqual(
        table2.getColumns(),
        columns,
        'Deserialized table should contain all columns.'
    );

    // custom id

    assert.strictEqual(
        json.id,
        customID,
        'JSON should contain custom id.'
    );

    assert.strictEqual(
        table2.id,
        customID,
        'Deserialized table should contain custom id.'
    );

    // sub table

    assert.strictEqual(
        table2.getCell('values', 6),
        columns['values'][6],
        'Sub table should be deserialized.'
    );

    assert.strictEqual(
        table2.getCell('values', 6).getCell('works', 0),
        true,
        'Sub table should contain one boolean cell.'
    );
});
