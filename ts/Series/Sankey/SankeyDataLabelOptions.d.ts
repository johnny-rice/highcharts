/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2025 Torstein Honsi
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

import type DataLabelOptions from '../../Core/Series/DataLabelOptions';
import type Point from '../../Core/Series/Point';
import type SankeyPoint from './SankeyPoint';
import type { DataLabelTextPathOptions } from '../../Core/Series/DataLabelOptions';

/* *
 *
 *  Declarations
 *
 * */

export interface SankeyDataLabelFormatterCallback {
    (
        this: (SankeyPoint|Point)
    ): (string|undefined);
}

export interface SankeyDataLabelFormatterContext {
    point: SankeyPoint;
}

export interface SankeyDataLabelOptions extends DataLabelOptions {
    nodeFormat?: string;
    nodeFormatter?: SankeyDataLabelFormatterCallback;
    linkTextPath?: DataLabelTextPathOptions;
}

/* *
 *
 *  Default Export
 *
 * */

export default SankeyDataLabelOptions;
