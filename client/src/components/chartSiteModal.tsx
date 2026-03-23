import React, { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { Grid, Button, Flex, Text } from '@mantine/core';
import {
    useGetDataLoggerOfSiteCurrentTimeQuery,
    useGetDataLoggerOfSiteByTimeStampQuery,
} from '../__generated__/graphql';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import Swal from 'sweetalert2';
import { convertDateToSetValueDateTimeLocalInput } from '../utils/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChartSiteModalProps {
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
    Value: number;
}

interface ChannelData {
    ChannelName: string;
    Unit: string;
    ListDataLogger: DataLoggerItem[];
}

// ---------------------------------------------------------------------------
// Constants — same TIME_RANGES pattern established in ChartModal
// ---------------------------------------------------------------------------

const CHART_DOM_ID = 'chart-site-modal';

interface TimeRange {
    label: string;
    subtract: (d: Date) => void;
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
// Pure helpers — outside the component, never recreated
// ---------------------------------------------------------------------------

function createFreshRoot(): am5.Root {
    am5.array.each(am5.registry.rootElements, (root) => {
        if (root.dom.id === CHART_DOM_ID) root.dispose();
    });
    return am5.Root.new(CHART_DOM_ID);
}

function buildTheme(root: am5.Root): am5.Theme {
    const theme = am5.Theme.new(root);
    theme.rule('AxisLabel', ['minor']).setAll({ dy: 1 });
    theme.rule('Grid', ['minor']).setAll({ strokeOpacity: 0.08 });
    return theme;
}

/**
 * Render a multi-series site chart.
 * `grouped` drives groupData on the x-axis (used for 1-year range).
 */
function renderChart(
    channels: ChannelData[],
    location: string,
    grouped = false,
): void {
    const root = createFreshRoot();
    root.setThemes([am5themes_Animated.new(root), buildTheme(root)]);

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

    // Each channel gets its own y-axis (alternating sides)
    channels.forEach((ch, idx) => {
        const seriesColor = ch.Unit === 'm' ? '#e74c3c' : '#3498db';
        const color = am5.color(seriesColor);

        const yRenderer = am5xy.AxisRendererY.new(root, {
            opposite: idx > 0,
            stroke: color,
            fill: color,
            strokeWidth: 2,
            strokeOpacity: 1,
        });

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, { maxDeviation: 1, renderer: yRenderer }),
        );

        if (chart.yAxes.indexOf(yAxis) > 0) {
            yAxis.set(
                'syncWithAxis',
                chart.yAxes.getIndex(0) as am5xy.ValueAxis<am5xy.AxisRenderer>,
            );
        }

        const series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: ch.ChannelName,
                xAxis,
                yAxis,
                valueYField: 'Value',
                valueXField: 'TimeStamp',
                tooltip: am5.Tooltip.new(root, {
                    labelText: `{valueX.formatDate("dd/MM/YYYY HH:mm")}: [bold]{valueY} ${ch.Unit}`,
                }),
                fill: color,
                stroke: color,
            }),
        );

        yRenderer.labels.template.set('fill', series.get('fill'));

        series.bullets.push(() =>
            am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 1.5,
                    fill: series.get('fill'),
                }),
            }),
        );

        const chartData = ch.ListDataLogger.map((item) => ({
            TimeStamp: new Date(item.TimeStamp).getTime(),
            Value: item.Value,
        })).sort((a, b) => a.TimeStamp - b.TimeStamp);

        series.data.setAll(chartData);
        series.appear(1000);
    });

    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, { orientation: 'horizontal' }),
    );

    // Legend
    const legend = chart.bottomAxesContainer.children.push(
        am5.Legend.new(root, {
            width: 300,
            height: 50,
            x: am5.percent(50),
            centerX: am5.percent(50),
            layout: root.horizontalLayout,
        }),
    );

    legend.itemContainers.template.events.on('pointerover', (e) => {
        const hovered = e.target.dataItem?.dataContext as am5xy.LineSeries;
        chart.series.each((s) => {
            const strokes = (s as am5xy.LineSeries).strokes.template;
            if (s !== hovered) {
                strokes.setAll({
                    strokeOpacity: 0.15,
                    stroke: am5.color(0x000000),
                });
            } else {
                strokes.setAll({ strokeWidth: 2 });
            }
        });
    });

    legend.itemContainers.template.events.on('pointerout', () => {
        chart.series.each((s) => {
            (s as am5xy.LineSeries).strokes.template.setAll({
                strokeOpacity: 1,
                strokeWidth: 1,
                stroke: s.get('fill'),
            });
        });
    });

    legend.itemContainers.template.set('width', am5.p100);
    legend.valueLabels.template.setAll({ width: am5.p100, textAlign: 'right' });
    legend.data.setAll(chart.series.values);

    am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        filePrefix: location,
    });

    chart.appear(1000, 100);
}

