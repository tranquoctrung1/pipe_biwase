import { Table, Text, NumberInput, ActionIcon, Flex } from '@mantine/core';

import { Controller, useForm } from 'react-hook-form';

import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';

import {
    useInsertManualIndexMutation,
    useUpdateManualIndexMutation,
    useDeleteManualIndexMutation,
} from '../__generated__/graphql';

import Swal from 'sweetalert2';

const RowIndexManual = ({
    item,
    time,
    handleInsert,
    handleUpdate,
    handleDelete,
}: any) => {
    const [insertManualIndex] = useInsertManualIndexMutation();
    const [updateManualIndex] = useUpdateManualIndexMutation();
    const [deleteManualIndex] = useDeleteManualIndexMutation();

    const { getValues, setValue, control } = useForm({
        defaultValues: {
            _id: item.IdManualIndex,
            TimeStamp: new Date(time),
            SiteId: item.SiteId,
            Value: item.IndexManual == null ? '' : item.IndexManual,
        },
    });

    const renderQuantity = (quantity: any) => {
        if (quantity === null) {
            return (
                <Text fw="bold" c="red">
                    NO DATA
                </Text>
            );
        }

        return <Text fw="bold">{quantity}</Text>;
    };

    const renderIndexManual = () => {
        return (
            <Controller
                name="Value"
                control={control}
                render={({ field }) => (
                    <NumberInput decimalScale={0} {...field} />
                )}
            ></Controller>
        );
    };

    const createObjInsertManualIndex = (formValue: any) => {
        const obj = {
            SiteId: formValue.SiteId,
            TimeStamp: formValue.TimeStamp,
            Value: formValue.Value,
        };

        return obj;
    };

    const onInsertClicked = () => {
        const formValue = getValues();

        const obj = createObjInsertManualIndex(formValue);

        insertManualIndex({ variables: { data: obj } })
            .then((res) => {
                if (res?.data?.InsertManualIndex !== '') {
                    setValue('_id', res.data?.InsertManualIndex);

                    handleInsert();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successfull',
                        text: 'Thêm chỉ số thực tế thành công',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm chỉ số thực tế không thành công',
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Thêm chỉ số thực tế không thành công',
                });
            });
    };

    const onUpdateClicked = () => {
        const formValue = getValues();

        updateManualIndex({ variables: { data: formValue } })
            .then((res) => {
                if (res?.data?.UpdateManualIndex) {
                    if (res.data.UpdateManualIndex > 0) {
                        handleUpdate();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfull',
                            text: 'Cập nhật chỉ số thực tế thành công',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Cập nhật chỉ số thực tế không thành công',
                        });
                    }
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cập nhật chỉ số thực tế không thành công',
                });
            });
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa chỉ số nhập tay?',
            text: 'Xóa chỉ số nhập tay không thể nào hồi phục lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                const formValue = getValues();

                deleteManualIndex({
                    variables: {
                        data: formValue,
                    },
                })
                    .then((res) => {
                        if (res?.data?.DeleteManualIndex) {
                            if (res.data.DeleteManualIndex > 0) {
                                setValue('_id', '');
                                setValue('Value', '');

                                handleDelete();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Successfull',
                                    text: 'Xóa chỉ số thực tế thành công',
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Xóa chỉ số thực tế không thành công',
                                });
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Xóa chỉ số thực tế không thành công',
                        });
                    });
            }
        });
    };

    return (
        <Table.Tr>
            <Table.Td>{item.SiteId}</Table.Td>
            <Table.Td>{item.Location}</Table.Td>
            <Table.Td>{renderQuantity(item.Quantity)}</Table.Td>
            <Table.Td>{renderIndexManual()}</Table.Td>
            <Table.Td>
                <Flex justify="center" align="center" gap="xs">
                    {getValues('_id') == '' ? (
                        <ActionIcon
                            variant="filled"
                            color="green"
                            aria-label="edit"
                            onClick={onInsertClicked}
                        >
                            <IconPlus
                                style={{ width: '70%', height: '70%' }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    ) : (
                        <ActionIcon
                            variant="filled"
                            color="green"
                            aria-label="update"
                            onClick={onUpdateClicked}
                        >
                            <IconEdit
                                style={{ width: '70%', height: '70%' }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    )}

                    <ActionIcon
                        variant="filled"
                        color="red"
                        aria-label="delete"
                        onClick={onDeleteClicked}
                    >
                        <IconTrash
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Flex>
            </Table.Td>
        </Table.Tr>
    );
};

export default RowIndexManual;
