import {
    Grid,
    Flex,
    Button,
    Text,
    Table,
    Center,
    LoadingOverlay,
    Box,
} from '@mantine/core';

import { useState, useRef, useLayoutEffect } from 'react';

import { useGetQuantityMonthlyTb2Query } from '../__generated__/graphql';

import {
    convertDateToStringMonth,
    formatNumber,
    convertDateToStringMonthInput,
} from '../utils/utils';

import * as XLSX from 'xlsx';

const QuantityMonthlyTB = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const tableRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(
        new Date(new Date().getFullYear(), 0, 1),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
        ),
    );

    const { refetch: getQuanityMonthlyTB2 } = useGetQuantityMonthlyTb2Query();

    useLayoutEffect(() => {}, []);

    const onStartDateChanged = (e: any) => {
        setStartDate(new Date(e.currentTarget.value));
    };

    const onEndDateChanged = (e: any) => {
        setEndDate(new Date(e.currentTarget.value));
    };

    const renderTable = (data: any) => {
        const result = [];

        if (data.length > 0) {
            let sum = 0;
            let count = 0;
            let avg = 0;
            let descriptionForTotal = '';
            let checkEnoughDataForTotal = false;

            for (const item of data) {
                let backgroundColor = '';
                let description = '';
                let backgroundColorNotEnoughData = '';

                let checkOverMonth = false;

                if (
                    //@ts-ignore
                    new Date(item.TimeStamp).getMonth() <= endDate?.getMonth()
                ) {
                    if (item.IsEnoughData === false) {
                        backgroundColorNotEnoughData = 'yellow';
                        checkEnoughDataForTotal = true;

                        if (item.Value !== null) {
                            // if (
                            //     new Date(item.TimeStamp).getMonth() ===
                            //     startDate?.getMonth()
                            // ) {
                            //     description = `tính từ ngày ${startDate.getDate()} đến hết tháng`;
                            //     descriptionForTotal += `tính ${
                            //         item.CountDay
                            //     } ngày của tháng ${
                            //         new Date(item.TimeStamp).getMonth() + 1
                            //     }; `;
                            // } else if (
                            //     new Date(item.TimeStamp).getMonth() ===
                            //     endDate?.getMonth()
                            // ) {
                            //     description = `tính từ ngày 1 dến ngày ${endDate.getDate()}`;
                            //     descriptionForTotal += `tính ${
                            //         item.CountDay
                            //     } ngày của tháng ${
                            //         new Date(item.TimeStamp).getMonth() + 1
                            //     }; `;
                            // } else if (
                            //     item.StartDate !== null &&
                            //     item.EndDate !== null
                            // )
                            {
                                const start = new Date(item.StartDate);
                                const end = new Date(item.EndDate);
                                start.setDate(start.getDate() - 1);
                                end.setDate(end.getDate() - 1);

                                description = `tính từ ngày ${start.getDate()} đến ngày ${end.getDate()}`;
                                descriptionForTotal += `tính ${
                                    item.CountDay
                                } ngày của tháng ${
                                    new Date(item.TimeStamp).getMonth() + 1
                                }; `;
                            }
                        }
                    }

                    if (item.Value !== null) {
                        sum += parseInt(item.Value);
                        count += item.CountDay;
                    } else {
                        backgroundColor = '#ecf0f1';
                        description = 'Không có dữ liệu';
                        backgroundColorNotEnoughData = '';
                    }

                    checkOverMonth = true;
                }

                const content = (
                    <Table.Tr
                        key={item.TimeStamp}
                        style={{ background: backgroundColor }}
                    >
                        <Table.Td>
                            <Center>
                                <span style={{ marginRight: '3px' }}>
                                    Tháng
                                </span>
                                {convertDateToStringMonth(
                                    new Date(item.TimeStamp),
                                )}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {checkOverMonth &&
                                    (item.Value === null
                                        ? '-'
                                        : formatNumber(item.Value))}
                            </Center>
                        </Table.Td>
                        <Table.Td
                            style={{ background: backgroundColorNotEnoughData }}
                        >
                            <Center>
                                {checkOverMonth &&
                                    (item.CountDay === null
                                        ? '-'
                                        : item.CountDay)}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {checkOverMonth &&
                                    (item.AvgValue === null
                                        ? '-'
                                        : formatNumber(
                                              parseInt(item.AvgValue),
                                          ))}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>{description}</Center>
                        </Table.Td>
                    </Table.Tr>
                );

                result.push(content);
            }
            if (count === 0) {
                avg = sum / 1;
            } else {
                avg = sum / count;
            }

            const content = (
                <Table.Tr key={1}>
                    <Table.Td>
                        <Center>
                            <Text fw="bold">Tổng cộng/Trung bình</Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text fw="bold">{formatNumber(sum)}</Text>
                        </Center>
                    </Table.Td>
                    <Table.Td
                        style={{
                            background:
                                checkEnoughDataForTotal == true ? 'yellow' : '',
                        }}
                    >
                        <Center>{count}</Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text fw="bold">
                                {formatNumber(parseInt(avg.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td
                        style={{
                            background:
                                checkEnoughDataForTotal == true ? 'yellow' : '',
                        }}
                    >
                        <Center>{descriptionForTotal}</Center>
                    </Table.Td>
                </Table.Tr>
            );

            result.push(content);
        }
        //@ts-ignore
        setContentTable([...result]);
    };

    const onViewClicked = () => {
        let isAllowStartDate = true;
        let isAllowEndDate = true;

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

        if (isAllowStartDate && isAllowEndDate) {
            setLoading(true);
            //@ts-ignore
            const tempStart = new Date(startDate);
            //@ts-ignore
            const tempEnd = new Date(endDate);

            tempStart.setHours(0);
            tempEnd.setHours(0);

            getQuanityMonthlyTB2({
                start: startDate?.getTime().toString(),
                end: endDate?.getTime().toString(),
            })
                .then((res) => {
                    if (res?.data?.GetQuantityMonthlyTB2) {
                        setLoading(false);

                        renderTable(res.data.GetQuantityMonthlyTB2);
                    }
                })
                .catch((err) => console.error(err));
        }
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
        a.download = 'San_Luong_Nam_Tram_Bom_II.xlsx';
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the temporary anchor element
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <div>
                    <label
                        htmlFor="startDate"
                        style={{ fontWeight: 500, fontSize: '.9rem' }}
                    >
                        Chọn thời gian bắt đầu
                    </label>
                </div>
                <div>
                    <input
                        type="month"
                        id="startDate"
                        //@ts-ignore
                        value={convertDateToStringMonthInput(startDate)}
                        style={{
                            width: '100%',
                            outline: 'none',
                            padding: '5px',
                            backgroundColor:
                                'light-dark(var(--mantine-color-white), (var(--namtine-color-dark-6)))',
                            border: '.5px solid light-dark(rgb(118, 118, 118), rgb(133, 133, 133))',
                            borderRadius: 'var(--_input-radius)',
                        }}
                        onChange={onStartDateChanged}
                    />
                </div>
                <div>
                    <Text c="red" size=".5rem">
                        {errorStartDate}
                    </Text>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <div>
                    <label
                        htmlFor="startDate"
                        style={{ fontWeight: 500, fontSize: '.9rem' }}
                    >
                        Chọn thời gian kết thúc
                    </label>
                </div>
                <div>
                    <input
                        type="month"
                        id="endDate"
                        //@ts-ignore
                        value={convertDateToStringMonthInput(endDate)}
                        style={{
                            width: '100%',
                            outline: 'none',
                            padding: '5px',
                            backgroundColor:
                                'light-dark(var(--mantine-color-white), (var(--namtine-color-dark-6)))',
                            border: '.5px solid light-dark(rgb(118, 118, 118), rgb(133, 133, 133))',
                            borderRadius: 'var(--_input-radius)',
                        }}
                        onChange={onEndDateChanged}
                    />
                </div>
                <div>
                    <Text c="red" size=".5rem">
                        {errorEndDate}
                    </Text>
                </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Flex
                    justify="center"
                    align="flex-end"
                    style={{ height: '100%' }}
                    gap="sm"
                >
                    <Button
                        color="green"
                        variant="filled"
                        loading={loading}
                        onClick={onViewClicked}
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
                <Box pos="relative">
                    <LoadingOverlay
                        visible={loading}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: 'blue', type: 'bars' }}
                    />

                    <Table
                        stickyHeader
                        stickyHeaderOffset={60}
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                        captionSide="top"
                        ref={tableRef}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th colSpan={5}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Bảng Tổng Hợp Sản Lượng Sản Xuất Năm
                                            Tại Trạm II
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={5}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Năm{' '}
                                            <span style={{ color: 'red' }}>
                                                {endDate?.getFullYear()} (Từ{' '}
                                                {startDate?.getDate()}/
                                                {/* @ts-ignore */}
                                                {startDate?.getMonth() +
                                                    1} Đến {endDate?.getDate()}/
                                                {/* @ts-ignore */}
                                                {endDate?.getMonth() + 1})
                                            </span>
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={5}></Table.Th>
                            </Table.Tr>
                            <Table.Tr style={{ background: '#3498db' }}>
                                <Table.Th>
                                    <Center>
                                        <Text fw="bold">Thời gian</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text fw="bold">
                                            Sản lượng trạm II (m3)
                                        </Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text fw="bold">Số ngày</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text fw="bold">
                                            Sản lượng bình quân (m3/ngày)
                                        </Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text fw="bold">Ghi chú</Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{contentTable}</Table.Tbody>
                    </Table>
                </Box>
            </Grid.Col>
        </Grid>
    );
};

export default QuantityMonthlyTB;
