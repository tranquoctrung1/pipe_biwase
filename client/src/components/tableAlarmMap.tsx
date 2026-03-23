import React, { useMemo } from 'react';
import Control from 'react-leaflet-custom-control';
import {
    Grid,
    ScrollArea,
    Transition,
    Flex,
    Text,
    ActionIcon,
} from '@mantine/core';
import { IconArrowBadgeUpFilled, IconX } from '@tabler/icons-react';
import DataTable, { TableColumn } from 'react-data-table-component';
// @ts-ignore — no types available for this package
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { convertDateToTimeString } from '../utils/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AlarmRow {
    STT: number;
    SiteId: string;
    Location: string;
    Status: string;
    StatusError: number;
    Type: number;
    TimeStamp: string;
}

interface TableAlarmMapProps {
    openAlarm: boolean;
    data: AlarmRow[];
    onTableAlarmCloseClicked: () => void;
}

// ---------------------------------------------------------------------------
// Helpers — pure, defined outside the component
// ---------------------------------------------------------------------------

function getAlarmLabel(row: AlarmRow): string {
    if (row.StatusError === 2) return 'Dữ liệu gửi trể';
    if (row.Type === 3) return 'Không có kênh lưu lượng';
    return 'Lưu lượng tăng đột biến';
}

const TABLE_TITLE = (
    <Flex justify="center" align="center">
        <Text fw={500}>Bảng cảnh báo</Text>
    </Flex>
);

const SORT_ICON = <IconArrowBadgeUpFilled />;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const TableAlarmMap = ({
    openAlarm,
    data,
    onTableAlarmCloseClicked,
}: TableAlarmMapProps) => {
    // Columns are stable as long as the component is mounted — no need to
    // recreate them on every render.
    const columns: TableColumn<AlarmRow>[] = useMemo(
        () => [
            {
                name: 'STT',
                selector: (row) => row.STT,
                sortable: true,
                cellExport: (row: AlarmRow) => row.STT,
            },
            {
                name: 'Mã vị trí',
                selector: (row) => row.SiteId,
                sortable: true,
                cellExport: (row: AlarmRow) => row.SiteId,
            },
            {
                name: 'Vị trí',
                selector: (row) => row.Location,
                sortable: true,
                cellExport: (row: AlarmRow) => row.Location,
            },
            {
                name: 'Tình Trạng',
                selector: (row) => row.Status,
                sortable: true,
                cellExport: (row: AlarmRow) => row.Status,
            },
            {
                name: 'Cảnh báo',
                selector: (row) => row.StatusError,
                sortable: true,
                width: '150px',
                format: (row) => getAlarmLabel(row),
                cellExport: (row: AlarmRow) => getAlarmLabel(row),
            },
            {
                name: 'Thời gian',
                selector: (row) => row.TimeStamp,
                sortable: true,
                format: () => convertDateToTimeString(new Date()),
                cellExport: (row: AlarmRow) => row.TimeStamp,
            },
        ],
        [],
    );

    const tableData = useMemo(() => ({ columns, data }), [columns, data]);

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
                                        <IconX size="1.125rem" />
                                    </ActionIcon>
                                </Flex>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12 }}>
                                <ScrollArea h="24rem">
                                    <DataTableExtensions {...tableData}>
                                        <DataTable<AlarmRow>
                                            columns={columns}
                                            data={data}
                                            title={TABLE_TITLE}
                                            paginationPerPage={3}
                                            sortIcon={SORT_ICON}
                                            defaultSortAsc
                                            pagination
                                            highlightOnHover
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

export default React.memo(TableAlarmMap);
