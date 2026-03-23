import Control from 'react-leaflet-custom-control';
import {
    Grid,
    ScrollArea,
    Transition,
    Flex,
    Text,
    ActionIcon,
    Table,
    Center,
} from '@mantine/core';

import { IconX } from '@tabler/icons-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useGetDataLoggerPressureByLoggerIdQuery } from '../__generated__/graphql';
import { convertDateToStringNotTimeNotYear } from '../utils/utils';

const LIST_LOGGER_ID = [
    'D600CD1',
    '841699925377',
    '84774816079',
    '841698154201',
    '8401699213723',
    '84817417591',
    '84855806214',
    '84972950466',
    '848489062140',
    '840972950220',
    'LoggerX',
    'TBTAML',
    '84845806214',
    '84972867905',
    'LoggerX2',
    '84382500808',
    '84846906214',
    '84845905214',
] as const;

const COLUMN_LABELS = [
    'A',
    'B',
    'C',
    'D',
    'Q',
    'E',
    'F',
    'R',
    'S',
    'G',
    'H',
    'I',
    'T',
    'K',
    'L',
    'M',
    'Y',
    'N',
] as const;

const COLUMN_SUBTITLES = [
    { label: 'NM - GĐ1' },
    { label: 'KCN Thanh Yến' },
    { label: 'RC' },
    { label: 'Mỹ Yên' },
    { label: 'Thép Tây Nam' },
    { label: 'LS - PV' },
    { label: 'T.V.Xuân' },
    { label: 'PHH - Bờ Ngựa' },
    { label: 'PHH - Tân Trạch' },
    { label: 'C.Đước - R.Đào' },
    { label: '', style: { background: 'gray' } },
    { label: 'TTA - Mỹ Lệ' },
    { label: 'Hà Lan - DT830', style: { background: '#27ae60' } },
    { label: 'B.Tâm - C.Trạm', style: { background: '#27ae60' } },
    { label: '', style: { background: 'gray' } },
    { label: 'B.Tâm - Đ.Thạnh 1', style: { background: 'yellow' } },
    { label: 'NSCG - TT', style: { background: 'yellow' } },
    { label: 'B.Tâm - CQT', style: { background: 'aqua' } },
] as const;

interface RowData {
    hour: number;
    dateLabel: string;
    isCurrentHour: boolean;
    values: (number | null)[];
}

const TableHeader = memo(() => (
    <Table.Thead
        style={{
            background: 'aqua',
            position: 'sticky',
            top: 0,
        }}
    >
        <Table.Tr>
            <Table.Th rowSpan={3}>
                <Text fw="bold" c="black" size="xs">
                    Thời gian
                </Text>
            </Table.Th>
            <Table.Th colSpan={18}>
                <Center>
                    <Text fw="bold" c="black" size="xs">
                        Các Đồng Hồ Chính
                    </Text>
                </Center>
            </Table.Th>
        </Table.Tr>
        <Table.Tr>
            {COLUMN_LABELS.map((label) => (
                <Table.Th key={label}>
                    <Center>
                        <Text c="black" size="xs">
                            {label}
                        </Text>
                    </Center>
                </Table.Th>
            ))}
        </Table.Tr>
        <Table.Tr style={{ background: 'white' }}>
            {COLUMN_SUBTITLES.map((col, idx) => (
                //@ts-ignore
                <Table.Th key={idx} style={col.style}>
                    {col.label ? (
                        <Text c="black" size="xs" tt="uppercase">
                            {col.label}
                        </Text>
                    ) : null}
                </Table.Th>
            ))}
        </Table.Tr>
    </Table.Thead>
));

TableHeader.displayName = 'TableHeader';

interface TableRowProps {
    row: RowData;
}

const TableRow = memo(({ row }: TableRowProps) => {
    const bgColor = row.isCurrentHour ? 'red' : '';
    const fontColor = row.isCurrentHour ? 'white' : 'black';
    const fontColorTimestamp = row.isCurrentHour ? 'white' : 'red';

    return (
        <Table.Tr style={{ background: bgColor }}>
            <Table.Td>
                <Center>
                    <Text c={fontColorTimestamp} size="xs">
                        {row.dateLabel} {row.hour}h
                    </Text>
                </Center>
            </Table.Td>
            {row.values.map((value, idx) => (
                <Table.Td key={idx}>
                    <Center>
                        <Text c={fontColor} size="xs">
                            {value != null ? value.toFixed(1) : null}
                        </Text>
                    </Center>
                </Table.Td>
            ))}
        </Table.Tr>
    );
});

