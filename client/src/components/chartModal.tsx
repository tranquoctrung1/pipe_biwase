import { Grid, Button, Flex, Text } from '@mantine/core';

import { useState, useLayoutEffect } from 'react';

import {
    useGetDataLoggerByCurrentTimeQuery,
    useGetDataLoggerByTimeStampQuery,
    //useGetDailyDataByChannelTimeStampQuery,
} from '../__generated__/graphql';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import Swal from 'sweetalert2';

import { convertDateToSetValueDateTimeLocalInput } from '../utils/utils';

interface ChartModalInterface {
    channelid: string | null;
    channelname: string | null;
    unit: string | null;
}

const ChartModal = ({ channelid, channelname, unit }: ChartModalInterface) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { refetch: getDataLoggerCurrentTime } =
        useGetDataLoggerByCurrentTimeQuery();
    const { refetch: getDataLoggerByTimeStamp } =
        useGetDataLoggerByTimeStampQuery();
    // const { refetch: getDailyDataByChannelTimeStamp } =
    //     useGetDailyDataByChannelTimeStampQuery();

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

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let seriesColor = '#3498db';

        if (unit === 'm') {
            seriesColor = '#e74c3c';
        }
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                //@ts-ignore
                name: channelid,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
                tooltip: am5.Tooltip.new(root, {
                    labelText:
                        '{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ' +
                        unit,
                }),
                fill: am5.color(seriesColor),
                stroke: am5.color(seriesColor),
            }),
        );

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

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        const scrollbar = am5xy.XYChartScrollbar.new(root, {
            orientation: 'horizontal',
            height: 50,
        });
        chart.set('scrollbarX', scrollbar);

        const sbxAxis = scrollbar.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                groupData: true,
                groupIntervals: [{ timeUnit: 'day', count: 1 }],
                baseInterval: { timeUnit: 'minute', count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true,
                    opposite: false,
                    strokeOpacity: 0,
                }),
            }),
        );

        const sbyAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );

        const sbseries = scrollbar.chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: sbxAxis,
                yAxis: sbyAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
            }),
        );
        // Set data

        const chartData = [];
        for (const item of data.ListDataLogger) {
            const obj = {
                TimeStamp: new Date(item.TimeStamp).getTime(),
                Value: item.Value,
            };

            chartData.push(obj);
        }

        chartData.sort((a, b) => a.TimeStamp - b.TimeStamp);

        series.data.setAll(chartData);
        sbseries.data.setAll(chartData);

        series.appear(1000);
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

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let seriesColor = '#3498db';

        if (unit === 'm') {
            seriesColor = '#e74c3c';
        }
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                //@ts-ignore
                name: channelid,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
                tooltip: am5.Tooltip.new(root, {
                    labelText:
                        '{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ' +
                        unit,
                }),
                fill: am5.color(seriesColor),
                stroke: am5.color(seriesColor),
            }),
        );

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

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        const scrollbar = am5xy.XYChartScrollbar.new(root, {
            orientation: 'horizontal',
            height: 50,
        });
        chart.set('scrollbarX', scrollbar);

        const sbxAxis = scrollbar.chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                groupData: true,
                groupIntervals: [{ timeUnit: 'day', count: 1 }],
                baseInterval: { timeUnit: 'minute', count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {
                    minorGridEnabled: true,
                    opposite: false,
                    strokeOpacity: 0,
                }),
            }),
        );

        const sbyAxis = scrollbar.chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );

        const sbseries = scrollbar.chart.series.push(
            am5xy.LineSeries.new(root, {
                xAxis: sbxAxis,
                yAxis: sbyAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
            }),
        );
        // Set data

        const chartData = [];
        for (const item of data.ListDataLogger) {
            const obj = {
                TimeStamp: new Date(item.TimeStamp).getTime(),
                Value: item.Value,
            };

            chartData.push(obj);
        }

        chartData.sort((a, b) => a.TimeStamp - b.TimeStamp);

        series.data.setAll(chartData);
        sbseries.data.setAll(chartData);

        series.appear(1000);
        chart.appear(1000, 100);
    };

    useLayoutEffect(() => {
        getDataLoggerCurrentTime({ channelid: channelid })
            .then((res) => {
                if (res?.data?.GetDataLoggerByCurrentTime) {
                    if (
                        //@ts-ignore
                        res.data.GetDataLoggerByCurrentTime.ListDataLogger
                            .length > 0
                    ) {
                        setStartDate(
                            convertDateToSetValueDateTimeLocalInput(
                                //@ts-ignore
                                res.data.GetDataLoggerByCurrentTime
                                    .ListDataLogger[
                                    //@ts-ignore
                                    res.data.GetDataLoggerByCurrentTime
                                        .ListDataLogger.length - 1
                                ].TimeStamp,
                            ),
                        );
                        setEndDate(
                            convertDateToSetValueDateTimeLocalInput(
                                //@ts-ignore
                                res.data.GetDataLoggerByCurrentTime
                                    .ListDataLogger[0].TimeStamp,
                            ),
                        );
                    }
                    drawChart(res.data.GetDataLoggerByCurrentTime);
                }
            })
            .catch((err) => console.log(err));
    }, [channelid]);

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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChart(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const onView1YearClicked = () => {
        const isAllow = isAllowGetData(startDate, endDate);
        if (isAllow) {
            const totalMilisecondEnd = new Date(endDate).getTime();
            const temp = new Date(endDate);
            temp.setFullYear(temp.getFullYear() - 1);
            const totalMilisecondStart = temp.getTime();

            // getDailyDataByChannelTimeStamp({
            //     channelid: channelid,
            //     start: totalMilisecondStart.toString(),
            //     end: totalMilisecondEnd.toString(),
            // })
            //     .then((res) => {
            //         if (res?.data?.GetDailyDataByChannelTimeStamp) {
            //             drawChart(res.data.GetDailyDataByChannelTimeStamp);
            //         }
            //     })
            //     .catch((err) => console.log(err));
            getDataLoggerByTimeStamp({
                channelid: channelid,
                start: totalMilisecondStart.toString(),
                end: totalMilisecondEnd.toString(),
            })
                .then((res) => {
                    if (res?.data?.GetDataLoggerByTimeStamp) {
                        drawChartYear(res.data.GetDataLoggerByTimeStamp);
                    }
                })
                .catch((err) => console.log(err));
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
                <Flex justify="center" align="center">
                    <Text fw={500}>Biều đồ kênh {channelname}</Text>
                </Flex>

                <div
                    id="chart"
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Grid.Col>
        </Grid>
    );
};

export default ChartModal;
