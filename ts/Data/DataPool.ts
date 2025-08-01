/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

'use strict';


/* *
 *
 *  Imports
 *
 * */


import type DataEvent from './DataEvent';
import type {
    DataPoolOptions,
    DataPoolConnectorOptions
} from './DataPoolOptions.js';
import type DataTable from './DataTable.js';
import type DataConnectorType from './Connectors/DataConnectorType';

import DataConnector from './Connectors/DataConnector.js';
import DataPoolDefaults from './DataPoolDefaults.js';
import U from '../Core/Utilities.js';


/* *
 *
 *  Class
 *
 * */


/**
 * Data pool to load connectors on-demand.
 *
 * @class
 * @name Data.DataPool
 *
 * @param {Data.DataPoolOptions} options
 * Pool options with all connectors.
 */
class DataPool implements DataEvent.Emitter {


    /* *
     *
     *  Static Properties
     *
     * */


    /**
     * Semantic version string of the DataPool class.
     * @internal
     */
    public static readonly version: string = '1.0.0';


    /* *
     *
     *  Constructor
     *
     * */


    public constructor(
        options: (DataPoolOptions|undefined) = DataPoolDefaults
    ) {
        options.connectors = (options.connectors || []);

        this.connectors = {};
        this.options = options;
        this.waiting = {};
    }


    /* *
     *
     *  Properties
     *
     * */


    /**
     * Internal dictionary with the connectors and their IDs.
     * @private
     */
    protected readonly connectors: Record<string, DataConnectorType>;


    /**
     * Pool options with all connectors.
     *
     * @name Data.DataPool#options
     * @type {Data.DataPoolOptions}
     */
    public readonly options: DataPoolOptions;


    /**
     * Internal dictionary with the promise resolves waiting for connectors to
     * be done loading.
     * @private
     */
    protected readonly waiting: Record<string, Array<[Function, Function]>>;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Emits an event on this data pool to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    public emit<E extends DataEvent>(e: E): void {
        U.fireEvent(this, e.type, e);
    }


    /**
     * Loads the connector.
     *
     * @function Data.DataPool#getConnector
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {Promise<Data.DataConnectorType>}
     * Returns the connector.
     */
    public getConnector(
        connectorId: string
    ): Promise<DataConnectorType> {
        const connector = this.connectors[connectorId];

        // Already loaded
        if (connector?.loaded) {
            return Promise.resolve(connector);
        }

        let waitingList = this.waiting[connectorId];

        // Start loading
        if (!waitingList) {
            waitingList = this.waiting[connectorId] = [];

            const connectorOptions = this.getConnectorOptions(connectorId);

            if (!connectorOptions) {
                throw new Error(`Connector '${connectorId}' not found.`);
            }

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this
                .loadConnector(connectorOptions)
                .then((connector): void => {
                    delete this.waiting[connectorId];
                    for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                        waitingList[i][0](connector);
                    }
                })['catch']((error): void => {
                    delete this.waiting[connectorId];
                    for (let i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                        waitingList[i][1](error);
                    }
                });
        }

        // Add request to waiting list
        return new Promise((resolve, reject): void => {
            waitingList.push([resolve, reject]);
        });
    }


    /**
     * Returns the IDs of all connectors.
     *
     * @private
     *
     * @return {Array<string>}
     * Names of all connectors.
     */
    public getConnectorIds(): Array<string> {
        const connectors = this.options.connectors,
            connectorIds: Array<string> = [];

        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            connectorIds.push(connectors[i].id);
        }

        return connectorIds;
    }


    /**
     * Loads the options of the connector.
     *
     * @private
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {DataPoolConnectorOptions|undefined}
     * Returns the options of the connector, or `undefined` if not found.
     */
    protected getConnectorOptions(
        connectorId: string
    ): (DataPoolConnectorOptions|undefined) {
        const connectors = this.options.connectors;

        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === connectorId) {
                return connectors[i];
            }
        }
    }


    /**
     * Loads the connector table.
     *
     * @function Data.DataPool#getConnectorTable
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {Promise<Data.DataTable>}
     * Returns the connector table.
     */
    public getConnectorTable(
        connectorId: string
    ): Promise<DataTable> {
        return this
            .getConnector(connectorId)
            .then((connector): DataTable => connector.table);
    }


    /**
     * Tests whether the connector has never been requested.
     *
     * @param {string} connectorId
     * Name of the connector.
     *
     * @return {boolean}
     * Returns `true`, if the connector has never been requested, otherwise
     * `false`.
     */
    public isNewConnector(
        connectorId: string
    ): boolean {
        return !this.connectors[connectorId];
    }

    /**
     * Creates and loads the connector.
     *
     * @private
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Options of connector.
     *
     * @return {Promise<Data.DataConnectorType>}
     * Returns the connector.
     */
    protected loadConnector(
        options: DataPoolConnectorOptions
    ): Promise<DataConnectorType> {
        return new Promise((resolve, reject): void => {

            this.emit<DataPool.Event>({
                type: 'load',
                options
            });

            const ConnectorClass = DataConnector.types[options.type];

            if (!ConnectorClass) {
                throw new Error(`Connector type not found. (${options.type})`);
            }

            const connector = this.connectors[options.id] = new ConnectorClass(
                options.options,
                options.dataTables
            );

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connector
                .load()
                .then(({ converter, dataTables }): void => {
                    connector.dataTables = dataTables;
                    connector.converter = converter;
                    connector.loaded = true;

                    this.emit<DataPool.Event>({
                        type: 'afterLoad',
                        options
                    });

                    resolve(connector);
                })['catch'](reject);
        });
    }

    /**
     * Cancels all data connectors pending requests.
     */
    public cancelPendingRequests(): void {
        const { connectors } = this;
        for (const connectorKey of Object.keys(connectors)) {
            connectors[connectorKey].stopPolling();
        }
    }


    /**
     * Registers a callback for a specific event.
     *
     * @function Highcharts.DataPool#on
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    public on<E extends DataEvent>(
        type: E['type'],
        callback: DataEvent.Callback<this, E>
    ): Function {
        return U.addEvent(this, type, callback);
    }


    /**
     * Sets connector options under the specified `options.id`.
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Connector options to set.
     */
    public setConnectorOptions(
        options: DataPoolConnectorOptions
    ): void {
        const connectors = this.options.connectors,
            instances = this.connectors;

        this.emit<DataPool.Event>({
            type: 'setConnectorOptions',
            options
        });

        for (let i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === options.id) {
                connectors.splice(i, 1);
                break;
            }
        }

        if (instances[options.id]) {
            instances[options.id].stopPolling();
            delete instances[options.id];
        }

        connectors.push(options);

        this.emit<DataPool.Event>({
            type: 'afterSetConnectorOptions',
            options
        });
    }


}


/* *
 *
 *  Class Namespace
 *
 * */


namespace DataPool {


    /* *
     *
     *  Declarations
     *
     * */

    export interface Event {
        type: (
            |'load'|'afterLoad'
            |'setConnectorOptions'|'afterSetConnectorOptions'
        );
        options: DataPoolConnectorOptions;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default DataPool;
