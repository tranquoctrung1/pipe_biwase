import React, {
    useState,
    useLayoutEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { Grid, Button, Flex, Space, Center } from '@mantine/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { useGetIndexLoggerFilterTimeQuery } from '../__generated__/graphql';
import {
    calculateHoursBetweenDates,
    convertDateToTimeString,
} from '../utils/utils';
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
import DataTable, { TableColumn } from 'react-data-table-component';
// @ts-ignore — no types available for this package
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChartLostWaterProps {
    lostWaterMode: 'NT' | 'NS' | '';
}

interface ChartPoint {
    TimeStamp: number;
    Value: number;
}

interface IndexRecord {
    TimeStamp: string;
    Value: number;
}

interface FetchResult {
    data?: {
        GetIndexLoggerFilterTime?: IndexRecord[];
    };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CHART_DOM_ID = 'chart-lost-water';

/**
 * Channel IDs fetched for each mode, in order.
 * `convertData` receives the results array in the same order.
 */
const CHANNELS: Record<'NT' | 'NS', string[]> = {
    NT: ['D800CD1_02', 'D800CD2_02', 'D600CD1_02', 'D600CD2_02'],
    NS: ['D600CD1_02', 'D600CD2_02', 'D800NMNT_02'],
};

const SORT_ICON = <IconArrowBadgeUpFilled />;

// ---------------------------------------------------------------------------
// Pure helpers — outside the component, never recreated
// ---------------------------------------------------------------------------

function getRecords(result: FetchResult): IndexRecord[] {
    return result?.data?.GetIndexLoggerFilterTime ?? [];
}

function findByTime(
    records: IndexRecord[],
    ms: number,
): IndexRecord | undefined {
    return records.find((r) => new Date(r.TimeStamp).getTime() === ms);
}

/**
 * Single loop used by both NT and NS modes.
 * `calcPercent` receives the per-hour quantities for each channel and returns
 * the loss percentage for that hour (or NaN to skip the point).
 */
function buildHourlyChart(
    results: FetchResult[],
    start: string,
    end: string,
    calcPercent: (quantities: number[]) => number,
): ChartPoint[] {
    const hours = calculateHoursBetweenDates(start, end);
    const series = results.map(getRecords);
    const points: ChartPoint[] = [];

    for (let i = 0; i <= hours; i++) {
        const tPrev = new Date(start);
        const tCurr = new Date(start);
        tPrev.setHours(tPrev.getHours(), 0, 0, 0);
        tCurr.setHours(tCurr.getHours(), 0, 0, 0);
        tPrev.setHours(tPrev.getHours() - 1 + i);
        tCurr.setHours(tCurr.getHours() + i);

        const prevMs = tPrev.getTime();
        const currMs = tCurr.getTime();

        const quantities = series.map((records) => {
            const prev = findByTime(records, prevMs);
            const curr = findByTime(records, currMs);
            if (!prev || !curr) return NaN;
            return curr.Value - prev.Value;
        });

        // Skip if any lookup failed
        if (quantities.some(isNaN)) continue;

        const pct = calcPercent(quantities);
        if (!isNaN(pct)) {
            points.push({
                TimeStamp: currMs,
                Value: parseFloat(pct.toFixed(1)),
            });
        }
    }

    return points;
}

// NT: [GD1, GD2, NMGD1, NMGD2]
function calcPercentNT([qGD1, qGD2, qNMGD1, qNMGD2]: number[]): number {
    const totalCTT = qGD1 + qGD2;
    const totalNM = qNMGD1 + qNMGD2;
    return ((totalCTT - totalNM) / totalCTT) * 100;
}

// NS: [NMGD1, NMGD2, TB1]
function calcPercentNS([qNMGD1, qNMGD2, qTB1]: number[]): number {
    const totalNM = qNMGD1 + qNMGD2;
    return ((totalNM - qTB1) / totalNM) * 100;
}

/** Dispose any existing root on CHART_DOM_ID and create a fresh one. */
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

function renderChart(points: ChartPoint[]): void {
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
            maxDeviation: 0,
            baseInterval: { timeUnit: 'hour', count: 1 },
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
            numberFormat: "#'%'",
            renderer: am5xy.AxisRendererY.new(root, {}),
        }),
    );

    const series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: 'Series',
            xAxis,
            yAxis,
            valueYField: 'Value',
            valueXField: 'TimeStamp',
            tooltip: am5.Tooltip.new(root, { labelText: '{valueY} %' }),
        }),
    );

    series.bullets.push(() =>
        am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 2,
                fill: series.get('fill'),
            }),
        }),
    );

    am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, { orientation: 'horizontal' }),
    );

    series.data.setAll(points);
    series.appear(1000);
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

