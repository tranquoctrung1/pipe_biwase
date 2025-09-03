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

import { useState, useEffect } from 'react';

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

const LostWaterMap = ({
    openLostWater,
    onLostWaterCloseClicked,
    onChartLostWaterNSClicked,
    onChartLostWaterNTClicked,
}: any) => {
    const backgroundCurrentIndex = '#0984e3';
    const backgroundLost = '#81ecec';
    const backgroundSummary = '#00b894';

    const dispatch = useDispatch();

    const startPeriod = useSelector(StartPeriodLostWaterState);
    const endPeriod = useSelector(EndPeriodLostWaterState);

    const [currentIndexTimeStamp, setCurrentIndexTimeStamp] = useState(null);

    const [currentIndexGD1, setCurrentIndexGD1] = useState(null);
    const [currentIndexGD2, setCurrentIndexGD2] = useState(null);
    const [currentIndexNMGD1, setCurrentIndexNMGD1] = useState(null);
    const [currentIndexNMGD2, setCurrentIndexNMGD2] = useState(null);
    const [currentIndexTB1, setCurrentIndexTB1] = useState(null);

    const [startIndexGD1, setStartIndexGD1] = useState(null);
    const [startIndexGD2, setStartIndexGD2] = useState(null);
    const [startIndexNMGD1, setStartIndexNMGD1] = useState(null);
    const [startIndexNMGD2, setStartIndexNMGD2] = useState(null);
    const [startIndexTB1, setStartIndexTB1] = useState(null);

    const [endPeriodIndexGD1, setEndPeriodIndexGD1] = useState(null);
    const [endPeriodIndexGD2, setEndPeriodIndexGD2] = useState(null);
    const [endPeriodIndexNMGD1, setEndPeriodIndexNMGD1] = useState(null);
    const [endPeriodIndexNMGD2, setEndPeriodIndexNMGD2] = useState(null);
    const [endPeriodIndexTB1, setEndPeriodIndexTB1] = useState(null);

    //@ts-ignore
    const quantityGD1 = endPeriodIndexGD1 - startIndexGD1;
    //@ts-ignore
    const quantityGD2 = endPeriodIndexGD2 - startIndexGD2;
    //@ts-ignore
    const quantityNMGD1 = endPeriodIndexNMGD1 - startIndexNMGD1;
    //@ts-ignore
    const quantityNMGD2 = endPeriodIndexNMGD2 - startIndexNMGD2;
    //@ts-ignore
    const quantityTB1 = endPeriodIndexTB1 - startIndexTB1;

    const totalCTT = quantityGD1 + quantityGD2;
    const totalNM = quantityNMGD1 + quantityNMGD2;
    const totalTB = quantityTB1;

    const lostNT = totalCTT - totalNM;
    const lostTB = totalNM - totalTB;

    const percentNT = isNaN((lostNT / totalCTT) * 100)
        ? 0
        : parseFloat(((lostNT / totalCTT) * 100).toFixed(1));
    const percentNS = isNaN((lostTB / totalNM) * 100)
        ? 0
        : parseFloat(((lostTB / totalNM) * 100).toFixed(1));

    const { refetch: getChannelByLoggerId } = useGetChannelByLoggerIdQuery();
    const { refetch: getIndexLogger } = useGetIndexLoggerExactTimeQuery();

    const getDataChannel = (loggerId: string) => {
        return getChannelByLoggerId({ loggerid: loggerId });
    };

    const getIndex = (channelid: string, time: string) => {
        return getIndexLogger({ channelid: channelid, time: time });
    };

    const getCurrentIndex = () => {
        getDataChannel('D800CD1').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setCurrentIndexGD1(findFlow?.LastIndex);

                    if (currentIndexTimeStamp === null) {
                        setCurrentIndexTimeStamp(findFlow?.IndexTimeStamp);
                    }

                    if (new Date().getHours() < 6) {
                        if (endPeriod === '') {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        findFlow?.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }

                        //@ts-ignore
                        setEndPeriodIndexGD1(findFlow?.LastIndex);
                    }
                }
            }
        });

        getDataChannel('D800CD2').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setCurrentIndexGD2(findFlow?.LastIndex);
                    if (currentIndexTimeStamp === null) {
                        setCurrentIndexTimeStamp(findFlow?.IndexTimeStamp);
                    }

                    if (new Date().getHours() < 6) {
                        if (endPeriod === '') {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        findFlow?.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }
                        //@ts-ignore
                        setEndPeriodIndexGD2(findFlow?.LastIndex);
                    }
                }
            }
        });

        getDataChannel('D600CD1').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setCurrentIndexNMGD1(findFlow?.LastIndex);
                    if (currentIndexTimeStamp === null) {
                        setCurrentIndexTimeStamp(findFlow?.IndexTimeStamp);
                    }

                    if (new Date().getHours() < 6) {
                        if (endPeriod === '') {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        findFlow?.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }
                        //@ts-ignore
                        setEndPeriodIndexNMGD1(findFlow?.LastIndex);
                    }
                }
            }
        });

        getDataChannel('D600CD2').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setCurrentIndexNMGD2(findFlow?.LastIndex);
                    if (currentIndexTimeStamp === null) {
                        setCurrentIndexTimeStamp(findFlow?.IndexTimeStamp);
                    }

                    if (new Date().getHours() < 6) {
                        if (endPeriod === '') {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        findFlow?.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }
                        //@ts-ignore
                        setEndPeriodIndexNMGD2(findFlow?.LastIndex);
                    }
                }
            }
        });

        getDataChannel('D800NMNT').then((res) => {
            if (res?.data?.GetChannelByLoggerId) {
                const findFlow = res.data.GetChannelByLoggerId.find(
                    (el) => el?.ForwardFlow === true,
                );
                if (findFlow !== undefined) {
                    //@ts-ignore
                    setCurrentIndexTB1(findFlow?.LastIndex);
                    if (currentIndexTimeStamp === null) {
                        setCurrentIndexTimeStamp(findFlow?.IndexTimeStamp);
                    }

                    if (new Date().getHours() < 6) {
                        if (endPeriod === '') {
                            dispatch(
                                setEndPeriod(
                                    convertDateToSetValueDateTimeLocalInput(
                                        findFlow?.IndexTimeStamp,
                                    ),
                                ),
                            );
                        }
                        //@ts-ignore
                        setEndPeriodIndexTB1(findFlow?.LastIndex);
                    }
                }
            }
        });
    };

    const getPeriodIndex = (time: any, isStart: boolean) => {
        getIndex('D800CD1_02', new Date(time).getTime().toString())
            .then((res) => {
                if (res?.data?.GetIndexLoggerExactTime) {
                    if (res.data.GetIndexLoggerExactTime.length > 0) {
                        if (isStart === true) {
                            setStartIndexGD1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        } else {
                            setEndPeriodIndexGD1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        }
                    } else {
                        setStartIndexGD1(null);
                    }
                }
            })
            .catch((err) => console.error(err));

        getIndex('D800CD2_02', new Date(time).getTime().toString())
            .then((res) => {
                if (res?.data?.GetIndexLoggerExactTime) {
                    if (res.data.GetIndexLoggerExactTime.length > 0) {
                        if (isStart === true) {
                            setStartIndexGD2(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        } else {
                            setEndPeriodIndexGD2(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        }
                    } else {
                        setStartIndexGD2(null);
                    }
                }
            })
            .catch((err) => console.error(err));

        getIndex('D600CD1_02', new Date(time).getTime().toString())
            .then((res) => {
                if (res?.data?.GetIndexLoggerExactTime) {
                    if (res.data.GetIndexLoggerExactTime.length > 0) {
                        if (isStart === true) {
                            setStartIndexNMGD1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        } else {
                            setEndPeriodIndexNMGD1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        }
                    } else {
                        setStartIndexNMGD1(null);
                    }
                }
            })
            .catch((err) => console.error(err));

        getIndex('D600CD2_02', new Date(time).getTime().toString())
            .then((res) => {
                if (res?.data?.GetIndexLoggerExactTime) {
                    if (res.data.GetIndexLoggerExactTime.length > 0) {
                        if (isStart === true) {
                            setStartIndexNMGD2(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        } else {
                            setEndPeriodIndexNMGD2(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        }
                    } else {
                        setStartIndexNMGD2(null);
                    }
                }
            })
            .catch((err) => console.error(err));

        getIndex('D800NMNT_02', new Date(time).getTime().toString())
            .then((res) => {
                if (res?.data?.GetIndexLoggerExactTime) {
                    if (res.data.GetIndexLoggerExactTime.length > 0) {
                        if (isStart === true) {
                            setStartIndexTB1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        } else {
                            setEndPeriodIndexTB1(
                                //@ts-ignore
                                res.data.GetIndexLoggerExactTime[0]?.Value,
                            );
                        }
                    } else {
                        setStartIndexTB1(null);
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    const onStartPeriodChanged = (e: any) => {
        dispatch(setStartPeriod(e.currentTarget.value));

        getPeriodIndex(e.currentTarget.value, true);
    };

    const onEndPeriodChanged = (e: any) => {
        dispatch(setEndPeriod(e.currentTarget.value));

        getPeriodIndex(e.currentTarget.value, false);
    };

    useEffect(() => {
        getCurrentIndex();

        const start = new Date();
        const end = new Date();

        start.setDate(start.getDate() - 1);
        start.setHours(6, 0, 0, 0);

        if (end.getHours() >= 6) {
            end.setHours(6, 0, 0, 0);
            dispatch(
                setEndPeriod(convertDateToSetValueDateTimeLocalInput(end)),
            );

            //get index for end period
            getPeriodIndex(end, false);
        }

        dispatch(
            setStartPeriod(convertDateToSetValueDateTimeLocalInput(start)),
        );

        //get index for start period
        getPeriodIndex(start, true);
    }, []);

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
                                    <IconX
                                        size="1.125rem"
                                        color="white"
                                    ></IconX>
                                </ActionIcon>
                            </Flex>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12 }}>
                            <ScrollArea>
                                <Table
                                    withTableBorder
                                    withColumnBorders
                                    style={{
                                        background: 'white',
                                    }}
                                >
                                    <Table.Thead>
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
                                                    background:
                                                        backgroundCurrentIndex,
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
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                <Text c="black">
                                                    Lượng thất thoát
                                                </Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{
                                                    background:
                                                        backgroundSummary,
                                                }}
                                            >
                                                <Text c="black">Kết luận</Text>
                                            </Table.Th>
                                            <Table.Th
                                                rowSpan={2}
                                                style={{
                                                    background:
                                                        backgroundSummary,
                                                }}
                                            >
                                                <Text c="black">Biểu đồ</Text>
                                            </Table.Th>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Th
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {convertDateToString(
                                                    currentIndexTimeStamp,
                                                )}
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#2ecc71',
                                                }}
                                            >
                                                <div>Bắt đầu chu kỳ</div>
                                                <div>
                                                    <input
                                                        type="datetime-local"
                                                        id="start"
                                                        name="trip-start"
                                                        value={startPeriod}
                                                        onChange={
                                                            onStartPeriodChanged
                                                        }
                                                        style={{
                                                            padding: '5px 8px',
                                                            borderRadius: '5px',
                                                        }}
                                                    />
                                                </div>
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: '#2980b9',
                                                }}
                                            >
                                                <div>Kết thúc chu kỳ</div>
                                                <div>
                                                    <input
                                                        type="datetime-local"
                                                        id="end"
                                                        name="trip-start"
                                                        value={endPeriod}
                                                        onChange={
                                                            onEndPeriodChanged
                                                        }
                                                        style={{
                                                            padding: '5px 8px',
                                                            borderRadius: '5px',
                                                        }}
                                                    />
                                                </div>
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
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                (m3)
                                            </Table.Th>
                                            <Table.Th
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                %
                                            </Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>
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
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {formatNumber(currentIndexGD1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(startIndexGD1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexGD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantityGD1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={3} fw={600}>
                                                {formatNumber(totalCTT)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                fw={600}
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                {formatNumber(lostNT)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                {`${formatNumber(percentNT)} %`}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                style={{
                                                    background:
                                                        backgroundSummary,
                                                }}
                                            ></Table.Td>
                                            <Table.Td
                                                rowSpan={6}
                                                style={{
                                                    background:
                                                        backgroundSummary,
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
                                                    ></IconChartAreaLine>
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td>GD2</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {formatNumber(currentIndexGD2)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(startIndexGD2)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexGD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantityGD2)}
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td>GD3</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                -
                                            </Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                        </Table.Tr>

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
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {formatNumber(
                                                    currentIndexNMGD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(startIndexNMGD1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexNMGD1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantityNMGD1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={3} fw={600}>
                                                {formatNumber(totalNM)}
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td>GD2</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {formatNumber(
                                                    currentIndexNMGD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(startIndexNMGD2)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexNMGD2,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantityNMGD2)}
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td>GD3</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                -
                                            </Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                            <Table.Td>-</Table.Td>
                                        </Table.Tr>

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
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
                                                }}
                                            >
                                                {formatNumber(currentIndexTB1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(startIndexTB1)}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(
                                                    endPeriodIndexTB1,
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                {formatNumber(quantityTB1)}
                                            </Table.Td>
                                            <Table.Td rowSpan={2} fw={600}>
                                                {formatNumber(totalTB)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                fw={600}
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                {formatNumber(lostTB)}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                style={{
                                                    background: backgroundLost,
                                                }}
                                            >
                                                {`${formatNumber(percentNS)} %`}
                                            </Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                style={{
                                                    background:
                                                        backgroundSummary,
                                                }}
                                            ></Table.Td>
                                            <Table.Td
                                                rowSpan={2}
                                                style={{
                                                    background:
                                                        backgroundSummary,
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
                                                    ></IconChartAreaLine>
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>
                                        <Table.Tr>
                                            <Table.Td>TB II - 2</Table.Td>
                                            <Table.Td
                                                style={{
                                                    background:
                                                        backgroundCurrentIndex,
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

export default LostWaterMap;
