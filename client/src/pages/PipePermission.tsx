import { Grid, Flex, Button, Space, Select, Text } from '@mantine/core';

import { useState, useEffect } from 'react';

import Swal from 'sweetalert2';

import {
    IconArrowBigRightLine,
    IconArrowBigLeftLine,
} from '@tabler/icons-react';

import {
    useGetSitesLazyQuery,
    useGetPipesLazyQuery,
    useGetListPointPipeByPipeIdQuery,
    useUpdateListPointPipeMutation,
} from '../__generated__/graphql';

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

const PipePermissionPage = () => {
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

    const [columns, setColumns] = useState(initialColumns);

    const [pipeData, setPipeData] = useState([]);
    const [sites, setSites] = useState([]);

    const [currentPipe, setCurrentPipe] = useState('');
    const [errorPipe, setErrorPipe] = useState('');

    const [getPipes] = useGetPipesLazyQuery();
    const [getSites] = useGetSitesLazyQuery();
    const { refetch: getListPointPipeByPipeIdRefetch } =
        useGetListPointPipeByPipeIdQuery();

    const [updateListPointPipe] = useUpdateListPointPipeMutation();

    useEffect(() => {
        getPipes()
            .then((res) => {
                if (res?.data?.GetPipes) {
                    const temp = [];

                    for (const item of res.data.GetPipes) {
                        const obj = {
                            value: item?._id,
                            label: item?.PipeId,
                        };

                        temp.push(obj);
                    }

                    //@ts-ignore
                    setPipeData([...temp]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        getSites()
            .then((res) => {
                if (res?.data?.GetSites) {
                    const temp = [];

                    for (const item of res.data.GetSites) {
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

    const onPipeIdChanged = (e: any) => {
        setCurrentPipe(e);

        getListPointPipeByPipeIdRefetch({ pipeid: e })
            .then((res) => {
                if (res?.data?.GetListPointPipeByPipeId) {
                    const siteNotPermissed = [];
                    //@ts-ignore
                    const sitePermissed = [];

                    for (const item of sites) {
                        const find = res.data.GetListPointPipeByPipeId.find(
                            //@ts-ignore
                            (el) => el?.PointId === item._id,
                        );

                        const obj = {
                            //@ts-ignore
                            _id: item?._id,
                            //@ts-ignore
                            SiteId: item?.SiteId,
                            STT: null,
                        };

                        if (find === undefined) {
                            siteNotPermissed.push(obj);
                        }
                    }

                    for (const item of res.data.GetListPointPipeByPipeId) {
                        const find = sites.find(
                            //@ts-ignore
                            (el) => el._id === item?.PointId,
                        );

                        if (find !== undefined) {
                            const obj = {
                                //@ts-ignore
                                _id: find?._id,
                                //@ts-ignore
                                SiteId: find?.SiteId,
                                STT: null,
                            };
                            //@ts-ignore
                            obj.STT = item?.STT;
                            sitePermissed.push(obj);
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

    const createObjUpdateListPointPipe = () => {
        const temp = [];

        let count = 1;
        for (const item of columns.listSitePermission.list) {
            const obj = {
                PipeId: currentPipe,
                //@ts-ignore
                PointId: item?._id,
                STT: count++,
            };

            temp.push(obj);
        }

        const objUpdate = {
            PipeId: currentPipe,
            Data: temp,
        };

        return objUpdate;
    };

    const onUpdateClicked = () => {
        let isAllow = true;

        if (
            currentPipe === '' ||
            currentPipe === undefined ||
            currentPipe === null
        ) {
            setErrorPipe('Chưa có mã tuyến ống!!!');
            isAllow = false;
        } else {
            setErrorPipe('');
            isAllow = true;
        }
        if (isAllow) {
            const obj = createObjUpdateListPointPipe();
            updateListPointPipe({ variables: { list: obj } })
                .then((res) => {
                    if (res?.data?.UpdateListPointPipe) {
                        if (res.data.UpdateListPointPipe > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfull',
                                text: 'Phân tuyến ống thành công',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Phân tuyến ống không thành công',
                            });
                        }
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Phân tuyến ống không thành công',
                    });
                    console.log(err);
                });
        }
    };

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Text fw={500}>Phân tuyến ống</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <Select
                        label="Mã tuyến ống"
                        placeholder="Mã tuyến ống"
                        data={pipeData}
                        clearable
                        searchable
                        nothingFoundMessage="Không tìm thấy"
                        onChange={onPipeIdChanged}
                        error={errorPipe}
                    />
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
        </>
    );
};

export default PipePermissionPage;
