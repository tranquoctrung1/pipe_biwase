import {
    Grid,
    Flex,
    Button,
    Text,
    Table,
    Center,
    NumberInput,
    LoadingOverlay,
    Box,
} from '@mantine/core';

import { useState, useRef, useLayoutEffect } from 'react';

import { useGetQuantityYearlyNtQuery } from '../__generated__/graphql';

import { getDayOfYear, formatNumber } from '../utils/utils';

import * as XLSX from 'xlsx';

const QuantityYearlyNT = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const tableRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(
        new Date(new Date().getFullYear() - 3, 0, 1),
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
        ),
    );

    const [valueStartDate, setValueStartDate] = useState<string | number>(
        new Date().getFullYear() - 3,
    );
    const [valueEndDate, setValueEndDate] = useState<string | number>(
        new Date().getFullYear(),
    );

    const { refetch: getQuanityYearlyNT } = useGetQuantityYearlyNtQuery();

    useLayoutEffect(() => {}, []);

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
                    new Date(item.TimeStamp).getFullYear() <=
                    //@ts-ignore
                    endDate?.getFullYear()
                ) {
                    if (item.IsEnoughData === false) {
                        backgroundColorNotEnoughData = 'yellow';
                        checkEnoughDataForTotal = true;

                        if (
                            item.StartDate !== null &&
                            item.EndDate !== null &&
                            item.Value !== null
                        ) {
                            description = `tính từ ngày ${getDayOfYear(
                                new Date(item.StartDate),
                            )} dến ngày ${getDayOfYear(
                                new Date(item.EndDate),
                            )}`;
                            descriptionForTotal += `tính ${
                                item.CountDay
                            } ngày của năm ${new Date(
                                item.TimeStamp,
                            ).getFullYear()}; `;
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
                                <span style={{ marginRight: '3px' }}>Năm</span>

                                {new Date(item.TimeStamp).getFullYear()}
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

            getQuanityYearlyNT({
                start: startDate?.getTime().toString(),
                end: endDate?.getTime().toString(),
            })
                .then((res) => {
                    if (res?.data?.GetQuantityYearlyNT) {
                        setLoading(false);
                        renderTable(res.data.GetQuantityYearlyNT);
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
            `Tổng hợp SLXS các năm`,
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
        a.download = 'San_Luong_Cac_Nam_Nuoc_Tho_CTT.xlsx';
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the temporary anchor element
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <NumberInput
                    label="Chọn năm bắt đầu"
                    placeholder="Chọn năm bắt đầu"
                    value={valueStartDate}
                    onChange={onValueStartDateChanged}
                    error={errorStartDate}
                />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
                <NumberInput
                    label="Chọn năm kết thúc"
                    placeholder="Chọn năm kết thúc"
                    value={valueEndDate}
                    onChange={onValueEndDateChanged}
                    error={errorEndDate}
                />
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
                                            Bảng Tổng Hợp Nước Thô Các Năm Tại
                                            Công Trình Thu
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={5}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Từ{' '}
                                            <span style={{ color: 'red' }}>
                                                {startDate?.getDate()}/
                                                {/* @ts-ignore */}
                                                {startDate?.getMonth() + 1}/
                                                {startDate?.getFullYear()} Đến{' '}
                                                {endDate?.getDate()}/
                                                {/* @ts-ignore */}
                                                {endDate?.getMonth() + 1}/
                                                {endDate?.getFullYear()}
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
                                            Tổng sản lượng (m3)
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

export default QuantityYearlyNT;