function validateDates(start: string, end: string): boolean {
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
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ChartSiteModal = ({
    loggerid,
    location,
    pipeid,
    pipename,
    sizepipe,
    lengthpipe,
}: ChartSiteModalProps) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { refetch: fetchCurrentTime } =
        useGetDataLoggerOfSiteCurrentTimeQuery();
    const { refetch: fetchByTimestamp } =
        useGetDataLoggerOfSiteByTimeStampQuery();

    // Load chart with current-time data when modal opens / loggerid changes
    useLayoutEffect(() => {
        if (!loggerid) return;

        fetchCurrentTime({ loggerid })
            .then(({ data }) => {
                const channels = data?.GetDataLoggerOfSiteCurrentTime as
                    | ChannelData[]
                    | undefined;
                if (!channels) return;

                // Set date range from first channel that has data
                for (const ch of channels) {
                    if (ch.ListDataLogger.length > 0) {
                        setStartDate(
                            convertDateToSetValueDateTimeLocalInput(
                                ch.ListDataLogger[ch.ListDataLogger.length - 1]
                                    .TimeStamp,
                            ),
                        );
                        setEndDate(
                            convertDateToSetValueDateTimeLocalInput(
                                ch.ListDataLogger[0].TimeStamp,
                            ),
                        );
                        break;
                    }
                }

                renderChart(channels, location);
            })
            .catch(console.error);
    }, [loggerid]); // eslint-disable-line react-hooks/exhaustive-deps

    // ---------------------------------------------------------------------------
    // Shared fetch-and-render
    // ---------------------------------------------------------------------------

    const fetchAndRender = useCallback(
        (startMs: number, endMs: number, grouped = false) => {
            fetchByTimestamp({
                loggerid,
                start: String(startMs),
                end: String(endMs),
            })
                .then(({ data }) => {
                    const channels = data?.GetDataLoggerOfSiteByTimeStamp as
                        | ChannelData[]
                        | undefined;
                    if (channels) renderChart(channels, location, grouped);
                })
                .catch(console.error);
        },
        [loggerid, location, fetchByTimestamp],
    );

    const resolveRange = useCallback((): {
        startMs: number;
        endMs: number;
    } | null => {
        if (!validateDates(startDate, endDate)) return null;
        return {
            startMs: new Date(startDate).getTime(),
            endMs: new Date(endDate).getTime(),
        };
    }, [startDate, endDate]);

    // "Xem" button
    const onViewChartClicked = useCallback(() => {
        const range = resolveRange();
        if (range) fetchAndRender(range.startMs, range.endMs);
    }, [resolveRange, fetchAndRender]);

    // Quick-range buttons — same factory as ChartModal
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

    // Pre-build handlers so they're stable across renders
    const quickHandlers = useMemo(
        () => TIME_RANGES.map((r) => makeQuickRangeHandler(r)),
        [makeQuickRangeHandler],
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

            {/* Quick-range buttons — generated from TIME_RANGES */}
            <Grid.Col span={{ base: 12 }}>
                <Flex justify="center" gap="sm" align="center">
                    {TIME_RANGES.map((range, i) => (
                        <Button
                            key={range.label}
                            color="green"
                            variant="filled"
                            onClick={quickHandlers[i]}
                        >
                            {range.label}
                        </Button>
                    ))}
                </Flex>
            </Grid.Col>

            {/* Chart + pipe info */}
            <Grid.Col span={{ base: 12 }}>
                <div
                    id={CHART_DOM_ID}
                    style={{ width: '100%', height: '400px' }}
                />
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

export default React.memo(ChartSiteModal);
