import {
    Grid,
    Button,
    Text,
    TextInput,
    NumberInput,
    Center,
    Box,
    Badge,
} from '@mantine/core';

import { Controller, useForm } from 'react-hook-form';

import { useState } from 'react';

import Swal from 'sweetalert2';

import { useInsertDataLoggerMutation } from '../__generated__/graphql';

const ManualHistory = ({ ChannelId, ChannelName }: any) => {
    const [errorTimeStamp, setErrorTimeStamp] = useState('');
    const [errorValue, setErrorValue] = useState('');

    const [insertDataLogger] = useInsertDataLoggerMutation();

    const { getValues, control } = useForm({
        defaultValues: {
            ChannelId: ChannelId,
            ChannelName: ChannelName,
            TimeStamp: undefined,
            Value: undefined,
        },
    });

    const createObjInsertDataLogger = (formValue: any) => {
        const obj = {
            ChannelId: formValue.ChannelId,
            TimeStamp:
                formValue.TimeStamp !== ''
                    ? new Date(formValue.TimeStamp)
                    : null,
            Value: formValue.Value,
        };

        return obj;
    };

    const onInsertClicked = () => {
        const formValue = getValues();
        let isAllowTimeStamp = true;
        let isAllowValue = true;

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

        if (isAllowTimeStamp && isAllowValue) {
            const obj = createObjInsertDataLogger(formValue);

            insertDataLogger({
                variables: {
                    data: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.InsertDataLogger) {
                        if (res.data.InsertDataLogger !== '') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm dữ liệu thành công',
                            });
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
                    console.error(err);
                });
        }
    };

    return (
        <Box
            my="md"
            p="md"
            style={{
                borderRadius: '10px',
                boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
            }}
        >
            <Badge color="blue">{ChannelName}</Badge>
            <Grid>
                <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
                    <Controller
                        name="ChannelId"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Mã kênh"
                                placeholder="Mã kênh"
                                {...field}
                                disabled
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
                    <Controller
                        name="ChannelName"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Tên kênh"
                                placeholder="Tên kênh"
                                {...field}
                                disabled
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
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
                <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
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
                <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
                    <Text> &nbsp;</Text>
                    <Center>
                        <Button
                            color="green"
                            variant="filled"
                            onClick={onInsertClicked}
                        >
                            Thêm
                        </Button>
                    </Center>
                </Grid.Col>
            </Grid>
        </Box>
    );
};

export default ManualHistory;
