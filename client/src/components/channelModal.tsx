import {
    Grid,
    Flex,
    TextInput,
    NumberInput,
    Button,
    Space,
    Switch,
    Select,
    Checkbox,
} from '@mantine/core';

import { useState, useEffect } from 'react';

import {
    useGetChannelByLoggerIdQuery,
    useInsertChannelMutation,
    useUpdateChannelMutation,
    useDeleteChannelMutation,
} from '../__generated__/graphql';

import Swal from 'sweetalert2';

import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LoggerIdState } from '../features/loggerId';

const ChannelModal = () => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [channelData, setChannelData] = useState([]);
    const [listChannel, setListChannel] = useState([]);

    const [errorChannelId, setErrorChannelId] = useState('');

    const loggerIdState = useSelector(LoggerIdState);

    const { refetch: getChannelByLoggerId } = useGetChannelByLoggerIdQuery();
    const [insertChannel] = useInsertChannelMutation();
    const [updateChannel] = useUpdateChannelMutation();
    const [deleteChannel] = useDeleteChannelMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            ChannelId: '',
            ChannelName: '',
            LoggerId: loggerIdState,
            Unit: '',
            Pressure1: 0,
            Pressure2: 0,
            ForwardFlow: 0,
            ReverseFlow: 0,
            BaseLine: undefined,
            BaseMax: undefined,
            BaseMin: undefined,
            OtherChannel: 0,
            TimeStamp: null,
            LastValue: null,
            IndexTimeStamp: null,
            LastIndex: null,
        },
    });

    useEffect(() => {
        getChannelByLoggerId({ loggerid: loggerIdState })
            .then((res) => {
                if (res?.data?.GetChannelByLoggerId) {
                    const temp = [];

                    for (const item of res.data.GetChannelByLoggerId) {
                        const obj = {
                            value: item?.ChannelId,
                            label: item?.ChannelId,
                        };

                        temp.push(obj);
                    }
                    //@ts-ignore
                    setChannelData([...temp]);
                    //@ts-ignore
                    setListChannel([...res.data.GetChannelByLoggerId]);
                }
            })
            .catch((err) => console.log(err));
    }, [loggerIdState]);

    const onChannelIdChanged = (e: any) => {
        //@ts-ignore
        const find = listChannel.find((el) => el.ChannelId === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('ChannelId', find.ChannelId);
            //@ts-ignore
            setValue('ChannelName', find.ChannelName);
            //@ts-ignore
            setValue('LoggerId', find.LoggerId);
            //@ts-ignore
            setValue('Unit', find.Unit);
            //@ts-ignore
            setValue('Pressure1', find.Pressure1);
            //@ts-ignore
            setValue('Pressure2', find.Pressure2);
            //@ts-ignore
            setValue('ForwardFlow', find.ForwardFlow);
            //@ts-ignore
            setValue('ReverseFlow', find.ReverseFlow);
            //@ts-ignore
            setValue('BaseLine', find.BaseLine);
            //@ts-ignore
            setValue('BaseMax', find.BaseMax);
            //@ts-ignore
            setValue('BaseMin', find.BaseMin);
            //@ts-ignore
            setValue('OtherChannel', find.OtherChannel);
            //@ts-ignore
            setValue('TimeStamp', find.TimeStamp);
            //@ts-ignore
            setValue('LastValue', find.LastValue);
            //@ts-ignore
            setValue('IndexTimeStamp', find.IndexTimeStamp);
            //@ts-ignore
            setValue('LastIndex', find.LastIndex);
        }
    };

    const createObjInsertChannel = (formValue: any) => {
        const obj = {
            ChannelId: formValue.ChannelId,
            ChannelName: formValue.ChannelName,
            LoggerId: formValue.LoggerId,
            Unit: formValue.Unit,
            Pressure1:
                formValue.Pressure1 === 0 || formValue.Pressure1 === false
                    ? false
                    : true,
            Pressure2:
                formValue.Pressure2 === 0 || formValue.Pressure2 === false
                    ? false
                    : true,
            ForwardFlow:
                formValue.ForwardFlow === 0 || formValue.ForwardFlow === false
                    ? false
                    : true,
            ReverseFlow:
                formValue.ReverseFlow === 0 || formValue.ReverseFlow === false
                    ? false
                    : true,
            BaseLine: formValue.BaseLine ? formValue.BaseLine : undefined,
            BaseMax: formValue.BaseMax ? formValue.BaseMax : undefined,
            BaseMin: formValue.BaseMin ? formValue.BaseMin : undefined,
            OtherChannel:
                formValue.OtherChannel === 0 || formValue.OtherChannel === false
                    ? false
                    : true,
            TimeStamp: null,
            LastValue: null,
            IndexTimeStamp: null,
            LastIndex: null,
        };

        return obj;
    };

    const handelInsertListChannel = (channel: any, id: string) => {
        const obj = {
            ...channel,
            _id: id,
        };
        //@ts-ignore
        setListChannel((current) => [...current, obj]);
    };

    const handelInsertChannelData = (channel: any) => {
        const obj = {
            value: channel.ChannelId,
            label: channel.ChannelId,
        };
        //@ts-ignore
        setChannelData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.ChannelId === null ||
            formValue.ChannelId === undefined ||
            formValue.ChannelId === ''
        ) {
            setErrorChannelId('Chưa có mã kênh!!');

            isAllow = false;
        } else {
            setErrorChannelId('');

            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsertChannel(formValue);

            insertChannel({
                variables: { channel: obj },
            })
                .then((res) => {
                    if (res?.data?.InsertChannel) {
                        if (res.data?.InsertChannel !== '') {
                            setValue('_id', res.data?.InsertChannel);

                            handelInsertListChannel(
                                formValue,
                                res.data.InsertChannel,
                            );
                            handelInsertChannelData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm kênh thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm kênh không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm kênh không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListChannel = (channel: any) => {
        const temp = [];

        for (const item of listChannel) {
            //@ts-ignore
            if (item._id !== channel._id) {
                temp.push(item);
            } else {
                temp.push(channel);
            }
        }

        //@ts-ignore
        setListChannel([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.ChannelId === null ||
            formValue.ChannelId === undefined ||
            formValue.ChannelId === ''
        ) {
            setErrorChannelId('Chưa có mã kênh!!');

            isAllow = false;
        } else {
            setErrorChannelId('');

            isAllow = true;
        }

        if (isAllow) {
            if (formValue.Pressure1 === 0) {
                //@ts-ignore
                formValue.Pressure1 = false;
            }
            if (formValue.Pressure2 === 0) {
                //@ts-ignore
                formValue.Pressure2 = false;
            }
            if (formValue.ForwardFlow === 0) {
                //@ts-ignore
                formValue.ForwardFlow = false;
            }
            if (formValue.ReverseFlow === 0) {
                //@ts-ignore
                formValue.ReverseFlow = false;
            }
            if (formValue.OtherChannel === 0) {
                //@ts-ignore
                formValue.OtherChannel = false;
            }

            formValue.BaseLine = formValue.BaseLine
                ? formValue.BaseLine
                : undefined;
            formValue.BaseMax = formValue.BaseMax
                ? formValue.BaseMax
                : undefined;
            formValue.BaseMin = formValue.BaseMin
                ? formValue.BaseMin
                : undefined;

            updateChannel({
                //@ts-ignore
                variables: { channel: formValue },
            })
                .then((res) => {
                    if (res?.data?.UpdateChannel) {
                        if (res.data?.UpdateChannel > 0) {
                            handelUpdateListChannel(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật kênh thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật kênh không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật kênh không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListChannel = (channel: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listChannel) {
            //@ts-ignore
            if (item._id !== channel._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListChannel([...temp]);
    };

    const handelDeleteChannelData = (channel: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of channelData) {
            //@ts-ignore
            if (item.value !== channel.ChannelId) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setChannelData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa kênh?',
            text: 'Xóa kênh không thể nào hồi phục lại!',
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
                    formValue.ChannelId === null ||
                    formValue.ChannelId === undefined ||
                    formValue.ChannelId === ''
                ) {
                    setErrorChannelId('Chưa có mã kênh!!');

                    isAllow = false;
                } else {
                    setErrorChannelId('');

                    isAllow = true;
                }

                if (isAllow) {
                    deleteChannel({
                        variables: {
                            //@ts-ignore
                            channel: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteChannel) {
                                if (res.data?.DeleteChannel > 0) {
                                    handelDeleteChannelData(formValue);
                                    handelDeleteListChannel(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa kênh thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa kênh không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa kênh không thành công',
                            });
                            console.log(err);
                        });
                }
            }
        });
    };

    return (
        <Grid>
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
            <Grid.Col span={{ base: 12 }}>
                <Controller
                    name="LoggerId"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="LoggerId "
                            placeholder="LoggerId "
                            disabled
                            readOnly
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                {isCreateMode ? (
                    <Controller
                        name="ChannelId"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Mã kênh"
                                placeholder="Mã kênh"
                                withAsterisk
                                error={errorChannelId}
                                {...field}
                            />
                        )}
                    ></Controller>
                ) : (
                    <Controller
                        name="ChannelId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã kênh"
                                placeholder="Mã kênh"
                                data={channelData}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                withAsterisk
                                error={errorChannelId}
                                {...field}
                                onChange={onChannelIdChanged}
                            />
                        )}
                    ></Controller>
                )}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="ChannelName"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="Tên kênh"
                            placeholder="Tên kênh"
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="Unit"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="Đơn vị"
                            placeholder="Đơn vị"
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput label="Ghi chú" placeholder="Ghi chú" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
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
            <Grid.Col span={{ base: 12, md: 6 }}>
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
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="Pressure1"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            label="Kênh áp lực trước"
                            checked={
                                getValues('Pressure1') === 0 ||
                                //@ts-ignore
                                getValues('Pressure1') === false
                                    ? false
                                    : true
                            }
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="Pressure2"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            label="Kênh áp lực sau"
                            checked={
                                getValues('Pressure2') === 0 ||
                                //@ts-ignore
                                getValues('Pressure2') === false
                                    ? false
                                    : true
                            }
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="ForwardFlow"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            label="Kênh lưu lượng thuận"
                            checked={
                                getValues('ForwardFlow') === 0 ||
                                //@ts-ignore
                                getValues('ForwardFlow') === false
                                    ? false
                                    : true
                            }
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="ReverseFlow"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            label="Kênh lưu lượng nghịch"
                            checked={
                                getValues('ReverseFlow') === 0 ||
                                //@ts-ignore
                                getValues('ReverseFlow') === false
                                    ? false
                                    : true
                            }
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Controller
                    name="OtherChannel"
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            label="Kênh khác"
                            checked={
                                getValues('OtherChannel') === 0 ||
                                //@ts-ignore
                                getValues('OtherChannel') === false
                                    ? false
                                    : true
                            }
                            {...field}
                        />
                    )}
                ></Controller>
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Flex justify="center" align="center">
                    {isCreateMode ? (
                        <>
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
    );
};

export default ChannelModal;
