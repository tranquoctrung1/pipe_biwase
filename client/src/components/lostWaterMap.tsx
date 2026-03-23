import React, { useState, useEffect, useCallback } from 'react';
import Control from 'react-leaflet-custom-control';
import {
    Transition,
    Flex,
    Center,
    Text,
    Grid,
    ActionIcon,
    Table,
    ScrollArea,
} from '@mantine/core';
import { IconX, IconChartAreaLine } from '@tabler/icons-react';
import {
    formatNumber,
    convertDateToString,
    convertDateToSetValueDateTimeLocalInput,
} from '../utils/utils';
import {
    useGetChannelByLoggerIdQuery,
    useGetIndexLoggerExactTimeQuery,
} from '../__generated__/graphql';
import {
    StartPeriodLostWaterState,
    setStartPeriod,
} from '../features/startPeriodLostWater';
import {
    EndPeriodLostWaterState,
    setEndPeriod,
} from '../features/endPeriodLostWater';
import { useSelector, useDispatch } from 'react-redux';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LostWaterMapProps {
    openLostWater: boolean;
    onLostWaterCloseClicked: () => void;
    onChartLostWaterNSClicked: () => void;
    onChartLostWaterNTClicked: () => void;
}

interface MeterIndexes {
    GD1: number | null;
    GD2: number | null;
    NMGD1: number | null;
    NMGD2: number | null;
    TB1: number | null;
}

type MeterKey = keyof MeterIndexes;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BG_CURRENT = '#0984e3';
const BG_LOST = '#81ecec';
const BG_SUMMARY = '#00b894';

const EMPTY_INDEXES: MeterIndexes = {
    GD1: null,
    GD2: null,
    NMGD1: null,
    NMGD2: null,
    TB1: null,
};

/**
 * Maps each meter key to:
 * - `loggerId`   used by getCurrentIndex (fetches ForwardFlow channel)
 * - `channelId`  used by getPeriodIndex  (fetches index at exact time)
 */
const METER_CONFIG: Record<MeterKey, { loggerId: string; channelId: string }> =
    {
        GD1: { loggerId: 'D800CD1', channelId: 'D800CD1_02' },
        GD2: { loggerId: 'D800CD2', channelId: 'D800CD2_02' },
        NMGD1: { loggerId: 'D600CD1', channelId: 'D600CD1_02' },
        NMGD2: { loggerId: 'D600CD2', channelId: 'D600CD2_02' },
        TB1: { loggerId: 'D800NMNT', channelId: 'D800NMNT_02' },
    };

const METER_KEYS = Object.keys(METER_CONFIG) as MeterKey[];

// ---------------------------------------------------------------------------
// Helpers — pure, defined outside the component
// ---------------------------------------------------------------------------

