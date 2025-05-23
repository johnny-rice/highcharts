/* *
 *
 *  (c) 2010-2025 Torstein Honsi
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

import type Chart from '../Core/Chart/Chart';
import type {
    GeoJSON,
    GeoJSONFeature,
    MapLonLatObject,
    TopoJSON
} from './GeoJSON';
import type MapPointOptions from '../Series/Map/MapPointOptions';
import type MapPointPointOptions from '../Series/MapPoint/MapPointPointOptions';
import type { ProjectedXY } from './MapViewOptions';
import type Series from '../Core/Series/Series';

import H from '../Core/Globals.js';
const { win } = H;
import T from '../Core/Templating.js';
const { format } = T;
import U from '../Core/Utilities.js';
const {
    error,
    extend,
    merge,
    wrap
} = U;

/* *
 *
 *  Declarations
 *
 * */

declare module '../Core/Chart/ChartLike'{
    interface ChartLike {
        /** @requires modules/map */
        mapCredits?: string;
        /** @requires modules/map */
        mapCreditsFull?: string;
        /** @requires modules/map */
        mapTransforms?: any;
        /**
         * @deprecated
         * @requires modules/map
         */
        fromLatLonToPoint(
            latLon: MapLonLatObject
        ): (ProjectedXY|undefined);
        /**
         * @deprecated
         * @requires modules/map
         */
        fromPointToLatLon(
            point: ProjectedXY
        ): (MapLonLatObject|undefined);
        /** @requires modules/map */
        transformFromLatLon(
            latLon: MapLonLatObject,
            transform: any
        ): (ProjectedXY|undefined);
        /** @requires modules/map */
        transformToLatLon(
            point: ProjectedXY,
            transform: any
        ): (MapLonLatObject|undefined);
    }
}

declare module '../Core/Chart/ChartOptions'{
    interface ChartOptions {
        /** @requires modules/map */
        proj4?: any;
    }
}

/* *
 *
 *  Composition
 *
 * */

namespace GeoJSONComposition {

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Deprecated. Use `MapView.lonLatToProjectedUnits` instead.
     *
     * @deprecated
     *
     * @requires modules/map
     *
     * @function Highcharts.Chart#fromLatLonToPoint
     *
     * @param {Highcharts.MapLonLatObject} lonLat
     *        Coordinates.
     *
     * @return {Highcharts.ProjectedXY}
     * X and Y coordinates in terms of projected values
     */
    function chartFromLatLonToPoint(
        this: Chart,
        lonLat: MapLonLatObject
    ): (ProjectedXY|undefined) {
        return this.mapView && this.mapView.lonLatToProjectedUnits(lonLat);
    }

    /**
     * Deprecated. Use `MapView.projectedUnitsToLonLat` instead.
     *
     * @deprecated
     *
     * @requires modules/map
     *
     * @function Highcharts.Chart#fromPointToLatLon
     *
     * @param {Highcharts.Point|Highcharts.ProjectedXY} point
     *        A `Point` instance or anything containing `x` and `y` properties
     *        with numeric values.
     *
     * @return {Highcharts.MapLonLatObject|undefined}
     * An object with `lat` and `lon` properties.
     */
    function chartFromPointToLatLon(
        this: Chart,
        point: ProjectedXY
    ): (MapLonLatObject|undefined) {
        return this.mapView && this.mapView.projectedUnitsToLonLat(point);
    }

