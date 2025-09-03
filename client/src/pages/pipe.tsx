import { motion } from 'framer-motion';

import {
    Grid,
    Flex,
    Text,
    TextInput,
    NumberInput,
    Button,
    Select,
    Switch,
    ColorInput,
    Space,
} from '@mantine/core';

import { useState, useEffect } from 'react';

import {
    useGetPipesLazyQuery,
    useGetGroupPipesLazyQuery,
    useInsertPipeMutation,
    useUpdatePipeMutation,
    useDeletePipeMutation,
} from '../__generated__/graphql';

import { Controller, useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

const PipePage = () => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [errorPipeId, setErrorPipeId] = useState('');

    const [pipeData, setPipeData] = useState([]);
    const [listPipe, setListPipe] = useState([]);
    const [groupPipeData, setGroupPipeData] = useState([]);
    const [priorritize] = useState([
        { value: '1', label: '1 - Điểm đầu' },
        { value: '2', label: '2 - Điểm cuối' },
    ]);
    const [typeAlarmChannel] = useState([
        { value: 'Pressure', label: 'Áp lực' },
        {
            value: 'Flow',
            label: 'Lưu lượng',
        },
    ]);

    const [getPipes] = useGetPipesLazyQuery();
    const [getGroupPipes] = useGetGroupPipesLazyQuery();
    const [insertPipe] = useInsertPipeMutation();
    const [updatePipe] = useUpdatePipeMutation();
    const [deletePipe] = useDeletePipeMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            PipeId: '',
            Name: '',
            Description: '',
            GroupPipeId: null,
            Size: 0,
            Length: 0,
            TypeChannelAlarm: null,
            BaseMin: 0,
            BaseMax: 0,
            ColorBaseMax: '',
            ColorBaseMin: '',
            SetPrioritize: null,
        },
    });

    useEffect(() => {
        getPipes()
            .then((res) => {
                if (res?.data?.GetPipes) {
                    const temp = [];

                    for (const item of res.data.GetPipes) {
                        const obj = {
                            value: item?.PipeId,
                            label: item?.PipeId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setPipeData([...temp]);
                    //@ts-ignore
                    setListPipe([...res.data.GetPipes]);
                }
            })
            .catch((err) => console.log(err));

        getGroupPipes()
            .then((res) => {
                if (res?.data?.GetGroupPipes) {
                    const temp = [];

                    for (const item of res.data.GetGroupPipes) {
                        const obj = {
                            value: item?._id,
                            label: item?.GroupPipeId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setGroupPipeData([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onPipeIdChange = (e: any) => {
        //@ts-ignore
        const find = listPipe.find((el) => el.PipeId === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('PipeId', find.PipeId);
            //@ts-ignore
            setValue('Name', find.Name);
            //@ts-ignore
            setValue('Description', find.Description);
            //@ts-ignore
            setValue('GroupPipeId', find.GroupPipeId);
            //@ts-ignore
            setValue('Size', find.Size);
            //@ts-ignore
            setValue('Length', find.Length);
            //@ts-ignore
            setValue('TypeChannelAlarm', find.TypeChannelAlarm);
            //@ts-ignore
            setValue('BaseMin', find.BaseMin);
            //@ts-ignore
            setValue('BaseMax', find.BaseMax);
            //@ts-ignore
            setValue('ColorBaseMax', find.ColorBaseMax);
            //@ts-ignore
            setValue('ColorBaseMin', find.ColorBaseMin);
            //@ts-ignore
            setValue('SetPrioritize', find.SetPrioritize?.toString());
        }
    };

    const createObjInsertPipe = (formValue: any) => {
        const obj = {
            PipeId: formValue.PipeId,
            Name: formValue.Name,
            Description: formValue.Description,
            GroupPipeId: formValue.GroupPipeId,
            Size: formValue.Size,
            Length: formValue.Length,
            TypeChannelAlarm: formValue.TypeChannelAlarm,
            BaseMin: formValue.BaseMin,
            BaseMax: formValue.BaseMax,
            ColorBaseMax: formValue.ColorBaseMax,
            ColorBaseMin: formValue.ColorBaseMin,
            SetPrioritize: formValue.SetPrioritize,
        };

        return obj;
    };

    const handelInsertListPipe = (pipe: any, id: string) => {
        const obj = {
            ...pipe,
            _id: id,
        };

        //@ts-ignore
        setListPipe((current) => [...current, obj]);
    };

    const handelInsertPipeData = (pipe: any) => {
        const obj = {
            value: pipe.PipeId,
            label: pipe.PipeId,
        };

        //@ts-ignore
        setPipeData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.PipeId === '' ||
            formValue.PipeId === null ||
            formValue.PipeId === undefined
        ) {
            setErrorPipeId('Mã tuyến ống chưa có dữ liệu !!!');
            isAllow = false;
        } else {
            setErrorPipeId('');
            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsertPipe(formValue);

            insertPipe({
                variables: {
                    pipe: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.InsertPipe) {
                        if (res.data?.InsertPipe !== '') {
                            setValue('_id', res.data.InsertPipe);

                            handelInsertListPipe(
                                formValue,
                                res.data.InsertPipe,
                            );
                            handelInsertPipeData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm tuyến ống thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm tuyến ống không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm tuyến ống không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListPipe = (pipe: any) => {
        const temp = [];

        for (const item of listPipe) {
            //@ts-ignore
            if (item._id !== pipe._id) {
                temp.push(item);
            } else {
                temp.push(pipe);
            }
        }

        //@ts-ignore
        setListPipe([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.PipeId === '' ||
            formValue.PipeId === null ||
            formValue.PipeId === undefined
        ) {
            setErrorPipeId('Mã tuyến ống chưa có dữ liệu !!!');
            isAllow = false;
        } else {
            setErrorPipeId('');
            isAllow = true;
        }

        if (isAllow) {
            //@ts-ignore
            updatePipe({ variables: { pipe: formValue } })
                .then((res) => {
                    if (res?.data?.UpdatePipe) {
                        if (res.data?.UpdatePipe > 0) {
                            handelUpdateListPipe(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật tuyến ống thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật tuyến ống không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật tuyến ống không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListPipe = (pipe: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listPipe) {
            //@ts-ignore
            if (item._id !== pipe._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListPipe([...temp]);
    };

    const handelDeletePipeData = (pipe: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of pipeData) {
            //@ts-ignore
            if (item.value !== pipe.PipeId) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setPipeData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa tuyến ống?',
            text: 'Xóa tuyến ống không thể nào hồi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                const formValue = getValues();

                let isAllow = true;

                if (
                    formValue.PipeId === '' ||
                    formValue.PipeId === null ||
                    formValue.PipeId === undefined
                ) {
                    setErrorPipeId('Mã tuyến ống chưa có dữ liệu !!!');
                    isAllow = false;
                } else {
                    setErrorPipeId('');
                    isAllow = true;
                }

                if (isAllow) {
                    deletePipe({
                        variables: {
                            //@ts-ignore
                            pipe: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeletePipe) {
                                if (res.data?.DeletePipe > 0) {
                                    handelDeletePipeData(formValue);
                                    handelDeleteListPipe(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa tuyến ống thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa tuyến ống không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa tuyến ống không thành công',
                            });
                            console.log(err);
                        });
                }
            }
        });
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
                        <Text fw={500}>Tuyến ống</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Switch
                        checked={isCreateMode}
                        label={isCreateMode ? 'Insert Mode' : 'Modify Mode'}
                        onChange={(event) => {
                            setIsCreateMode(event.currentTarget.checked);
                            reset();
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    {isCreateMode ? (
                        <Controller
                            name="PipeId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Mã tuyến ống"
                                    placeholder="Mã tuyến ống"
                                    error={errorPipeId}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="PipeId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Mã  tuyến ống"
                                    placeholder="Mã  tuyến ống"
                                    data={pipeData}
                                    searchable
                                    nothingFoundMessage="Không tìm thấy"
                                    clearable
                                    error={errorPipeId}
                                    {...field}
                                    onChange={onPipeIdChange}
                                />
                            )}
                        ></Controller>
                    )}
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Name"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Tên tuyến ống"
                                placeholder="Tên tuyến ống"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Description"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Mô tả"
                                placeholder="Mô tả"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="GroupPipeId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã nhóm tuyến ống"
                                placeholder="Mã nhóm tuyến ống"
                                data={groupPipeData}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Size"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Kích thước ống"
                                placeholder="Kích thước ống"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Length"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Chiều dài ống"
                                placeholder="Chiều dài ống"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="BaseMin"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Ngưỡng dưới"
                                placeholder="Ngưỡng dưới"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="BaseMax"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Ngưỡng trên"
                                placeholder="Ngưỡng trên"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="TypeChannelAlarm"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Chọn kênh cảnh báo"
                                placeholder="Chọn kênh cảnh báo"
                                data={typeAlarmChannel}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="ColorBaseMin"
                        control={control}
                        render={({ field }) => (
                            <ColorInput
                                label="Màu cảnh báo ngưỡng dưới"
                                placeholder="Màu cảnh báo ngưỡng dưới"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="ColorBaseMax"
                        control={control}
                        render={({ field }) => (
                            <ColorInput
                                label="Màu cảnh báo ngưỡng trên"
                                placeholder="Màu cảnh báo ngưỡng trên"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="SetPrioritize"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Chọn ưu tiên"
                                placeholder="Chọn ưu tiên"
                                data={priorritize}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        {isCreateMode ? (
                            <>
                                {' '}
                                <Button
                                    color="green"
                                    variant="filled"
                                    onClick={onInsertClicked}
                                >
                                    Thêm
                                </Button>
                            </>
                        ) : (
                            <>
                                {' '}
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
                            </>
                        )}
                    </Flex>
                </Grid.Col>
            </Grid>
        </motion.div>
    );
};

export default PipePage;
