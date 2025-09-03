import { motion } from 'framer-motion';

import {
    Grid,
    Flex,
    Button,
    Space,
    TextInput,
    Select,
    Switch,
    Text,
    ColorInput,
} from '@mantine/core';

import {
    useGetGroupPipesLazyQuery,
    useGetSiteIsMeterLazyQuery,
    useInsertGroupPipeMutation,
    useUpdateGroupPipeMutation,
    useDeleteGroupPipeMutation,
} from '../__generated__/graphql';

import { useState, useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';

import Swal from 'sweetalert2';

const GroupPipePage = () => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [groupPipeData, setGroupPipeData] = useState([]);
    const [listGroupPipe, setListGroupPipe] = useState([]);
    const [sites, setSites] = useState([]);

    const [errorGroupPipeId, setErrorGroupPipeId] = useState('');

    const [getGroupPipes] = useGetGroupPipesLazyQuery();
    const [getSitesIsMeter] = useGetSiteIsMeterLazyQuery();
    const [insertGroupPipe] = useInsertGroupPipeMutation();
    const [updateGroupPipe] = useUpdateGroupPipeMutation();
    const [deleteGroupPipe] = useDeleteGroupPipeMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            GroupPipeId: '',
            Name: '',
            Color: '',
            Description: '',
            SiteIdStart: '',
            SiteIdEnd: '',
        },
    });

    useEffect(() => {
        getGroupPipes()
            .then((res) => {
                if (res?.data?.GetGroupPipes) {
                    const temp = [];

                    for (const item of res.data.GetGroupPipes) {
                        const obj = {
                            value: item?.GroupPipeId,
                            label: item?.GroupPipeId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setGroupPipeData([...temp]);
                    //@ts-ignore
                    setListGroupPipe([...res.data.GetGroupPipes]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getSitesIsMeter()
            .then((res) => {
                if (res?.data?.GetSiteIsMeter) {
                    const temp = [];

                    for (const item of res.data.GetSiteIsMeter) {
                        const obj = {
                            value: item?._id,
                            label: `${item?.SiteId} - ${item?.Location}`,
                        };

                        temp.push(obj);
                    }
                    const obj = {
                        label: '',
                        value: '',
                    };

                    temp.push(obj);

                    //@ts-ignore
                    setSites([...temp]);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    const onGroupPipeIdChanged = (e: any) => {
        //@ts-ignore
        const find = listGroupPipe.find((el) => el.GroupPipeId === e);
        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('GroupPipeId', find.GroupPipeId);
            //@ts-ignore
            setValue('Name', find.Name);
            //@ts-ignore
            setValue('Description', find.Description);
            //@ts-ignore
            setValue('Color', find.Color);
            //@ts-ignore
            setValue('SiteIdStart', find.SiteIdStart);
            //@ts-ignore
            setValue('SiteIdEnd', find.SiteIdEnd);
        }
    };

    const createObjInsertGroupPipe = (formValue: any) => {
        const obj = {
            GroupPipeId: formValue.GroupPipeId,
            Name: formValue.Name,
            Description: formValue.Description,
            Color: formValue.Color,
            SiteIdStart: formValue.SiteIdStart,
            SiteIdEnd: formValue.SiteIdEnd,
        };

        return obj;
    };

    const handelInsertListGroupPipe = (groupPipe: any, id: string) => {
        const obj = {
            ...groupPipe,
            _id: id,
        };
        //@ts-ignore
        setListGroupPipe((current) => [...current, obj]);
    };

    const handelInsertGroupPipeData = (groupPipe: any) => {
        const obj = {
            value: groupPipe.GroupPipeId,
            label: groupPipe.GroupPipeId,
        };
        //@ts-ignore
        setGroupPipeData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.GroupPipeId === null ||
            formValue.GroupPipeId === undefined ||
            formValue.GroupPipeId === ''
        ) {
            setErrorGroupPipeId('Chưa có mã nhóm tuyến ống!!');

            isAllow = false;
        } else {
            setErrorGroupPipeId('');

            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsertGroupPipe(formValue);

            insertGroupPipe({
                variables: { groupPipe: obj },
            })
                .then((res) => {
                    if (res?.data?.InsertGroupPipe) {
                        if (res.data?.InsertGroupPipe !== '') {
                            setValue('_id', res.data?.InsertGroupPipe);

                            handelInsertListGroupPipe(
                                formValue,
                                res.data.InsertGroupPipe,
                            );
                            handelInsertGroupPipeData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm nhóm tuyến ống thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm nhóm tuyến ống không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm nhóm tuyến ống không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListGroupPipe = (groupPipe: any) => {
        const temp = [];

        for (const item of listGroupPipe) {
            //@ts-ignore
            if (item._id !== groupPipe._id) {
                temp.push(item);
            } else {
                temp.push(groupPipe);
            }
        }

        //@ts-ignore
        setListGroupPipe([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.GroupPipeId === null ||
            formValue.GroupPipeId === undefined ||
            formValue.GroupPipeId === ''
        ) {
            setErrorGroupPipeId('Chưa có mã nhóm tuyến ống!!');

            isAllow = false;
        } else {
            setErrorGroupPipeId('');

            isAllow = true;
        }

        if (isAllow) {
            updateGroupPipe({
                //@ts-ignore
                variables: { groupPipe: formValue },
            })
                .then((res) => {
                    if (res?.data?.UpdateGroupPipe) {
                        if (res.data?.UpdateGroupPipe > 0) {
                            handelUpdateListGroupPipe(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật nhóm tuyến ống thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật nhóm tuyến ống không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật nhóm tuyến ống không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListGroupPipe = (groupPipe: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listGroupPipe) {
            //@ts-ignore
            if (item._id !== groupPipe._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListGroupPipe([...temp]);
    };

    const handelDeleteGroupPipeData = (groupPipe: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of groupPipeData) {
            //@ts-ignore
            if (item.value !== groupPipe.ChannelId) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setGroupPipeData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa nhóm tuyến ống?',
            text: 'Xóa nhóm tuyến ống không thể nào hồi phục lại!',
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
                    formValue.GroupPipeId === null ||
                    formValue.GroupPipeId === undefined ||
                    formValue.GroupPipeId === ''
                ) {
                    setErrorGroupPipeId('Chưa có mã nhóm tuyến ống!!');

                    isAllow = false;
                } else {
                    setErrorGroupPipeId('');

                    isAllow = true;
                }

                if (isAllow) {
                    deleteGroupPipe({
                        variables: {
                            //@ts-ignore
                            groupPipe: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteGroupPipe) {
                                if (res.data?.DeleteGroupPipe > 0) {
                                    handelDeleteGroupPipeData(formValue);
                                    handelDeleteListGroupPipe(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa nhóm tuyến ống thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa nhóm tuyến ống không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa nhóm tuyến ống không thành công',
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
                        <Text fw={500}>Nhóm tuyến ống</Text>
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
                            name="GroupPipeId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Mã nhóm tuyến ống"
                                    placeholder="Mã nhóm tuyến ống"
                                    error={errorGroupPipeId}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    ) : (
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
                                    error={errorGroupPipeId}
                                    {...field}
                                    onChange={onGroupPipeIdChanged}
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
                                label="Tên nhóm tuyến ống"
                                placeholder="Tên nhóm tuyến ống"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Color"
                        control={control}
                        render={({ field }) => (
                            <ColorInput
                                label="Màu ống"
                                placeholder="Màu ống"
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
                        name="SiteIdStart"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Đồng hồ đầu tuyến"
                                placeholder="Đồng hồ đầu tuyến"
                                data={sites}
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
                        name="SiteIdEnd"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Đồng hồ cuối tuyến"
                                placeholder="Đồng hồ cuối tuyến"
                                data={sites}
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

export default GroupPipePage;
