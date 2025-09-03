import { Grid, Button, Center, Flex, Text, Table, Input } from '@mantine/core';

import { debounce } from 'lodash';

import { useState, useEffect } from 'react';

import { convertDateToSetValueDateTimeLocalInput } from '../utils/utils';

import { useGetDataQuantityAndIndexManualQuery } from '../__generated__/graphql';

import RowIndexManual from '../components/rowIndexManual';

import Swal from 'sweetalert2';

const IndexManualPage = () => {
    const now = new Date(Date.now());
    now.setHours(8);
    now.setMinutes(0);

    const [time, setTime] = useState<Date | null>(
        //@ts-ignore
        convertDateToSetValueDateTimeLocalInput(now),
    );

    const [contentTable, setContentTable] = useState([]);
    const [originData, setOriginData] = useState([]);

    const { refetch: getData } = useGetDataQuantityAndIndexManualQuery();

    useEffect(() => {
        getDataSiteAndIndexManual();
    }, []);

    const getDataSiteAndIndexManual = () => {
        //@ts-ignore
        const start = new Date(time);
        setOriginData([]);
        getData({ time: start.getTime().toString() })
            .then((res) => {
                if (res?.data?.GetDataQuantityAndIndexManual) {
                    renderTable(res.data.GetDataQuantityAndIndexManual);
                    //@ts-ignore
                    setOriginData([...res.data.GetDataQuantityAndIndexManual]);
                }
            })
            .catch((err) => console.error(err));
    };

    const onViewClicked = () => {
        let isAllow = true;
        if (time === null || time === undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Chưa có thời gian',
            });
            isAllow = false;
        }

        if (isAllow) {
            getDataSiteAndIndexManual();
        }
    };

    const renderTable = (data: any) => {
        setContentTable([]);

        const temp = [];

        for (const item of data) {
            const t = (
                <RowIndexManual
                    key={item.SiteId}
                    item={item}
                    time={time}
                    handleInsert={handleInsert}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                ></RowIndexManual>
            );

            temp.push(t);
        }
        //@ts-ignore
        setContentTable([...temp]);
    };

    const handleSearch = debounce((value: any) => {
        if (value !== '') {
            const filterData = originData.filter(
                (el) =>
                    //@ts-ignore
                    el.Location.toLowerCase().indexOf(value.toLowerCase()) !==
                    -1,
            );

            renderTable(filterData);
        } else {
            renderTable(originData);
        }
    }, 500);

    const onHandleChanged = (e: any) => {
        handleSearch(e.target.value);
    };

    const handleInsert = () => {
        getDataSiteAndIndexManual();
    };

    const handleUpdate = () => {
        getDataSiteAndIndexManual();
    };

    const handleDelete = () => {
        getDataSiteAndIndexManual();
    };

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Center>
                        <Text tt="uppercase" fw="bold">
                            Cập Nhật Chỉ Số Thực Tế Chốt Đồng Hồ Hàng Tháng Vào
                            Dữ Liệu
                        </Text>
                    </Center>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <label htmlFor="end" style={{ fontWeight: 500 }}>
                        Thời gian nhập chỉ số
                    </label>
                    <input
                        type="datetime-local"
                        id="end"
                        name="trip-start"
                        //@ts-ignore
                        value={time}
                        //@ts-ignore
                        onChange={(e) => setTime(e.currentTarget.value)}
                        style={{
                            width: '100%',
                            padding: '5px 8px',
                            borderRadius: '5px',
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Flex justify="center" align="end" h="100%">
                        <Button
                            variant="filled"
                            color="blue"
                            onClick={onViewClicked}
                        >
                            Xem dữ liệu
                        </Button>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Input
                        placeholder="Tìm kiếm vị trí"
                        onChange={onHandleChanged}
                    />
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Table
                        stickyHeader
                        stickyHeaderOffset={60}
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                        captionSide="top"
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Mã vị trí</Table.Th>
                                <Table.Th>Vị trí</Table.Th>
                                <Table.Th>Chỉ số Online</Table.Th>
                                <Table.Th>Nhập chỉ số đh thực tế</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        {originData.length > 0 ? (
                            <Table.Tbody>{contentTable}</Table.Tbody>
                        ) : null}
                        <Table.Caption>
                            <Center>Bảng chỉ số</Center>
                        </Table.Caption>
                    </Table>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default IndexManualPage;
