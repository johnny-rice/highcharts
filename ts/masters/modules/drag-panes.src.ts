/**
 * @license Highstock JS v@product.version@ (@product.date@)
 * @module highcharts/modules/drag-panes
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Drag-panes module
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Kacper Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import DragPanes from '../../Extensions/DragPanes/DragPanes.js';
const G: AnyRecord = Highcharts;
DragPanes.compose(G.Axis);
