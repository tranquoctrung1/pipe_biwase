import { motion } from 'framer-motion';

import { Controller, useForm } from 'react-hook-form';

import {
    Flex,
    Grid,
    Button,
    Text,
    Select,
    TextInput,
    NumberInput,
    Space,
    Checkbox,
    Modal,
    Switch,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import ChannelModal from '../components/channelModal';
import DisplayGroupModal from '../components/displayGroupModal';

import {
    useGetSitesQuery,
    useGetNodeTypesLazyQuery,
    useGetDisplayGroupsLazyQuery,
    useInsertSiteMutation,
    useUpdateSiteMutation,
    useDeleteSiteMutation,
} from '../__generated__/graphql';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
    DisplayGroupState,
    addAllDisplayGroup,
} from '../features/displayGroup';

import { LoggerIdState, setCurrentLoggerId } from '../features/loggerId';

import Swal from 'sweetalert2';

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { IconMap } from '@tabler/icons-react';

import { marker } from 'leaflet';

const SitePage = () => {
    const [siteData, setSiteData] = useState([]);
    const [listSite, setListSite] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const [displayGroupData, setDisplayGroupData] = useState([]);

    const [errorSiteId, setErrorSiteId] = useState('');
    const [errorLoggerId, setErrorLoggerId] = useState('');

    const [isCreateMode, setIsCreateMode] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const { refetch: getSites } = useGetSitesQuery();
    const [getNodeType] = useGetNodeTypesLazyQuery();
    const [getDisplayGroups] = useGetDisplayGroupsLazyQuery();

    const [insertSite] = useInsertSiteMutation();
    const [updateSite] = useUpdateSiteMutation();
    const [deleteSite] = useDeleteSiteMutation();

    const displayGroupState = useSelector(DisplayGroupState);
    const loggerIdState = useSelector(LoggerIdState);

    const dispatch = useDispatch();

    const [
        openedChannelModal,
        { open: openChannelModal, close: closeChannelModal },
    ] = useDisclosure(false);
    const [
        openedDisplayGroupModal,
        { open: openDisplayGroupModal, close: closeDisplayGroupModal },
    ] = useDisclosure(false);

    const { getValues, setValue, reset, control } = useForm({
        defaultValues: {
            _id: '',
            SiteId: '',
            Location: '',
            Latitude: 0,
            Longitude: 0,
            DisplayGroup: '',
            LoggerId: '',
            Status: '',
            Available: '',
            Note: '',
            Type: '',
            Prioritize: 0,
            IsScadaMeter: 0,
            IsManualMeter: 0,
            IsShowLabel: 0,
            TimeDelay: 60,
            IsDNP: 0,
            IsHWM: 0,
            StartHour: 6,
        },
    });

    useEffect(() => {
        getSites()
            .then((res) => {
                if (res?.data?.GetSites) {
                    const temp = [];

                    for (const item of res.data.GetSites) {
                        const obj = {
                            value: item?.SiteId,
                            label: `${item?.SiteId} - ${item?.Location}`,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setSiteData([...temp]);
                    //@ts-ignore
                    setListSite([...res.data.GetSites]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getNodeType()
            .then((res) => {
                if (res?.data?.GetNodeTypes) {
                    const temp = [];

                    for (const item of res.data.GetNodeTypes) {
                        const obj = {
                            value: item?.Type?.toString(),
                            label: `${item?.Type} - ${item?.Name}`,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setTypeData([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

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
                    dispatch(addAllDisplayGroup(res.data.GetDisplayGroups));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const temp = [];

        for (const item of displayGroupState) {
            const obj = {
                //@ts-ignore
                value: item.Group,
                //@ts-ignore
                label: item.Group,
            };

            temp.push(obj);
        }
        //@ts-ignore
        setDisplayGroupData([...temp]);
    }, [displayGroupState]);

    //set resize for leaflet map
    setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
    }, 0);

    const onSiteChanged = (e: any) => {
        //@ts-ignore
        const find = listSite.find((el) => el.SiteId === e);

        if (find !== undefined) {
            //@ts-ignore
            setValue('_id', find._id);
            //@ts-ignore
            setValue('SiteId', find.SiteId);
            //@ts-ignore
            setValue('Location', find.Location);
            //@ts-ignore
            setValue('Latitude', find.Latitude);
            //@ts-ignore
            setValue('Longitude', find.Longitude);
            //@ts-ignore
            setValue('DisplayGroup', find.DisplayGroup);
            //@ts-ignore
            setValue('LoggerId', find.LoggerId);

            //@ts-ignore
            dispatch(setCurrentLoggerId(find.LoggerId));

            //@ts-ignore
            setValue('Status', find.Status);
            //@ts-ignore
            setValue('Available', find.Available);
            //@ts-ignore
            setValue('Type', find.Type.toString());
            //@ts-ignore
            setValue('Prioritize', find.Prioritize);
            //@ts-ignore
            setValue('Note', find.Note);
            //@ts-ignore
            setValue('IsScadaMeter', find.IsScadaMeter);
            //@ts-ignore
            setValue('IsManualMeter', find.IsManualMeter);
            //@ts-ignore
            setValue('IsShowLabel', find.IsShowLabel);
            //@ts-ignore
            setValue('TimeDelay', find.TimeDelay);
            //@ts-ignore
            setValue('IsDNP', find.IsDNP);
            //@ts-ignore
            setValue('IsHWM', find.IsHWM);
            //@ts-ignore
            setValue('StartHour', find.StartHour);
        }
    };

    const createObjInsertSite = (formValue: any) => {
        const obj = {
            SiteId: formValue.SiteId,
            Location: formValue.Location,
            Latitude: formValue.Latitude,
            Longitude: formValue.Longitude,
            DisplayGroup: formValue.DisplayGroup,
            LoggerId: formValue.LoggerId,
            Status: formValue.Status,
            Available: formValue.Avalable,
            Note: formValue.Note,
            Type: formValue.Type,
            StartHour: formValue.StartHour,
            Prioritize:
                formValue.Prioritize === 0 || formValue.Prioritize === false
                    ? false
                    : true,
            IsScadaMeter:
                formValue.IsScadaMeter === 0 || formValue.IsScadaMeter === false
                    ? false
                    : true,
            IsManualMeter:
                formValue.IsManualMeter === 0 ||
                formValue.IsManualMeter === false
                    ? false
                    : true,
            IsShowLabel:
                formValue.IsShowLabel === 0 || formValue.IsShowLabel === false
                    ? false
                    : true,
            TimeDelay: formValue.TimeDelay,
            IsDNP:
                formValue.IsDNP === 0 || formValue.IsDNP === false
                    ? false
                    : true,
            IsHWM:
                formValue.IsHWM === 0 || formValue.IsHWM === false
                    ? false
                    : true,
        };

        return obj;
    };

    const handelInsertListSite = (site: any, id: string) => {
        const obj = {
            ...site,
            _id: id,
        };

        //@ts-ignore
        setListSite((current) => [...current, obj]);
    };

    const handelInsertSiteData = (site: any) => {
        const obj = {
            value: site.SiteId,
            label: `${site.SiteId} - ${site.Location}`,
        };

        //@ts-ignore
        setSiteData((current) => [...current, obj]);
    };

    const onInsertClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.SiteId === '' ||
            formValue.SiteId === null ||
            formValue.SiteId === undefined
        ) {
            setErrorSiteId('Mã vị trí chưa có dữ liệu !!!');
            isAllow = false;
        } else {
            setErrorSiteId('');
            isAllow = true;
        }

        if (isAllow) {
            const obj = createObjInsertSite(formValue);

            insertSite({
                variables: {
                    site: obj,
                },
            })
                .then((res) => {
                    if (res?.data?.InsertSite) {
                        if (res.data.InsertSite !== '') {
                            setValue('_id', res.data.InsertSite);

                            handelInsertListSite(
                                formValue,
                                res.data.InsertSite,
                            );
                            handelInsertSiteData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Thêm điểm lăp đặt thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Thêm điểm lăp đặt không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Thêm điểm lăp đặt không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelUpdateListSite = (site: any) => {
        const temp = [];

        for (const item of listSite) {
            //@ts-ignore
            if (item._id !== site._id) {
                temp.push(item);
            } else {
                temp.push(site);
            }
        }

        //@ts-ignore
        setListSite([...temp]);
    };

    const handelUpdateSiteData = (site: any) => {
        const temp = [];

        for (const item of siteData) {
            //@ts-ignore
            if (item.value !== site.SiteId) {
                temp.push(item);
            } else {
                const obj = {
                    value: site.SiteId,
                    label: `${site.SiteId} - ${site.Location}`,
                };

                temp.push(obj);
            }
        }

        //@ts-ignore
        setSiteData([...temp]);
    };

    const onUpdateClicked = () => {
        const formValue = getValues();

        let isAllow = true;

        if (
            formValue.SiteId === '' ||
            formValue.SiteId === null ||
            formValue.SiteId === undefined
        ) {
            setErrorSiteId('Mã vị trí chưa có dữ liệu !!!');
            isAllow = false;
        } else {
            setErrorSiteId('');
            isAllow = true;
        }

        if (isAllow) {
            if (formValue.Prioritize == 0) {
                //@ts-ignore
                formValue.Prioritize = false;
            }
            //@ts-ignore
            updateSite({ variables: { site: formValue } })
                .then((res) => {
                    if (res?.data?.UpdateSite) {
                        if (res.data.UpdateSite > 0) {
                            handelUpdateListSite(formValue);

                            handelUpdateSiteData(formValue);

                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Cập nhật điểm lăp đặt thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Cập nhật điểm lăp đặt không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Cập nhật điểm lăp đặt không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const handelDeleteListSite = (site: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of listSite) {
            //@ts-ignore
            if (item._id !== site._id) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setListSite([...temp]);
    };

    const handelDeleteSiteData = (site: any) => {
        //@ts-ignore
        const temp = [];

        for (const item of siteData) {
            //@ts-ignore
            if (item.value !== site.SiteId) {
                temp.push(item);
            }
        }

        //@ts-ignore
        setSiteData([...temp]);
    };

    const onDeleteClicked = () => {
        Swal.fire({
            title: 'Xóa điểm lắp đặt?',
            text: 'Xóa điểm lắp đặt không thể nào hồi phục lại!',
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
                    formValue.SiteId === '' ||
                    formValue.SiteId === null ||
                    formValue.SiteId === undefined
                ) {
                    setErrorSiteId('Mã vị trí chưa có dữ liệu !!!');
                    isAllow = false;
                } else {
                    setErrorSiteId('');
                    isAllow = true;
                }

                if (isAllow) {
                    if (formValue.Prioritize == 0) {
                        //@ts-ignore
                        formValue.Prioritize = false;
                    }
                    deleteSite({
                        variables: {
                            //@ts-ignore
                            site: formValue,
                        },
                    })
                        .then((res) => {
                            if (res?.data?.DeleteSite) {
                                if (res.data.DeleteSite > 0) {
                                    handelDeleteSiteData(formValue);
                                    handelDeleteListSite(formValue);

                                    reset();
                                    //@ts-ignore
                                    setValue('DisplayGroup', null);
                                    //@ts-ignore
                                    setValue('Type', null);

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Successfull',
                                        text: 'Xóa điểm lăp đặt thành công',
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Xóa điểm lăp đặt không thành công',
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Xóa điểm lăp đặt không thành công',
                            });
                            console.log(err);
                        });
                }
            }
        });
    };

    const onLoggerIdBlured = (e: any) => {
        if (e.currentTarget.value !== '') {
            dispatch(setCurrentLoggerId(e.currentTarget.value));
            setErrorLoggerId('');
        }
    };

    const onOpenChannelModal = () => {
        if (loggerIdState !== '') {
            openChannelModal();

            setErrorLoggerId('');
        } else {
            setErrorLoggerId('Chưa có loggerId');
        }
    };

    const onShowMapClicked = () => {
        setShowMap(!showMap);
    };

    const SetMapClick = () => {
        const map = useMapEvents({
            click: (e) => {
                marker(e.latlng).addTo(map);

                if (e.latlng.lat !== null && e.latlng.lat !== undefined) {
                    setValue('Latitude', e.latlng.lat);
                }
                if (e.latlng.lng !== null && e.latlng.lng !== undefined) {
                    setValue('Longitude', e.latlng.lng);
                }
            },
        });

        return null;
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
                            //@ts-ignore
                            setValue('DisplayGroup', null);
                            //@ts-ignore
                            setValue('Type', null);
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    {isCreateMode ? (
                        <Controller
                            name="SiteId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Mã vị trí"
                                    placeholder="Mã vị trí"
                                    error={errorSiteId}
                                    {...field}
                                />
                            )}
                        ></Controller>
                    ) : (
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
                    )}
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Location"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Vị trí"
                                placeholder="Vị trí"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Latitude"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label={
                                    <>
                                        <span style={{ marginRight: '10px' }}>
                                            Kinh độ
                                        </span>

                                        <IconMap
                                            size="1.125rem"
                                            style={{ cursor: 'pointer' }}
                                            onClick={onShowMapClicked}
                                        ></IconMap>
                                    </>
                                }
                                placeholder="Kinh độ"
                                decimalScale={6}
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Longitude"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Vĩ độ"
                                placeholder="Vĩ độ"
                                decimalScale={6}
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ height: '100%' }}
                    >
                        <Controller
                            name="DisplayGroup"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Nhóm hiển thị"
                                    placeholder="Nhóm hiển thị"
                                    data={displayGroupData}
                                    searchable
                                    nothingFoundMessage="Không tìm thấy"
                                    clearable
                                    {...field}
                                />
                            )}
                        ></Controller>
                        <Space w="xs" />
                        <Flex
                            justify="flex-end"
                            align="flex-end"
                            style={{ height: '100%' }}
                        >
                            <Button
                                color="green"
                                variant="filled"
                                style={{ padding: '5px  8px' }}
                                onClick={openDisplayGroupModal}
                            >
                                Thêm NHT
                            </Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ height: '100%' }}
                    >
                        <Controller
                            name="LoggerId"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    label="Logger Id"
                                    placeholder="Logger Id"
                                    error={errorLoggerId}
                                    {...field}
                                    onBlur={onLoggerIdBlured}
                                />
                            )}
                        ></Controller>
                        <Space w="xs" />
                        <Flex
                            justify="flex-end"
                            align="flex-end"
                            style={{ height: '100%' }}
                        >
                            <Button
                                color="green"
                                variant="filled"
                                style={{ padding: '5px  8px' }}
                                onClick={onOpenChannelModal}
                            >
                                Thêm kênh
                            </Button>
                        </Flex>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Loại vị trí"
                                placeholder="Loại vị trí"
                                data={typeData}
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
                        name="TimeDelay"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Thời gian cài đặt dữ liệu trể (phút)"
                                placeholder="Thời gian cài đặt dữ liệu trể (phút)"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="StartHour"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Giờ chốt"
                                placeholder="Giờ chốt"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Status"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Tình Trạng"
                                placeholder="Tình Trạng"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Available"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Trạng thái"
                                placeholder="Trạng thái"
                                {...field}
                            />
                        )}
                    ></Controller>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="Prioritize"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('Prioritize') == undefined ||
                                        getValues('Prioritize') == 0
                                            ? false
                                            : true
                                    }
                                    label="Ưu tiên lấy giá trị"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="IsScadaMeter"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('IsScadaMeter') ==
                                            undefined ||
                                        getValues('IsScadaMeter') == 0
                                            ? false
                                            : true
                                    }
                                    label="Đồng hồ trong Scada"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="IsManualMeter"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('IsManualMeter') ==
                                            undefined ||
                                        getValues('IsManualMeter') == 0
                                            ? false
                                            : true
                                    }
                                    label="Đồng hồ cơ"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="IsDNP"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('IsDNP') == undefined ||
                                        getValues('IsDNP') == 0
                                            ? false
                                            : true
                                    }
                                    label="Đồng hồ DNP"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="IsHWM"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('IsHWM') == undefined ||
                                        getValues('IsHWM') == 0
                                            ? false
                                            : true
                                    }
                                    label="Đồng hồ Halma"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ height: '100%', marginTop: '15px' }}
                    >
                        <Controller
                            name="IsShowLabel"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={
                                        getValues('IsShowLabel') == undefined ||
                                        getValues('IsShowLabel') == 0
                                            ? false
                                            : true
                                    }
                                    label="Hiển thị label"
                                    {...field}
                                />
                            )}
                        ></Controller>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Controller
                        name="Note"
                        control={control}
                        render={({ field }) => (
                            <TextInput
                                label="Ghi chú"
                                placeholder="Ghi chú"
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
                {showMap && (
                    <Grid.Col span={{ base: 12 }}>
                        <MapContainer
                            center={[10.597631, 106.535453]}
                            zoom={12}
                            scrollWheelZoom={true}
                            attributionControl={false}
                            zoomControl={false}
                            id="mapContainer"
                            style={{ height: '23rem' }}
                        >
                            <SetMapClick />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                maxNativeZoom={18}
                                maxZoom={30}
                            />
                        </MapContainer>
                    </Grid.Col>
                )}
            </Grid>
            <Modal
                opened={openedChannelModal}
                onClose={closeChannelModal}
                title="Kênh"
                centered
                size="lg"
            >
                <ChannelModal />
            </Modal>
            <Modal
                opened={openedDisplayGroupModal}
                onClose={closeDisplayGroupModal}
                title="Nhóm hiển thị"
                centered
            >
                <DisplayGroupModal />
            </Modal>
        </motion.div>
    );
};

export default SitePage;
