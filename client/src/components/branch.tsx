import {
    Grid,
    Button,
    Space,
    Flex,
    Switch,
    TextInput,
    Select,
} from '@mantine/core';

import {
    useGetBranchsQuery,
    useInsertBranchMutation,
    useUpdateBranchMutation,
    useDeleteBranchMutation,
} from '../__generated__/graphql';

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import { Controller, useForm } from 'react-hook-form';

const BranchComponent = () => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [branchs, setBranchs] = useState([]);
    const [listBranch, setListBranch] = useState([]);

    const [errorBranchId, setErrorBranchId] = useState('');

    const { refetch: getBranchs } = useGetBranchsQuery();
    const [insertBranch] = useInsertBranchMutation();
    const [updateBranch] = useUpdateBranchMutation();
    const [deleteBranch] = useDeleteBranchMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            BranchId: '',
            BranchName: '',
        },
    });

    useEffect(() => {
        getBranchs()
            .then((res) => {
                if (res?.data?.GetBranchs) {
                    const temp = [];

                    for (const item of res.data.GetBranchs) {
                        const obj = {
                            value: item?.BranchId,
                            label: item?.BranchId,
                        };

                        temp.push(obj);
                    }
                    //@ts-ignore
                    setBranchs([...temp]);
                    //@ts-ignore
                    setListBranch([...res.data.GetBranchs]);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const onChangedBranchId = (e: any) => {
        //@ts-ignore
        const find = listBranch.find((el) => el.BranchId === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('BranchId', find.BranchId);
            //@ts-ignore
            setValue('BranchName', find.BranchName);
        }
    };

    const createObjInsert = (formValue: any) => {
        const obj = {
            BranchId: formValue.BranchId,
            BranchName: formValue.BranchName,
        };

        return obj;
    };

    const handelInsertListBranch = (branch: any, id: string) => {
        const obj = {
            ...branch,
            _id: id,
        };
        //@ts-ignore
        setListBranch((current) => [...current, obj]);
    };

    const handelInsertBranchData = (branch: any) => {
        const obj = {
            value: branch.BranchId,
            label: branch.BranchId,
        };
        //@ts-ignore
        setBranchs((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.BranchId === null ||
            formValue.BranchId === undefined ||
            formValue.BranchId === ''
        ) {
            setErrorBranchId('Chưa có mã nhánh!!');

            isAllow = false;
        } else {
            setErrorBranchId('');

            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsert(formValue);

            insertBranch({
                variables: { branch: obj },
            })
                .then((res) => {
                    if (res?.data?.InsertBranch) {
                        if (res.data?.InsertBranch !== '') {
                            setValue('_id', res.data?.InsertBranch);

                            handelInsertListBranch(
                                formValue,
                                res.data.InsertBranch,
                            );
                            handelInsertBranchData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm nhánh thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm nhánh không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm nhánh không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListBranch = (branch: any) => {
        const temp = [];

        for (const item of listBranch) {
            //@ts-ignore
            if (item._id !== branch._id) {
                temp.push(item);
            } else {
                temp.push(branch);
            }
        }

        //@ts-ignore
        setListBranch([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllow = true;

        if (
            formValue.BranchId === null ||
            formValue.BranchId === undefined ||
            formValue.BranchId === ''
        ) {
            setErrorBranchId('Chưa có mã nhánh!!');

            isAllow = false;
        } else {
            setErrorBranchId('');

            isAllow = true;
        }

        if (isAllow) {
            updateBranch({
                //@ts-ignore
                variables: { branch: formValue },
            })
                .then((res) => {
                    if (res?.data?.UpdateBranch) {
                        if (res.data?.UpdateBranch > 0) {
                            handelUpdateListBranch(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật nhánh thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật nhánh không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật nhánh không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListBranch = (branch: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listBranch) {
            //@ts-ignore
            if (item._id !== branch._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListBranch([...temp]);
    };

    const handelDeleteBranchData = (branch: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of branchs) {
            //@ts-ignore
            if (item.value !== branch.BranchId) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setBranchs([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa nhánh?',
            text: 'Xóa nhánh không thể nào hồi phục lại!',
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
                    formValue.BranchId === null ||
                    formValue.BranchId === undefined ||
                    formValue.BranchId === ''
                ) {
                    setErrorBranchId('Chưa có mã nhánh!!');

                    isAllow = false;
                } else {
                    setErrorBranchId('');

                    isAllow = true;
                }

                if (isAllow) {
                    deleteBranch({
                        variables: {
                            //@ts-ignore
                            branch: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteBranch) {
                                if (res.data?.DeleteBranch > 0) {
                                    handelDeleteBranchData(formValue);
                                    handelDeleteListBranch(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa nhánh thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa nhánh không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa nhánh không thành công',
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
            <Grid.Col span={{ base: 12, md: 6 }}>
                {isCreateMode ? (
                    <Controller
                        name="BranchId"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Mã nhánh"
                                placeholder="Mã nhánh"
                                withAsterisk
                                error={errorBranchId}
                                {...field}
                            />
                        )}
                    ></Controller>
                ) : (
                    <Controller
                        name="BranchId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Mã nhánh"
                                placeholder="Mã nhánh"
                                data={branchs}
                                searchable
                                nothingFoundMessage="Không tìm thấy"
                                clearable
                                withAsterisk
                                error={errorBranchId}
                                {...field}
                                onChange={onChangedBranchId}
                            />
                        )}
                    ></Controller>
                )}
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Controller
                    name="BranchName"
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            label="Tên nhánh"
                            placeholder="Tên nhánh"
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

export default BranchComponent;
