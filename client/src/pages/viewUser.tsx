import { motion } from 'framer-motion';

import { Grid, Text, Flex } from '@mantine/core';

import { useState, useEffect } from 'react';

import { useGetUsersLazyQuery } from '../__generated__/graphql';

import DataTable from 'react-data-table-component';
// @ts-ignore
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { convertDateToTimeString } from '../utils/utils';

import { IconArrowBadgeUpFilled } from '@tabler/icons-react';

const ViewUserPage = () => {
    const [data, setData] = useState([]);

    const [getUsers] = useGetUsersLazyQuery();

    useEffect(() => {
        getUsers()
            .then((res) => {
                if (res?.data?.GetUsers) {
                    //@ts-ignore
                    setData([...res.data.GetUsers]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const columns = [
        {
            name: 'Tên người dùng',
            selector: (row: any) => row.Username,
            sortable: true,
            cellExport: (row: any) => row.Username,
        },
        {
            name: 'Quyền',
            selector: (row: any) => row.Role,
            sortable: true,
            cellExport: (row: any) => row.Role,
        },

        {
            name: 'Thời gian',
            selector: (row: any) => row.TimeStamp,
            sortable: true,
            cellExport: (row: any) => row.TimeStamp,
            width: '150px',
            format: (row: any) => convertDateToTimeString(row.TimeStamp),
        },
    ];

    const tableData = {
        columns,
        data,
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
                        <Text fw={500}>Danh sách người dùng</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
                <Grid.Col span={{ base: 12 }}>
                    <DataTableExtensions {...tableData}>
                        <DataTable
                            columns={columns}
                            data={data}
                            // title={
                            //     <Flex justify="center" align="center">
                            //         <Text fw={500}>Bảng giá trị</Text>
                            //     </Flex>
                            // }
                            paginationPerPage={50}
                            sortIcon={<IconArrowBadgeUpFilled />}
                            defaultSortAsc={true}
                            pagination
                            highlightOnHover={true}
                            dense={false}
                        />
                    </DataTableExtensions>
                </Grid.Col>
            </Grid>
        </motion.div>
    );
};

export default ViewUserPage;
