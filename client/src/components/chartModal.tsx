import React, { useState, useLayoutEffect, useCallback } from 'react';
import { Grid, Button, Flex, Text } from '@mantine/core';
import {
    useGetDataLoggerByCurrentTimeQuery,
    useGetDataLoggerByTimeStampQuery,
} from '../__generated__/graphql';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import Swal from 'sweetalert2';
import { convertDateToSetValueDateTimeLocalInput } from '../utils/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChartModalProps {
    channelid: string | null;
    channelname: string | null;
    unit: string | null;
}

interface DataLoggerItem {
    TimeStamp: string;
    Value: number;
}

interface DataLoggerResult {
    ListDataLogger: DataLoggerItem[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CHART_DOM_ID = 'chart';
const CHART_HEIGHT = '400px';

// How far back each quick-range button reaches from `endDate`
interface TimeRange {
    label: string;
    /** Mutates a Date in-place to subtract the range from it */
    subtract: (d: Date) => void;
    /** When true, use grouped-data (year) chart variant */
    grouped?: boolean;
}

const TIME_RANGES: TimeRange[] = [
    { label: 'Xem 12 giờ', subtract: (d) => d.setHours(d.getHours() - 12) },
    { label: 'Xem 1 ngày', subtract: (d) => d.setDate(d.getDate() - 1) },
    { label: 'Xem 3 ngày', subtract: (d) => d.setDate(d.getDate() - 3) },
    { label: 'Xem 1 tuần', subtract: (d) => d.setDate(d.getDate() - 7) },
    { label: 'Xem 1 tháng', subtract: (d) => d.setMonth(d.getMonth() - 1) },
    {
        label: 'Xem 1 năm',
        subtract: (d) => d.setFullYear(d.getFullYear() - 1),
        grouped: true,
    },
];

// ---------------------------------------------------------------------------
// Helpers — pure, defined outside the component
// ---------------------------------------------------------------------------

/** Dispose any existing amCharts root bound to CHART_DOM_ID, then create a new one. */
function createFreshRoot(): am5.Root {
    am5.array.each(am5.registry.rootElements, (root) => {
        if (root.dom.id === CHART_DOM_ID) root.dispose();
    });
    return am5.Root.new(CHART_DOM_ID);
}

/** Build the shared theme tweaks applied to every chart. */
function buildTheme(root: am5.Root): am5.Theme {
    const theme = am5.Theme.new(root);
    theme.rule('AxisLabel', ['minor']).setAll({ dy: 1 });
    theme.rule('Grid', ['minor']).setAll({ strokeOpacity: 0.08 });
    return theme;
}

/** Transform raw API items into sorted amCharts data points. */
function toChartData(
    items: DataLoggerItem[],
): { TimeStamp: number; Value: number }[] {
    return items
        .map((item) => ({
            TimeStamp: new Date(item.TimeStamp).getTime(),
            Value: item.Value,
        }))
        .sort((a, b) => a.TimeStamp - b.TimeStamp);
}

/**
 * Render an amCharts XY line chart into CHART_DOM_ID.
 *
 * @param result   - raw API response
 * @param unit     - channel unit; drives series colour ('m' → red, else blue)
 * @param channelid - series name
 * @param grouped  - when true, enables data grouping (suitable for long ranges)
 */
function renderChart(
    result: DataLoggerResult,
    unit: string | null,
    channelid: string | null,
    grouped = false,
): void {
    const root = createFreshRoot();
    root.setThemes([am5themes_Animated.new(root), buildTheme(root)]);

    // --- XY chart ---
    const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: 'panX',
            wheelY: 'zoomX',
            paddingLeft: 0,
        }),
    );

    const cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, { behavior: 'zoomX' }),
    );
    cursor.lineY.set('visible', false);

    // --- Axes ---
    const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            groupData: grouped,
            maxDeviation: 0,
            baseInterval: { timeUnit: 'minute', count: 15 },
            renderer: am5xy.AxisRendererX.new(root, {
                minorGridEnabled: true,
                minGridDistance: 200,
                minorLabelsEnabled: true,
            }),
            tooltip: am5.Tooltip.new(root, {}),
        }),
    );
    xAxis.set('minorDateFormats', { day: 'dd', month: 'MM' });

    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {}),
        }),
    );

    // --- Series ---
    const seriesColor = unit === 'm' ? '#e74c3c' : '#3498db';

    const series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: channelid ?? undefined,
            xAxis,
            yAxis,
            valueYField: 'Value',
            valueXField: 'TimeStamp',
            tooltip: am5.Tooltip.new(root, {
                labelText: `{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ${unit}`,
            }),
            fill: am5.color(seriesColor),
            stroke: am5.color(seriesColor),
        }),
    );

    series.bullets.push(() =>
        am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 1.5,
                fill: series.get('fill'),
            }),
        }),
    );

    // --- Scrollbar ---
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

    // --- Data ---
    const chartData = toChartData(result.ListDataLogger);
    series.data.setAll(chartData);
    sbseries.data.setAll(chartData);

    series.appear(1000);
    chart.appear(1000, 100);
}