TableRow.displayName = 'TableRow';

interface Props {
    openTableCurrentPressureData: boolean;
    onTableCurrentPressureDataCloseClicked: () => void;
}

const TableCurrentPressureDataMap = memo(
    ({
        openTableCurrentPressureData,
        onTableCurrentPressureDataCloseClicked,
    }: Props) => {
        const [rows, setRows] = useState<RowData[]>([]);

        const { refetch: getDataLogger } =
            useGetDataLoggerPressureByLoggerIdQuery();

        const findDataByHour = useCallback(
            (hour: number, data: any[]): number | null => {
                const found = data.find(
                    (el) => new Date(el.TimeStamp).getHours() === hour,
                );
                return found !== undefined ? found.Value : null;
            },
            [],
        );

        const getData = useCallback(() => {
            setRows([]);

            const now = new Date(Date.now());
            const start = new Date(now);
            const end = new Date(now);

            if (end.getHours() < 6) {
                start.setDate(start.getDate() - 1);
                end.setDate(end.getDate() - 1);
            }

            start.setHours(6 - 7, 0, 0, 0);
            end.setHours(24 - 7, 0, 0, 0);

            const totalMilisecondStart = start.getTime().toString();
            const totalMilisecondEnd = end.getTime().toString();

            const requests = LIST_LOGGER_ID.map((loggerid) =>
                getDataLogger({
                    loggerid,
                    start: totalMilisecondStart,
                    end: totalMilisecondEnd,
                }),
            );

            Promise.all(requests)
                .then((res) => {
                    const currentNow = new Date(Date.now());
                    const currentHour = currentNow.getHours();
                    const displayDate =
                        currentHour > 6
                            ? currentNow
                            : (() => {
                                  const d = new Date(currentNow);
                                  d.setDate(d.getDate() - 1);
                                  return d;
                              })();

                    const maxHour = currentHour > 6 ? currentHour : 24;
                    const dateLabel =
                        convertDateToStringNotTimeNotYear(displayDate);

                    const newRows: RowData[] = [];

                    for (let i = 6; i <= maxHour; i++) {
                        const values: (number | null)[] = res.map(
                            (item: any) => {
                                const loggerData =
                                    item.data?.GetDataLoggerPressureByLoggerId;
                                if (loggerData?.length > 0) {
                                    return findDataByHour(i, loggerData);
                                }
                                return null;
                            },
                        );

                        newRows.push({
                            hour: i,
                            dateLabel,
                            isCurrentHour: currentHour === i,
                            values,
                        });
                    }

                    setRows(newRows);
                })
                .catch((err) => console.error(err));
        }, [getDataLogger, findDataByHour]);

        useEffect(() => {
            getData();
        }, [openTableCurrentPressureData]);

        const tableBody = useMemo(
            () => rows.map((row) => <TableRow key={row.hour} row={row} />),
            [rows],
        );

        return (
            <Control position="bottomleft">
                <Transition
                    mounted={openTableCurrentPressureData}
                    transition="fade"
                    duration={200}
                    timingFunction="ease"
                >
                    {() => (
                        <div
                            style={{
                                width: '85vw',
                                height: '25rem',
                                background: 'white',
                                boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                                borderRadius: '10px',
                                padding: '10px',
                            }}
                        >
                            <Grid>
                                <Flex
                                    justify="end"
                                    align="center"
                                    style={{ width: '100%' }}
                                >
                                    <ActionIcon
                                        variant="transparent"
                                        onClick={
                                            onTableCurrentPressureDataCloseClicked
                                        }
                                    >
                                        <IconX size="1rem" />
                                    </ActionIcon>
                                </Flex>
                                <Grid.Col span={{ base: 12 }}>
                                    <Center>
                                        <Text c="red" size="sm">
                                            Áp lực tuyến ống nước sạch (m)
                                        </Text>
                                    </Center>
                                    <ScrollArea h="20rem">
                                        <Table
                                            withTableBorder
                                            withColumnBorders
                                            className="tableCurrent"
                                        >
                                            <TableHeader />
                                            <Table.Tbody>
                                                {tableBody}
                                            </Table.Tbody>
                                        </Table>
                                    </ScrollArea>
                                </Grid.Col>
                            </Grid>
                        </div>
                    )}
                </Transition>
            </Control>
        );
    },
);

TableCurrentPressureDataMap.displayName = 'TableCurrentPressureDataMap';

export default TableCurrentPressureDataMap;
