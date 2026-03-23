import { Grid, Button, Flex, Text, LoadingOverlay, Box } from '@mantine/core';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Swal from 'sweetalert2';

import {
    useGetDataLoggerByCurrentTimeQuery,
    useGetDataLoggerByTimeStampQuery,
} from '../__generated__/graphql';
import {
    convertDateToSetValueDateTimeLocalInput,
    convertDateToString,
} from '../utils/utils';

interface ChartModalEChartsInterface {
    channelid: string | null;
    channelname: string | null;
    unit: string | null;
}

interface DataLoggerItem {
    TimeStamp: string;
    Value: number | null;
}

interface ChartData {
    ChannelName: string;
    Unit: string;
    ListDataLogger: DataLoggerItem[];
}

const deduplicateData = (
    data: ChartData,
): { TimeStamp: string; Value: number | null }[] => {
    const seen = new Set<string>();
    return data.ListDataLogger.filter((item) => {
        if (seen.has(item.TimeStamp)) return false;
        seen.add(item.TimeStamp);
        return true;
    }).map((item) => ({
        TimeStamp: item.TimeStamp,
        Value: item.Value != null ? parseFloat(item.Value.toFixed(2)) : null,
    }));
};

const ChartModalECharts = memo(
    ({ channelid, channelname, unit }: ChartModalEChartsInterface) => {
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const [latestData, setLatestData] = useState('');
        const [visible, setVisible] = useState(false);
        const [disableButton, setDisableButton] = useState(false);

        const chartRef = useRef<HTMLDivElement>(null);
        const chartInstance = useRef<echarts.ECharts | null>(null);

        const { refetch: getDataLoggerCurrentTime } =
            useGetDataLoggerByCurrentTimeQuery();
        const { refetch: getDataLoggerByTimeStamp } =
            useGetDataLoggerByTimeStampQuery();

        const drawChart = useCallback(
            (data: ChartData, isYearChart: boolean) => {
                if (!chartRef.current) return;
                if (!chartInstance.current) {
                    chartInstance.current = echarts.init(chartRef.current);
                }
                if (data.ListDataLogger.length === 0) return;

                const colorChart =
                    data.Unit === 'm' || data.Unit === 'bar'
                        ? '#e74c3c'
                        : '#3498db';

                const formattedData = deduplicateData(data).map((item) => [
                    item.TimeStamp,
                    item.Value,
                ]);

                chartInstance.current.setOption({
                    toolbox: {
                        feature: {
                            dataZoom: { yAxisIndex: 'none' },
                            restore: {},
                            saveAsImage: {},
                        },
                    },
                    legend: { data: [data.ChannelName], left: 10 },
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params: any) => {
                            const date = new Date(params[0].value[0]);
                            const value = params[0].value[1].toFixed(2);
                            return `Thời gian: <span style="font-weight:bold">${convertDateToString(date)}</span><br/>Giá trị: <span style="font-weight:bold;color:${colorChart}">${value}</span> ${unit}`;
                        },
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            start: isYearChart ? 80 : 0,
                            end: 100,
                        },
                        { type: 'inside' },
                    ],
                    xAxis: {
                        type: 'time',
                        axisLabel: {
                            formatter: (value: number) =>
                                new Date(value).toLocaleTimeString(),
                        },
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: data.ChannelName,
                            type: 'line',
                            data: formattedData,
                            smooth: !isYearChart,
                            lineStyle: { color: colorChart },
                            itemStyle: { color: colorChart },
                            symbol: 'circle',
                            symbolSize: 1,
                        },
                    ],
                });
            },
            [unit],
        );

        const setLoading = useCallback((loading: boolean) => {
            setVisible(loading);
            setDisableButton(loading);
        }, []);

        const fetchAndDraw = useCallback(
            (start: number, end: number, isYearChart = false) => {
                setLoading(true);
                getDataLoggerByTimeStamp({
                    channelid,
                    start: start.toString(),
                    end: end.toString(),
                })
                    .then((res) => {
                        if (res?.data?.GetDataLoggerByTimeStamp) {
                            drawChart(
                                res.data.GetDataLoggerByTimeStamp as ChartData,
                                isYearChart,
                            );
                            setLoading(false);
                        }
                    })
                    .catch((err) => console.error(err));
            },
            [channelid, getDataLoggerByTimeStamp, drawChart, setLoading],
        );

        const isAllowGetData = useCallback(
            (start: string, end: string): boolean => {
                if (!start) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Chưa có thời gian bắt đầu',
                    });
                    return false;
                }
                if (!end) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Chưa có thời gian kết thúc',
                    });
                    return false;
                }
                return true;
            },
            [],
        );

        useLayoutEffect(() => {
            setLoading(true);
            getDataLoggerCurrentTime({ channelid })
                .then((res) => {
                    const list = res?.data?.GetDataLoggerByCurrentTime
                        ?.ListDataLogger as DataLoggerItem[] | undefined;
                    if (!list?.length) return;

                    const latestTs = list[0].TimeStamp;
                    const endDt = new Date(latestTs);
                    const startDt = new Date(latestTs);
                    startDt.setDate(startDt.getDate() - 1);

                    setLatestData(latestTs);
                    setEndDate(convertDateToSetValueDateTimeLocalInput(endDt));
                    setStartDate(
                        convertDateToSetValueDateTimeLocalInput(startDt),
                    );

                    fetchAndDraw(startDt.getTime(), endDt.getTime(), false);
                })
                .catch((err) => console.error(err));
        }, [channelid]);

        const offsetFromLatest = useCallback(
            (offsetFn: (d: Date) => void, isYearChart = false) => {
                if (!isAllowGetData(startDate, endDate)) return;
                const end = new Date(latestData);
                const start = new Date(latestData);
                offsetFn(start);
                setEndDate(convertDateToSetValueDateTimeLocalInput(end));
                setStartDate(convertDateToSetValueDateTimeLocalInput(start));
                fetchAndDraw(start.getTime(), end.getTime(), isYearChart);
            },
            [latestData, startDate, endDate, isAllowGetData, fetchAndDraw],
        );

        const onViewChartClicked = useCallback(() => {
            if (!isAllowGetData(startDate, endDate)) return;
            fetchAndDraw(
                new Date(startDate).getTime(),
                new Date(endDate).getTime(),
                false,
            );
        }, [startDate, endDate, isAllowGetData, fetchAndDraw]);

        const onView12hClicked = useCallback(
            () => offsetFromLatest((d) => d.setHours(d.getHours() - 12)),
            [offsetFromLatest],
        );

        const onView1DayClicked = useCallback(
            () => offsetFromLatest((d) => d.setDate(d.getDate() - 1)),
            [offsetFromLatest],
        );

        const onView3DayClicked = useCallback(
            () => offsetFromLatest((d) => d.setDate(d.getDate() - 3)),
            [offsetFromLatest],
        );

        const onView1WeekClicked = useCallback(
            () => offsetFromLatest((d) => d.setDate(d.getDate() - 7)),
            [offsetFromLatest],
        );

        const onView1MonthClicked = useCallback(
            () => offsetFromLatest((d) => d.setMonth(d.getMonth() - 1)),
            [offsetFromLatest],
        );

        const onView1YearClicked = useCallback(
            () =>
                offsetFromLatest(
                    (d) => d.setFullYear(d.getFullYear() - 1),
                    true,
                ),
            [offsetFromLatest],
        );

        return (
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <label htmlFor="start" style={{ fontWeight: 500 }}>
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
                        name="trip-end"
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
                            disabled={disableButton}
                            onClick={onViewChartClicked}
                        >
                            Xem
                        </Button>
                    </Flex>
                </Grid.Col>

                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" gap="sm" align="center">
                        {[
                            { label: 'Xem 12 giờ', handler: onView12hClicked },
                            { label: 'Xem 1 ngày', handler: onView1DayClicked },
                            { label: 'Xem 3 ngày', handler: onView3DayClicked },
                            {
                                label: 'Xem 1 tuần',
                                handler: onView1WeekClicked,
                            },
                            {
                                label: 'Xem 1 tháng',
                                handler: onView1MonthClicked,
                            },
                            { label: 'Xem 1 năm', handler: onView1YearClicked },
                        ].map(({ label, handler }) => (
                            <Button
                                key={label}
                                color="green"
                                variant="filled"
                                disabled={disableButton}
                                onClick={handler}
                            >
                                {label}
                            </Button>
                        ))}
                    </Flex>
                </Grid.Col>

                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Text fw={500}>Biều đồ kênh {channelname}</Text>
                    </Flex>
                    <Box pos="relative">
                        <LoadingOverlay
                            visible={visible}
                            zIndex={1000}
                            overlayProps={{ radius: 'sm', blur: 2 }}
                            loaderProps={{ color: 'blue', type: 'bars' }}
                        />
                        <div
                            id="chart"
                            ref={chartRef}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </Box>
                </Grid.Col>
            </Grid>
        );
    },
);

ChartModalECharts.displayName = 'ChartModalECharts';

export default ChartModalECharts;
