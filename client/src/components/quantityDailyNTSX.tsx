import {
    Grid,
    Flex,
    Button,
    Text,
    Table,
    Center,
    Radio,
    Box,
    LoadingOverlay,
} from '@mantine/core';

import { useState, useRef } from 'react';

import {
    useGetQuantityDailyNtQuery,
    useGetQuantityDailyTb2Query,
    useGetQuantityDailyNmQuery,
    useGetManualIndexDailyTb2Query,
    useGetManualIndexDailyNtQuery,
    useGetManualIndexDailyNmQuery,
} from '../__generated__/graphql';

import { formatNumber, convertDateToStringMonth } from '../utils/utils';

import * as XLSX from 'xlsx';

const QuantityDailyNTSX = () => {
    const [errorStartDate, setErrorStartDate] = useState('');
    const [contentTable, setContentTable] = useState(null);
    const tableRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date | null>(null);

    const [mode, setMode] = useState('online');

    const { refetch: getQuantityDailyNT } = useGetQuantityDailyNtQuery();
    const { refetch: getQuantityDailyTB2 } = useGetQuantityDailyTb2Query();
    const { refetch: getQuantityDailyNM } = useGetQuantityDailyNmQuery();
    const { refetch: getManualIndexDailyNT } = useGetManualIndexDailyNtQuery();
    const { refetch: getManualIndexDailyTB2 } =
        useGetManualIndexDailyTb2Query();
    const { refetch: getManualIndexDailyNM } = useGetManualIndexDailyNmQuery();

    const onStartDateChanged = (e: any) => {
        setStartDate(new Date(e.currentTarget.value));
    };

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
                if (datant[i].Total !== null) {
                    sumNT += datant[i].Total;
                    countNT++;
                    countDiffNTNM++;
                    countDiffNTTB++;
                }
                if (datanm[i].Total !== null) {
                    sumNM += datanm[i].Total;
                    countNM++;
                }
                if (datatb2[i].Value !== null) {
                    sumTb += datatb2[i].Value;
                    countTB++;
                }

                const diffntnm = datant[i].Total - datanm[i].Total;
                const diffnttb = datanm[i].Total - datatb2[i].Value;

                sumDiffNTNM += diffntnm;
                sumDiffNTTB += diffnttb;

                const content = (
                    <Table.Tr key={datatb2[i].TimeStamp}>
                        <Table.Td>
                            <Center>
                                {new Date(datatb2[i].TimeStamp).getDate()}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                {datant[i].Total === null
                                    ? 0
                                    : formatNumber(datant[i].Total)}
                            </Center>
                        </Table.Td>
                        <Table.Td>
                            <Center>
                                <Text c="blue">
                                    {datanm[i].Total === null
                                        ? 0
                                        : formatNumber(datanm[i].Total)}
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

    const getDataTB2 = (month: number, year: number) => {
        return getQuantityDailyTB2({ month: month, year: year });
    };

    const getDataNT = (month: number, year: number) => {
        return getQuantityDailyNT({ month: month, year: year });
    };

    const getDataNM = (month: number, year: number) => {
        return getQuantityDailyNM({ month: month, year: year });
    };

    const getDataManualIndexTB2 = (month: number, year: number) => {
        return getManualIndexDailyTB2({ month: month, year: year });
    };

    const getDataManualIndexNT = (month: number, year: number) => {
        return getManualIndexDailyNT({ month: month, year: year });
    };

    const getDataManualIndexNM = (month: number, year: number) => {
        return getManualIndexDailyNM({ month: month, year: year });
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
            if (mode === 'online') {
                Promise.all([
                    getDataTB2(month, year),
                    getDataNT(month, year),
                    getDataNM(month, year),
                ]).then((res) => {
                    if (res.length > 0) {
                        setLoading(false);
                        renderTable(
                            res[0].data.GetQuantityDailyTB2,
                            res[1].data.GetQuantityDailyNT,
                            res[2].data.GetQuantityDailyNM,
                        );
                    }
                });
            } else {
                Promise.all([
                    getDataManualIndexTB2(month, year),
                    getDataManualIndexNT(month, year),
                    getDataManualIndexNM(month, year),
                ]).then((res) => {
                    if (res.length > 0) {
                        setLoading(false);
                        renderTable(
                            res[0].data.GetManualIndexDailyTB2,
                            res[1].data.GetManualIndexDailyNT,
                            res[2].data.GetManualIndexDailyNM,
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
                                            Tháng{' '}
                                            {convertDateToStringMonth(
                                                startDate,
                                            )}
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

export default QuantityDailyNTSX;
