import { Button, Space, Text } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';

import Control from 'react-leaflet-custom-control';

import {
    IconSearch,
    //IconBell,
    IconDropletSearch,
    IconFilter,
    IconList,
    IconTable,
} from '@tabler/icons-react';

const ButtonMap = ({
    // onAlarmTableClicked,
    // openAlarm,
    onLostWaterClicked,
    onSearchSiteClicked,
    onFilterGroupPipeClicked,
    onLegendHideClicked,
    onTableCurrentDataClicked,
    onTableCurrentPressureClicked,
    openLostWater,
    openFilterSite,
    openFilterGroupPipe,
    openLegend,
    openTableCurrentData,
    openTableCurrentPressureData,
}: any) => {
    const mobile = useMediaQuery(`(max-width: 431px)`);

    return (
        <Control prepend position="topright">
            <div>
                {/* <Button
                    style={{
                        background: '#2ecc71',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onAlarmTableClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openAlarm ? 'Ẩn' : 'Bật'} Bảng cảnh báo
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}
                    <IconBell size="1.125rem" style={{ color: 'white' }} />
                </Button>
                <Space h="xs" /> */}
                <Button
                    style={{
                        background: '#27ae60',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onTableCurrentDataClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openTableCurrentData ? 'Ẩn' : 'Bật'} Bảng Lưu
                                lượng / Áp lực
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconTable size="1.125rem" style={{ color: 'white' }} />
                </Button>
                <Space h="xs" />
                <Button
                    style={{
                        background: '#e74c3c',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onTableCurrentPressureClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openTableCurrentPressureData ? 'Ẩn' : 'Bật'}{' '}
                                Bảng áp lực nước sạch
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconTable size="1.125rem" style={{ color: 'white' }} />
                </Button>
                <Space h="xs" />
                <Button
                    style={{
                        background: '#1e90ff',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onLostWaterClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openLostWater ? 'Ẩn' : 'Bật'} Bảng tính thất
                                thoát
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconDropletSearch
                        size="1.125rem"
                        style={{ color: 'white' }}
                    />
                </Button>
                <Space h="xs" />
                <Button
                    style={{
                        background: '#1abc9c',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onSearchSiteClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openFilterSite ? 'Ẩn' : 'Bật'} Tìm kiếm theo
                                đồng hồ
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconSearch size="1.125rem" style={{ color: 'white' }} />
                </Button>
                <Space h="xs" />
                <Button
                    style={{
                        background: '#2980b9',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onFilterGroupPipeClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openFilterGroupPipe ? 'Ẩn' : 'Bật'} Cấu hình
                                hiển thị
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconFilter size="1.125rem" style={{ color: 'white' }} />
                </Button>
                <Space h="xs" />
                <Button
                    style={{
                        background: 'rgba(245, 222, 179, 0.78)',
                        border: 'none',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onClick={onLegendHideClicked}
                >
                    {!mobile && (
                        <>
                            <Text size="xs">
                                {openLegend ? 'Ẩn' : 'Bật'} Chú thích
                            </Text>
                            <Space w="sm"></Space>
                        </>
                    )}

                    <IconList size="1.125rem" style={{ color: 'white' }} />
                </Button>
            </div>
        </Control>
    );
};

export default ButtonMap;
