import { motion } from 'framer-motion';

import {
    Grid,
    Button,
    Text,
    Select,
    Flex,
    Table,
    Center,
    Box,
    LoadingOverlay,
} from '@mantine/core';

import { useState, useEffect, useRef } from 'react';

import {
    useGetBranchsQuery,
    useGetLostWaterBranchQuery,
} from '../__generated__/graphql';

import {
    formatNumber,
    convertDateToDateInput,
    convertDateToStringNotTime,
    convertDateForTitleDay,
} from '../utils/utils';

import * as XLSX from 'xlsx';

const LostBranchPage = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [errorEndDate, setErrorEndDate] = useState('');
    const [errorBranchId, setErrorBranchId] = useState('');
    const [branchs, setBranchs] = useState([]);
    const [listBranch, setListBranch] = useState([]);
    const [currentBranch, setCurrentBranch] = useState('');
    const [currentBranchName, setCurrentBranchName] = useState('');
    const [contentTable, setContentTable] = useState(null);

    const [loading, setLoading] = useState(false);

    const tableRef = useRef(null);

    const start = new Date();
    start.setDate(start.getDate() - 3);
    const end = new Date();

    const [startDate, setStartDate] = useState<Date | null>(start);
    const [endDate, setEndDate] = useState<Date | null>(end);

    const { refetch: getBranch } = useGetBranchsQuery();
    const { refetch: getLostWaterBranch } = useGetLostWaterBranchQuery();

    useEffect(() => {
        getBranch()
            .then((res) => {
                if (res?.data?.GetBranchs) {
                    const temp = [];

                    for (const item of res.data.GetBranchs) {
                        const obj = {
                            label: item?.BranchId,
                            value: item?.BranchId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setBranchs([...temp]);

                    //@ts-ignore
                    setListBranch([...res.data.GetBranchs]);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const onStartDateChanged = (e: any) => {
        setStartDate(new Date(e.currentTarget.value));
    };

    const onEndDateChanged = (e: any) => {
        setEndDate(new Date(e.currentTarget.value));
    };

    const onBranchIdChanged = (e: any) => {
        setCurrentBranch(e);
        //@ts-ignore
        const find = listBranch.find((el) => el.BranchId === e);
        if (find !== undefined) {
            //@ts-ignore
            setCurrentBranchName(find.BranchName);
        }
    };

    const onViewClicked = () => {
        let isAllowBranchId = true;
        let isAllowStartDate = true;
        let isAllowEndDate = true;

        if (currentBranch === '') {
            setErrorBranchId('Mã nhánh chưa có giá trị !!!');
            isAllowBranchId = false;
        } else {
            setErrorBranchId('');
            isAllowBranchId = true;
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

        if (isAllowBranchId && isAllowStartDate && isAllowEndDate) {
            setLoading(true);
            //@ts-ignore
            const tempStart = new Date(startDate);
            //@ts-ignore
            const tempEnd = new Date(endDate);

            tempStart.setHours(0, 0, 0, 0);
            tempEnd.setHours(0, 0, 0, 0);

            getLostWaterBranch({
                branchid: currentBranch,
                start: tempStart.getTime().toString(),
                end: tempEnd.getTime().toString(),
            })
                .then((res) => {
                    setLoading(false);
                    renderTable(res.data.GetLostWaterBranch);
                })
                .catch((err) => console.error(err));
        }
    };

    const renderTable = (data: any) => {
        const result = [];

        let totalQuantityLevel1 = 0;
        let totalQuantityLevel2 = 0;
        let totalDiff = 0;
        let totalRate = 0;

        for (const item of data) {
            const diff = item.Quantitylevel1 - item.Quantitylevel2;
            const rate = (diff / item.Quantitylevel1) * 100;

            totalQuantityLevel1 += item.Quantitylevel1;
            totalQuantityLevel2 += item.Quantitylevel2;

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
                            {item.Quantitylevel1 === null
                                ? '-'
                                : formatNumber(item.Quantitylevel1)}
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            {item.Quantitylevel2 === null
                                ? '-'
                                : formatNumber(item.Quantitylevel2)}
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            {diff === null ? '-' : formatNumber(diff)}
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>{rate.toFixed(2)}</Center>
                    </Table.Td>
                </Table.Tr>
            );

            result.push(content);
        }

        totalDiff = totalQuantityLevel1 - totalQuantityLevel2;
        totalRate = (totalDiff / totalQuantityLevel1) * 100;

        const totalContent = (
            <Table.Tr>
                <Table.Td style={{ background: '#3498db' }}>
                    <Center>
                        <Text fw="bold">Tổng cộng</Text>
                    </Center>
                </Table.Td>
                <Table.Td>
                    <Center>
                        <Text fw="bold">
                            {formatNumber(totalQuantityLevel1)}
                        </Text>
                    </Center>
                </Table.Td>
                <Table.Td>
                    <Center>
                        <Text fw="bold">
                            {formatNumber(totalQuantityLevel2)}
                        </Text>
                    </Center>
                </Table.Td>
                <Table.Td>
                    <Center>
                        <Text fw="bold">{formatNumber(totalDiff)}</Text>
                    </Center>
                </Table.Td>
                <Table.Td>
                    <Center>
                        <Text fw="bold">{formatNumber(totalRate)}</Text>
                    </Center>
                </Table.Td>
            </Table.Tr>
        );

        result.push(totalContent);

        //@ts-ignore
        setContentTable([...result]);
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
            `TTN`,
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

        const fileName = `That_Thoat_Nuoc_Nhanh_${currentBranch}_Tu_${convertDateForTitleDay(
            //@ts-ignore
            startDate,
            //@ts-ignore
        )}_Den_${convertDateForTitleDay(endDate)}.xlsx`;

        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the temporary anchor element
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Select
                        label="Mã nhánh"
                        placeholder="Mã nhánh"
                        data={branchs}
                        searchable
                        nothingFoundMessage="Không tìm thấy"
                        clearable
                        withAsterisk
                        error={errorBranchId}
                        onChange={onBranchIdChanged}
                    />
                </Grid.Col>
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
                            type="date"
                            id="startDate"
                            //@ts-ignore
                            value={convertDateToDateInput(startDate)}
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
                            type="date"
                            id="endDate"
                            //@ts-ignore
                            value={convertDateToDateInput(endDate)}
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
                <Grid.Col span={{ base: 12 }}>
                    <Flex align="center" justify="center" gap="sm">
                        <Button
                            variant="filled"
                            color="green"
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
                                                Bảng Tính Thất Thoát Nước Của
                                                Nhánh {currentBranchName}
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Th colSpan={5}>
                                        <Center>
                                            <Text tt="uppercase" fw="bold">
                                                <span style={{ color: 'red' }}>
                                                    (Từ {startDate?.getDate()}/
                                                    {/* @ts-ignore */}
                                                    {startDate?.getMonth() +
                                                        1}{' '}
                                                    Đến {endDate?.getDate()}/
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
                                                Tổng sản lượng cấp 1 (m3)
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text fw="bold">
                                                Tổng sản lượng cấp 2 (m3)
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text fw="bold">
                                                Sẩn lượng chênh lệch (m3)
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                    <Table.Th>
                                        <Center>
                                            <Text fw="bold">
                                                Tỷ lệ thất thoát nước (%)
                                            </Text>
                                        </Center>
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{contentTable}</Table.Tbody>
                        </Table>
                    </Box>
                </Grid.Col>
            </Grid>
        </motion.div>
    );
};

export default LostBranchPage;
