import { motion } from 'framer-motion';

import {
    Grid,
    Flex,
    Button,
    Space,
    Select,
    Text,
    Modal,
    Checkbox,
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import {
    IconArrowBigRightLine,
    IconArrowBigLeftLine,
} from '@tabler/icons-react';

import {
    useGetSiteIsMeterLazyQuery,
    useGetBranchsLazyQuery,
    useGetListPointBranchByBranchIdQuery,
    useUpdateListPointBranchMutation,
} from '../__generated__/graphql';

import BranchComponent from '../components/branch';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import Column from '../components/Column';

import { styled } from '../stiches.config';

const StyledColumns = styled('div', {
    display: 'grid',
    gridTemplateColumns: '1fr .3fr 1fr',
    marginTop: '20px',
    width: '100%',
    height: '70vh',
    gap: '8px',
});

const BranchPermissionPage = () => {
    const [opened, { open, close }] = useDisclosure(false);

    const initialColumns = {
        listSite: {
            id: 'listSite',
            list: [],
        },
        listSitePermission: {
            id: 'listSitePermission',
            list: [],
        },
    };

    const [level1, setLevel1] = useState(true);
    const [level2, setLevel2] = useState(false);

    const [columns, setColumns] = useState(initialColumns);

    const [branchData, setBranchData] = useState([]);
    const [sites, setSites] = useState([]);

    const [currentBranch, setCurrentBranch] = useState('');
    const [errorBranch, setErrorBranch] = useState('');

    const [getBranch] = useGetBranchsLazyQuery();
    const [getSites] = useGetSiteIsMeterLazyQuery();
    const { refetch: getListPointBranch } =
        useGetListPointBranchByBranchIdQuery();

    const [updateListPointBranch] = useUpdateListPointBranchMutation();

    useEffect(() => {
        getBranch()
            .then((res) => {
                if (res?.data?.GetBranchs) {
                    const temp = [];

                    for (const item of res.data.GetBranchs) {
                        const obj = {
                            value: item?._id,
                            label: item?.BranchId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setBranchData([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getSites()
            .then((res) => {
                if (res?.data?.GetSiteIsMeter) {
                    const temp = [];

                    for (const item of res.data.GetSiteIsMeter) {
                        const obj = {
                            _id: item?._id,
                            SiteId: item?.SiteId,
                        };

                        temp.push(obj);
                    }

                    const b = {
                        listSite: {
                            id: 'listSite',
                            list: [...temp],
                        },
                        listSitePermission: {
                            id: 'listSitePermission',
                            list: [],
                        },
                    };

                    //@ts-ignore
                    setColumns({ ...b });
                    //@ts-ignore
                    setSites([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onDragEnd = ({ source, destination }: DropResult) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null;

        // Set start and end variables
        //@ts-ignore
        const start = columns[source.droppableId];
        //@ts-ignore
        const end = columns[destination.droppableId];

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_: any, idx: number) => idx !== source.index,
            );

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index]);

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList,
            };

            // Update the state
            setColumns((state) => ({ ...state, [newCol.id]: newCol }));
            return null;
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.filter(
                (_: any, idx: number) => idx !== source.index,
            );

            // Create a new start column
            const newStartCol = {
                id: start.id,
                list: newStartList,
            };

            // Make a new end list array
            const newEndList = end.list;

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index]);

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList,
            };

            // Update the state
            setColumns((state) => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            }));
            return null;
        }
    };

    const onBranchChanged = (e: any) => {
        setCurrentBranch(e);
    };

    const onViewClicked = () => {
        let level = 1;
        if (level2 == true) {
            level = 2;
        }

        getListPointBranch({ branchid: currentBranch })
            .then((res) => {
                if (res?.data?.GetListPointBranchByBranchId) {
                    const siteNotPermissed = [];
                    //@ts-ignore
                    const sitePermissed = [];

                    console.log(res.data.GetListPointBranchByBranchId);

                    for (const item of sites) {
                        const find = res.data.GetListPointBranchByBranchId.find(
                            (el) =>
                                //@ts-ignore
                                el?.PointId === item._id,
                        );

                        const obj = {
                            //@ts-ignore
                            _id: item?._id,
                            //@ts-ignore
                            SiteId: item?.SiteId,
                            Level: null,
                        };

                        if (find === undefined) {
                            siteNotPermissed.push(obj);
                        } else {
                            if (find?.Level !== level) {
                                siteNotPermissed.push(obj);
                            }
                        }
                    }

                    for (const item of res.data.GetListPointBranchByBranchId) {
                        const find = sites.find(
                            (el) =>
                                //@ts-ignore
                                el._id === item?.PointId,
                        );

                        if (find !== undefined) {
                            if (item?.Level === level) {
                                const obj = {
                                    //@ts-ignore
                                    _id: find?._id,
                                    //@ts-ignore
                                    SiteId: find?.SiteId,
                                    Level: null,
                                };
                                //@ts-ignore
                                obj.Level = item?.Level;
                                sitePermissed.push(obj);
                            }
                        }
                    }

                    const b = {
                        listSite: {
                            id: 'listSite',
                            list: [...siteNotPermissed],
                        },
                        listSitePermission: {
                            id: 'listSitePermission',
                            //@ts-ignore
                            list: [...sitePermissed],
                        },
                    };

                    //@ts-ignore
                    setColumns({ ...b });
                }
            })
            .catch((err) => console.log(err));
    };

    const onTransferAllSiteNotPermissedClicked = () => {
        const b = {
            listSite: {
                id: 'listSite',
                list: [...sites],
            },
            listSitePermission: {
                id: 'listSitePermission',
                list: [],
            },
        };

        //@ts-ignore
        setColumns({ ...b });
    };

    const onTransferAllSitePermissedClicked = () => {
        const b = {
            listSite: {
                id: 'listSite',
                list: [],
            },
            listSitePermission: {
                id: 'listSitePermission',
                list: [...sites],
            },
        };

        //@ts-ignore
        setColumns({ ...b });
    };

    const createObjUpdateListPointBranch = () => {
        const temp = [];

        let level = 1;
        if (level2 == true) {
            level = 2;
        }

        for (const item of columns.listSitePermission.list) {
            const obj = {
                BranchId: currentBranch,
                //@ts-ignore
                PointId: item?._id,
                Level: level,
            };

            temp.push(obj);
        }

        const objUpdate = {
            BranchId: currentBranch,
            Data: temp,
        };

        return objUpdate;
    };

    const onUpdateClicked = () => {
        let isAllow = true;

        if (
            currentBranch === '' ||
            currentBranch === undefined ||
            currentBranch === null
        ) {
            setErrorBranch('Chưa có mã tuyến ống!!!');
            isAllow = false;
        } else {
            setErrorBranch('');
            isAllow = true;
        }
        if (isAllow) {
            const obj = createObjUpdateListPointBranch();
            //@ts-ignore
            updateListPointBranch({ variables: { list: obj } })
                .then((res) => {
                    if (res?.data?.UpdateListPointBranch) {
                        if (res.data?.UpdateListPointBranch > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Phân nhánh thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Phân nhánh không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Phân nhánh không thành công',
                    });
                    console.log(err);
                });
        }
    };

    const onLevel1Change = (e: any) => {
        setLevel1(e.currentTarget.checked);
        setLevel2(false);
    };

    const onLevel2Change = (e: any) => {
        setLevel2(e.currentTarget.checked);
        setLevel1(false);
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
                        <Text fw={500}>Phân nhánh</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
                <Grid.Col span={{ md: 8, base: 12 }}>
                    <Select
                        label={<Text onClick={open}>Mã nhánh</Text>}
                        placeholder="Mã nhánh"
                        data={branchData}
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy"
                        onChange={onBranchChanged}
                        error={errorBranch}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Flex
                        align="end"
                        justify="center"
                        style={{ height: '100%' }}
                    >
                        <Checkbox
                            checked={level1}
                            label="Cấp 1"
                            onChange={onLevel1Change}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Flex
                        align="end"
                        justify="center"
                        style={{ height: '100%' }}
                    >
                        <Checkbox
                            checked={level2}
                            label="Cấp 2"
                            onChange={onLevel2Change}
                        />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Flex align="center" justify="center">
                        <Button
                            variant="filled"
                            color="blue"
                            onClick={onViewClicked}
                        >
                            Xem
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>
            <Grid>
                <DragDropContext onDragEnd={onDragEnd}>
                    <StyledColumns>
                        <Column
                            //@ts-ignore
                            list={columns.listSite.list}
                            id={columns.listSite.id}
                            key={columns.listSite.id}
                            title="Vị trí chưa phân"
                        />
                        <Flex
                            justify="center"
                            align="center"
                            direction="column"
                        >
                            <Button
                                variant="filled"
                                color="grape"
                                onClick={onTransferAllSitePermissedClicked}
                            >
                                <IconArrowBigRightLine size="1.125rem" />
                            </Button>
                            <Space h="md"></Space>
                            <Button
                                variant="filled"
                                color="grape"
                                onClick={onTransferAllSiteNotPermissedClicked}
                            >
                                <IconArrowBigLeftLine size="1.125rem" />
                            </Button>
                        </Flex>
                        <Column
                            //@ts-ignore
                            list={columns.listSitePermission.list}
                            id={columns.listSitePermission.id}
                            key={columns.listSitePermission.id}
                            title="Vị trí đã phân"
                        />
                    </StyledColumns>
                </DragDropContext>
            </Grid>
            <Grid>
                <Grid.Col span={{ base: 12 }} style={{ marginTop: '10px' }}>
                    <Flex justify="center" align="center">
                        <Button
                            variant="filled"
                            color="green"
                            onClick={onUpdateClicked}
                        >
                            Cập nhật
                        </Button>
                    </Flex>
                </Grid.Col>
            </Grid>

            <Modal opened={opened} onClose={close} title="Nhánh" centered>
                <BranchComponent />
            </Modal>
        </motion.div>
    );
};

export default BranchPermissionPage;