    /**
     * Highcharts Maps only. Get point from latitude and longitude using
     * specified transform definition.
     *
     * @requires modules/map
     *
     * @sample maps/series/latlon-transform/
     *         Use specific transformation for lat/lon
     *
     * @function Highcharts.Chart#transformFromLatLon
     *
     * @param {Highcharts.MapLonLatObject} latLon
     *        A latitude/longitude object.
     *
     * @param {*} transform
     *        The transform definition to use as explained in the
     *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
     *
     * @return {ProjectedXY}
     * An object with `x` and `y` properties.
     */
    function chartTransformFromLatLon(
        this: Chart,
        latLon: MapLonLatObject,
        transform: any
    ): ProjectedXY|undefined {

        /**
         * Allows to manually load the proj4 library from Highcharts options
         * instead of the `window`.
         * In case of loading the library from a `script` tag,
         * this option is not needed, it will be loaded from there by default.
         *
         * @type      {Function}
         * @product   highmaps
         * @apioption chart.proj4
         */
        const proj4 = this.options.chart.proj4 || (win as AnyRecord).proj4;

        if (!proj4) {
            error(21, false, this);
            return;
        }

        const {
            jsonmarginX = 0,
            jsonmarginY = 0,
            jsonres = 1,
            scale = 1,
            xoffset = 0,
            xpan = 0,
            yoffset = 0,
            ypan = 0
        } = transform;

        const projected = proj4(transform.crs, [latLon.lon, latLon.lat]),
            cosAngle = transform.cosAngle ||
                (transform.rotation && Math.cos(transform.rotation)),
            sinAngle = transform.sinAngle ||
                (transform.rotation && Math.sin(transform.rotation)),
            rotated = transform.rotation ? [
                projected[0] * cosAngle + projected[1] * sinAngle,
                -projected[0] * sinAngle + projected[1] * cosAngle
            ] : projected;

        return {
            x: ((rotated[0] - xoffset) * scale + xpan) * jsonres + jsonmarginX,
            y: -(
                ((yoffset - rotated[1]) * scale + ypan) * jsonres - jsonmarginY
            )
        };
    }

    /**
     * Highcharts Maps only. Get latLon from point using specified transform
     * definition. The method returns an object with the numeric properties
     * `lat` and `lon`.
     *
     * @requires modules/map
     *
     * @sample maps/series/latlon-transform/
     *         Use specific transformation for lat/lon
     *
     * @function Highcharts.Chart#transformToLatLon
     *
     * @param {Highcharts.Point|Highcharts.ProjectedXY} point
     *        A `Point` instance, or any object containing the properties `x`
     *        and `y` with numeric values.
     *
     * @param {*} transform
     *        The transform definition to use as explained in the
     *        {@link https://www.highcharts.com/docs/maps/latlon|documentation}.
     *
     * @return {Highcharts.MapLonLatObject|undefined}
     * An object with `lat` and `lon` properties.
     */
    function chartTransformToLatLon(
        this: Chart,
        point: ProjectedXY,
        transform: any
    ): (MapLonLatObject|undefined) {

        const proj4 = this.options.chart.proj4 || (win as AnyRecord).proj4;
        if (!proj4) {
            error(21, false, this);
            return;
        }

        if (point.y === null) {
            return;
        }

        const {
            jsonmarginX = 0,
            jsonmarginY = 0,
            jsonres = 1,
            scale = 1,
            xoffset = 0,
            xpan = 0,
            yoffset = 0,
            ypan = 0
        } = transform;

        const normalized = {
                x: ((point.x - jsonmarginX) / jsonres - xpan) / scale + xoffset,
                y: ((point.y - jsonmarginY) / jsonres + ypan) / scale + yoffset
            },
            cosAngle = transform.cosAngle ||
                (transform.rotation && Math.cos(transform.rotation)),
            sinAngle = transform.sinAngle ||
                (transform.rotation && Math.sin(transform.rotation)),
            // Note: Inverted sinAngle to reverse rotation direction
            projected = proj4(transform.crs, 'WGS84', transform.rotation ? {
                x: normalized.x * cosAngle + normalized.y * -sinAngle,
                y: normalized.x * sinAngle + normalized.y * cosAngle
            } : normalized);

        return { lat: projected.y, lon: projected.x };
    }


    /** @private */
    export function compose(
        ChartClass: typeof Chart
    ): void {
        const chartProto = ChartClass.prototype;

        if (!chartProto.transformFromLatLon) {

            chartProto.fromLatLonToPoint = chartFromLatLonToPoint;
            chartProto.fromPointToLatLon = chartFromPointToLatLon;
            chartProto.transformFromLatLon = chartTransformFromLatLon;
            chartProto.transformToLatLon = chartTransformToLatLon;

            wrap(chartProto, 'addCredits', wrapChartAddCredit);
        }

    }


