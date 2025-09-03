import {
    Grid,
    Flex,
    Button,
    Text,
    Table,
    Center,
    Radio,
    NumberInput,
    Box,
    LoadingOverlay,
} from '@mantine/core';

import { useState, useRef } from 'react';

import {
    useGetQuantityMonthlyNtQuery,
    useGetQuantityMonthlyTb2Query,
    useGetQuantityMonthlyNmQuery,
    useGetManualIndexMonthlyTb2Query,
    useGetManualIndexMonthlyNtQuery,
    useGetManualIndexMonthlyNmQuery,
} from '../__generated__/graphql';

import { formatNumber, convertDateToStringMonth } from '../utils/utils';

import * as XLSX from 'xlsx';

const QuantityMonthlyNTSX = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const tableRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [startDate] = useState<Date | null>(null);

    const [mode, setMode] = useState('online');

    const [currentYear, setCurrentYear] = useState(
        new Date(Date.now()).getFullYear(),
    );

    const { refetch: getQuantityMonthlyNT } = useGetQuantityMonthlyNtQuery();
    const { refetch: getQuantityMonthlyTB2 } = useGetQuantityMonthlyTb2Query();
    const { refetch: getQuantityMonthlyNM } = useGetQuantityMonthlyNmQuery();
    const { refetch: getManualIndexMonthlyNT } =
        useGetManualIndexMonthlyNtQuery();
    const { refetch: getManualIndexMonthlyTB2 } =
        useGetManualIndexMonthlyTb2Query();
    const { refetch: getManualIndexMonthlyNM } =
        useGetManualIndexMonthlyNmQuery();

    const renderTable = (datatb2: any, datant: any, datanm: any) => {
        const result = [];

        let sumTb = 0;
        let sumNT = 0;
        let sumNM = 0;
        let sumDiffNTNM = 0;
        let sumDiffNTTB = 0;

        let countTB = 0;
        let countNT = 0;
        let countNM = 0;
        let countDiffNTNM = 0;
        let countDiffNTTB = 0;

        let avgTB = 0;
        let avgNT = 0;
        let avgNM = 0;
        let avgDiffNTNM = 0;
        let avgDiffNTTB = 0;

        if (datatb2.length > 0) {
            for (let i = 0; i < datatb2.length; i++) {
                if (datant[i].Value !== null) {
                    sumNT += datant[i].Value;
                    countNT++;
                    countDiffNTNM++;
                    countDiffNTTB++;
                }
                if (datanm[i].Value !== null) {
                    sumNM += datanm[i].Value;
                    countNM++;
                }
                if (datatb2[i].Value !== null) {
                    sumTb += datatb2[i].Value;
                    countTB++;
                }

                const diffntnm = datant[i].Value - datanm[i].Value;
                const diffnttb = datanm[i].Value - datatb2[i].Value;

                sumDiffNTNM += diffntnm;
                sumDiffNTTB += diffnttb;

                const content = (
                    <Table.Tr key={datatb2[i].TimeStamp}>
                        <Table.Td>
                            <Center>
                                {convertDateToStringMonth(
                                    new Date(datatb2[i].TimeStamp),
                                )}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {datant[i].Value === null
                                    ? 0
                                    : formatNumber(datant[i].Value)}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                <Text c="blue">
                                    {datanm[i].Value === null
                                        ? 0
                                        : formatNumber(datanm[i].Value)}
                                </Text>
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {diffntnm === null ? 0 : formatNumber(diffntnm)}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                <Text c="red">
                                    {datatb2[i].Value === null
                                        ? 0
                                        : formatNumber(datatb2[i].Value)}
                                </Text>
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {diffnttb === null ? 0 : formatNumber(diffnttb)}
                            </Center>
                        </Table.Td>
                    </Table.Tr>
                );

                result.push(content);
            }

            if (countTB === 0) {
                avgTB = sumTb / 1;
            } else {
                avgTB = sumTb / countTB;
            }

            if (countNT === 0) {
                avgNT = sumNT / 1;
            } else {
                avgNT = sumNT / countNT;
            }

            if (countNM === 0) {
                avgNM = sumNM / 1;
            } else {
                avgNM = sumNM / countNM;
            }

            if (countDiffNTNM === 0) {
                avgDiffNTNM = sumDiffNTNM / 1;
            } else {
                avgDiffNTNM = sumDiffNTNM / countDiffNTNM;
            }

            if (countDiffNTTB === 0) {
                avgDiffNTTB = sumDiffNTTB / 1;
            } else {
                avgDiffNTTB = sumDiffNTTB / countDiffNTTB;
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
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(sumNT.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(sumNM.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {sumDiffNTNM < 0
                                    ? `(${formatNumber(
                                          parseInt(
                                              Math.abs(sumDiffNTNM).toString(),
                                          ),
                                      )})`
                                    : formatNumber(
                                          parseInt(
                                              Math.abs(sumDiffNTNM).toString(),
                                          ),
                                      )}
                                {}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(sumTb.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {sumDiffNTTB < 0
                                    ? `(${formatNumber(
                                          parseInt(
                                              Math.abs(sumDiffNTTB).toString(),
                                          ),
                                      )})`
                                    : formatNumber(
                                          parseInt(
                                              Math.abs(sumDiffNTTB).toString(),
                                          ),
                                      )}
                                {}
                            </Text>
                        </Center>
                    </Table.Td>
                </Table.Tr>
            );

            const contentCount = (
                <Table.Tr key={346}>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold">
                                Số ngày
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {countNT}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {countNM}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {countDiffNTNM}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {countTB}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {countDiffNTTB}
                            </Text>
                        </Center>
                    </Table.Td>
                </Table.Tr>
            );

            const contentAvg = (
                <Table.Tr key={348}>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold">
                                Trung bình
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(avgNT.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(avgNM.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {avgDiffNTNM < 0
                                    ? `(${formatNumber(
                                          parseInt(
                                              Math.abs(avgDiffNTNM).toString(),
                                          ),
                                      )})`
                                    : formatNumber(
                                          parseInt(
                                              Math.abs(avgDiffNTNM).toString(),
                                          ),
                                      )}
                                {}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {formatNumber(parseInt(avgTB.toString()))}
                            </Text>
                        </Center>
                    </Table.Td>
                    <Table.Td>
                        <Center>
                            <Text c="red" fw="bold" tt="uppercase">
                                {avgDiffNTTB < 0
                                    ? `(${formatNumber(
                                          parseInt(
                                              Math.abs(avgDiffNTTB).toString(),
                                          ),
                                      )})`
                                    : formatNumber(
                                          parseInt(
                                              Math.abs(avgDiffNTTB).toString(),
                                          ),
                                      )}
                                {}
                            </Text>
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

    const getDataTB2 = (start: string, end: string) => {
        return getQuantityMonthlyTB2({ start: start, end: end });
    };

    const getDataNT = (start: string, end: string) => {
        return getQuantityMonthlyNT({ start: start, end: end });
    };

    const getDataNM = (start: string, end: string) => {
        return getQuantityMonthlyNM({ start: start, end: end });
    };

    const getDataManualIndexTB2 = (start: string, end: string) => {
        return getManualIndexMonthlyTB2({ start: start, end: end });
    };

    const getDataManualIndexNT = (start: string, end: string) => {
        return getManualIndexMonthlyNT({ start: start, end: end });
    };

    const getDataManualIndexNM = (start: string, end: string) => {
        return getManualIndexMonthlyNM({ start: start, end: end });
    };

    const onViewClicked = () => {
        let isAllowStartDate = true;

        if (currentYear === null) {
            setErrorStartDate('Năm báo cáo chưa có giá trị !!!');
            isAllowStartDate = false;
        } else {
            setErrorStartDate('');
            isAllowStartDate = true;
        }

        if (isAllowStartDate) {
            setLoading(true);

            //@ts-ignore
            const tempStart = new Date(currentYear, 0, 1, 0, 0, 0);
            const tempEnd = new Date(currentYear + 1, 0, 1, 0, 0, 0);
            tempEnd.setDate(tempEnd.getDate() - 1);

            const start = tempStart.getTime().toString();
            const end = tempEnd.getTime().toString();

            if (mode === 'online') {
                Promise.all([
                    getDataTB2(start, end),
                    getDataNT(start, end),
                    getDataNM(start, end),
                ]).then((res) => {
                    if (res.length > 0) {
                        setLoading(false);
                        renderTable(
                            res[0].data.GetQuantityMonthlyTB2,
                            res[1].data.GetQuantityMonthlyNT,
                            res[2].data.GetQuantityMonthlyNM,
                        );
                    }
                });
            } else {
                Promise.all([
                    getDataManualIndexTB2(start, end),
                    getDataManualIndexNT(start, end),
                    getDataManualIndexNM(start, end),
                ]).then((res) => {
                    if (res.length > 0) {
                        setLoading(false);
                        renderTable(
                            res[0].data.GetManualIndexMonthlyTB2,
                            res[1].data.GetManualIndexMonthlyNT,
                            res[2].data.GetManualIndexMonthlyNM,
                        );
                    }
                });
            }
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
        a.download = 'San_Luong_Thang_NT_SX.xlsx';
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
                    label="Năm"
                    placeholder="Năm"
                    value={currentYear}
                    error={errorStartDate}
                    //@ts-ignore
                    onChange={(e) => setCurrentYear(e.target.value)}
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
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Radio.Group
                    value={mode}
                    onChange={setMode}
                    label="Chọn chế độ xem dữ liệu"
                >
                    <Radio value="online" label="Theo dữ liệu online" />
                    <Radio value="manual" label="Theo dữ liệu nhập tay" />
                </Radio.Group>
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
                                <Table.Th colSpan={6}>
                                    <Center>
                                        <Text tt="uppercase">
                                            Công Ty Cổ Phần Cấp Nước Biwase Long
                                            An
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={6}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Nhà Máy Nước Nhị Thành
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={6}></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={6}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold">
                                            Bảng Tổng Hợp Theo Dõi Sản Lượng
                                            Nước Thô Và Sản Lượng Sản Xuất
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th colSpan={6}>
                                    <Center>
                                        <Text tt="uppercase" fw="bold" c="red">
                                            Năm {currentYear}
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th rowSpan={3}>
                                    <Center>
                                        {' '}
                                        <b>Ngày</b>
                                    </Center>
                                </Table.Th>
                                <Table.Th colSpan={3}>
                                    <Center>
                                        {' '}
                                        <b>Sản lượng nước thô (m3/ngày)</b>
                                    </Center>
                                </Table.Th>
                                <Table.Th rowSpan={2}>
                                    <Center>
                                        <Text c="red" fw="bold">
                                            Sản lượng sản xuất (Trạm bơm II)
                                        </Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th rowSpan={3}>
                                    <Center>
                                        <Text fw="bold">
                                            Chênh lệch giữa sản lượng thô (tại
                                            CTT ) và SLSX (Trạm bơm II)
                                        </Text>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>
                                    <Center>
                                        {' '}
                                        <b>Tại CTT</b>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text c="blue"> Về nhà máy</Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th rowSpan={2}>
                                    <Center>
                                        {' '}
                                        <b>
                                            Chênh lệch nước thô giữa CTT và
                                            lượng về Nhà máy{' '}
                                        </b>
                                    </Center>
                                </Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>
                                    <Center>
                                        {' '}
                                        <b>
                                            Tổng các đồng hồ: CTT-GĐ1 + CTT-GĐ2
                                            + CTT-GĐ3...
                                        </b>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        <Text c="blue">
                                            {' '}
                                            NM-GĐ1 + MN-GĐ2 + MN-GĐ3...
                                        </Text>
                                    </Center>
                                </Table.Th>
                                <Table.Th>
                                    <Center>
                                        {' '}
                                        <b>TBII-GĐ1 + TBII-GĐ2 + TBII_GĐ3...</b>
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

export default QuantityMonthlyNTSX;
