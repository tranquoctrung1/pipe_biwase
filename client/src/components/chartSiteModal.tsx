import { Grid, Button, Flex, Text } from '@mantine/core';

import { useState, useLayoutEffect } from 'react';

import {
    useGetDataLoggerOfSiteCurrentTimeQuery,
    useGetDataLoggerOfSiteByTimeStampQuery,
    //useGetDailyDataBySiteIdTimeStampQuery,
} from '../__generated__/graphql';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';

import Swal from 'sweetalert2';

import { convertDateToSetValueDateTimeLocalInput } from '../utils/utils';

interface ChartSiteModalInterface {
    loggerid: string;
    location: string;
    pipeid: string;
    pipename: string;
    sizepipe: number;
    lengthpipe: number;
}

const ChartSiteModal = ({
    loggerid,
    location,
    pipeid,
    pipename,
    sizepipe,
    lengthpipe,
}: ChartSiteModalInterface) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { refetch: getDataLoggerCurrentTime } =
        useGetDataLoggerOfSiteCurrentTimeQuery();
    const { refetch: getDataLoggerByTimeStamp } =
        useGetDataLoggerOfSiteByTimeStampQuery();
    // const { refetch: getDailyDataBySiteIdTimeStamp } =
    //     useGetDailyDataBySiteIdTimeStampQuery();

    const drawChart = (data: any) => {
        am5.array.each(am5.registry.rootElements, function (root) {
            if (root.dom.id == 'chart') {
                root.dispose();
            }
        });

        const root = am5.Root.new('chart');

        const myTheme = am5.Theme.new(root);

        // Move minor label a bit down
        myTheme.rule('AxisLabel', ['minor']).setAll({
            dy: 1,
        });

        // Tweak minor grid opacity
        myTheme.rule('Grid', ['minor']).setAll({
            strokeOpacity: 0.08,
        });

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root), myTheme]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX',
                paddingLeft: 0,
            }),
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                behavior: 'zoomX',
            }),
        );
        cursor.lineY.set('visible', false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                groupData: false,
                maxDeviation: 0,
                baseInterval: {
                    timeUnit: 'minute',
                    count: 15,
                },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true,
                    minGridDistance: 200,
                    minorLabelsEnabled: true,
                }),
                tooltip: am5.Tooltip.new(root, {}),
            }),
        );

        xAxis.set('minorDateFormats', {
            day: 'dd',
            month: 'MM',
        });

        // const yAxis = chart.yAxes.push(
        //     am5xy.ValueAxis.new(root, {
        //         renderer: am5xy.AxisRendererY.new(root, {}),
        //     }),
        // );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let check = false;
        for (const d of data) {
            let seriesColor = '#3498db';

            if (d.Unit === 'm') {
                seriesColor = '#e74c3c';
            }

            const yRenderer = am5xy.AxisRendererY.new(root, {
                opposite: check,
                stroke: am5.color(seriesColor),
                fill: am5.color(seriesColor),
                strokeWidth: 2,
                strokeOpacity: 1,
            });
            if (check == false) {
                check = true;
            }
            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 1,
                    renderer: yRenderer,
                }),
            );

            if (chart.yAxes.indexOf(yAxis) > 0) {
                //@ts-ignore
                yAxis.set('syncWithAxis', chart.yAxes.getIndex(0));
            }

            const series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    //@ts-ignore
                    name: d.ChannelName,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: 'Value',
                    valueXField: 'TimeStamp',
                    tooltip: am5.Tooltip.new(root, {
                        labelText:
                            '{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ' +
                            d.Unit,
                    }),
                    fill: am5.color(seriesColor),
                    stroke: am5.color(seriesColor),
                }),
            );

            yRenderer.labels.template.set('fill', series.get('fill'));

            // Actual bullet
            series.bullets.push(function () {
                const bulletCircle = am5.Circle.new(root, {
                    radius: 1.5,
                    fill: series.get('fill'),
                });
                return am5.Bullet.new(root, {
                    sprite: bulletCircle,
                });
            });
            // Set data
            const chartData = [];
            for (const item of d.ListDataLogger) {
                const obj = {
                    TimeStamp: new Date(item.TimeStamp).getTime(),
                    Value: item.Value,
                };

                chartData.push(obj);
            }

            chartData.sort((a, b) => a.TimeStamp - b.TimeStamp);

            series.data.setAll(chartData);

            series.appear(1000);
        }

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set(
            'scrollbarX',
            am5.Scrollbar.new(root, {
                orientation: 'horizontal',
            }),
        );

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        const legend = chart.bottomAxesContainer.children.push(
            am5.Legend.new(root, {
                width: 300,
                height: 50,
                x: am5.percent(50),
                centerX: am5.percent(50),
                layout: root.horizontalLayout,
            }),
        );
        // When legend item container is hovered, dim all the series except the hovered one
        legend.itemContainers.template.events.on('pointerover', function (e) {
            const itemContainer = e.target;

            // As series list is data of a legend, dataContext is series
            //@ts-ignore
            const series = itemContainer.dataItem.dataContext;

            chart.series.each(function (chartSeries) {
                if (chartSeries != series) {
                    //@ts-ignore
                    chartSeries.strokes.template.setAll({
                        strokeOpacity: 0.15,
                        stroke: am5.color(0x000000),
                    });
                } else {
                    //@ts-ignore
                    chartSeries.strokes.template.setAll({
                        strokeWidth: 2,
                    });
                }
            });
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on('pointerout', function (e) {
            const itemContainer = e.target;
            //@ts-ignore
            const series = itemContainer.dataItem.dataContext;

            chart.series.each(function (chartSeries) {
                //@ts-ignore
                chartSeries.strokes.template.setAll({
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    stroke: chartSeries.get('fill'),
                });
            });
        });

        legend.itemContainers.template.set('width', am5.p100);
        legend.valueLabels.template.setAll({
            width: am5.p100,
            textAlign: 'right',
        });

        // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
        legend.data.setAll(chart.series.values);

        am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            filePrefix: location,
        });

        chart.appear(1000, 100);
    };

    const drawChartYear = (data: any) => {
        am5.array.each(am5.registry.rootElements, function (root) {
            if (root.dom.id == 'chart') {
                root.dispose();
            }
        });

        const root = am5.Root.new('chart');

        const myTheme = am5.Theme.new(root);

        // Move minor label a bit down
        myTheme.rule('AxisLabel', ['minor']).setAll({
            dy: 1,
        });

        // Tweak minor grid opacity
        myTheme.rule('Grid', ['minor']).setAll({
            strokeOpacity: 0.08,
        });

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root), myTheme]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX',
                paddingLeft: 0,
            }),
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        const cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                behavior: 'zoomX',
            }),
        );
        cursor.lineY.set('visible', false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                groupData: true,
                maxDeviation: 0,
                baseInterval: {
                    timeUnit: 'minute',
                    count: 15,
                },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true,
                    minGridDistance: 200,
                    minorLabelsEnabled: true,
                }),
                tooltip: am5.Tooltip.new(root, {}),
            }),
        );

        xAxis.set('minorDateFormats', {
            day: 'dd',
            month: 'MM',
        });

        // const yAxis = chart.yAxes.push(
        //     am5xy.ValueAxis.new(root, {
        //         renderer: am5xy.AxisRendererY.new(root, {}),
        //     }),
        // );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let check = false;
        for (const d of data) {
            let seriesColor = '#3498db';

            if (d.Unit === 'm') {
                seriesColor = '#e74c3c';
            }

            const yRenderer = am5xy.AxisRendererY.new(root, {
                opposite: check,
                stroke: am5.color(seriesColor),
                fill: am5.color(seriesColor),
                strokeWidth: 2,
                strokeOpacity: 1,
            });
            if (check == false) {
                check = true;
            }
            const yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    maxDeviation: 1,
                    renderer: yRenderer,
                }),
            );

            if (chart.yAxes.indexOf(yAxis) > 0) {
                //@ts-ignore
                yAxis.set('syncWithAxis', chart.yAxes.getIndex(0));
            }

            const series = chart.series.push(
                am5xy.LineSeries.new(root, {
                    //@ts-ignore
                    name: d.ChannelName,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: 'Value',
                    valueXField: 'TimeStamp',
                    tooltip: am5.Tooltip.new(root, {
                        labelText:
                            '{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ' +
                            d.Unit,
                    }),
                    fill: am5.color(seriesColor),
                    stroke: am5.color(seriesColor),
                }),
            );

            yRenderer.labels.template.set('fill', series.get('fill'));

            // Actual bullet
            series.bullets.push(function () {
                const bulletCircle = am5.Circle.new(root, {
                    radius: 1.5,
                    fill: series.get('fill'),
                });
                return am5.Bullet.new(root, {
                    sprite: bulletCircle,
                });
            });
            // Set data
            const chartData = [];
            for (const item of d.ListDataLogger) {
                const obj = {
                    TimeStamp: new Date(item.TimeStamp).getTime(),
                    Value: item.Value,
                };

                chartData.push(obj);
            }

            chartData.sort((a, b) => a.TimeStamp - b.TimeStamp);

            series.data.setAll(chartData);

            series.appear(1000);
        }

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set(
            'scrollbarX',
            am5.Scrollbar.new(root, {
                orientation: 'horizontal',
            }),
        );

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        const legend = chart.bottomAxesContainer.children.push(
            am5.Legend.new(root, {
                width: 300,
                height: 50,
                x: am5.percent(50),
                centerX: am5.percent(50),
                layout: root.horizontalLayout,
            }),
        );
        // When legend item container is hovered, dim all the series except the hovered one
        legend.itemContainers.template.events.on('pointerover', function (e) {
            const itemContainer = e.target;

            // As series list is data of a legend, dataContext is series
            //@ts-ignore
            const series = itemContainer.dataItem.dataContext;

            chart.series.each(function (chartSeries) {
                if (chartSeries != series) {
                    //@ts-ignore
                    chartSeries.strokes.template.setAll({
                        strokeOpacity: 0.15,
                        stroke: am5.color(0x000000),
                    });
                } else {
                    //@ts-ignore
                    chartSeries.strokes.template.setAll({
                        strokeWidth: 2,
                    });
                }
            });
        });

        // When legend item container is unhovered, make all series as they are
        legend.itemContainers.template.events.on('pointerout', function (e) {
            const itemContainer = e.target;
            //@ts-ignore
            const series = itemContainer.dataItem.dataContext;

            chart.series.each(function (chartSeries) {
                //@ts-ignore
                chartSeries.strokes.template.setAll({
                    strokeOpacity: 1,
                    strokeWidth: 1,
                    stroke: chartSeries.get('fill'),
                });
            });
        });

        legend.itemContainers.template.set('width', am5.p100);
        legend.valueLabels.template.setAll({
            width: am5.p100,
            textAlign: 'right',
        });

        // It's is important to set legend data after all the events are set on template, otherwise events won't be copied
        legend.data.setAll(chart.series.values);

        am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
            filePrefix: location,
        });

        chart.appear(1000, 100);
    };

    useLayoutEffect(() => {
        getDataLoggerCurrentTime({ loggerid: loggerid })
            .then((res) => {
                if (res?.data?.GetDataLoggerOfSiteCurrentTime) {
                    for (const data of res.data
                        .GetDataLoggerOfSiteCurrentTime) {
                        //@ts-ignore
                        if (data?.ListDataLogger?.length > 0) {
                            setStartDate(
                                convertDateToSetValueDateTimeLocalInput(
                                    //@ts-ignore
                                    data.ListDataLogger[
                                        //@ts-ignore
                                        data.ListDataLogger.length - 1
                                    ].TimeStamp,
                                ),
                            );
                            setEndDate(
                                convertDateToSetValueDateTimeLocalInput(
                                    //@ts-ignore
                                    data.ListDataLogger[0].TimeStamp,
                                ),
                            );
                            break;
                        }
                    }

                    drawChart(res.data.GetDataLoggerOfSiteCurrentTime);
                }
            })
            .catch((err) => console.error(err));
    }, [loggerid]);

    const isAllowGetData = (startDate: any, endDate: any) => {
        let isAllow = true;

        if (startDate === null || startDate === undefined || startDate === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Chưa có thời gian bắt đầu',
            });
            isAllow = false;
        } else if (
            endDate === null ||
            endDate === undefined ||
            endDate === ''
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Chưa có thời gian kết thúc',
            });

            isAllow = false;
        }

        return isAllow;
    };

    const onViewChartClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondStart = new Date(startDate).getTime();
            const totalMilisecondEnd = new Date(endDate).getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView12hClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setHours(temp.getHours() - 12);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView1DayClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setDate(temp.getDate() - 1);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView3DayClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setDate(temp.getDate() - 3);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView1YearClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setFullYear(temp.getFullYear() - 1);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChartYear(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView1WeekClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setDate(temp.getDate() - 7);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const onView1MonthClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setMonth(temp.getMonth() - 1);
            const totalMilisecondStart = temp.getTime();

            getDataLoggerByTimeStamp({
                loggerid: loggerid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                        drawChart(res.data.GetDataLoggerOfSiteByTimeStamp);
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <label htmlFor="startstart" style={{ fontWeight: 500 }}>
                    Thời gian bắt đầu
                </label>
                <input
                    type="datetime-local"
                    id="start"
                    name="trip-start"
                    value={startDate}
                    onChange={(e) => setStartDate(e.currentTarget.value)}
                    style={{
                        width: '100%',
                        padding: '5px 8px',
                        borderRadius: '5px',
                    }}
                />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
                <label htmlFor="end" style={{ fontWeight: 500 }}>
                    Thời gian kết thúc
                </label>
                <input
                    type="datetime-local"
                    id="end"
                    name="trip-start"
                    value={endDate}
                    onChange={(e) => setEndDate(e.currentTarget.value)}
                    style={{
                        width: '100%',
                        padding: '5px 8px',
                        borderRadius: '5px',
                    }}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Flex
                    justify="center"
                    align="flex-end"
                    style={{ height: '100%' }}
                >
                    <Button
                        variant="filled"
                        color="green"
                        onClick={onViewChartClicked}
                    >
                        Xem
                    </Button>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Flex justify="center" gap="sm" align="center">
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView12hClicked}
                    >
                        Xem 12 giờ
                    </Button>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView1DayClicked}
                    >
                        Xem 1 ngày
                    </Button>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView3DayClicked}
                    >
                        Xem 3 ngày
                    </Button>

                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView1WeekClicked}
                    >
                        Xem 1 tuần
                    </Button>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView1MonthClicked}
                    >
                        Xem 1 tháng
                    </Button>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onView1YearClicked}
                    >
                        Xem 1 năm
                    </Button>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <div
                    id="chart"
                    style={{ width: '100%', height: '400px' }}
                ></div>
                <Flex justify="end" align="center">
                    <div style={{ textAlign: 'right' }}>
                        <Text size="sm">Mã tuyến ống: {pipeid}</Text>
                        <Text size="sm">Tên tuyến ống: {pipename}</Text>
                        <Text size="sm">Kích thước ống: {sizepipe}</Text>
                        <Text size="sm">Độ dài tuyến ống: {lengthpipe}</Text>
                    </div>
                </Flex>
            </Grid.Col>
        </Grid>
    );
};

export default ChartSiteModal;