function safePercent(numerator: number, denominator: number): number {
    if (!denominator || isNaN(numerator / denominator)) return 0;
    return parseFloat(((numerator / denominator) * 100).toFixed(1));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const LostWaterMap = ({
    openLostWater,
    onLostWaterCloseClicked,
    onChartLostWaterNSClicked,
    onChartLostWaterNTClicked,
}: LostWaterMapProps) => {
    const dispatch = useDispatch();
    const startPeriod = useSelector(StartPeriodLostWaterState);
    const endPeriod = useSelector(EndPeriodLostWaterState);

    // Single structured state objects instead of 15 individual useState calls
    const [currentIndexTimestamp, setCurrentIndexTimestamp] = useState<
        string | null
    >(null);
    const [currentIndexes, setCurrentIndexes] =
        useState<MeterIndexes>(EMPTY_INDEXES);
    const [startIndexes, setStartIndexes] =
        useState<MeterIndexes>(EMPTY_INDEXES);
    const [endPeriodIndexes, setEndPeriodIndexes] =
        useState<MeterIndexes>(EMPTY_INDEXES);

    const { refetch: fetchChannelByLoggerId } = useGetChannelByLoggerIdQuery();
    const { refetch: fetchIndexAtTime } = useGetIndexLoggerExactTimeQuery();

    // ---------------------------------------------------------------------------
    // Derived values
    // ---------------------------------------------------------------------------

    const quantity: MeterIndexes = {
        GD1: (endPeriodIndexes.GD1 ?? 0) - (startIndexes.GD1 ?? 0),
        GD2: (endPeriodIndexes.GD2 ?? 0) - (startIndexes.GD2 ?? 0),
        NMGD1: (endPeriodIndexes.NMGD1 ?? 0) - (startIndexes.NMGD1 ?? 0),
        NMGD2: (endPeriodIndexes.NMGD2 ?? 0) - (startIndexes.NMGD2 ?? 0),
        TB1: (endPeriodIndexes.TB1 ?? 0) - (startIndexes.TB1 ?? 0),
    };

    //@ts-ignore
    const totalCTT = quantity.GD1 + quantity.GD2;
    //@ts-ignore
    const totalNM = quantity.NMGD1 + quantity.NMGD2;
    const totalTB = quantity.TB1 ?? 0;

    const lostNT = totalCTT - totalNM;
    const lostTB = totalNM - totalTB;
    const percentNT = safePercent(lostNT, totalCTT);
    const percentNS = safePercent(lostTB, totalNM);

    // ---------------------------------------------------------------------------
    // Data fetching — data-driven, no repetition per meter
    // ---------------------------------------------------------------------------

    const getCurrentIndex = useCallback(() => {
        const isNightTime = new Date().getHours() < 6;

        METER_KEYS.forEach((key) => {
            const { loggerId } = METER_CONFIG[key];

            fetchChannelByLoggerId({ loggerid: loggerId })
                .then(({ data }) => {
                    const channels = data?.GetChannelByLoggerId;
                    if (!channels) return;

                    const flow = channels.find(
                        (ch) => ch?.ForwardFlow === true,
                    );
                    if (!flow) return;

                    const lastIndex = flow.LastIndex as number;

                    setCurrentIndexes((prev) => ({
                        ...prev,
                        [key]: lastIndex,
                    }));

                    setCurrentIndexTimestamp((prev) =>
                        prev === null ? (flow.IndexTimeStamp as string) : prev,
                    );

                    if (isNightTime) {
                        if (!endPeriod) {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        flow.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }
                        setEndPeriodIndexes((prev) => ({
                            ...prev,
                            [key]: lastIndex,
                        }));
                    }
                })
                .catch(console.error);
        });
    }, [fetchChannelByLoggerId, dispatch, endPeriod]);

    const getPeriodIndex = useCallback(
        (time: string | Date, isStart: boolean) => {
            const timeMs = new Date(time).getTime().toString();

            METER_KEYS.forEach((key) => {
                const { channelId } = METER_CONFIG[key];

                fetchIndexAtTime({ channelid: channelId, time: timeMs })
                    .then(({ data }) => {
                        const results = data?.GetIndexLoggerExactTime;
                        if (!results) return;

                        const value =
                            results.length > 0
                                ? (results[0]?.Value as number)
                                : null;

                        if (isStart) {
                            setStartIndexes((prev) => ({
                                ...prev,
                                [key]: value,
                            }));
                        } else {
                            setEndPeriodIndexes((prev) => ({
                                ...prev,
                                [key]: value,
                            }));
                        }
                    })
                    .catch(console.error);
            });
        },
        [fetchIndexAtTime],
    );

    // ---------------------------------------------------------------------------
    // Event handlers
    // ---------------------------------------------------------------------------

    const onStartPeriodChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setStartPeriod(e.currentTarget.value));
            getPeriodIndex(e.currentTarget.value, true);
        },
        [dispatch, getPeriodIndex],
    );

    const onEndPeriodChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setEndPeriod(e.currentTarget.value));
            getPeriodIndex(e.currentTarget.value, false);
        },
        [dispatch, getPeriodIndex],
    );

    // ---------------------------------------------------------------------------
    // Initialisation
    // ---------------------------------------------------------------------------

    useEffect(() => {
        getCurrentIndex();

        const start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(6, 0, 0, 0);

        const end = new Date();
        if (end.getHours() >= 6) {
            end.setHours(6, 0, 0, 0);
            dispatch(
                setEndPeriod(convertDateToSetValueDateTimeLocalInput(end)),
            );
            getPeriodIndex(end, false);
        }

        dispatch(
            setStartPeriod(convertDateToSetValueDateTimeLocalInput(start)),
        );
        getPeriodIndex(start, true);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ---------------------------------------------------------------------------
    // Render helpers
    // ---------------------------------------------------------------------------

    const currentTd = (value: number | null) => (
        <Table.Td style={{ background: BG_CURRENT }}>
            {formatNumber(value)}
        </Table.Td>
    );

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    return (
        <Control position="topleft">
            <Transition
                mounted={openLostWater}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <Grid
                        style={{
                            padding: '10px',
                            backgroundColor: '#f5deb338',
                            borderRadius: '5px',
                            maxWidth: '70vw',
                        }}
                    >
                        <Grid.Col span={{ base: 12 }}>
                            <Flex justify="end" align="center">
                                <ActionIcon
                                    variant="transparent"
                                    onClick={onLostWaterCloseClicked}
                                >
                                    <IconX size="1.125rem" color="white" />
                                </ActionIcon>
                            </Flex>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12 }}>
                            <ScrollArea>
                                <Table
                                    withTableBorder
                                    withColumnBorders
                                    style={{ background: 'white' }}
                                >
                                    <Table.Thead>
                                        {/* Row 1 */}
                                        <Table.Tr>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{ background: 'aqua' }}
                                            >
                                                <Text fw={600} c="black">
                                                    Vị trí
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{ background: 'aqua' }}
                                            >
                                                <Text fw={600} c="black">
                                                    Nước thô/sạch
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{ background: 'aqua' }}
                                            >
                                                <Text fw={600} c="black">
                                                    Tên đồng hồ
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: BG_CURRENT,
                                                }}
                                            >
                                                <Text c="black">
                                                    Chỉ số hiện tại (m3)
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                colSpan={4}
                                                style={{
                                                    background: '#fdcb6e',
                                                }}
                                            >
                                                <Center>
                                                    <Text c="black">
                                                        Chu kỳ tính
                                                    </Text>
                                                </Center>
                                            </Table.Th>
                                            <Table.Th
                                                colSpan={2}
                                                style={{ background: BG_LOST }}
                                            >
                                                <Text c="black">
                                                    Lượng thất thoát
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            >
                                                <Text c="black">Kết luận</Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            >
                                                <Text c="black">Biểu đồ</Text>
                                            </Table.Th>
                                        </Table.Tr>

                                        {/* Row 2 */}
                                        <Table.Tr>
                                            <Table.Th
                                                style={{
                                                    background: BG_CURRENT,
                                                }}
                                            >
                                                {convertDateToString(
                                                    currentIndexTimestamp,
                                                )}
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#2ecc71',
                                                }}
                                            >
                                                <div>Bắt đầu chu kỳ</div>
                                                <input
                                                    type="datetime-local"
                                                    id="start"
                                                    value={startPeriod}
                                                    onChange={
                                                        onStartPeriodChanged
                                                    }
                                                    style={{
                                                        padding: '5px 8px',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#2980b9',
                                                }}
                                            >
                                                <div>Kết thúc chu kỳ</div>
                                                <input
                                                    type="datetime-local"
                                                    id="end"
                                                    value={endPeriod}
                                                    onChange={
                                                        onEndPeriodChanged
                                                    }
                                                    style={{
                                                        padding: '5px 8px',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#e67e22',
                                                }}
                                            >
                                                Sản lượng (m3)
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#2980b9',
                                                }}
                                            >
                                                Tổng SL (m3)
                                            </Table.Th>
                                            <Table.Th
                                                style={{ background: BG_LOST }}
                                            >
                                                (m3)
                                            </Table.Th>
                                            <Table.Th
                                                style={{ background: BG_LOST }}
                                            >
                                                %
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>

                                    <Table.Tbody>
                                        {/* ── Công trình thu ── */}
                                        <Table.Tr>
                                            <Table.Td rowSpan={3}>
                                                <Center>
                                                    <Text fw={600} c="red">
                                                        Công trình thu
                                                    </Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td rowSpan={3}>
                                                <Center>
                                                    <Text>Nước thô</Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td>GD1</Table.Td>
                                            {currentTd(currentIndexes.GD1)}
                                            <Table.Td>
                                                {formatNumber(startIndexes.GD1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexes.GD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantity.GD1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={3} fw={600}>
                                                {formatNumber(totalCTT)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                fw={600}
                                                style={{ background: BG_LOST }}
                                            >
                                                {formatNumber(lostNT)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                style={{ background: BG_LOST }}
                                            >
                                                {`${formatNumber(percentNT)} %`}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            />
                                            <Table.Td
                                                rowSpan={6}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            >
                                                <ActionIcon
                                                    onClick={
                                                        onChartLostWaterNTClicked
                                                    }
                                                >
                                                    <IconChartAreaLine
                                                        size="1.125rem"
                                                        color="white"
                                                    />
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td>GD2</Table.Td>
                                            {currentTd(currentIndexes.GD2)}
                                            <Table.Td>
                                                {formatNumber(startIndexes.GD2)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexes.GD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantity.GD2)}
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td>GD3</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background: BG_CURRENT,
                                                }}
                                            >
                                                -
                                            </Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                        </Table.Tr>

                                        {/* ── Nhà máy xử lý ── */}
                                        <Table.Tr>
                                            <Table.Td rowSpan={3}>
                                                <Center>
                                                    <Text fw={600} c="red">
                                                        Nhà máy xử lý (nước thô)
                                                    </Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td rowSpan={3}>
                                                <Center>
                                                    <Text>Nước thô</Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td>GD1</Table.Td>
                                            {currentTd(currentIndexes.NMGD1)}
                                            <Table.Td>
                                                {formatNumber(
                                                    startIndexes.NMGD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexes.NMGD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantity.NMGD1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={3} fw={600}>
                                                {formatNumber(totalNM)}
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td>GD2</Table.Td>
                                            {currentTd(currentIndexes.NMGD2)}
                                            <Table.Td>
                                                {formatNumber(
                                                    startIndexes.NMGD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexes.NMGD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantity.NMGD2)}
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td>GD3</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background: BG_CURRENT,
                                                }}
                                            >
                                                -
                                            </Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                        </Table.Tr>

                                        {/* ── Trạm bơm II ── */}
                                        <Table.Tr>
                                            <Table.Td rowSpan={2}>
                                                <Center>
                                                    <Text fw={600} c="red">
                                                        Trạm bơm II
                                                    </Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td rowSpan={2}>
                                                <Center>
                                                    <Text>Nước sạch</Text>
                                                </Center>
                                            </Table.Td>
                                            <Table.Td>TB II - 1</Table.Td>
                                            {currentTd(currentIndexes.TB1)}
                                            <Table.Td>
                                                {formatNumber(startIndexes.TB1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexes.TB1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantity.TB1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={2} fw={600}>
                                                {formatNumber(totalTB)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                fw={600}
                                                style={{ background: BG_LOST }}
                                            >
                                                {formatNumber(lostTB)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                style={{ background: BG_LOST }}
                                            >
                                                {`${formatNumber(percentNS)} %`}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            />
                                            <Table.Td
                                                rowSpan={2}
                                                style={{
                                                    background: BG_SUMMARY,
                                                }}
                                            >
                                                <ActionIcon
                                                    onClick={
                                                        onChartLostWaterNSClicked
                                                    }
                                                >
                                                    <IconChartAreaLine
                                                        size="1.125rem"
                                                        color="white"
                                                    />
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>

                                        <Table.Tr>
                                            <Table.Td>TB II - 2</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background: BG_CURRENT,
                                                }}
                                            >
                                                -
                                            </Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                        </Table.Tr>
                                    </Table.Tbody>
                                </Table>
                            </ScrollArea>
                        </Grid.Col>
                    </Grid>
                )}
            </Transition>
        </Control>
    );
};

export default React.memo(LostWaterMap);