    /**
     * Highcharts Maps only. Restructure a GeoJSON or TopoJSON object in
     * preparation to be read directly by the
     * {@link https://api.highcharts.com/highmaps/plotOptions.series.mapData|series.mapData}
     * option. The object will be broken down to fit a specific Highcharts type,
     * either `map`, `mapline` or `mappoint`. Meta data in GeoJSON's properties
     * object will be copied directly over to {@link Point.properties} in
     * Highcharts Maps.
     *
     * @requires modules/map
     *
     * @sample maps/demo/geojson/ Simple areas
     * @sample maps/demo/mapline-mappoint/ Multiple types
     * @sample maps/series/mapdata-multiple/ Multiple map sources
     *
     * @function Highcharts.geojson
     *
     * @param {Highcharts.GeoJSON|Highcharts.TopoJSON} json
     *        The GeoJSON or TopoJSON structure to parse, represented as a
     *        JavaScript object.
     *
     * @param {string} [hType=map]
     *        The Highcharts Maps series type to prepare for. Setting "map" will
     *        return GeoJSON polygons and multipolygons. Setting "mapline" will
     *        return GeoJSON linestrings and multilinestrings. Setting
     *        "mappoint" will return GeoJSON points and multipoints.
     *
     *
     * @return {Array<*>} An object ready for the `mapData` option.
     */
    export function geojson(
        json: GeoJSON|TopoJSON,
        hType: string = 'map',
        series?: Series
    ): (MapPointOptions|MapPointPointOptions)[] {
        const mapData: (MapPointOptions|MapPointPointOptions)[] = [];

        const geojson = json.type === 'Topology' ? topo2geo(json) : json,
            features = geojson.features;

        for (let i = 0, iEnd = features.length; i < iEnd; ++i) {
            const feature = features[i],
                geometry = feature.geometry || {},
                type = geometry.type,
                coordinates = geometry.coordinates as any,
                properties = feature.properties;

            let pointOptions: (MapPointOptions|MapPointPointOptions|undefined);

            if (
                (hType === 'map' || hType === 'mapbubble') &&
                (type === 'Polygon' || type === 'MultiPolygon')
            ) {
                if (coordinates.length) {
                    pointOptions = { geometry: { coordinates, type } };
                }

            } else if (
                hType === 'mapline' &&
                (
                    type === 'LineString' ||
                    type === 'MultiLineString'
                )
            ) {
                if (coordinates.length) {
                    pointOptions = { geometry: { coordinates, type } };
                }

            } else if (hType === 'mappoint' && type === 'Point') {
                if (coordinates.length) {
                    pointOptions = { geometry: { coordinates, type } };
                }
            }

            if (pointOptions) {
                const name = properties && (properties.name || properties.NAME),
                    lon = properties && properties.lon,
                    lat = properties && properties.lat;

                mapData.push(extend(pointOptions, {
                    lat: typeof lat === 'number' ? lat : void 0,
                    lon: typeof lon === 'number' ? lon : void 0,
                    name: typeof name === 'string' ? name : void 0,

                    /**
                     * In Highcharts Maps, when data is loaded from GeoJSON, the
                     * GeoJSON item's properies are copied over here.
                     *
                     * @requires modules/map
                     * @name Highcharts.Point#properties
                     * @type {*}
                     */
                    properties
                }));
            }
        }

        // Create a credits text that includes map source, to be picked up in
        // Chart.addCredits
        if (series && geojson.copyrightShort) {
            series.chart.mapCredits = format(
                series.chart.options.credits?.mapText,
                { geojson: geojson }
            );
            series.chart.mapCreditsFull = format(
                series.chart.options.credits?.mapTextFull,
                { geojson: geojson }
            );
        }

        return mapData;
    }


