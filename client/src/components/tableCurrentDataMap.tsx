import React, { useState, useEffect, useCallback } from 'react';
import {
    Table,
    Transition,
    Text,
    Center,
    Flex,
    ActionIcon,
    ScrollArea,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import Control from 'react-leaflet-custom-control';
import { useGetChannelByLoggerIdQuery } from '../__generated__/graphql';
import {
    convertDateToString,
    roundFlowCurrentDataTableMap,
    roundPressureCurrentDataTableMap,
} from '../utils/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TableCurrentDataMapProps {
    openTableCurrentData: boolean;
    onTabelCurrentDataCloseClicked: () => void;
    whiteBackgroundCurrentDataTable: boolean;
}

interface MeterReading {
    flow: number | null;
    pressure: number | null;
    timeStamp: string | null;
    /** Accumulated forward-flow index — only used for some meters */
    index: number | null;
}

type MeterKey =
    | 'GD1'
    | 'GD2'
    | 'GD3'
    | 'NMGD1'
    | 'NMGD2'
    | 'NMGD3'
    | 'TB1'
    | 'TB2'
    | 'TBTA';

type MeterReadings = Record<MeterKey, MeterReading>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

const EMPTY_READING: MeterReading = {
    flow: null,
    pressure: null,
    timeStamp: null,
    index: null,
};

const INITIAL_STATE: MeterReadings = {
    GD1: { ...EMPTY_READING },
    GD2: { ...EMPTY_READING },
    GD3: { ...EMPTY_READING },
    NMGD1: { ...EMPTY_READING },
    NMGD2: { ...EMPTY_READING },
    NMGD3: { ...EMPTY_READING },
    TB1: { ...EMPTY_READING },
    TB2: { ...EMPTY_READING },
    TBTA: { ...EMPTY_READING },
};

/**
 * Maps logger IDs to the meter keys they feed.
 * `indexKey` — which meter's accumulated index this logger contributes to.
 */
interface LoggerConfig {
    loggerId: string;
    /** The primary meter this logger maps to */
    meterKey: MeterKey;
    /** The meter whose index accumulator this logger adds to (may differ from meterKey) */
    indexKey: MeterKey;
}

