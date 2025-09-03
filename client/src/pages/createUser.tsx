import { motion } from 'framer-motion';

import {
    Grid,
    Flex,
    Button,
    Text,
    TextInput,
    Select,
    Switch,
    PasswordInput,
    Space,
} from '@mantine/core';

import { useState, useEffect } from 'react';

import {
    useGetUsersLazyQuery,
    useGetRolesLazyQuery,
    useInsertUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from '../__generated__/graphql';

import Swal from 'sweetalert2';

import { Controller, useForm } from 'react-hook-form';

const CreateUserPage = () => {
    const [isCreateMode, setIsCreateMode] = useState(false);

    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [roleData, setRoleData] = useState([]);
    const [usernameData, setUsernameData] = useState([]);
    const [listUser, setListUser] = useState([]);

    const [getRole] = useGetRolesLazyQuery();
    const [getUser] = useGetUsersLazyQuery();
    const [insertUser] = useInsertUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const { reset, getValues, setValue, control } = useForm({
        defaultValues: {
            _id: '',
            Username: '',
            Password: '',
            pfm: '',
            Salt: '',
            StaffId: '',
            ConsumerId: '',
            Email: '',
            Role: '',
            Active: 0,
            TimeStamp: new Date(),
            Ip: '',
            LoginTime: 0,
            Language: '',
        },
    });

    useEffect(() => {
        getRole()
            .then((res) => {
                if (res?.data?.GetRoles) {
                    const temp = [];

                    for (const item of res.data.GetRoles) {
                        const obj = {
                            value: item?.Role,
                            label: item?.Description,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setRoleData([...temp]);
                }
            })
            .catch((err) => console.log(err));

        getUser().then((res) => {
            if (res?.data?.GetUsers) {
                const temp = [];

                for (const item of res.data.GetUsers) {
                    const obj = {
                        value: item?.Username,
                        label: item?.Username,
                    };

                    temp.push(obj);
                }

                //@ts-ignore
                setUsernameData([...temp]);

                //@ts-ignore
                setListUser([...res.data.GetUsers]);
            }
        });
    }, []);

    const onUserChanged = (e: any) => {
        //@ts-ignore
        const find = listUser.find((el) => el.Username === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('Username', find.Username);
            //@ts-ignore
            setValue('Password', find.Password);
            //@ts-ignore
            setValue('Role', find.Role);
        }
    };

    const createObjInsertUser = (formValue: any) => {
        const obj = {
            Username: formValue.Username,
            Password: formValue.Password,
            pfm: formValue.pfm,
            Salt: formValue.Salt,
            StaffId: formValue.StaffId,
            ConsumerId: formValue.ConsumerId,
            Email: formValue.Email,
            Role: formValue.Role,
            Active: formValue.Active,
            TimeStamp: formValue.TimeStamp,
            Ip: formValue.Ip,
            LoginTime: formValue.LoginTime,
            Language: formValue.Language,
        };

        return obj;
    };

    const handelInsertListUser = (user: any, id: string) => {
        const obj = {
            ...user,
            _id: id,
        };

        //@ts-ignore
        setListUser((current) => [...current, obj]);
    };

    const handelInsertUsernameData = (user: any) => {
        const obj = {
            value: user.Username,
            label: user.Username,
        };

        //@ts-ignore
        setUsernameData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllowUsername = true;
        let isAllowPassword = true;

        if (
            formValue.Username === null ||
            formValue.Username === undefined ||
            formValue.Username === ''
        ) {
            setErrorUsername('Tên người dùng chưa có giá trị!!!');
            isAllowUsername = false;
        } else {
            setErrorUsername('');
            isAllowUsername = true;
        }
        if (
            formValue.Password === null ||
            formValue.Password === undefined ||
            formValue.Password === ''
        ) {
            setErrorPassword('Mật khẩu chưa có giá trị!!!');
            isAllowPassword = false;
        } else {
            setErrorPassword('');
            isAllowPassword = true;
        }

        if (isAllowPassword && isAllowUsername) {
            const obj = createObjInsertUser(formValue);

            console.log(obj);

            insertUser({
                variables: {
                    user: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.InsertUser) {
                        if (res.data.InsertUser !== '') {
                            setValue('_id', res.data.InsertUser);

                            handelInsertListUser(
                                formValue,
                                res.data.InsertUser,
                            );

                            handelInsertUsernameData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm người dùng thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm người dùng không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm người dùng không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListUser = (user: any) => {
        const temp = [];

        for (const item of listUser) {
            //@ts-ignore
            if (item._id !== user._id) {
                temp.push(item);
            } else {
                temp.push(user);
            }
        }

        //@ts-ignore
        setListUser([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();
        let isAllowUsername = true;
        let isAllowPassword = true;

        if (
            formValue.Username === null ||
            formValue.Username === undefined ||
            formValue.Username === ''
        ) {
            setErrorUsername('Tên người dùng chưa có giá trị!!!');
            isAllowUsername = false;
        } else {
            setErrorUsername('');
            isAllowUsername = true;
        }
        if (
            formValue.Password === null ||
            formValue.Password === undefined ||
            formValue.Password === ''
        ) {
            setErrorPassword('Mật khẩu chưa có giá trị!!!');
            isAllowPassword = false;
        } else {
            setErrorPassword('');
            isAllowPassword = true;
        }

        if (isAllowPassword && isAllowUsername) {
            updateUser({
                variables: {
                    user: formValue,
                },
            })
                .then((res) => {
                    if (res?.data?.UpdateUser) {
                        if (res.data?.UpdateUser > 0) {
                            handelUpdateListUser(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật người dùng thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật người dùng không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật người dùng không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListUser = (user: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listUser) {
            //@ts-ignore
            if (item._id !== user._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListUser([...temp]);
    };

    const handelDeleteUsernameData = (user: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of usernameData) {
            //@ts-ignore
            if (item.value !== user.Username) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setUsernameData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa người dùng?',
            text: 'Xóa người dùng không thể nào hồi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                const formValue = getValues();
                let isAllowUsername = true;

                if (
                    formValue.Username === null ||
                    formValue.Username === undefined ||
                    formValue.Username === ''
                ) {
                    setErrorUsername('Tên người dùng chưa có giá trị!!!');
                    isAllowUsername = false;
                } else {
                    setErrorUsername('');
                    isAllowUsername = true;
                }

                if (isAllowUsername) {
                    deleteUser({
                        variables: {
                            user: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteUser) {
                                if (res.data?.DeleteUser > 0) {
                                    handelDeleteListUser(formValue);

                                    handelDeleteUsernameData(formValue);

                                    reset();

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa người dùng thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa người dùng không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa người dùng không thành công',
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
                        <Text fw={500}>Điểm lắp đặt</Text>
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
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    {isCreateMode ? (
                        <Controller
                            name="Username"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Tên người dùng"
                                    placeholder="Tên người dùng"
                                    withAsterisk
                                    error={errorUsername}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    ) : (
                        <Controller
                            name="Username"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Tên người dùng"
                                    placeholder="Tên người dùng"
                                    data={usernameData}
                                    searchable
                                    nothingFoundMessage="Không tìm thấy"
                                    clearable
                                    withAsterisk
                                    error={errorUsername}
                                    {...field}
                                    onChange={onUserChanged}
                                />
                            )}
                        ></Controller>
                    )}
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <Controller
                        name="Password"
                        control={control}
                        render={({ field }) => (
                            <PasswordInput
                                label="Mật khẩu"
                                placeholder="Nật khẩu"
                                withAsterisk
                                error={errorPassword}
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <Controller
                        name="Role"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Quyền"
                                placeholder="Quyền"
                                data={roleData}
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

export default CreateUserPage;
