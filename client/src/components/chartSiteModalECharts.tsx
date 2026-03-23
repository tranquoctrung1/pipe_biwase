import { Grid, Button, Flex, Text, LoadingOverlay, Box } from '@mantine/core';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    useGetDataLoggerOfSiteCurrentTimeQuery,
    useGetDataLoggerOfSiteByTimeStampQuery,
} from '../__generated__/graphql';
import {
    convertDateToSetValueDateTimeLocalInput,
    convertDateToString,
} from '../utils/utils';
import { setCurrentSiteReport } from '../features/currentSiteReport';

interface ChartSiteModalEChartsInterface {
    siteid: string;
    loggerid: string;
    location: string;
    pipeid: string;
    pipename: string;
    sizepipe: number;
    lengthpipe: number;
}

interface DataLoggerItem {
    TimeStamp: string;
    Value: number | null;
}

interface ChannelData {
    ChannelName: string;
    Unit: string;
    ListDataLogger: DataLoggerItem[];
}

const deduplicateData = (
    channel: ChannelData,
): { TimeStamp: string; Value: number | null }[] => {
    const seen = new Set<string>();
    return channel.ListDataLogger.filter((item) => {
        if (seen.has(item.TimeStamp)) return false;
        seen.add(item.TimeStamp);
        return true;
    }).map((item) => ({
        TimeStamp: item.TimeStamp,
        Value: item.Value != null ? parseFloat(item.Value.toFixed(2)) : null,
    }));
};

const createValueAxis = (data: ChannelData[]) => {
    if (data.length === 1) {
        const colorSeries =
            data[0].Unit === 'm' || data[0].Unit === 'bar'
                ? '#e74c3c'
                : '#3498db';
        return [
            {
                type: 'value',
                name: data[0].ChannelName,
                position: 'left',
                axisLine: { lineStyle: { color: colorSeries } },
            },
        ];
    }
    return [
        {
            type: 'value',
            name: 'AL',
            position: 'left',
            axisLine: { lineStyle: { color: '#e74c3c' } },
        },
        {
            type: 'value',
            name: 'LL',
            position: 'right',
            axisLine: { lineStyle: { color: '#3498db' } },
        },
    ];
};

const createSeries = (data: ChannelData[], isYearChart: boolean) =>
    data.map((item, index) => {
        const colorSeries =
            item.Unit === 'm' || item.Unit === 'bar' ? '#e74c3c' : '#3498db';
        const formattedData = deduplicateData(item).map((d) => [
            d.TimeStamp,
            d.Value,
        ]);
        return {
            name: `${item.ChannelName} (${item.Unit})`,
            type: 'line',
            data: formattedData,
            smooth: !isYearChart,
            lineStyle: { color: colorSeries },
            itemStyle: { color: colorSeries },
            symbol: 'circle',
            symbolSize: isYearChart ? 0 : 1,
            yAxisIndex: index === 0 ? 0 : 1,
        };
    });

