import {
    Grid,
    ActionIcon,
    Flex,
    Text,
    Space,
    NumberInput,
    Center,
    Button,
} from '@mantine/core';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { convertDateToTimeString } from '../utils/utils';

import { useState, useEffect } from 'react';

import {
    IconArrowBadgeUpFilled,
    IconEdit,
    IconTrash,
} from '@tabler/icons-react';

import {
    useGetDataLoggerByCurrentTimeForManualDataQuery,
    useGetDataLoggerByTimeStampForManualDataQuery,
    useUpdateDataLoggerMutation,
    useDeleteDataLoggerMutation,
} from '../__generated__/graphql';

import Swal from 'sweetalert2';

const TableManualDataHistory = ({ ChannelId, ChannelName }: any) => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [reaload, setReload] = useState(false);

    const { refetch: getDataLoggerByCurrentTime } =
        useGetDataLoggerByCurrentTimeForManualDataQuery();
    const { refetch: getDataLoggerByTimeStamp } =
        useGetDataLoggerByTimeStampForManualDataQuery();
    const [updateDataLogger] = useUpdateDataLoggerMutation();
    const [deleteDataLogger] = useDeleteDataLoggerMutation();

    let originValue = 0;

    useEffect(() => {
        getDataLoggerByCurrentTime({
            channelid: ChannelId,
        })
            .then((res) => {
                if (res?.data?.GetDataLoggerByCurrentTimeForManualData) {
                    //@ts-ignore
                    setData([
                        //@ts-ignore
                        ...res.data.GetDataLoggerByCurrentTimeForManualData,
                    ]);
                }
            })
            .catch((err) => console.error(err));
    }, [ChannelId, reaload]);

    const onValueFocused = (e: any) => {
        originValue = e.target.value;
    };

    const onValueBlured = (e: any) => {
        const currentValue = e.target.value;
        const temp = JSON.parse(JSON.stringify(data));
        if (originValue !== currentValue) {
            const index = temp.findIndex(
                //@ts-ignore
                (el) => el._id === e.target.dataset.id,
            );

            if (index !== -1) {
                temp[index].Value = parseFloat(currentValue);
                //@ts-ignore
                setData([...temp]);
            }
        }
    };

    const createObjUpdateDataLogger = (data: any) => {
        const obj = {
            _id: data._id,
            ChannelId: ChannelId,
            TimeStamp: data.TimeStamp !== '' ? new Date(data.TimeStamp) : null,
            Value: data.Value !== '' ? parseFloat(data.Value) : null,
        };

        return obj;
    };

    const onUpdateClicked = (id: any) => {
        Swal.fire({
            title: 'Cập nhật dữ liệu nhập tay?',
            text: 'Cập nhật dữ liệu nhập tay không thể nào hồi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cập nhật',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                //@ts-ignore
                const find = data.find((el) => el._id === id);

                if (find !== undefined) {
                    const obj = createObjUpdateDataLogger(find);

                    updateDataLogger({
                        variables: {
                            data: obj,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.UpdateDataLogger) {
                                if (res.data.UpdateDataLogger > 0) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Cập nhật dữ liệu thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Cập nhật dữ liệu không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật dữ liệu không thành công',
                            });
                            console.error(err);
                        });
                }
            }
        });
    };

    const handleDeleteDataLogger = (id: any) => {
        //@ts-ignore
        const filter = data.filter((el) => el._id !== id);

        //@ts-ignore
        setData([...filter]);
    };

    const onDeleteClicked = (id: any) => {
        Swal.fire({
            title: 'Xóa dữ liệu nhập tay?',
            text: 'Xóa dữ liệu nhập tay không thể nào hồi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                //@ts-ignore
                const find = data.find((el) => el._id === id);

                if (find !== undefined) {
                    const obj = createObjUpdateDataLogger(find);

                    deleteDataLogger({
                        variables: {
                            data: obj,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteDataLogger) {
                                if (res.data?.DeleteDataLogger > 0) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa dữ liệu thành công',
                                    });

                                    handleDeleteDataLogger(id);
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa dữ liệu không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa dữ liệu không thành công',
                            });
                            console.error(err);
                        });
                }
            }
        });
    };

    const onStartDateChanged = (e: any) => {
        setStartDate(new Date(e.target.value));
    };

    const onEndDateChanged = (e: any) => {
        setEndDate(new Date(e.target.value));
    };

    const onViewDataLoggerClicked = () => {
        if (
            startDate !== null &&
            startDate !== undefined &&
            endDate !== null &&
            endDate !== undefined
        ) {
            const totalMilisecondStart = startDate.getTime().toString();
            const totalMilisecondEnd = endDate.getTime().toString();

            getDataLoggerByTimeStamp({
                channelid: ChannelId,
                start: totalMilisecondStart,
                end: totalMilisecondEnd,
            })
                .then((res) => {
                    //@ts-ignore
                    setData([
                        //@ts-ignore
                        ...res.data.GetDataLoggerByTimeStampForManualData,
                    ]);
                })
                .catch((err) => console.error(err));
        }
    };

    const onReloadClicked = () => {
        setReload(!reaload);
    };

    const columns = [
        {
            name: 'Thời gian',
            selector: (row: any) => row.TimeStamp,
            sortable: true,
            cellExport: (row: any) => row.TimeStamp,
            format: (row: any) => convertDateToTimeString(row.TimeStamp),
        },
        {
            name: 'Giá trị',
            selector: (row: any) => row.Value,
            sortable: true,
            cellExport: (row: any) => row.Value,
            cell: (row: any) => (
                <NumberInput
                    value={row.Value}
                    data-id={row._id}
                    onBlur={onValueBlured}
                    onFocus={onValueFocused}
                ></NumberInput>
            ),
        },
        {
            name: '',
            button: true,
            cell: (row: any) => (
                <>
                    <ActionIcon
                        variant="filled"
                        color="green"
                        onClick={() => onUpdateClicked(row._id)}
                    >
                        <IconEdit size="1.125rem"></IconEdit>
                    </ActionIcon>
                    <Space w="sm" />
                    <ActionIcon
                        variant="filled"
                        color="red"
                        onClick={() => onDeleteClicked(row._id)}
                    >
                        <IconTrash size="1.125rem"></IconTrash>
                    </ActionIcon>
                </>
            ),
        },
    ];

    const tableData = {
        columns,
        data,
    };

    return (
        <Grid.Col
            span={{ base: 12, md: 6, lg: 4 }}
            style={{
                boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                borderRadius: '5px',
            }}
        >
            <div>
                <label
                    htmlFor="timeStamp"
                    style={{ fontWeight: 500, fontSize: '.9rem' }}
                >
                    Thời gian bắt đầu
                </label>
            </div>
            <div>
                <input
                    type="datetime-local"
                    id="timeStamp"
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
                <label
                    htmlFor="timeStamp"
                    style={{ fontWeight: 500, fontSize: '.9rem' }}
                >
                    Thời gian kết thúc
                </label>
            </div>
            <div>
                <input
                    type="datetime-local"
                    id="timeStamp"
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
            <Space h="sm"></Space>
            <Center>
                <Button
                    color="green"
                    variant="filled"
                    onClick={onViewDataLoggerClicked}
                >
                    Xem
                </Button>
                <Space w="sm" />
                <Button color="blue" variant="filled" onClick={onReloadClicked}>
                    Tải lại
                </Button>
            </Center>
            <DataTableExtensions {...tableData}>
                <DataTable
                    columns={columns}
                    data={data}
                    title={
                        <Flex justify="center" align="center">
                            <Text fw={500}>
                                Dữ liệu nhập tay của kênh {ChannelName}
                            </Text>
                        </Flex>
                    }
                    paginationPerPage={10}
                    sortIcon={<IconArrowBadgeUpFilled />}
                    defaultSortAsc={true}
                    pagination
                    highlightOnHover={true}
                    dense={false}
                />
            </DataTableExtensions>
        </Grid.Col>
    );
};

export default TableManualDataHistory;