const LOGGER_CONFIGS: LoggerConfig[] = [
    { loggerId: 'D800CD1', meterKey: 'GD1', indexKey: 'GD1' },
    { loggerId: 'D800CD2', meterKey: 'GD2', indexKey: 'GD1' }, // GD2 flow accumulates into GD1 index
    { loggerId: 'D600CD1', meterKey: 'NMGD1', indexKey: 'NMGD1' },
    { loggerId: 'D600CD2', meterKey: 'NMGD2', indexKey: 'NMGD1' }, // NMGD2 flow accumulates into NMGD1 index
    { loggerId: 'D800NMNT', meterKey: 'TB1', indexKey: 'TB1' },
    { loggerId: 'TBTAML', meterKey: 'TBTA', indexKey: 'TBTA' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TableCurrentDataMap = ({
    openTableCurrentData,
    onTabelCurrentDataCloseClicked,
    whiteBackgroundCurrentDataTable,
}: TableCurrentDataMapProps) => {
    const [readings, setReadings] = useState<MeterReadings>(INITIAL_STATE);

    const { refetch: fetchChannelByLoggerId } = useGetChannelByLoggerIdQuery();

    // ---------------------------------------------------------------------------
    // Data fetching — one loop replaces 6 identical blocks
    // ---------------------------------------------------------------------------

    const fetchAll = useCallback(() => {
        // Reset all index accumulators before re-fetching
        setReadings((prev) => {
            const next = { ...prev };
            (['GD1', 'NMGD1', 'TB1', 'TBTA'] as MeterKey[]).forEach((key) => {
                next[key] = { ...next[key], index: null };
            });
            return next;
        });

        LOGGER_CONFIGS.forEach(({ loggerId, meterKey, indexKey }) => {
            fetchChannelByLoggerId({ loggerid: loggerId })
                .then(({ data }) => {
                    const channels = data?.GetChannelByLoggerId;
                    if (!channels) return;

                    setReadings((prev) => {
                        const next = { ...prev };
                        const meter = { ...next[meterKey] };
                        const idxMeter = { ...next[indexKey] };

                        const pressure = channels.find(
                            (ch) =>
                                ch?.Pressure1 === true ||
                                ch?.Pressure2 === true,
                        );
                        if (pressure) {
                            meter.pressure = pressure.LastValue as number;
                            meter.timeStamp = pressure.TimeStamp as string;
                        }

                        const flow = channels.find(
                            (ch) => ch?.ForwardFlow === true,
                        );
                        if (flow) {
                            meter.flow = flow.LastValue as number;
                            if (!meter.timeStamp)
                                meter.timeStamp = flow.TimeStamp as string;

                            // Accumulate flow value into the designated index meter
                            idxMeter.index =
                                (idxMeter.index ?? 0) +
                                (flow.LastValue as number);
                            next[indexKey] = idxMeter;
                        }

                        next[meterKey] = meter;
                        return next;
                    });
                })
                .catch(console.error);
        });
    }, [fetchChannelByLoggerId]);

    useEffect(() => {
        fetchAll();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const interval = setInterval(fetchAll, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [fetchAll]);

    // ---------------------------------------------------------------------------
    // Render helpers — eliminates repeated <Text> boilerplate in table cells
    // ---------------------------------------------------------------------------

    const flowTd = (key: MeterKey) => (
        <Table.Td>
            <Text size="xs" c="blue" fw="bold">
                {roundFlowCurrentDataTableMap(readings[key].flow)}
            </Text>
        </Table.Td>
    );

    const indexTd = (key: MeterKey) => (
        <Table.Td>
            <Text size="xs" c="blue" fw="bold">
                {roundFlowCurrentDataTableMap(readings[key].index)}
            </Text>
        </Table.Td>
    );

    const pressureTd = (key: MeterKey) => (
        <Table.Td>
            <Text size="xs" c="red" fw="bold">
                {roundPressureCurrentDataTableMap(readings[key].pressure)}
            </Text>
        </Table.Td>
    );

    const timeTd = (key: MeterKey) => (
        <Table.Td>
            <Text size="xs" c="black">
                {convertDateToString(readings[key].timeStamp)}
            </Text>
        </Table.Td>
    );

    const emptyTd = () => <Table.Td />;

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    return (
        <Control position="topleft">
            <Transition
                mounted={openTableCurrentData}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            background: '#f5deb338',
                            padding: '10px',
                            borderRadius: '10px',
                            boxShadow: '0 0 5px rgba(0,0,0,.2)',
                            maxWidth: '70vw',
                        }}
                    >
                        <Flex justify="end" align="center">
                            <ActionIcon
                                variant="transparent"
                                onClick={onTabelCurrentDataCloseClicked}
                            >
                                <IconX size="1.125rem" color="white" />
                            </ActionIcon>
                        </Flex>

                        <ScrollArea>
                            <Table
                                withTableBorder
                                withColumnBorders
                                className="tableCurrent"
                            >
                                {/* ── Header ── */}
                                <Table.Thead style={{ background: 'aqua' }}>
                                    <Table.Tr>
                                        <Table.Th rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Vị trí
                                            </Text>
                                        </Table.Th>
                                        <Table.Th rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Nước thô/sạch
                                            </Text>
                                        </Table.Th>
                                        <Table.Th rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Đồng hồ
                                            </Text>
                                        </Table.Th>
                                        <Table.Th colSpan={2}>
                                            <Center>
                                                <Text
                                                    fw="bold"
                                                    c="black"
                                                    size="xs"
                                                >
                                                    Lưu lượng
                                                </Text>
                                            </Center>
                                        </Table.Th>
                                        <Table.Th rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Áp lực (m)
                                            </Text>
                                        </Table.Th>
                                        <Table.Th rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Thời gian
                                            </Text>
                                        </Table.Th>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>
                                            <Text fw="bold" c="black" size="xs">
                                                Thành phần
                                            </Text>
                                        </Table.Th>
                                        <Table.Th>
                                            <Text fw="bold" c="black" size="xs">
                                                Tổng
                                            </Text>
                                        </Table.Th>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>
                                            <Text fw="bold" c="black" size="xs">
                                                (m3/h)
                                            </Text>
                                        </Table.Th>
                                        <Table.Th>
                                            <Text fw="bold" c="black" size="xs">
                                                (m3/h)
                                            </Text>
                                        </Table.Th>
                                    </Table.Tr>
                                </Table.Thead>

                                {/* ── Body ── */}
                                <Table.Tbody
                                    style={{
                                        background:
                                            whiteBackgroundCurrentDataTable
                                                ? 'white'
                                                : 'transparent',
                                    }}
                                >
                                    {/* Công trình thu */}
                                    <Table.Tr>
                                        <Table.Td rowSpan={3}>
                                            <Text fw="bold" c="red" size="xs">
                                                Công trình thu
                                            </Text>
                                        </Table.Td>
                                        <Table.Td rowSpan={3}>
                                            <Text fw="bold" c="black" size="xs">
                                                Nước thô
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD1
                                            </Text>
                                        </Table.Td>
                                        {flowTd('GD1')}
                                        {indexTd('GD1')}
                                        {pressureTd('GD1')}
                                        {timeTd('GD1')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD2
                                            </Text>
                                        </Table.Td>
                                        {flowTd('GD2')}
                                        {emptyTd()}
                                        {pressureTd('GD2')}
                                        {timeTd('GD2')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD3
                                            </Text>
                                        </Table.Td>
                                        {flowTd('GD3')}
                                        {emptyTd()}
                                        {pressureTd('GD3')}
                                        {timeTd('GD3')}
                                    </Table.Tr>

                                    {/* Nhà máy xử lý */}
                                    <Table.Tr>
                                        <Table.Td rowSpan={3}>
                                            <Text size="xs" fw="bold" c="red">
                                                Nhà máy xử lý (nước thô)
                                            </Text>
                                        </Table.Td>
                                        <Table.Td rowSpan={3}>
                                            <Text size="xs" fw="bold" c="black">
                                                Nước thô
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD1
                                            </Text>
                                        </Table.Td>
                                        {flowTd('NMGD1')}
                                        {indexTd('NMGD1')}
                                        {pressureTd('NMGD1')}
                                        {timeTd('NMGD1')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD2
                                            </Text>
                                        </Table.Td>
                                        {flowTd('NMGD2')}
                                        {emptyTd()}
                                        {pressureTd('NMGD2')}
                                        {timeTd('NMGD2')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD3
                                            </Text>
                                        </Table.Td>
                                        {flowTd('NMGD3')}
                                        {emptyTd()}
                                        {pressureTd('NMGD3')}
                                        {timeTd('NMGD3')}
                                    </Table.Tr>

                                    {/* Trạm bơm 2 */}
                                    <Table.Tr>
                                        <Table.Td rowSpan={2}>
                                            <Text size="xs" fw="bold" c="red">
                                                Trạm bơm 2
                                            </Text>
                                        </Table.Td>
                                        <Table.Td rowSpan={2}>
                                            <Text size="xs" fw="bold" c="black">
                                                Nước sạch
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TB II - 1
                                            </Text>
                                        </Table.Td>
                                        {flowTd('TB1')}
                                        {indexTd('TB1')}
                                        {pressureTd('TB1')}
                                        {timeTd('TB1')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TB II - 2
                                            </Text>
                                        </Table.Td>
                                        {flowTd('TB2')}
                                        {emptyTd()}
                                        {pressureTd('TB2')}
                                        {timeTd('TB2')}
                                    </Table.Tr>

                                    {/* Trạm bơm Tăng Áp Mỹ Lệ */}
                                    <Table.Tr>
                                        <Table.Td rowSpan={2}>
                                            <Text size="xs" fw="bold" c="red">
                                                Trạm bơm Tăng Áp Mỹ Lệ
                                            </Text>
                                        </Table.Td>
                                        <Table.Td rowSpan={2}>
                                            <Text size="xs" fw="bold" c="black">
                                                Nước sạch
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TBTA - 1
                                            </Text>
                                        </Table.Td>
                                        {flowTd('TBTA')}
                                        {indexTd('TBTA')}
                                        {pressureTd('TBTA')}
                                        {timeTd('TBTA')}
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TBTA - 2
                                            </Text>
                                        </Table.Td>
                                        {emptyTd()}
                                        {emptyTd()}
                                        {emptyTd()}
                                        {emptyTd()}
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </ScrollArea>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default React.memo(TableCurrentDataMap);
