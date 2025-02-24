/* *
 *
 *  Grid Credits class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type { CreditsOptions } from '../Core/Options';
import type Grid from '../Core/Grid';

import Credits from '../Core/Credits.js';
import U from '../../Core/Utilities.js';

const {
    addEvent,
    merge
} = U;

/* *
 *
 *  Class
 *
 * */

/**
 * Represents a credits in the data grid.
 */
class CreditsComposition extends Credits {
    /* *
    *
    *  Methods
    *
    * */

    /**
     * Set the content of the credits.
     */
    private setContent(): void {
        const { text, href } = this.options;

        this.textElement.innerHTML = text || '';
        this.textElement.setAttribute('href', href || '');
    }

    /**
     * Append the credits to the container. The position of the credits is
     * determined by the `position` option.
     */
    private appendToContainer(): void {
        const { position } = this.options;

        if (position === 'top') {
            // Append the credits to the top of the table.
            this.grid.contentWrapper?.prepend(this.containerElement);
            return;
        }

        // Append the credits to the bottom of the table.
        this.grid.contentWrapper?.appendChild(this.containerElement);
    }

    /**
     * Update the credits with new options.
     *
     * @param options
     * The new options for the credits.
     *
     * @param render
     * Whether to render the credits after the update.
     */
    public update(
        options: Partial<CreditsOptions> | undefined,
        render = true
    ): void {
        if (options) {
            this.grid.update({
                credits: options
            }, false);

            this.options = this.grid.options?.credits ?? {};
        }

        if (render) {
            this.render();
        }
    }

    /**
     * Render the credits. If the credits are disabled, they will be removed
     * from the container. If also reflows the viewport dimensions.
     */
    public render(): void {
        const enabled = this.options.enabled ?? false;

        this.containerElement.remove();

        if (enabled) {
            this.setContent();
            this.appendToContainer();
        } else {
            this.destroy();
        }

        this.grid.viewport?.reflow();
    }
}


/* *
 *
 *  Class Namespace
 *
 * */

namespace CreditsComposition {
    /**
     * Extends the grid classes with customizable credits.
     *
     * @param GridClass
     * The class to extend.
     *
     */
    export function compose(
        GridClass: typeof Grid
    ): void {
        addEvent(GridClass, 'afterRenderViewport', initCreditsComposition);
    }

    /**
     * Callback function called before table initialization.
     */
    function initCreditsComposition(this: Grid): void {
        const creditsOptions =
            merge(Credits.defaultOptions, this.options?.credits);

        this.options = merge(
            this.options,
            {
                credits: creditsOptions  
            }  
        );

        this.credits = new CreditsComposition(
            this,
            creditsOptions
        );
    }
}


/* *
 *
 *  Default Export
 *
 * */

export default CreditsComposition;
