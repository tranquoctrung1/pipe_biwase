import { useLayoutEffect, useState } from 'react';

import { Grid, Button, Flex, Space, Center } from '@mantine/core';

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';

import { useGetIndexLoggerFilterTimeQuery } from '../__generated__/graphql';

import { calculateHoursBetweenDates } from '../utils/utils';

import Swal from 'sweetalert2';

import { useSelector } from 'react-redux';

import { StartPeriodLostWaterState } from '../features/startPeriodLostWater';
import { EndPeriodLostWaterState } from '../features/endPeriodLostWater';

import {
    IconArrowBadgeUpFilled,
    IconSearch,
    IconTable,
    IconChartAreaLine,
} from '@tabler/icons-react';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { convertDateToTimeString } from '../utils/utils';

const ChartLostWater = ({ lostWaterMode }: any) => {
    const [startDate, setStartDate] = useState(
        useSelector(StartPeriodLostWaterState),
    );
    const [endDate, setEndDate] = useState(
        useSelector(EndPeriodLostWaterState),
    );

    const [data, setData] = useState([]);

    const [viewTable, setViewTable] = useState(false);

    const { refetch: getIndexLogger } = useGetIndexLoggerFilterTimeQuery();

    const getIndex = (channelid: string, start: any, end: any) => {
        return getIndexLogger({
            channelid: channelid,
            start: new Date(start).getTime().toString(),
            end: new Date(end).getTime().toString(),
        });
    };

    const convertDataNT = (data: any, start: any, end: any) => {
        const chartData = [];

        const space = calculateHoursBetweenDates(start, end);

        for (let i = 0; i <= space; i++) {
            const t = new Date(start);
            const t2 = new Date(start);

            t.setHours(t.getHours(), 0, 0, 0);
            t2.setHours(t2.getHours(), 0, 0, 0);

            t.setHours(t.getHours() - 1 + i);
            t2.setHours(t2.getHours() + i);

            const findGD1StartIndex =
                data[0].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findGD1EndIndex = data[0].data.GetIndexLoggerFilterTime.find(
                (el: any) => new Date(el.TimeStamp).getTime() === t2.getTime(),
            );

            const findGD2StartIndex =
                data[1].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findGD2EndIndex = data[1].data.GetIndexLoggerFilterTime.find(
                (el: any) => new Date(el.TimeStamp).getTime() === t2.getTime(),
            );

            const findNMGD1StartIndex =
                data[2].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findNMGD1EndIndex =
                data[2].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t2.getTime(),
                );

            const findNMGD2StartIndex =
                data[3].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findNMGD2EndIndex =
                data[3].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t2.getTime(),
                );

            const quantityGD1 = findGD1EndIndex.Value - findGD1StartIndex.Value;
            const quantityGD2 = findGD2EndIndex.Value - findGD2StartIndex.Value;
            const quantityNMGD1 =
                findNMGD1EndIndex.Value - findNMGD1StartIndex.Value;
            const quantityNMGD2 =
                findNMGD2EndIndex.Value - findNMGD2StartIndex.Value;

            const totalCTT = quantityGD1 + quantityGD2;
            const totalNM = quantityNMGD1 + quantityNMGD2;

            const lostNT = totalCTT - totalNM;

            const percent = (lostNT / totalCTT) * 100;

            if (!isNaN(percent)) {
                const obj = {
                    TimeStamp: t2.getTime(),
                    Value: parseFloat(percent.toFixed(1)),
                };

                chartData.push(obj);
            }
        }

        return chartData;
    };

    const convertDataForNS = (data: any, start: any, end: any) => {
        const chartData = [];

        const space = calculateHoursBetweenDates(start, end);

        for (let i = 0; i <= space; i++) {
            const t = new Date(start);
            const t2 = new Date(start);

            t.setHours(t.getHours(), 0, 0, 0);
            t2.setHours(t2.getHours(), 0, 0, 0);

            t.setHours(t.getHours() - 1 + i);
            t2.setHours(t2.getHours() + i);

            const findNMGD1StartIndex =
                data[0].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findNMGD1EndIndex =
                data[0].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t2.getTime(),
                );

            const findNMGD2StartIndex =
                data[1].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findNMGD2EndIndex =
                data[1].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t2.getTime(),
                );

            const findTB1StartIndex =
                data[2].data.GetIndexLoggerFilterTime.find(
                    (el: any) =>
                        new Date(el.TimeStamp).getTime() === t.getTime(),
                );
            const findTB1EndIndex = data[2].data.GetIndexLoggerFilterTime.find(
                (el: any) => new Date(el.TimeStamp).getTime() === t2.getTime(),
            );

            const quantityNMGD1 =
                findNMGD1EndIndex.Value - findNMGD1StartIndex.Value;
            const quantityNMGD2 =
                findNMGD2EndIndex.Value - findNMGD2StartIndex.Value;
            const quantityTB1 = findTB1EndIndex.Value - findTB1StartIndex.Value;

            const totalNM = quantityNMGD1 + quantityNMGD2;
            const totalTB = quantityTB1;

            const lostNS = totalNM - totalTB;

            const percent = (lostNS / totalNM) * 100;

            if (!isNaN(percent)) {
                const obj = {
                    TimeStamp: t2.getTime(),
                    Value: parseFloat(percent.toFixed(1)),
                };

                chartData.push(obj);
            }
        }

        return chartData;
    };

    const getDataForNT = (start: any, end: any) => {
        Promise.all([
            getIndex('D800CD1_02', start, end),
            getIndex('D800CD2_02', start, end),
            getIndex('D600CD1_02', start, end),
            getIndex('D600CD2_02', start, end),
        ])
            .then((res) => {
                if (res.length > 0) {
                    const data = convertDataNT(res, start, end);

                    const temp = [...data];
                    temp.sort((a, b) => b.TimeStamp - a.TimeStamp);
                    //@ts-ignore
                    setData([...temp]);

                    drawChart(data);
                }
            })
            .catch((err) => console.error(err));
    };

    const getDataForNS = (start: any, end: any) => {
        Promise.all([
            getIndex('D600CD1_02', start, end),
            getIndex('D600CD2_02', start, end),
            getIndex('D800NMNT_02', start, end),
        ])
            .then((res) => {
                if (res.length > 0) {
                    const data = convertDataForNS(res, start, end);

                    const temp = [...data];
                    temp.sort((a, b) => b.TimeStamp - a.TimeStamp);
                    //@ts-ignore
                    setData([...temp]);

                    drawChart(data);
                }
            })
            .catch((err) => console.error(err));
    };

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
                maxDeviation: 0,
                baseInterval: {
                    timeUnit: 'hour',
                    count: 1,
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
                numberFormat: "#'%'",
                renderer: am5xy.AxisRendererY.new(root, {}),
            }),
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{valueY} %',
                }),
            }),
        );

        am5plugins_exporting.Exporting.new(root, {
            menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        });

        // Actual bullet
        series.bullets.push(function () {
            const bulletCircle = am5.Circle.new(root, {
                radius: 2,
                fill: series.get('fill'),
            });
            return am5.Bullet.new(root, {
                sprite: bulletCircle,
            });
        });

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        chart.set(
            'scrollbarX',
            am5.Scrollbar.new(root, {
                orientation: 'horizontal',
            }),
        );

        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    };

    useLayoutEffect(() => {
        if (lostWaterMode === 'NT') {
            getDataForNT(startDate, endDate);
        } else {
            getDataForNS(startDate, endDate);
        }
    }, [lostWaterMode]);

    const onViewChartClicked = () => {
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

        if (isAllow) {
            if (lostWaterMode === 'NT') {
                getDataForNT(startDate, endDate);
            } else {
                getDataForNS(startDate, endDate);
            }
        }
    };

    const columns = [
        {
            name: 'Thời gian',
            selector: (row: any) => row.TimeStamp,
            sortable: true,
            cellExport: (row: any) => convertDateToTimeString(row.TimeStamp),
            format: (row: any) => convertDateToTimeString(row.TimeStamp),
        },
        {
            name: 'Thất thoát (%)',
            selector: (row: any) => row.Value,
            sortable: true,
            cellExport: (row: any) => row.Value,
        },
    ];

    const tableData = {
        columns,
        data,
        fileName: `Thất thoát nước ${
            lostWaterMode === 'NT' ? 'thô' : 'sạch'
        } từ ${convertDateToTimeString(
            new Date(startDate),
        )} đến ${convertDateToTimeString(new Date(endDate))}`,
    };

    const onSwitchTableClicked = () => {
        setViewTable(true);
    };

    const onSwitchChartClicked = () => {
        setViewTable(false);
        setTimeout(() => {
            drawChart(data);
        }, 1000);
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
                    Thời gian bắt đầu
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
                        leftSection={<IconSearch size="1.125rem"></IconSearch>}
                        variant="filled"
                        color="green"
                        onClick={onViewChartClicked}
                    >
                        Lọc
                    </Button>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Center>
                    <Button
                        leftSection={<IconTable size="1.125rem"></IconTable>}
                        variant="filled"
                        color="violet"
                        onClick={onSwitchTableClicked}
                        disabled={viewTable}
                    >
                        Xem bảng dữ liệu
                    </Button>
                    <Space w="sm"></Space>
                    <Button
                        leftSection={
                            <IconChartAreaLine size="1.125rem"></IconChartAreaLine>
                        }
                        variant="filled"
                        color="blue"
                        onClick={onSwitchChartClicked}
                        disabled={!viewTable}
                    >
                        Xem biểu đồ dữ liệu
                    </Button>
                </Center>
            </Grid.Col>
            {viewTable === false ? (
                <Grid.Col span={{ base: 12 }}>
                    <div
                        id="chart"
                        style={{ width: '100%', height: '400px' }}
                    ></div>
                </Grid.Col>
            ) : (
                <Grid.Col span={{ base: 12 }}>
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            paginationPerPage={5}
                            sortIcon={<IconArrowBadgeUpFilled />}
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover={true}
                            dense={false}
                        />
                    </DataTableExtensions>
                </Grid.Col>
            )}
        </Grid>
    );
};

export default ChartLostWater;
