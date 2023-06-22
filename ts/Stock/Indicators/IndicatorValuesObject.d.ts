/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Imports
 *
 * */
import type { DataTableLight } from '../../Core/Series/Series';
import type LineSeries from '../../Series/Line/LineSeries';

/* *
 *
 *  Declarations
 *
 * */

export interface IndicatorValuesObject<TLinkedSeries extends LineSeries> {
    values: Array<Array<(
        ExtractArrayType<TLinkedSeries['xData']>|
        ExtractArrayType<TLinkedSeries['yData']>
    )>>;
    xData: NonNullable<TLinkedSeries['xData']>;
    yData: NonNullable<TLinkedSeries['yData']>;
    table: DataTableLight;
}

export default IndicatorValuesObject;
