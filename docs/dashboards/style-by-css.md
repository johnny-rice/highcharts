# Style by CSS

Each dashboard and most child elements are styled using CSS by default. This method offers
the possibility to change the dashboard's look and feel without changing its configuration 
or the underlying application's code. Most of the HTML elements are provided with CSS classes, and it is also 
possible to use custom classes or element identifiers.

If you prefer to use a custom layout in HTML, you need to disable the `GUI` or leave it out altogether.
Remember that each container must be rendered to an HTML `div` with a unique `id`.

```js
    gui: {
        enabled: false
    }
```

[Here is the standalone demo](https://www.highcharts.com/samples/embed/dashboards/gui/custom-layout).
[Here is the tailwind demo](https://www.highcharts.com/samples/embed/dashboards/gui/custom-layout-tailwind).

*Please note that that [Edit Mode](https://www.highcharts.com/docs/dashboards/edit-mode) can not be used when
using a custom HTML layout.

## Importing the CSS
The CSS must be explicitly imported, as shown here:
```css
@import url("https://code.highcharts.com/dashboards/css/dashboards.css");
@import url("https://code.highcharts.com/dashboards/css/datagrid.css");
```

The file `datagrid.css` is needed only if the Grid component is used in the dashboard.

## General CSS classes
Each class name contains the prefix `highcharts-dashboards` and a suffix that
describes the element. For example, the class name for the dashboard's row is `highcharts-dashboards-row`.

These are the most essential elements and their associated CSS classes:
- `highcharts-dashboards` - the main class for the dashboard
- `highcharts-dashboards-row` - the class for the dashboard's rows
- `highcharts-dashboards-cell` - the class for the dashboard's cells
- `highcharts-dashboards-component` - the class for the dashboard's component

The rest of the classes are specific for each component or element.

To access and style the whole dashboard, its background and its components, you can use the following:
```css
.highcharts-dashboards,
.highcharts-dashboards-wrapper {
    background-color: #f2f9fd;
}
```

To style the dashboard's rows:
```css
.highcharts-dashboards-row {
    padding: 10px;
}
```

To style the dashboard's cells:
```css
.highcharts-dashboards-cell {
    text-align: left;
}
```

To style the dashboard's component `div` and its content:
```css
.highcharts-dashboards-component {
    border-radius: 10px;
}
```

## Component classes
Each component has the generic component CSS class `highcharts-dashboards-component`
and its own CSS class specific to the component. For example, the KPI component
has the class `highcharts-dashboards-component-kpi`.

To style the dashboard's component title:
```css
.highcharts-dashboards-component-title {
    font-size: 12px;
}
```

To style the dashboard's component subtitle:
```css
.highcharts-dashboards-component-subtitle {
    font-size: 10px;
}
```

### KPI component

To style the dashboard's KPI component div and its content:
```css
.highcharts-dashboards-component-kpi {
    border-radius: 10px;
}
```

To style the dashboard's KPI value:
```css
.highcharts-dashboards-component-kpi-value {
    color: red;
}
```

To properly style the chart element of the KPI, you need to set the `styledMode` option to `true` in the component's configuration.
```js
{
    type: 'KPI',
    renderTo: 'kpi-container',
    chartOptions: {
        chart: {
            styledMode: true
        }
        ...
    }
    ...
}
```

### Highcharts component
To style the dashboard's **Highcharts** component `div` and its content:
```css
.highcharts-dashboards-component-highcharts {
    background-color: gray;
}
```
To style the chart element of the **Highcharts** component, you need to set the `styledMode` option to `true` in the component's configuration.
```js
{
    type: 'Highcharts',
    renderTo: 'chart-container',
    chartOptions: {
        chart: {
            styledMode: true
        }
        ...
    }
    ...
}
```

For information on how to individually style the dashboard's `Highcharts chart` see the article [style Highcharts Chart.](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)

### Grid component
To style the dashboard's **Grid Component** `div` and its content:
```css
.highcharts-datagrid-container {
    border-radius: 10px;
}
```

For detailed guidance on styling the Grid component, refer to the [Introduction to Theming](https://www.highcharts.com/docs/grid/theming/theming) article.

### HTML component
Since the user defines the whole structure of the HTML component, it differs between use cases.
In effect, HTML can be styled the same way as any HTML `div` with its child elements, and it is recommended that you use custom classes and IDs to style it.

More information is in the section below.

## Custom classes
Each component or element can have a custom class or ID in the dashboard config.
You can use it to define better CSS selectors and style the dashboard.

See how the HTML component was configured and how the `id` and `class` were used:
```ts
{
    type: 'HTML',
    renderTo: 'dashboard-row-1-cell-3',
    elements: [
        {
            tagName: 'div',
            children: [
                {
                    tagName: 'h4',
                    textContent: 'Check how you can save more!',
                    attributes: {
                        class: 'main-title'
                    }
                },
                {
                    tagName: 'button',
                    textContent: 'Go to the saving account',
                    attributes: {
                        id: 'saving-button'
                    }
                }
            ]
        }
    ]
},
```

Custom classes and IDs can be used to style the dashboard:
```css
#saving-button {
    border: none;
    cursor: pointer;
}
```

The final result might look like:

<iframe src="https://www.highcharts.com/samples/embed/dashboards/demo/personal-finance?force-light-theme" allow="fullscreen"></iframe>

## Edit Mode classes
You can also change how the Edit Mode looks like. The Edit mode is based on the
elements like the sidebar, toolbar, popup, etc. Each has its class
that you can use to style it.

### Confirmation popup
To style the dashboard's popup:
```css
.highcharts-dashboards-confirmation-popup {
    border-radius: 10px;
}
```

To style the dashboard's overlay:
```css
.highcharts-dashboards-overlay {
    background-color: gray;
}
```

To style the dashboard's popup close button:
```css
.highcharts-dashboards-popup-close {
    background-color: gray;
}
```

### Sidebar (Accordion menu)

To style the dashboard's accordion menu in the sidebar:
```css
.highcharts-dashboards-accordion-menu {
    background-color: gray;
}
```

To style the dashboard's sidebar header in the accordion menu:
```css
.highcharts-dashboards-accordion-header {
    font-size: 12px;
}
```
### Toolbars

To style the dashboard's toolbar in Edit Mode:
```css
.highcharts-dashboards-toolbar {
    background-color: gray;
}
```

### Highlights

To style the highlights of an edited cell:
```css
.highcharts-dashboards-toolbar-cell-outline {
    border-color: red;
}
```

To style the highlights of an edited row:
```css
.highcharts-dashboards-toolbar-row-outline {
    border-color: blue;
}
```
