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
import { useEffect, useState } from 'react';

import { useGetDataLoggerPressureByLoggerIdQuery } from '../__generated__/graphql';

import { convertDateToStringNotTimeNotYear } from '../utils/utils';

const TableCurrentPressureDataMap = ({
    openTableCurrentPressureData,
    onTableCurrentPressureDataCloseClicked,
}: any) => {
    const listLoggerId = [
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
    ];

    const [data, setData] = useState([]);

    const { refetch: getDataLogger } =
        useGetDataLoggerPressureByLoggerIdQuery();

    const findDataByHour = (hour: number, data: any) => {
        const find = data.find(
            //@ts-ignore
            (el) => new Date(el.TimeStamp).getHours() === hour,
        );

        if (find !== undefined) {
            return find.Value;
        }

        return '';
    };

    const getData = () => {
        //@ts-ignore
        setData([]);

        const temp = [];

        const start = new Date(Date.now());
        const end = new Date(Date.now());

        if (end.getHours() < 6) {
            start.setDate(start.getDate() - 1);
            end.setDate(end.getDate() - 1);
        }
        start.setHours(6, 0, 0, 0);
        end.setHours(24, 0, 0, 0);
        start.setHours(start.getHours() - 7);
        end.setHours(end.getHours() - 7);

        const totalMilisecondStart = start.getTime().toString();
        const totalMilisecondEnd = end.getTime().toString();

        for (const loggerid of listLoggerId) {
            temp.push(
                getDataLogger({
                    loggerid: loggerid,
                    start: totalMilisecondStart,
                    end: totalMilisecondEnd,
                }),
            );
        }

        Promise.all([...temp])
            .then((res) => {
                const temp = [];

                const now = new Date(Date.now());
                let hour = 24;
                if (now.getHours() > 6) {
                    hour = now.getHours();
                } else {
                    now.setDate(now.getDate() - 1);
                }

                for (let i = 6; i <= hour; i++) {
                    const content = [];
                    const fontColor =
                        new Date(Date.now()).getHours() === i
                            ? 'white'
                            : 'black';
                    const fontColorForTimeStamp =
                        new Date(Date.now()).getHours() === i ? 'white' : 'red';

                    for (const item of res) {
                        if (
                            //@ts-ignore
                            item.data.GetDataLoggerPressureByLoggerId?.length >
                            0
                        ) {
                            const value = findDataByHour(
                                i,
                                item.data.GetDataLoggerPressureByLoggerId,
                            );

                            const t = (
                                <Table.Td>
                                    <Center>
                                        {' '}
                                        <Text c={fontColor} size="xs">
                                            {value ? value.toFixed(1) : null}
                                        </Text>
                                    </Center>
                                </Table.Td>
                            );
                            content.push(t);
                        } else {
                            const t = <Table.Td></Table.Td>;
                            content.push(t);
                        }
                    }
                    const color =
                        new Date(Date.now()).getHours() === i ? 'red' : '';

                    const tmp = (
                        <Table.Tr style={{ background: color }}>
                            <Table.Td>
                                <Center>
                                    <Text c={fontColorForTimeStamp} size="xs">
                                        {convertDateToStringNotTimeNotYear(now)}{' '}
                                        {i}h
                                    </Text>
                                </Center>
                            </Table.Td>
                            {content}
                        </Table.Tr>
                    );

                    temp.push(tmp);
                }
                //@ts-ignore
                setData([...temp]);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getData();
    }, [openTableCurrentPressureData]);

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
                                    <IconX size="1rem"></IconX>
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
                                        <Table.Thead
                                            style={{
                                                background: 'aqua',
                                                position: 'sticky',
                                                top: 0,
                                            }}
                                        >
                                            <Table.Tr>
                                                <Table.Th rowSpan={3}>
                                                    <Text
                                                        fw="bold"
                                                        c="black"
                                                        size="xs"
                                                    >
                                                        Thời gian
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th colSpan={18}>
                                                    <Center>
                                                        <Text
                                                            fw="bold"
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            Các Đồng Hồ Chính
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            A
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            B
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            C
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            D
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            Q
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            E
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            F
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            R
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            S
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            G
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            H
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            I
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            T
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            K
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            L
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            M
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            Y
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Center>
                                                        <Text
                                                            c="black"
                                                            size="xs"
                                                        >
                                                            N
                                                        </Text>
                                                    </Center>
                                                </Table.Th>
                                            </Table.Tr>
                                            <Table.Tr
                                                style={{ background: 'white' }}
                                            >
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        NM - GĐ1
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        KCN Thanh Yến
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        RC
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        Mỹ Yên
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        Thép Tây Nam
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        LS - PV
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        T.V.Xuân
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        PHH - Bờ Ngựa
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        PHH - Tân Trạch
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        C.Đước - R.Đào
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: 'gray',
                                                    }}
                                                ></Table.Th>
                                                <Table.Th>
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        TTA - Mỹ Lệ
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: '#27ae60',
                                                    }}
                                                >
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        Hà Lan - DT830
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: '#27ae60',
                                                    }}
                                                >
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        B.Tâm - C.Trạm
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: 'gray',
                                                    }}
                                                ></Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: 'yellow',
                                                    }}
                                                >
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        B.Tâm - Đ.Thạnh 1
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: 'yellow',
                                                    }}
                                                >
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        NSCG - TT
                                                    </Text>
                                                </Table.Th>
                                                <Table.Th
                                                    style={{
                                                        background: 'aqua',
                                                    }}
                                                >
                                                    <Text
                                                        c="black"
                                                        size="xs"
                                                        tt="uppercase"
                                                    >
                                                        B.Tâm - CQT
                                                    </Text>
                                                </Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>{data}</Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Grid.Col>
                        </Grid>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default TableCurrentPressureDataMap;
