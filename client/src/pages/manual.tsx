import { motion } from 'framer-motion';

import {
    Grid,
    Space,
    Flex,
    Text,
    Select,
    NumberInput,
    Button,
} from '@mantine/core';

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { Controller, useForm } from 'react-hook-form';

import {
    useGetSiteIsMeterLazyQuery,
    useGetDataManualBySiteIdQuery,
    useInsertDataManualMutation,
    useUpdateDataManualMutation,
    useDeleteDataManualMutation,
} from '../__generated__/graphql';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import {
    convertDateToTimeString,
    convertDateToDateInput,
} from '../utils/utils';

import { IconArrowBadgeUpFilled } from '@tabler/icons-react';

const ManualPage = () => {
    const [errorSiteId, setErrorSiteId] = useState('');
    const [errorTimeStamp, setErrorTimeStamp] = useState('');
    const [errorValue, setErrorValue] = useState('');

    const [siteData, setSiteData] = useState([]);

    const [data, setData] = useState([]);

    const [getSiteIsMeter] = useGetSiteIsMeterLazyQuery();
    const { refetch: getDataManualBySiteIdRefetch } =
        useGetDataManualBySiteIdQuery();
    const [insertDataManual] = useInsertDataManualMutation();
    const [updateDataManul] = useUpdateDataManualMutation();
    const [deleteDataManual] = useDeleteDataManualMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            SiteId: '',
            TimeStamp: undefined,
            Value: undefined,
        },
    });

    useEffect(() => {
        getSiteIsMeter()
            .then((res) => {
                if (res?.data?.GetSiteIsMeter) {
                    const temp = [];

                    for (const item of res.data.GetSiteIsMeter) {
                        const obj = {
                            value: item?._id,
                            label: item?.SiteId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setSiteData([...temp]);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const onSiteChanged = (e: any) => {
        //setValue('_id', e);
        setValue('SiteId', e);
        getDataManualBySiteId(e);
    };

    const createObjInsertDataManual = (formValue: any) => {
        const obj = {
            SiteId: formValue.SiteId,
            TimeStamp:
                formValue.TimeStamp !== ''
                    ? new Date(formValue.TimeStamp)
                    : null,
            Value: formValue.Value,
        };

        if (obj.TimeStamp !== null && obj.TimeStamp !== undefined) {
            obj.TimeStamp.setHours(obj.TimeStamp.getHours() - 7);
        }

        return obj;
    };

    const getDataManualBySiteId = (siteid: string) => {
        getDataManualBySiteIdRefetch({ siteid: siteid })
            .then((res) => {
                if (res?.data?.GetDataManualBySiteId) {
                    //@ts-ignore
                    setData([...res.data.GetDataManualBySiteId]);
                }
            })
            .catch((err) => console.log(err));
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllowSiteId = true;
        let isAllowTimeStamp = true;
        let isAllowValue = true;

        if (
            formValue.SiteId === '' ||
            formValue.SiteId === undefined ||
            formValue.SiteId === null
        ) {
            setErrorSiteId('Chưa có mã vị trí!!!');
            isAllowSiteId = false;
        } else {
            setErrorSiteId('');
            isAllowSiteId = true;
        }

        if (formValue.TimeStamp === undefined || formValue.TimeStamp === null) {
            setErrorTimeStamp('Chưa có thời gian!!!!');
            isAllowTimeStamp = false;
        } else {
            setErrorTimeStamp('');
            isAllowTimeStamp = true;
        }

        if (formValue.Value === undefined || formValue.Value === null) {
            setErrorValue('Chưa có giá trị!!!!');
            isAllowValue = false;
        } else {
            setErrorValue('');
            isAllowValue = true;
        }

        if (isAllowSiteId && isAllowTimeStamp && isAllowValue) {
            const obj = createObjInsertDataManual(formValue);

            insertDataManual({
                variables: {
                    data: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.InsertDataManual) {
                        if (res.data.InsertDataManual !== '') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm dữ liệu thành công',
                            });

                            getDataManualBySiteId(formValue.SiteId);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm dữ liệu không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm dữ liệu không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const createObjUpdateDataManual = (formValue: any) => {
        const obj = {
            _id: formValue._id,
            SiteId: formValue.SiteId,
            TimeStamp:
                formValue.TimeStamp !== ''
                    ? new Date(formValue.TimeStamp)
                    : null,
            Value: formValue.Value,
        };

        if (obj.TimeStamp !== null && obj.TimeStamp !== undefined) {
            obj.TimeStamp.setHours(obj.TimeStamp.getHours() - 7);
        }

        return obj;
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllowSiteId = true;
        let isAllowTimeStamp = true;
        let isAllowValue = true;

        if (
            formValue.SiteId === '' ||
            formValue.SiteId === undefined ||
            formValue.SiteId === null
        ) {
            setErrorSiteId('Chưa có mã vị trí!!!');
            isAllowSiteId = false;
        } else {
            setErrorSiteId('');
            isAllowSiteId = true;
        }

        if (formValue.TimeStamp === undefined || formValue.TimeStamp === null) {
            setErrorTimeStamp('Chưa có thời gian!!!!');
            isAllowTimeStamp = false;
        } else {
            setErrorTimeStamp('');
            isAllowTimeStamp = true;
        }

        if (formValue.Value === undefined || formValue.Value === null) {
            setErrorValue('Chưa có giá trị!!!!');
            isAllowValue = false;
        } else {
            setErrorValue('');
            isAllowValue = true;
        }

        if (isAllowSiteId && isAllowTimeStamp && isAllowValue) {
            const obj = createObjUpdateDataManual(formValue);

            updateDataManul({
                variables: {
                    data: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.UpdateDataManual) {
                        if (res.data.UpdateDataManual > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật dữ liệu thành công',
                            });

                            getDataManualBySiteId(formValue.SiteId);
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
                    console.log(err);
                });
        }
    };

    const onDeleteClicked = () => {
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
                const formValue = getValues();
                let isAllowSiteId = true;
                let isAllowTimeStamp = true;
                let isAllowValue = true;

                if (
                    formValue.SiteId === '' ||
                    formValue.SiteId === undefined ||
                    formValue.SiteId === null
                ) {
                    setErrorSiteId('Chưa có mã vị trí!!!');
                    isAllowSiteId = false;
                } else {
                    setErrorSiteId('');
                    isAllowSiteId = true;
                }

                if (
                    formValue.TimeStamp === undefined ||
                    formValue.TimeStamp === null
                ) {
                    setErrorTimeStamp('Chưa có thời gian!!!!');
                    isAllowTimeStamp = false;
                } else {
                    setErrorTimeStamp('');
                    isAllowTimeStamp = true;
                }

                if (formValue.Value === undefined || formValue.Value === null) {
                    setErrorValue('Chưa có giá trị!!!!');
                    isAllowValue = false;
                } else {
                    setErrorValue('');
                    isAllowValue = true;
                }

                if (isAllowSiteId && isAllowTimeStamp && isAllowValue) {
                    const obj = createObjUpdateDataManual(formValue);

                    deleteDataManual({
                        variables: {
                            data: obj,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteDataManual) {
                                if (res.data?.DeleteDataManual > 0) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa dữ liệu thành công',
                                    });

                                    getDataManualBySiteId(formValue.SiteId);
                                    reset();
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
                            console.log(err);
                        });
                }
            }
        });
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
        },
    ];

    const tableData = {
        columns,
        data,
    };

    const onSelectedRowsChanged = (e: any) => {
        if (e.selectedCount > 0) {
            const selectedRow = e.selectedRows[0];

            setValue('_id', selectedRow._id);
            setValue(
                'TimeStamp',
                //@ts-ignore
                selectedRow.TimeStamp
                    ? //@ts-ignore
                      convertDateToDateInput(selectedRow.TimeStamp)
                    : undefined,
            );
            setValue('Value', selectedRow.Value);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Text fw={500}>Nhập tay sản lượng</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <Controller
                        name="SiteId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã vị trí"
                                placeholder="Mã vị trí"
                                data={siteData}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                error={errorSiteId}
                                {...field}
                                onChange={onSiteChanged}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <div>
                        <label
                            htmlFor="timeStamp"
                            style={{ fontWeight: 500, fontSize: '.9rem' }}
                        >
                            Thời gian
                        </label>
                    </div>
                    <div>
                        <Controller
                            name="TimeStamp"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="date"
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
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </div>
                    <div>
                        <Text c="red" size=".5rem">
                            {errorTimeStamp}
                        </Text>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <Controller
                        name="Value"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Giá trị"
                                placeholder="Giá trị"
                                error={errorValue}
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Button
                            color="green"
                            variant="filled"
                            onClick={onInsertClicked}
                        >
                            Thêm
                        </Button>
                        <Space w="md" />
                        <Button
                            color="blue"
                            variant="filled"
                            onClick={onUpdateClicked}
                        >
                            Sửa
                        </Button>
                        <Space w="md" />
                        <Button
                            color="red"
                            variant="filled"
                            onClick={onDeleteClicked}
                        >
                            Xóa
                        </Button>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            title={
                                <Flex justify="center" align="center">
                                    <Text fw={500}>Giá trị nhập tay</Text>
                                </Flex>
                            }
                            paginationPerPage={50}
                            sortIcon={<IconArrowBadgeUpFilled />}
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover={true}
                            dense={false}
                            selectableRows
                            onSelectedRowsChange={onSelectedRowsChanged}
                        />
                    </DataTableExtensions>
                </Grid.Col>
            </Grid>
        </motion.div>
    );
};

export default ManualPage;