    /**
     * Convert a TopoJSON topology to GeoJSON. By default the first object is
     * handled.
     * Based on https://github.com/topojson/topojson-specification
     */
    export function topo2geo(
        topology: TopoJSON,
        objectName?: string
    ): GeoJSON {

        // Decode first object/feature as default
        if (!objectName) {
            objectName = Object.keys(topology.objects)[0];
        }
        const obj = topology.objects[objectName];

        // Already decoded with the same title => return cache
        if (
            obj['hc-decoded-geojson'] &&
            obj['hc-decoded-geojson'].title === topology.title
        ) {
            return obj['hc-decoded-geojson'];
        }

        // Do the initial transform
        let arcsArray = topology.arcs;
        if (topology.transform) {
            const arcs = topology.arcs,
                { scale, translate } = topology.transform;

            let positionArray: Array<Array<number>>,
                x: number,
                y: number;

            arcsArray = [];

            for (let i = 0, iEnd = arcs.length; i < iEnd; ++i) {
                const positions = arcs[i];

                arcsArray.push(positionArray = []);
                x = 0;
                y = 0;

                for (let j = 0, jEnd = positions.length; j < jEnd; ++j) {
                    positionArray.push([
                        (x += positions[j][0]) * scale[0] + translate[0],
                        (y += positions[j][1]) * scale[1] + translate[1]
                    ]);
                }
            }
        }

        // Recurse down any depth of multi-dimensional arrays of arcs and insert
        // the coordinates
        const arcsToCoordinates = (
            arcs: any
        ): Array<number> => {
            if (typeof arcs[0] === 'number') {
                return arcs.reduce((
                    coordinates: Array<number>,
                    arcNo: number,
                    i: number
                ): Array<number> => {
                    let arc = arcNo < 0 ? arcsArray[~arcNo] : arcsArray[arcNo];

                    // The first point of an arc is always identical to the last
                    // point of the previes arc, so slice it off to save further
                    // processing.
                    if (arcNo < 0) {
                        arc = arc.slice(
                            0,
                            i === 0 ? arc.length : arc.length - 1
                        );
                        arc.reverse();
                    } else if (i) {
                        arc = arc.slice(1);
                    }
                    return coordinates.concat(arc as any);
                }, []);
            }
            return arcs.map(arcsToCoordinates);
        };

        const geometries = obj.geometries,
            features: Array<GeoJSONFeature> = [];

        for (let i = 0, iEnd = geometries.length; i < iEnd; ++i) {
            features.push({
                type: 'Feature',
                properties: geometries[i].properties,
                geometry: {
                    type: geometries[i].type,
                    coordinates: geometries[i].coordinates ||
                        arcsToCoordinates(geometries[i].arcs)
                } as any
            });
        }

        const geojson: GeoJSON = {
            type: 'FeatureCollection',
            copyright: topology.copyright,
            copyrightShort: topology.copyrightShort,
            copyrightUrl: topology.copyrightUrl,
            features,
            'hc-recommended-mapview': obj['hc-recommended-mapview'],
            bbox: topology.bbox,
            title: topology.title
        };

        obj['hc-decoded-geojson'] = geojson;

        return geojson;
    }