const ChartLostWater = ({ lostWaterMode }: ChartLostWaterProps) => {
    // Read initial values from Redux once — do NOT call useSelector inside useState initialiser
    const reduxStart = useSelector(StartPeriodLostWaterState) as string;
    const reduxEnd = useSelector(EndPeriodLostWaterState) as string;

    const [startDate, setStartDate] = useState<string>(reduxStart);
    const [endDate, setEndDate] = useState<string>(reduxEnd);
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [viewTable, setViewTable] = useState(false);

    const { refetch: fetchIndex } = useGetIndexLoggerFilterTimeQuery();

    // Keep latest chartData in a ref so onSwitchChartClicked can access it
    // without being listed as a dependency (avoids stale closure).
    const chartDataRef = useRef<ChartPoint[]>([]);
    chartDataRef.current = chartData;

    // ---------------------------------------------------------------------------
    // Data fetching
    // ---------------------------------------------------------------------------

    const fetchAndRender = useCallback(
        (start: string, end: string) => {
            if (!validateDates(start, end) || !lostWaterMode) return;

            const channels = CHANNELS[lostWaterMode as 'NT' | 'NS'];
            const calcPercent =
                lostWaterMode === 'NT' ? calcPercentNT : calcPercentNS;

            Promise.all(
                channels.map((channelid) =>
                    fetchIndex({
                        channelid,
                        start: new Date(start).getTime().toString(),
                        end: new Date(end).getTime().toString(),
                    }),
                ),
            )
                .then((results) => {
                    const points = buildHourlyChart(
                        //@ts-ignore
                        results,
                        start,
                        end,
                        calcPercent,
                    );
                    const sorted = [...points].sort(
                        (a, b) => b.TimeStamp - a.TimeStamp,
                    );
                    setChartData(sorted);
                    renderChart(points);
                })
                .catch(console.error);
        },
        [lostWaterMode, fetchIndex],
    );

    useLayoutEffect(() => {
        fetchAndRender(startDate, endDate);
    }, [lostWaterMode]); // eslint-disable-line react-hooks/exhaustive-deps

    // ---------------------------------------------------------------------------
    // Handlers
    // ---------------------------------------------------------------------------

    const onViewChartClicked = useCallback(() => {
        fetchAndRender(startDate, endDate);
    }, [startDate, endDate, fetchAndRender]);

    const onSwitchTableClicked = useCallback(() => setViewTable(true), []);

    // Re-draw from the ref — no setTimeout needed because the chart div is
    // always in the DOM (we hide the table, not unmount the chart).
    const onSwitchChartClicked = useCallback(() => {
        setViewTable(false);
        renderChart(chartDataRef.current);
    }, []);

    // ---------------------------------------------------------------------------
    // Stable table config
    // ---------------------------------------------------------------------------

    const columns: TableColumn<ChartPoint>[] = useMemo(
        () => [
            {
                name: 'Thời gian',
                selector: (row) => row.TimeStamp,
                sortable: true,
                //@ts-ignore
                format: (row) => convertDateToTimeString(row.TimeStamp),
                cellExport: (row: ChartPoint) =>
                    //@ts-ignore
                    convertDateToTimeString(row.TimeStamp),
            },
            {
                name: 'Thất thoát (%)',
                selector: (row) => row.Value,
                sortable: true,
                cellExport: (row: ChartPoint) => row.Value,
            },
        ],
        [],
    );

    const tableData = useMemo(
        () => ({
            columns,
            data: chartData,
            fileName: `Thất thoát nước ${lostWaterMode === 'NT' ? 'thô' : 'sạch'} từ ${convertDateToTimeString(new Date(startDate))} đến ${convertDateToTimeString(new Date(endDate))}`,
        }),
        [columns, chartData, lostWaterMode, startDate, endDate],
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
                    Thời gian kết thúc{' '}
                    {/* Fixed: was labelled "bắt đầu" in original */}
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
                        leftSection={<IconSearch size="1.125rem" />}
                        variant="filled"
                        color="green"
                        onClick={onViewChartClicked}
                    >
                        Lọc
                    </Button>
                </Flex>
            </Grid.Col>

            {/* View toggles */}
            <Grid.Col span={{ base: 12 }}>
                <Center>
                    <Button
                        leftSection={<IconTable size="1.125rem" />}
                        variant="filled"
                        color="violet"
                        onClick={onSwitchTableClicked}
                        disabled={viewTable}
                    >
                        Xem bảng dữ liệu
                    </Button>
                    <Space w="sm" />
                    <Button
                        leftSection={<IconChartAreaLine size="1.125rem" />}
                        variant="filled"
                        color="blue"
                        onClick={onSwitchChartClicked}
                        disabled={!viewTable}
                    >
                        Xem biểu đồ dữ liệu
                    </Button>
                </Center>
            </Grid.Col>

            {/* Chart / Table */}
            <Grid.Col span={{ base: 12 }}>
                {viewTable ? (
                    <DataTableExtensions {...tableData}>
                        <DataTable<ChartPoint>
                            columns={columns}
                            data={chartData}
                            paginationPerPage={5}
                            sortIcon={SORT_ICON}
                            defaultSortAsc
                            pagination
                            highlightOnHover
                            dense={false}
                        />
                    </DataTableExtensions>
                ) : (
                    <div
                        id={CHART_DOM_ID}
                        style={{ width: '100%', height: '400px' }}
                    />
                )}
            </Grid.Col>
        </Grid>
    );
};

export default React.memo(ChartLostWater);
