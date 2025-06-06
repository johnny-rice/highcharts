/* *
 *
 *  Exporting module
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

import type CSSObject from '../../Core/Renderer/CSSObject';
import type { ExportingButtonOptions } from './ExportingOptions';

/* *
 *
 *  Declarations
 *
 * */

declare module '../../Core/Options' {
    interface Options {
        navigation?: NavigationOptions;
    }
}

export interface NavigationOptions {
    bindingsClassName?: string;
    buttonOptions?: ExportingButtonOptions;
    menuItemHoverStyle?: CSSObject;
    menuItemStyle?: CSSObject;
    menuStyle?: CSSObject;
}

/* *
 *
 *  Default Export
 *
 * */

export default NavigationOptions;
