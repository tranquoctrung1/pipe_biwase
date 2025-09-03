import Control from 'react-leaflet-custom-control';
import {
    Grid,
    ScrollArea,
    Transition,
    Flex,
    Text,
    ActionIcon,
} from '@mantine/core';

import { IconArrowBadgeUpFilled } from '@tabler/icons-react';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { convertDateToTimeString } from '../utils/utils';

import { IconX } from '@tabler/icons-react';

const TableAlarmMap = ({ openAlarm, data, onTableAlarmCloseClicked }: any) => {
    const columns = [
        {
            name: 'STT',
            selector: (row: any) => row.STT,
            sortable: true,
            cellExport: (row: any) => row.STT,
        },
        {
            name: 'Mã vị trí',
            selector: (row: any) => row.SiteId,
            sortable: true,
            cellExport: (row: any) => row.SiteId,
        },
        {
            name: 'Vị trí',
            selector: (row: any) => row.Location,
            sortable: true,
            cellExport: (row: any) => row.Location,
        },
        {
            name: 'Tình Trạng',
            selector: (row: any) => row.Status,
            sortable: true,
            cellExport: (row: any) => row.Status,
        },
        {
            name: 'Cảnh báo',
            selector: (row: any) => row.StatusError,
            sortable: true,
            cellExport: (row: any) =>
                row.StatusError === 2
                    ? 'Dữ liệu gửi trể'
                    : row.Type === 3
                    ? 'Không có kênh lưu lượng'
                    : 'Lưu lượng tăng đột biến',
            width: '150px',
            format: (row: any) =>
                row.StatusError === 2
                    ? 'Dữ liệu gửi trể'
                    : row.Type === 3
                    ? 'Không có kênh lưu lượng'
                    : 'Lưu lượng tăng đột biến',
        },
        {
            name: 'Thời gian',
            selector: (row: any) => row.TimeStamp,
            sortable: true,
            cellExport: (row: any) => row.TimeStamp,
            format: () => convertDateToTimeString(new Date()),
        },
    ];

    const tableData = {
        columns,
        data,
    };

    return (
        <Control position="bottomleft">
            <Transition
                mounted={openAlarm}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            width: '85vw',
                            height: '25rem',
                            background: 'white',
                            boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                            borderRadius: '10px',
                        }}
                    >
                        <Grid>
                            <Grid.Col span={{ base: 12 }}>
                                <Flex justify="end" align="center">
                                    <ActionIcon
                                        variant="transparent"
                                        onClick={onTableAlarmCloseClicked}
                                    >
                                        <IconX size="1.125rem"></IconX>
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12 }}>
                                <ScrollArea h="24rem">
                                    <DataTableExtensions {...tableData}>
                                        <DataTable
                                            columns={columns}
                                            data={data}
                                            title={
                                                <Flex
                                                    justify="center"
                                                    align="center"
                                                >
                                                    <Text fw={500}>
                                                        Bảng cảnh báo
                                                    </Text>
                                                </Flex>
                                            }
                                            paginationPerPage={3}
                                            sortIcon={
                                                <IconArrowBadgeUpFilled />
                                            }
                                            defaultSortAsc={true}
                                            pagination
                                            highlightOnHover={true}
                                            dense={false}
                                        />
                                    </DataTableExtensions>
                                </ScrollArea>
                            </Grid.Col>
                        </Grid>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default TableAlarmMap;