/** Show a Swal error for a missing date field. */
function warnMissingDate(field: 'start' | 'end'): void {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
            field === 'start'
                ? 'Chưa có thời gian bắt đầu'
                : 'Chưa có thời gian kết thúc',
    });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ChartModal = ({ channelid, channelname, unit }: ChartModalProps) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { refetch: fetchCurrentTime } = useGetDataLoggerByCurrentTimeQuery();
    const { refetch: fetchByTimestamp } = useGetDataLoggerByTimeStampQuery();

    // Load the chart with current-time data when the modal opens / channelid changes
    useLayoutEffect(() => {
        if (!channelid) return;

        fetchCurrentTime({ channelid })
            .then(({ data }) => {
                const result = data?.GetDataLoggerByCurrentTime as
                    | DataLoggerResult
                    | undefined;
                if (!result) return;

                const items = result.ListDataLogger;
                if (items.length > 0) {
                    setStartDate(
                        convertDateToSetValueDateTimeLocalInput(
                            items[items.length - 1].TimeStamp,
                        ),
                    );
                    setEndDate(
                        convertDateToSetValueDateTimeLocalInput(
                            items[0].TimeStamp,
                        ),
                    );
                }

                renderChart(result, unit, channelid);
            })
            .catch(console.error);
    }, [channelid]); // eslint-disable-line react-hooks/exhaustive-deps

    // ---------------------------------------------------------------------------
    // Shared fetch-and-render — used by every time-range button
    // ---------------------------------------------------------------------------

    const fetchAndRender = useCallback(
        (startMs: number, endMs: number, grouped = false) => {
            fetchByTimestamp({
                channelid,
                start: String(startMs),
                end: String(endMs),
            })
                .then(({ data }) => {
                    const result = data?.GetDataLoggerByTimeStamp as
                        | DataLoggerResult
                        | undefined;
                    if (result) renderChart(result, unit, channelid, grouped);
                })
                .catch(console.error);
        },
        [channelid, unit, fetchByTimestamp],
    );

    // Validates both date fields and returns {startMs, endMs} or null on failure
    const resolveRange = useCallback((): {
        startMs: number;
        endMs: number;
    } | null => {
        if (!startDate) {
            warnMissingDate('start');
            return null;
        }
        if (!endDate) {
            warnMissingDate('end');
            return null;
        }
        return {
            startMs: new Date(startDate).getTime(),
            endMs: new Date(endDate).getTime(),
        };
    }, [startDate, endDate]);

    // "Xem" button — uses the exact start/end inputs
    const onViewChartClicked = useCallback(() => {
        const range = resolveRange();
        if (range) fetchAndRender(range.startMs, range.endMs);
    }, [resolveRange, fetchAndRender]);

    // Quick-range buttons — all share one factory
    const makeQuickRangeHandler = useCallback(
        ({ subtract, grouped }: TimeRange) =>
            () => {
                const range = resolveRange();
                if (!range) return;

                const start = new Date(range.endMs);
                subtract(start);
                fetchAndRender(start.getTime(), range.endMs, grouped);
            },
        [resolveRange, fetchAndRender],
    );

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    return (
        <Grid>
            {/* Date inputs */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <label htmlFor="start" style={{ fontWeight: 500 }}>
                    Thời gian bắt đầu
                </label>
                <input
                    type="datetime-local"
                    id="start"
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

            {/* Quick-range buttons — generated from TIME_RANGES data */}
            <Grid.Col span={{ base: 12 }}>
                <Flex justify="center" gap="sm" align="center">
                    {TIME_RANGES.map((range) => (
                        <Button
                            key={range.label}
                            color="green"
                            variant="filled"
                            onClick={makeQuickRangeHandler(range)}
                        >
                            {range.label}
                        </Button>
                    ))}
                </Flex>
            </Grid.Col>

            {/* Chart */}
            <Grid.Col span={{ base: 12 }}>
                <Flex justify="center" align="center">
                    <Text fw={500}>Biều đồ kênh {channelname}</Text>
                </Flex>
                <div
                    id={CHART_DOM_ID}
                    style={{ width: '100%', height: CHART_HEIGHT }}
                />
            </Grid.Col>
        </Grid>
    );
};

export default React.memo(ChartModal);
