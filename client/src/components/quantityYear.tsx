import {
    Grid,
    Button,
    Text,
    MultiSelect,
    MultiSelectProps,
    Flex,
    Table,
    Center,
    NumberInput,
} from '@mantine/core';

import { useState, useRef, useEffect } from 'react';

import {
    useGetSiteIsMeterQuery,
    useGetQuantityYearlyQuery,
} from '../__generated__/graphql';

import { useSelector } from 'react-redux';

import { CurrentSiteReportState } from '../features/currentSiteReport';

import * as XLSX from 'xlsx';

import uuid from 'react-uuid';

const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
    option,
}) => <Text>{option.value}</Text>;

const QuantityYearComponent = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');
    const [errorChoiceSite, setErrorChoiceSite] = useState('');
    const [errorChoiceChannel, setErrorChoiceChannel] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const [contentHeader, setContentHeader] = useState(null);
    const [listSite, setListSite] = useState([]);
    const [siteData, setSiteData] = useState([]);
    const [choiceSite, setChoiceSite] = useState([]);
    const [choiceChannel, setChoiceChannel] = useState([
        'Ap Luc',
        'Luu Luong',
        'San Luong',
        'Luy Ke',
    ]);
    const tableRef = useRef(null);
    const [isFlowChannel, setIsFlowChannel] = useState(true);
    const [isQuantityChannel, setIsQuantityChannel] = useState(true);
    const [isIndexChannel, setIsIndexChannel] = useState(true);
    const [isPressureChannel, setIsPressureChannel] = useState(true);
    const [_, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const currentSiteReport = useSelector(CurrentSiteReportState);

    const start = new Date(Date.now());
    const end = new Date(Date.now());
    start.setFullYear(start.getFullYear() - 3);
    start.setHours(0, 0, 0, 0);

    end.setHours(0, 0, 0, 0);

    const [startDate, setStartDate] = useState<Date | null>(start);
    const [endDate, setEndDate] = useState<Date | null>(end);

    const [valueStartDate, setValueStartDate] = useState<string | number>(
        start.getFullYear(),
    );
    const [valueEndDate, setValueEndDate] = useState<string | number>(
        end.getFullYear(),
    );

    const { refetch: getSites } = useGetSiteIsMeterQuery();
    const { refetch: getQuantityDay } = useGetQuantityYearlyQuery();

    useEffect(() => {
        getSites()
            .then((res) => {
                if (res?.data?.GetSiteIsMeter) {
                    const temp = ['Select all'];

                    for (const item of res.data.GetSiteIsMeter) {
                        //@ts-ignore
                        temp.push(item?.SiteId);
                    }

                    //@ts-ignore
                    setListSite([...temp]);

                    //@ts-ignore
                    setSiteData([...res.data.GetSiteIsMeter]);
                }
            })
            .catch((err) => console.error(err));

        // if (
        //     currentSiteReport !== '' &&
        //     currentSiteReport !== null &&
        //     currentSiteReport !== undefined
        // ) {
        //     //@ts-ignore
        //     setChoiceSite([currentSiteReport]);

        //     setLoading(true);

        //     getQuantityDay({
        //         siteid: currentSiteReport,
        //         start: startDate?.getTime().toString(),
        //         end: endDate?.getTime().toString(),
        //     })
        //         .then((res) => {
        //             const temp = [];

        //             if (res?.data?.GetQuantityYearly) {
        //                 const obj = {
        //                     siteid: currentSiteReport,
        //                     data: res?.data?.GetQuantityYearly,
        //                 };
        //                 temp.push(obj);
        //             }

        //             //@ts-ignore
        //             setData([...temp]);
        //             renderTable(temp);
        //             setLoading(false);
        //         })
        //         .catch((err) => console.error(err));
        // }
    }, []);

    const onValueStartDateChanged = (e: any) => {
        const t = new Date(e, 0, 1, 0, 0, 0);

        setStartDate(t);

        setValueStartDate(e);
    };

    const onValueEndDateChanged = (e: any) => {
        const t = new Date(e, 0, 1, 0, 0, 0);
        setEndDate(t);
        setValueEndDate(e);
    };

    const onChoiceSiteChanged = (e: any) => {
        //@ts-ignore
        setChoiceSite([...e]);
    };

    const onChoiceChannelChanged = (e: any) => {
        //@ts-ignore
        setChoiceChannel([...e]);

        setIsPressureChannel(false);
        setIsFlowChannel(false);
        setIsQuantityChannel(false);
        setIsIndexChannel(false);

        for (const item of e) {
            if (item === 'Ap Luc') {
                setIsPressureChannel(true);
            } else if (item === 'Luu Luong') {
                setIsFlowChannel(true);
            } else if (item === 'San Luong') {
                setIsQuantityChannel(true);
            } else if (item === 'Luy Ke') {
                setIsIndexChannel(true);
            }
        }

        //renderTable(data);
    };

    const onViewClicked = async () => {
        let isAllowStartDate = true;
        let isAllowEndDate = true;
        let isAllowChoiceSite = true;
        let isAllowChoiceChannel = true;

        if (choiceSite.length === 0) {
            setErrorChoiceSite('Chưa chọn điểm đo !!!');
            isAllowChoiceSite = false;
        } else {
            setErrorChoiceSite('');
            isAllowChoiceSite = true;
        }
        if (choiceChannel.length === 0) {
            setErrorChoiceChannel('Chưa chọn kênh !!!');
            isAllowChoiceChannel = false;
        } else {
            setErrorChoiceChannel('');
            isAllowChoiceChannel = true;
        }
        if (startDate === null) {
            setErrorStartDate('Thời gian bắt đầu chưa có giá trị !!!');
            isAllowStartDate = false;
        } else {
            setErrorStartDate('');
            isAllowStartDate = true;
        }
        if (endDate === null) {
            setErrorEndDate('Thời gian kết thúc chưa có giá trị !!!');
            isAllowEndDate = false;
        } else {
            setErrorEndDate('');
            isAllowEndDate = true;
        }

        if (
            isAllowStartDate &&
            isAllowEndDate &&
            isAllowChoiceSite &&
            isAllowChoiceChannel
        ) {
            setLoading(true);

            const res = [];
            if (choiceSite[0] === 'Select all') {
                for (const site of siteData) {
                    const temp = await getQuantityDay({
                        //@ts-ignore
                        siteid: site.SiteId,
                        start: startDate?.getTime().toString(),
                        end: endDate?.getTime().toString(),
                    });

                    if (temp?.data?.GetQuantityYearly) {
                        const obj = {
                            //@ts-ignore
                            siteid: site.SiteId,
                            data: temp?.data?.GetQuantityYearly,
                        };
                        res.push(obj);
                    }
                }
                //@ts-ignore
                setData([...res]);
                renderTable(res);
                setLoading(false);
            } else {
                console.log(startDate);

                for (const site of choiceSite) {
                    const temp = await getQuantityDay({
                        siteid: site,
                        start: startDate?.getTime().toString(),
                        end: endDate?.getTime().toString(),
                    });

                    if (temp?.data?.GetQuantityYearly) {
                        const obj = {
                            siteid: site,
                            data: temp?.data?.GetQuantityYearly,
                        };
                        res.push(obj);
                    }
                }

                //@ts-ignore
                setData([...res]);
                renderTable(res);
                setLoading(false);
            }
        }
    };

    const renderHeader = (data: any) => {
        setContentHeader(null);

        const content = [];

        let totalMerger = 0;

        const contentSite = [];
        const contentChannel = [];
        const contentUnit = [];

        for (const item of data) {
            let mergeCol = 0;

            if (isPressureChannel == true) {
                mergeCol += 3;
                totalMerger += 3;
            }
            if (isFlowChannel === true) {
                mergeCol += 3;
                totalMerger += 3;
            }
            if (isIndexChannel === true) {
                mergeCol += 1;
                totalMerger += 1;
            }
            if (isQuantityChannel === true) {
                mergeCol += 1;
                totalMerger += 1;
            }

            //@ts-ignore
            const findSite = siteData.find((el) => el.SiteId === item.siteid);

            if (findSite !== undefined) {
                contentSite.push(
                    <Table.Th colSpan={mergeCol} key={uuid()}>
                        <Center>
                            {/* @ts-ignore */}
                            <Text fw="bold">{findSite.Location}</Text>
                        </Center>
                    </Table.Th>,
                );

                contentChannel.push(
                    <>
                        {isPressureChannel && (
                            <Table.Th colSpan={3} key={uuid()}>
                                <Center>
                                    <Text fw="bold">Áp lực</Text>
                                </Center>
                            </Table.Th>
                        )}
                        {isFlowChannel && (
                            <Table.Th colSpan={3} key={uuid()}>
                                <Center>
                                    <Text fw="bold">Lưu lượng thuận</Text>
                                </Center>
                            </Table.Th>
                        )}
                        {isQuantityChannel && (
                            <Table.Th key={uuid()}>
                                <Center>
                                    <Text fw="bold">Sản lượng</Text>
                                </Center>
                            </Table.Th>
                        )}
                        {isIndexChannel && (
                            <Table.Th key={uuid()}>
                                <Center>
                                    <Text fw="bold">Chỉ số lũy kế</Text>
                                </Center>
                            </Table.Th>
                        )}
                    </>,
                );

                contentUnit.push(
                    <>
                        {isPressureChannel && (
                            <>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Min (m)</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Max (m)</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Avg (m)</Text>
                                    </Center>
                                </Table.Th>
                            </>
                        )}
                        {isFlowChannel && (
                            <>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Min (m3/h)</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Max (m3/h)</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th key={uuid()}>
                                    <Center>
                                        <Text>Avg (m3/h)</Text>
                                    </Center>
                                </Table.Th>
                            </>
                        )}
                        {isQuantityChannel && (
                            <Table.Th key={uuid()}>
                                <Center>
                                    <Text>(m3)</Text>
                                </Center>
                            </Table.Th>
                        )}

                        {isIndexChannel && (
                            <Table.Th key={uuid()}>
                                <Center>
                                    <Text>(m3)</Text>
                                </Center>
                            </Table.Th>
                        )}
                    </>,
                );
            }
        }

        content.push(
            <>
                <Table.Tr>
                    <Table.Th colSpan={totalMerger}>
                        <Center>
                            <Text tt="uppercase" fw="bold">
                                Sản Lượng Năm Của Các Điểm Đo
                            </Text>
                        </Center>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th colSpan={totalMerger}>
                        <Center>
                            <Text tt="uppercase" fw="bold">
                                Từ năm {startDate?.getFullYear()} đến năm{' '}
                                {endDate?.getFullYear()}
                            </Text>
                        </Center>
                    </Table.Th>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th colSpan={totalMerger}></Table.Th>
                </Table.Tr>
                <Table.Tr style={{ background: '#3498db' }}>
                    <Table.Th rowSpan={3}>
                        <Center>
                            <Text fw="bold">Thời gian</Text>
                        </Center>
                    </Table.Th>
                    {contentSite}
                </Table.Tr>
                <Table.Tr style={{ background: '#3498db' }}>
                    {contentChannel}
                </Table.Tr>
                <Table.Tr>{contentUnit}</Table.Tr>
            </>,
        );

        //@ts-ignore
        setContentHeader([...content]);
    };

    const renderDataBody = (data: any, index: any) => {
        const content = [];

        for (let i = 0; i < data.length; i++) {
            content.push(
                <>
                    {isPressureChannel && (
                        <>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].MinPressure
                                            ? data[i].data[
                                                  index
                                              ].MinPressure.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].MaxPressure
                                            ? data[i].data[
                                                  index
                                              ].MaxPressure.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].AvgPressure
                                            ? data[i].data[
                                                  index
                                              ].AvgPressure.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                        </>
                    )}
                    {isFlowChannel && (
                        <>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].MinFlow
                                            ? data[i].data[
                                                  index
                                              ].MinFlow.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].MaxFlow
                                            ? data[i].data[
                                                  index
                                              ].MaxFlow.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                            <Table.Td key={uuid()}>
                                <Center>
                                    <Text>
                                        {data[i].data[index].AvgFlow
                                            ? data[i].data[
                                                  index
                                              ].AvgFlow.toFixed(2)
                                            : ''}
                                    </Text>
                                </Center>
                            </Table.Td>
                        </>
                    )}
                    {isQuantityChannel && (
                        <Table.Td key={uuid()}>
                            <Center>
                                <Text>
                                    {data[i].data[index].Quantity
                                        ? data[i].data[index].Quantity.toFixed(
                                              2,
                                          )
                                        : ''}
                                </Text>
                            </Center>
                        </Table.Td>
                    )}
                    {isIndexChannel && (
                        <Table.Td key={uuid()}>
                            <Center>
                                <Text>
                                    {data[i].data[index].Index
                                        ? data[i].data[index].Index.toFixed(2)
                                        : ''}
                                </Text>
                            </Center>
                        </Table.Td>
                    )}
                </>,
            );
        }

        return content;
    };

    const renderBody = (data: any) => {
        setContentTable(null);

        const content = [];

        for (let i = 0; i < data[0].data.length; i++) {
            content.push(
                //@ts-ignore
                <Table.Tr key={uuid()}>
                    <Table.Td>
                        <Center>
                            <Text>
                                Năm{' '}
                                {new Date(
                                    data[0].data[i].TimeStamp,
                                ).getFullYear()}
                            </Text>
                        </Center>
                    </Table.Td>
                    {renderDataBody(data, i)}
                </Table.Tr>,
            );
        }

        const contentRowTotal = [];

        for (const item of data) {
            let totalQuantity = 0;

            for (const el of item.data) {
                totalQuantity += el.Quantity;
            }

            if (isPressureChannel == true) {
                contentRowTotal.push(
                    <Table.Td colSpan={3} key={uuid()}></Table.Td>,
                );
            }
            if (isFlowChannel === true) {
                contentRowTotal.push(
                    <Table.Td colSpan={3} key={uuid()}></Table.Td>,
                );
            }
            if (isQuantityChannel === true) {
                contentRowTotal.push(
                    <Table.Td key={uuid()}>
                        <Center>
                            <Text fw="bold">{totalQuantity.toFixed(2)}</Text>
                        </Center>
                    </Table.Td>,
                );
            }
            if (isIndexChannel === true) {
                contentRowTotal.push(<Table.Td key={uuid()}></Table.Td>);
            }
        }
        const totalContent = (
            <Table.Tr>
                <Table.Td style={{ background: '#3498db' }}>
                    <Center>
                        <Text fw="bold">Tổng sản lượng</Text>
                    </Center>
                </Table.Td>
                {contentRowTotal}
            </Table.Tr>
        );

        content.push(totalContent);

        //@ts-ignore
        setContentTable([...content]);
    };

    const renderTable = (data: any) => {
        renderHeader(data);
        renderBody(data);
    };

    const onExportExcelClicked = () => {
        const tableElement = tableRef.current;

        // Convert the HTML table to a worksheet
        const worksheet = XLSX.utils.table_to_sheet(tableElement);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            //@ts-ignore
            `Tổng hợp SLXS năm`,
        );

        // Generate the Excel file and prompt download
        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        const blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Create a URL for the blob and trigger a download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `San_Luong_Theo_Nam_Tu_${startDate?.getFullYear()}_Den_${endDate?.getFullYear()}.xlsx`;
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the temporary anchor element
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <MultiSelect
                    checkIconPosition="right"
                    label="Chọn điểm đo"
                    placeholder="Chọn điểm đo"
                    renderOption={renderMultiSelectOption}
                    data={listSite}
                    defaultValue={currentSiteReport ? [currentSiteReport] : []}
                    searchable
                    onChange={onChoiceSiteChanged}
                    error={errorChoiceSite}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <MultiSelect
                    checkIconPosition="right"
                    label="Chọn loại kênh"
                    placeholder="Chọn loại kênh"
                    data={['Ap Luc', 'Luu Luong', 'San Luong', 'Luy Ke']}
                    searchable
                    defaultValue={[
                        'Ap Luc',
                        'Luu Luong',
                        'San Luong',
                        'Luy Ke',
                    ]}
                    onChange={onChoiceChannelChanged}
                    error={errorChoiceChannel}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <NumberInput
                    label="Chọn năm bắt đầu"
                    placeholder="Chọn năm bắt đầu"
                    value={valueStartDate}
                    onChange={onValueStartDateChanged}
                    error={errorStartDate}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
                <NumberInput
                    label="Chọn năm kết thúc"
                    placeholder="Chọn năm kết thúc"
                    value={valueEndDate}
                    onChange={onValueEndDateChanged}
                    error={errorEndDate}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Flex
                    justify="center"
                    align="flex-end"
                    style={{ height: '100%' }}
                    gap="sm"
                >
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onViewClicked}
                        loading={loading}
                    >
                        Xem
                    </Button>
                    <Button
                        color="green"
                        variant="filled"
                        onClick={onExportExcelClicked}
                    >
                        Xuất excel
                    </Button>
                </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Table.ScrollContainer minWidth={500}>
                    <Table
                        stickyHeader
                        stickyHeaderOffset={0}
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                        captionSide="top"
                        ref={tableRef}
                    >
                        {contentHeader !== null ? (
                            <Table.Thead>{contentHeader}</Table.Thead>
                        ) : (
                            <></>
                        )}

                        {contentTable !== null ? (
                            <Table.Tbody>{contentTable}</Table.Tbody>
                        ) : (
                            <></>
                        )}
                    </Table>
                </Table.ScrollContainer>
            </Grid.Col>
        </Grid>
    );
};

export default QuantityYearComponent;
