import {
    Grid,
    Flex,
    Button,
    Text,
    Table,
    Center,
    Space,
    LoadingOverlay,
    Box,
} from '@mantine/core';

import { useState, useRef } from 'react';

import { useGetQuantityDailyTb2Query } from '../__generated__/graphql';

import { convertDateToStringNotTime, formatNumber } from '../utils/utils';

import * as XLSX from 'xlsx';

const QuantityDailyTB = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const tableRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(null);

    const { refetch: getQuantityDaily } = useGetQuantityDailyTb2Query();

    const onStartDateChanged = (e: any) => {
        setStartDate(new Date(e.currentTarget.value));
    };

    const renderTable = (data: any) => {
        const result = [];

        let sum = 0;
        let count = 0;
        let avg = 0;

        if (data.length > 0) {
            for (const item of data) {
                if (item.Value !== null) {
                    sum += item.Value;
                    count += 1;
                }

                const content = (
                    <Table.Tr key={item.TimeStamp}>
                        <Table.Td>
                            <Center>
                                {convertDateToStringNotTime(
                                    new Date(item.TimeStamp),
                                )}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {item.Value === null
                                    ? '-'
                                    : formatNumber(item.Value)}
                            </Center>
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
                <Table.Tr key={345}>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                Tổng
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            {formatNumber(parseInt(sum.toString()))}
                        </Center>
                    </Table.Td>
                </Table.Tr>
            );
            const contentCount = (
                <Table.Tr key={1}>
                    <Table.Td></Table.Td>
                    <Table.Td>
                        <Center>{count}</Center>
                    </Table.Td>
                </Table.Tr>
            );
            const contentAvg = (
                <Table.Tr key={2}>
                    <Table.Td>
                        <Center>
                            <Text>Trung bình ngày</Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <b>{formatNumber(parseInt(avg.toString()))}</b>
                            <Space w="xs"></Space>
                            <span>m3/ngày</span>
                        </Center>
                    </Table.Td>
                </Table.Tr>
            );

            result.push(content);
            result.push(contentCount);
            result.push(contentAvg);
        }

        //@ts-ignore
        setContentTable([...result]);
    };

    const onViewClicked = () => {
        let isAllowStartDate = true;

        if (startDate === null) {
            setErrorStartDate('Tháng báo cáo chưa có giá trị !!!');
            isAllowStartDate = false;
        } else {
            setErrorStartDate('');
            isAllowStartDate = true;
        }

        if (isAllowStartDate) {
            setLoading(true);
            //@ts-ignore
            const temp = new Date(startDate);
            const month = temp.getMonth() + 1;
            const year = temp.getFullYear();

            getQuantityDaily({ month: month, year: year })
                .then((res) => {
                    if (res?.data?.GetQuantityDailyTB2) {
                        setLoading(false);
                        renderTable(res.data.GetQuantityDailyTB2);
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
            `Tháng ${startDate?.getMonth() + 1}.${startDate?.getFullYear()}`,
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
        a.download = 'San_Luong_Thang_Tram_Bom_II.xlsx';
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
                        Chọn tháng
                    </label>
                </div>
                <div>
                    <input
                        type="month"
                        id="startDate"
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
                                <Table.Th colSpan={2}>
                                    <Center>
                                        <Text tt="uppercase">
                                            Công Ty Cổ Phần Cấp Nước Biwase Long
                                            An
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={2}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Nhà Máy Nước Nhị Thành
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={2}></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={2}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Báo Cáo Sản Lượng Nước Sản Xuất Hàng
                                            Ngày
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>
                                    <Center>
                                        {' '}
                                        <b>Ngày</b>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        {' '}
                                        <b>
                                            Tổng sản lượng phát ra tại Trạm 2
                                            (m3/ngày)
                                        </b>
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

export default QuantityDailyTB;
