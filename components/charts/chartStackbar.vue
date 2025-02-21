<script lang="ts" setup>
import {VueDataUi, type VueUiStackbarConfig, type VueUiStackbarDatasetItem} from "vue-data-ui";
import "vue-data-ui/style.css";


const dataset: VueUiStackbarDatasetItem[] = [
    {
        name: "Serie 1",
        series: [19, 20.07, 30, 40, 50, 60],
    },
    {
        name: "Serie 2",
        series: [13, 8, 9, 13, 25, 27],
    },
    {
        name: "Serie 3",
        series: [13, 10, 9, 13, 25, 19],
    },
    {
        name: "Serie 4",
        series: [25, 23, 9, 13, 25, 31],

    },
]
const config: VueUiStackbarConfig = {
        "theme": "",
        "responsive": false,
        "customPalette": [],
        "useCssAnimation": true,
        "orientation": "vertical",
        "table": {
            "show": true,
            "responsiveBreakpoint": 400,
            "columnNames": {"period": "Period", "total": "Total"},
            "th": {"backgroundColor": "#fafafa", "color": "#2D353C", "outline": "none"},
            "td": {"backgroundColor": "#FFFFFF", "color": "#2D353C", "outline": "none", "roundingValue": 0}
        },
        "userOptions": {
            "show": true,
            "showOnChartHover": false,
            "keepStateOnChartLeave": true,
            "position": "right",
            "buttons": {
                "tooltip": true,
                "pdf": true,
                "csv": true,
                "img": true,
                "table": true,
                "labels": true,
                "fullscreen": true,
                "sort": false,
                "stack": false,
                "animation": false,
                "annotator": true
            },
            "buttonTitles": {
                "open": "Open options",
                "close": "Close options",
                "tooltip": "Toggle tooltip",
                "pdf": "Download PDF",
                "csv": "Download CSV",
                "img": "Download PNG",
                "table": "Toggle table",
                "labels": "Toggle labels",
                "fullscreen": "Toggle fullscreen",
                "annotator": "Toggle annotator"
            }
        },
        "style": {
            "fontFamily": "inherit", "chart": {
                "backgroundColor": "#FFFFFF",
                "color": "#2D353C",
                "height": 500,
                "width": 800,
                "padding": {"top": 12, "right": 24, "bottom": 36, "left": 64},
                "title": {
                    "text": "Title",
                    "color": "#2D353C",
                    "fontSize": 20,
                    "bold": true,
                    "textAlign": "center",
                    "paddingLeft": 0,
                    "paddingRight": 0,
                    "subtitle": {"color": "#A1A1A1", "text": "Subtitle", "fontSize": 16, "bold": false}
                },
                "legend": {
                    "show": true,
                    "bold": false,
                    "backgroundColor": "#FFFFFF",
                    "color": "#2D353C",
                    "fontSize": 14
                },
                "zoom": {
                    "show": true,
                    "color": "#CCCCCC",
                    "highlightColor": "#4A4A4A",
                    "fontSize": 14,
                    "useResetSlot": false,
                    "startIndex": null,
                    "endIndex": null,
                    "enableRangeHandles": true,
                    "enableSelectionDrag": true
                },
                "tooltip": {
                    "show": true,
                    "color": "#2D353C",
                    "backgroundColor": "#FFFFFF",
                    "fontSize": 14,
                    "customFormat": null,
                    "borderRadius": 4,
                    "borderColor": "#e1e5e8",
                    "borderWidth": 1,
                    "backgroundOpacity": 30,
                    "position": "center",
                    "offsetY": 24,
                    "showValue": true,
                    "showPercentage": true,
                    "roundingValue": 0,
                    "roundingPercentage": 0,
                    "showTimeLabel": true
                },
                "highlighter": {"color": "#2D353C", "opacity": 5},
                "bars": {
                    "gapRatio": 0.5,
                    "distributed": false,
                    "showDistributedPercentage": true,
                    "borderRadius": 3,
                    "strokeWidth": 1,
                    "gradient": {"show": true, "intensity": 20},
                    "totalValues": {"show": true, "offsetY": 0, "fontSize": 16, "bold": false, "color": "#2D353C"},
                    "dataLabels": {
                        "show": true,
                        "hideEmptyValues": false,
                        "hideEmptyPercentages": false,
                        "adaptColorToBackground": true,
                        "color": "#2D353C",
                        "fontSize": 14,
                        "bold": false,
                        "rounding": 0,
                        "prefix": "",
                        "suffix": ""
                    }
                },
                "grid": {
                    "scale": {"ticks": 10, "scaleMin": null, "scaleMax": null},
                    "x": {
                        "showAxis": true,
                        "showHorizontalLines": true,
                        "axisColor": "#e1e5e8",
                        "axisThickness": 2,
                        "axisName": {
                            "show": true,
                            "text": "xAxis",
                            "fontSize": 14,
                            "color": "#2D353C",
                            "bold": false,
                            "offsetY": 0
                        },
                        "timeLabels": {
                            "show": true,
                            "values": ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
                            "offsetY": 0,
                            "rotation": 0,
                            "fontSize": 14,
                            "color": "#2D353C",
                            "bold": false
                        }
                    },
                    "y": {
                        "showAxis": true,
                        "showVerticalLines": false,
                        "axisColor": "#e1e5e8",
                        "axisThickness": 2,
                        "axisName": {
                            "show": true,
                            "text": "yAxis",
                            "fontSize": 14,
                            "color": "#2D353C",
                            "bold": false,
                            "offsetX": 0
                        },
                        "axisLabels": {"show": true, "color": "#2D353C", "fontSize": 14, "bold": false}
                    }
                }
            }
        }
    }


</script>

<template>
    <ClientOnly>
        <VueDataUi
            :config="config"
            :dataset="dataset"
            component="VueUiStackbar"
        />
    </ClientOnly>

</template>
