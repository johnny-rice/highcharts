/* *
 *
 *  (c) 2016-2025 Highsoft AS
 *
 *  Author: Lars A. V. Cabrera
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type {
    AlignValue,
    VerticalAlignValue
} from '../Core/Renderer/AlignObject';
import type ColorString from '../Core/Color/ColorString';
import type CSSObject from '../Core/Renderer/CSSObject';
import type DashStyleValue from '../Core/Renderer/DashStyleValue';
import type { PlotBandLabelOptions } from '../Core/Axis/PlotLineOrBand/PlotBandOptions';
import type {
    PlotLineLabelOptions,
    PlotLineOptions
} from '../Core/Axis/PlotLineOrBand/PlotLineOptions';
import type Templating from '../Core/Templating';
import type Time from '../Core/Time';

import Axis from '../Core/Axis/Axis.js';
import H from '../Core/Globals.js';
const { composed } = H;
import { Palette } from '../Core/Color/Palettes.js';
import PlotLineOrBand from '../Core/Axis/PlotLineOrBand/PlotLineOrBand.js';
import U from '../Core/Utilities.js';
const {
    addEvent,
    merge,
    pushUnique,
    wrap
} = U;

/* *
 *
 *  Declarations
 *
 * */

declare module '../Core/Axis/AxisOptions' {
    interface AxisOptions {
        currentDateIndicator?: (boolean|CurrentDateIndicatorOptions);
    }
}

interface CurrentDateIndicatorLabelOptions {
    align?: AlignValue;
    format?: Time.DateTimeFormat;
    formatter?: Templating.FormatterCallback<PlotLineOrBand>;
    rotation?: number;
    style?: CSSObject;
    text?: string;
    textAlign?: AlignValue;
    useHTML?: boolean;
    verticalAlign?: VerticalAlignValue;
    x?: number;
    y?: number;
}
interface CurrentDateIndicatorOptions {
    acrossPanes?: boolean;
    className?: string;
    color?: ColorString;
    dashStyle?: DashStyleValue;
    events?: any;
    id?: string;
    label?: CurrentDateIndicatorLabelOptions;
    width?: number;
    zIndex?: number;
}

/* *
 *
 *  Constants
 *
 * */

/**
 * Show an indicator on the axis for the current date and time. Can be a
 * boolean or a configuration object similar to
 * [xAxis.plotLines](#xAxis.plotLines).
 *
 * @sample gantt/current-date-indicator/demo
 *         Current date indicator enabled
 * @sample gantt/current-date-indicator/object-config
 *         Current date indicator with custom options
 *
 * @declare   Highcharts.CurrentDateIndicatorOptions
 * @type      {boolean|CurrentDateIndicatorOptions}
 * @default   true
 * @extends   xAxis.plotLines
 * @excluding value
 * @product   gantt
 * @apioption xAxis.currentDateIndicator
 */
const defaultOptions: CurrentDateIndicatorOptions = {
    color: Palette.highlightColor20,
    width: 2,
    /**
     * @declare Highcharts.AxisCurrentDateIndicatorLabelOptions
     */
    label: {
        /**
         * Format of the label. This options is passed as the first argument to
         * [dateFormat](/class-reference/Highcharts.Time#dateFormat) function.
         *
         * @type      {string|Intl.DateTimeFormatOptions}
         * @product   gantt
         * @apioption xAxis.currentDateIndicator.label.format
         */
        format: '%[abdYHM]',
        formatter: function (
            this: PlotLineOrBand,
            value?: number,
            format?: string
        ): string {
            return this.axis.chart.time.dateFormat(format || '', value, true);
        },
        rotation: 0,
        /**
         * @type {Highcharts.CSSObject}
         */
        style: {
            /** @internal */
            fontSize: '0.7em'
        }
    }
};

/* *
 *
 *  Functions
 *
 * */

/**
 * @private
 */
function compose(
    AxisClass: typeof Axis,
    PlotLineOrBandClass: typeof PlotLineOrBand
): void {

    if (pushUnique(composed, 'CurrentDateIndication')) {
        addEvent(AxisClass, 'afterSetOptions', onAxisAfterSetOptions);

        addEvent(PlotLineOrBandClass, 'render', onPlotLineOrBandRender);

        wrap(
            PlotLineOrBandClass.prototype,
            'getLabelText',
            wrapPlotLineOrBandGetLabelText
        );
    }

}

/**
 * @private
 */
function onAxisAfterSetOptions(this: Axis): void {
    const options = this.options,
        cdiOptions = options.currentDateIndicator;


    if (cdiOptions) {
        const plotLineOptions: PlotLineOptions =
            typeof cdiOptions === 'object' ?
                merge(defaultOptions, cdiOptions) :
                merge(defaultOptions);

        plotLineOptions.value = Date.now();
        plotLineOptions.className = 'highcharts-current-date-indicator';

        if (!options.plotLines) {
            options.plotLines = [];
        }

        options.plotLines.push(plotLineOptions);
    }
}

/**
 * @private
 */
function onPlotLineOrBandRender(this: PlotLineOrBand): void {
    // If the label already exists, update its text
    if (this.label) {
        this.label.attr({
            text: this.getLabelText((this.options as any).label)
        });
    }
}

/**
 * @private
 */
function wrapPlotLineOrBandGetLabelText(
    this: PlotLineOrBand,
    defaultMethod: Function,
    defaultLabelOptions: (PlotBandLabelOptions|PlotLineLabelOptions)
): string {
    const options = this.options;

    if (
        options &&
        options.className &&
        options.className.indexOf('highcharts-current-date-indicator') !== -1 &&
        options.label &&
        typeof options.label.formatter === 'function'
    ) {

        (options as any).value = Date.now();
        return (options as any).label.formatter
            .call(this, (options as any).value, (options as any).label.format);
    }
    return defaultMethod.call(this, defaultLabelOptions);
}

/* *
 *
 *  Default Export
 *
 * */

const CurrentDateIndication = {
    compose
};

export default CurrentDateIndication;
