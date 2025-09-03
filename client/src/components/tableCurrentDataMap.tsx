import { useState, useEffect } from 'react';

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
import { convertDateToString } from '../utils/utils';

import { useGetChannelByLoggerIdQuery } from '../__generated__/graphql';

import {
    roundFlowCurrentDataTableMap,
    roundPressureCurrentDataTableMap,
} from '../utils/utils';

const TableCurrentDataMap = ({
    openTableCurrentData,
    onTabelCurrentDataCloseClicked,
    whiteBackgroundCurrentDataTable,
}: any) => {
    const [flowGD1, setFlowGD1] = useState(null);
    const [indexGD1, setIndexGD1] = useState(null);
    const [pressureGD1, setPressureGD1] = useState(null);
    const [timeStampGD1, setTimeStampGD1] = useState(null);

    const [flowGD2, setFlowGD2] = useState(null);
    const [pressureGD2, setPressureGD2] = useState(null);
    const [timeStampGD2, setTimeStampGD2] = useState(null);

    const [flowGD3] = useState(null);
    const [pressureGD3] = useState(null);
    const [timeStampGD3] = useState(null);

    const [flowNMGD1, setFlowNMGD1] = useState(null);
    const [indexNMGD1, setIndexNMGD1] = useState(null);
    const [pressureNMGD1, setPressureNMGD1] = useState(null);
    const [timeStampNMGD1, setTimeStampNMGD1] = useState(null);

    const [flowNMGD2, setFlowNMGD2] = useState(null);
    const [pressureNMGD2, setPressureNMGD2] = useState(null);
    const [timeStampNMGD2, setTimeStampNMGD2] = useState(null);

    const [flowNMGD3] = useState(null);
    const [pressureNMGD3] = useState(null);
    const [timeStampNMGD3] = useState(null);

    const [flowTB1, setFlowTB1] = useState(null);
    const [indexTB1, setIndexTB1] = useState(null);
    const [pressureTB1, setPressureTB1] = useState(null);
    const [timeStampTB1, setTimeStampTB1] = useState(null);

    const [flowTB2] = useState(null);
    const [pressureTB2] = useState(null);
    const [timeStampTB2] = useState(null);

    const [flowTBTA, setFlowTBTA] = useState(null);
    const [pressureTBTA, setPressureTBTA] = useState(null);
    const [indexTBTA, setIndexTBTA] = useState(null);
    const [timeStampTBTA, setTimeStampTBTA] = useState(null);

    const { refetch: getChannelByLoggerId } = useGetChannelByLoggerIdQuery();

    const getDataChannel = (loggerId: string) => {
        return getChannelByLoggerId({ loggerid: loggerId });
    };

    const getDataChannelForSetStata = () => {
        setIndexGD1(null);
        setIndexNMGD1(null);
        setIndexTB1(null);
        setIndexTBTA(null);

        getDataChannel('D800CD1').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureGD1(findPressure.LastValue);
                    setTimeStampGD1(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowGD1(findFlow.LastValue);
                    //@ts-ignore
                    setIndexGD1((current) => current + findFlow?.LastValue);

                    if (timeStampGD1 === null) {
                        setTimeStampGD1(findFlow?.TimeStamp);
                    }
                }
            }
        });

        getDataChannel('D800CD2').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureGD2(findPressure.LastValue);
                    setTimeStampGD2(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowGD2(findFlow.LastValue);
                    //@ts-ignore
                    setIndexGD1((current) => current + findFlow?.LastValue);

                    if (timeStampGD2 === null) {
                        setTimeStampGD2(findFlow?.TimeStamp);
                    }
                }
            }
        });

        getDataChannel('D600CD1').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureNMGD1(findPressure.LastValue);
                    setTimeStampNMGD1(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowNMGD1(findFlow.LastValue);
                    //@ts-ignore
                    setIndexNMGD1((current) => current + findFlow?.LastValue);

                    if (timeStampNMGD1 === null) {
                        setTimeStampNMGD1(findFlow?.TimeStamp);
                    }
                }
            }
        });

        getDataChannel('D600CD2').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureNMGD2(findPressure.LastValue);
                    setTimeStampNMGD2(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowNMGD2(findFlow.LastValue);
                    //@ts-ignore
                    setIndexNMGD1((current) => current + findFlow?.LastValue);

                    if (timeStampNMGD2 === null) {
                        setTimeStampNMGD2(findFlow?.TimeStamp);
                    }
                }
            }
        });

        getDataChannel('D800NMNT').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureTB1(findPressure.LastValue);
                    setTimeStampTB1(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowTB1(findFlow.LastValue);
                    //@ts-ignore
                    setIndexTB1((current) => current + findFlow?.LastValue);

                    if (timeStampNMGD2 === null) {
                        setTimeStampTB1(findFlow?.TimeStamp);
                    }
                }
            }
        });

        getDataChannel('TBTAML').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findPressure = res.data.GetChannelByLoggerId.find(
                    (el) => el?.Pressure1 === true || el?.Pressure2 === true,
                );
                if (findPressure !== undefined) {
                    //@ts-ignore
                    setPressureTBTA(findPressure.LastValue);
                    setTimeStampTBTA(findPressure?.TimeStamp);
                }
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setFlowTBTA(findFlow.LastValue);
                    //@ts-ignore
                    setIndexTBTA((current) => current + findFlow?.LastValue);

                    if (timeStampTBTA === null) {
                        setTimeStampTBTA(findFlow?.TimeStamp);
                    }
                }
            }
        });
    };

    useEffect(() => {
        getDataChannelForSetStata();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getDataChannelForSetStata();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, []);

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
                                <IconX size="1.125rem" color="white"></IconX>
                            </ActionIcon>
                        </Flex>
                        <ScrollArea>
                            <Table
                                withTableBorder
                                withColumnBorders
                                className="tableCurrent"
                            >
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
                                <Table.Tbody
                                    style={{
                                        background:
                                            whiteBackgroundCurrentDataTable
                                                ? 'white'
                                                : 'transparent',
                                    }}
                                >
                                    <Table.Tr>
                                        <Table.Td rowSpan={3}>
                                            <Text fw="bold" c="red" size="xs">
                                                Công trình thu
                                            </Text>
                                        </Table.Td>
                                        <Table.Td rowSpan={3}>
                                            <Text fw="bold" size="xs" c="black">
                                                Nước thô
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD1
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text c="blue" fw="bold" size="xs">
                                                {roundFlowCurrentDataTableMap(
                                                    flowGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text c="blue" fw="bold" size="xs">
                                                {roundFlowCurrentDataTableMap(
                                                    indexGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD2
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD3
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs">
                                                {convertDateToString(
                                                    timeStampGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>

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
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowNMGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    indexNMGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureNMGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampNMGD1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD2{' '}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowNMGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureNMGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampNMGD2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                GD3
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowNMGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureNMGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampNMGD3,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>

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
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowTB1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    indexTB1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureTB1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampTB1,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TB II - 2
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowTB2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureTB2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                {convertDateToString(
                                                    timeStampTB2,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>

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
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    flowTBTA,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="blue" fw="bold">
                                                {roundFlowCurrentDataTableMap(
                                                    indexTBTA,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs" c="red" fw="bold">
                                                {roundPressureCurrentDataTableMap(
                                                    pressureTBTA,
                                                )}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs">
                                                {' '}
                                                {convertDateToString(
                                                    timeStampTBTA,
                                                )}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Td>
                                            <Text size="xs" c="black">
                                                TBTA - 2
                                            </Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="blue"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text
                                                size="xs"
                                                c="red"
                                                fw="bold"
                                            ></Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="xs"></Text>
                                        </Table.Td>
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

export default TableCurrentDataMap;
