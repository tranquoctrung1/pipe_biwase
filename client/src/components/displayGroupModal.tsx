import {
    Grid,
    Flex,
    Button,
    Space,
    Select,
    TextInput,
    Switch,
} from '@mantine/core';

import { useState, useEffect } from 'react';

import {
    useGetDisplayGroupsQuery,
    useInsertDisplayGroupMutation,
    useUpdateDisplayGroupMutation,
    useDeleteDisplayGroupMutation,
} from '../__generated__/graphql';

import { Controller, useForm } from 'react-hook-form';

import {
    addAllDisplayGroup,
    insertDiplayGroup,
    updateDisplayGroup,
    deleteDisplayGroup,
} from '../features/displayGroup';

import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

const DisplayGroupModal = () => {
    const [listDisplayGroup, setListDisplayGroup] = useState([]);
    const [displayGroupData, setDisplayGroupData] = useState([]);
    const [errorGorup, setErrorGroup] = useState('');

    const [isCreateMode, setIsCreateMode] = useState(false);

    const { refetch: getDisplayGroups } = useGetDisplayGroupsQuery();
    const [insertDisplayGroupMutation] = useInsertDisplayGroupMutation();
    const [updateDisplayGroupMutation] = useUpdateDisplayGroupMutation();
    const [deleteDisplayGroupMutation] = useDeleteDisplayGroupMutation();

    const dispatch = useDispatch();

    const { control, getValues, setValue, reset } = useForm({
        defaultValues: {
            _id: '',
            Group: '',
            Name: '',
        },
    });

    useEffect(() => {
        getDisplayGroups()
            .then((res) => {
                if (res?.data?.GetDisplayGroups) {
                    const temp = [];

                    for (const item of res.data.GetDisplayGroups) {
                        const obj = {
                            value: item?.Group,
                            label: `${item?.Group}`,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setDisplayGroupData([...temp]);
                    //@ts-ignore
                    setListDisplayGroup([...res.data.GetDisplayGroups]);
                    //@ts-ignore
                    dispatch(addAllDisplayGroup(res.data.GetDisplayGroups));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onDisplayChanged = (e: any) => {
        //@ts-ignore
        const find = listDisplayGroup.find((el) => el.Group === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('Group', find.Group);
            //@ts-ignore
            setValue('Name', find.Name);
        }
    };

    const createObjInsertDisplayGroup = (formValue: any) => {
        const obj = {
            Group: formValue.Group,
            Name: formValue.Name,
        };

        return obj;
    };

    const handelInsertListDipslayGroup = (displayGroup: any, id: string) => {
        const obj = {
            _id: id,
            Group: displayGroup.Group,
            Name: displayGroup.Name,
        };
        //@ts-ignore
        setListDisplayGroup((current) => [...current, obj]);
    };

    const handelInsertDisplayGroupData = (displayGroup: any) => {
        const obj = {
            value: displayGroup.Group,
            label: `${displayGroup.Group}`,
        };
        //@ts-ignore
        setDisplayGroupData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.Group === null ||
            formValue.Group === undefined ||
            formValue.Group === ''
        ) {
            setErrorGroup('Chưa có nhóm hiển thị!!');

            isAllow = false;
        } else {
            setErrorGroup('');

            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsertDisplayGroup(formValue);

            insertDisplayGroupMutation({
                variables: { displayGroup: obj },
            })
                .then((res) => {
                    if (res?.data?.InsertDisplayGroup) {
                        if (res.data.InsertDisplayGroup !== '') {
                            setValue('_id', res.data.InsertDisplayGroup);

                            //@ts-ignore
                            dispatch(insertDiplayGroup(formValue));

                            handelInsertListDipslayGroup(
                                formValue,
                                res.data.InsertDisplayGroup,
                            );
                            handelInsertDisplayGroupData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm nhóm hiển thị thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm nhóm hiển thị không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm nhóm hiển thị không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListDisplayGroup = (displayGroup: any) => {
        const temp = [];

        for (const item of listDisplayGroup) {
            //@ts-ignore
            if (item._id !== displayGroup._id) {
                temp.push(item);
            } else {
                temp.push(displayGroup);
            }
        }

        //@ts-ignore
        setListDisplayGroup([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.Group === null ||
            formValue.Group === undefined ||
            formValue.Group === ''
        ) {
            setErrorGroup('Chưa có nhóm hiển thị!!');

            isAllow = false;
        } else {
            setErrorGroup('');

            isAllow = true;
        }

        if (isAllow) {
            updateDisplayGroupMutation({
                variables: { displayGroup: formValue },
            })
                .then((res) => {
                    if (res?.data?.UpdateDisplayGroup) {
                        if (res.data.UpdateDisplayGroup > 0) {
                            //@ts-ignore
                            dispatch(updateDisplayGroup(formValue));

                            handelUpdateListDisplayGroup(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật nhóm hiển thị thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật nhóm hiển thị không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật nhóm hiển thị không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListDisplayGroup = (displayGroup: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listDisplayGroup) {
            //@ts-ignore
            if (item._id !== displayGroup._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListDisplayGroup([...temp]);
    };

    const handelDeleteDisplayGroupData = (displayGroup: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of displayGroupData) {
            //@ts-ignore
            if (item.value !== displayGroup.Group) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setDisplayGroupData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa nhóm hiển thị?',
            text: 'Xóa nhóm hiển thị không thể nào hồi phục lại!',
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
                    formValue.Group === null ||
                    formValue.Group === undefined ||
                    formValue.Group === ''
                ) {
                    setErrorGroup('Chưa có nhóm hiển thị!!');

                    isAllow = false;
                } else {
                    setErrorGroup('');

                    isAllow = true;
                }

                if (isAllow) {
                    deleteDisplayGroupMutation({
                        variables: {
                            displayGroup: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteDisplayGroup) {
                                if (res.data.DeleteDisplayGroup > 0) {
                                    //@ts-ignore
                                    dispatch(deleteDisplayGroup(formValue));

                                    handelDeleteDisplayGroupData(formValue);
                                    handelDeleteListDisplayGroup(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa nhóm hiển thị thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa nhóm hiển thị không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa nhóm hiển thị không thành công',
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
                {isCreateMode ? (
                    <Controller
                        name="Group"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Nhóm hiển thị"
                                placeholder="Nhóm hiển thị"
                                withAsterisk
                                error={errorGorup}
                                {...field}
                            />
                        )}
                    ></Controller>
                ) : (
                    <Controller
                        name="Group"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Nhóm hiển thị"
                                placeholder="Nhóm hiển thị"
                                data={displayGroupData}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                withAsterisk
                                error={errorGorup}
                                {...field}
                                onChange={onDisplayChanged}
                            />
                        )}
                    ></Controller>
                )}
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
                <Controller
                    name="Name"
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

export default DisplayGroupModal;