    /**
     * Override addCredits to include map source by default.
     * @private
     */
    function wrapChartAddCredit(
        this: Chart,
        proceed: Function,
        credits: Chart.CreditsOptions
    ): void {

        credits = merge(true, this.options.credits, credits);
        proceed.call(this, credits);

        // Add full map credits to hover
        if (this.credits && this.mapCreditsFull) {
            this.credits.attr({
                title: this.mapCreditsFull
            });
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default GeoJSONComposition;

/* *
 *
 *  API Declarations
 *
 * */

/**
 * Represents the loose structure of a geographic JSON file.
 *
 * @interface Highcharts.GeoJSON
 *//**
 * Full copyright note of the geographic data.
 * @name Highcharts.GeoJSON#copyright
 * @type {string|undefined}
 *//**
 * Short copyright note of the geographic data suitable for watermarks.
 * @name Highcharts.GeoJSON#copyrightShort
 * @type {string|undefined}
 *//**
 * Additional meta information based on the coordinate reference system.
 * @name Highcharts.GeoJSON#crs
 * @type {Highcharts.Dictionary<any>|undefined}
 *//**
 * Data sets of geographic features.
 * @name Highcharts.GeoJSON#features
 * @type {Array<Highcharts.GeoJSONFeature>}
 *//**
 * Map projections and transformations to be used when calculating between
 * lat/lon and chart values. Required for lat/lon support on maps. Allows
 * resizing, rotating, and moving portions of a map within its projected
 * coordinate system while still retaining lat/lon support. If using lat/lon
 * on a portion of the map that does not match a `hitZone`, the definition with
 * the key `default` is used.
 * @name Highcharts.GeoJSON#hc-transform
 * @type {Highcharts.Dictionary<Highcharts.GeoJSONTranslation>|undefined}
 *//**
 * Title of the geographic data.
 * @name Highcharts.GeoJSON#title
 * @type {string|undefined}
 *//**
 * Type of the geographic data. Type of an optimized map collection is
 * `FeatureCollection`.
 * @name Highcharts.GeoJSON#type
 * @type {string|undefined}
 *//**
 * Version of the geographic data.
 * @name Highcharts.GeoJSON#version
 * @type {string|undefined}
 */

/**
 * Data set of a geographic feature.
 * @interface Highcharts.GeoJSONFeature
 * @extends Highcharts.Dictionary<*>
 *//**
 * Data type of the geographic feature.
 * @name Highcharts.GeoJSONFeature#type
 * @type {string}
 */

/**
 * Describes the map projection and transformations applied to a portion of
 * a map.
 * @interface Highcharts.GeoJSONTranslation
 *//**
 * The coordinate reference system used to generate this portion of the map.
 * @name Highcharts.GeoJSONTranslation#crs
 * @type {string}
 *//**
 * Define the portion of the map that this definition applies to. Defined as a
 * GeoJSON polygon feature object, with `type` and `coordinates` properties.
 * @name Highcharts.GeoJSONTranslation#hitZone
 * @type {Highcharts.Dictionary<*>|undefined}
 *//**
 * Property for internal use for maps generated by Highsoft.
 * @name Highcharts.GeoJSONTranslation#jsonmarginX
 * @type {number|undefined}
 *//**
 * Property for internal use for maps generated by Highsoft.
 * @name Highcharts.GeoJSONTranslation#jsonmarginY
 * @type {number|undefined}
 *//**
 * Property for internal use for maps generated by Highsoft.
 * @name Highcharts.GeoJSONTranslation#jsonres
 * @type {number|undefined}
 *//**
 * Specifies clockwise rotation of the coordinates after the projection, but
 * before scaling and panning. Defined in radians, relative to the coordinate
 * system origin.
 * @name Highcharts.GeoJSONTranslation#rotation
 * @type {number|undefined}
 *//**
 * The scaling factor applied to the projected coordinates.
 * @name Highcharts.GeoJSONTranslation#scale
 * @type {number|undefined}
 *//**
 * Property for internal use for maps generated by Highsoft.
 * @name Highcharts.GeoJSONTranslation#xoffset
 * @type {number|undefined}
 *//**
 * X offset of projected coordinates after scaling.
 * @name Highcharts.GeoJSONTranslation#xpan
 * @type {number|undefined}
 *//**
 * Property for internal use for maps generated by Highsoft.
 * @name Highcharts.GeoJSONTranslation#yoffset
 * @type {number|undefined}
 *//**
 * Y offset of projected coordinates after scaling.
 * @name Highcharts.GeoJSONTranslation#ypan
 * @type {number|undefined}
 */

/**
 * Result object of a map transformation.
 *
 * @interface Highcharts.ProjectedXY
 *//**
 * X coordinate in projected units.
 * @name Highcharts.ProjectedXY#x
 * @type {number}
 *//**
 * Y coordinate in projected units
 * @name Highcharts.ProjectedXY#y
 * @type {number}
 */

/**
 * A latitude/longitude object.
 *
 * @interface Highcharts.MapLonLatObject
 *//**
 * The latitude.
 * @name Highcharts.MapLonLatObject#lat
 * @type {number}
 *//**
 * The longitude.
 * @name Highcharts.MapLonLatObject#lon
 * @type {number}
 */

/**
 * An array of longitude, latitude.
 *
 * @typedef {Array<number>} Highcharts.LonLatArray
 */

/**
 * An array of GeoJSON or TopoJSON objects or strings used as map data for
 * series.
 *
 * @typedef {Array<*>|GeoJSON|TopoJSON|string} Highcharts.MapDataType
 */

/**
 * A TopoJSON object, see description on the
 * [project's GitHub page](https://github.com/topojson/topojson).
 *
 * @typedef {Object} Highcharts.TopoJSON
 */

''; // Detach doclets above