const ChartSiteModalECharts = memo(
    ({
        siteid,
        loggerid,
        location,
        pipeid,
        pipename,
        sizepipe,
        lengthpipe,
    }: ChartSiteModalEChartsInterface) => {
        const [startDate, setStartDate] = useState('');
        const [endDate, setEndDate] = useState('');
        const [latestData, setLatestData] = useState('');
        const [visible, setVisible] = useState(false);
        const [disableButton, setDisableButton] = useState(false);

        const chartRef = useRef<HTMLDivElement>(null);
        const chartInstance = useRef<echarts.ECharts | null>(null);

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const { refetch: getDataLoggerCurrentTime } =
            useGetDataLoggerOfSiteCurrentTimeQuery();
        const { refetch: getDataLoggerByTimeStamp } =
            useGetDataLoggerOfSiteByTimeStampQuery();

        const setLoading = useCallback((loading: boolean) => {
            setVisible(loading);
            setDisableButton(loading);
        }, []);

        const drawChart = useCallback(
            (data: ChannelData[], isYearChart: boolean) => {
                if (!chartRef.current || data.length === 0) return;
                if (!chartInstance.current) {
                    chartInstance.current = echarts.init(chartRef.current);
                }
                chartInstance.current.setOption({
                    toolbox: {
                        feature: {
                            dataZoom: { yAxisIndex: 'none' },
                            restore: {},
                            saveAsImage: { name: location },
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: (params: any[]) => {
                            let content = `Thời gian: <span style="font-weight:bold">${convertDateToString(params[0].value[0])}</span><br/>`;
                            params.forEach((param) => {
                                content += `${param.seriesName}: <span style="font-weight:bold;color:${param.color}">${param.value[1]}</span><br/>`;
                            });
                            return content;
                        },
                    },
                    legend: {
                        data: data.map(
                            (el) => `${el.ChannelName} (${el.Unit})`,
                        ),
                        left: 10,
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
                    yAxis: createValueAxis(data),
                    series: createSeries(data, isYearChart),
                });
            },
            [location],
        );

        const fetchAndDraw = useCallback(
            (start: number, end: number, isYearChart = false) => {
                setLoading(true);
                getDataLoggerByTimeStamp({
                    loggerid,
                    start: start.toString(),
                    end: end.toString(),
                })
                    .then((res) => {
                        if (res?.data?.GetDataLoggerOfSiteByTimeStamp) {
                            drawChart(
                                res.data
                                    .GetDataLoggerOfSiteByTimeStamp as ChannelData[],
                                isYearChart,
                            );
                            setLoading(false);
                        }
                    })
                    .catch((err) => console.error(err));
            },
            [loggerid, getDataLoggerByTimeStamp, drawChart, setLoading],
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
            getDataLoggerCurrentTime({ loggerid })
                .then((res) => {
                    const list = res?.data?.GetDataLoggerOfSiteCurrentTime as
                        | ChannelData[]
                        | undefined;
                    if (!list?.length) return;

                    const firstWithData = list.find(
                        (d) => d.ListDataLogger?.length > 0,
                    );
                    if (!firstWithData) return;

                    const latestTs = firstWithData.ListDataLogger[0].TimeStamp;
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
        }, [loggerid]);

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

        const onViewReportQuantityClicked = useCallback(() => {
            dispatch(setCurrentSiteReport(siteid));
            navigate('/quantity');
        }, [dispatch, siteid, navigate]);

        const onViewReportQuantityStationIIClicked = useCallback(() => {
            dispatch(setCurrentSiteReport(siteid));
            navigate('/quantitytb');
        }, [dispatch, siteid, navigate]);

        const onViewReportQuantityRawWaterClicked = useCallback(() => {
            dispatch(setCurrentSiteReport(siteid));
            navigate('quantitynt');
        }, [dispatch, siteid, navigate]);

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
                    <Box pos="relative">
                        <LoadingOverlay
                            visible={visible}
                            zIndex={1000}
                            overlayProps={{ radius: 'sm', blur: 2 }}
                            loaderProps={{ color: 'blue', type: 'bars' }}
                        />
                        <div
                            ref={chartRef}
                            style={{ width: '100%', height: '400px' }}
                        />
                        <Flex justify="space-between" align="center">
                            <Flex gap="md" align="center" justify="center">
                                <Button
                                    variant="filled"
                                    color="green"
                                    onClick={onViewReportQuantityClicked}
                                >
                                    Sản lượng
                                </Button>
                                <Button
                                    variant="filled"
                                    color="blue"
                                    onClick={
                                        onViewReportQuantityStationIIClicked
                                    }
                                >
                                    Sản lượng trạm II
                                </Button>
                                <Button
                                    variant="filled"
                                    color="violet"
                                    onClick={
                                        onViewReportQuantityRawWaterClicked
                                    }
                                >
                                    Sản lượng nước thô
                                </Button>
                            </Flex>
                            <div style={{ textAlign: 'right' }}>
                                <Text size="sm">Mã tuyến ống: {pipeid}</Text>
                                <Text size="sm">Tên tuyến ống: {pipename}</Text>
                                <Text size="sm">
                                    Kích thước ống: {sizepipe}
                                </Text>
                                <Text size="sm">
                                    Độ dài tuyến ống: {lengthpipe}
                                </Text>
                            </div>
                        </Flex>
                    </Box>
                </Grid.Col>
            </Grid>
        );
    },
);

ChartSiteModalECharts.displayName = 'ChartSiteModalECharts';

export default ChartSiteModalECharts;
