import Control from 'react-leaflet-custom-control';

import {
    Center,
    Text,
    Checkbox,
    Flex,
    Transition,
    ActionIcon,
    ScrollArea,
} from '@mantine/core';

import uuid from 'react-uuid';

import { IconX } from '@tabler/icons-react';

import { useState, useEffect } from 'react';

const FilterGroupPipeMap = ({
    openFilterGroupPipe,
    groupPipe,
    onGroupPipeChanged,
    // showLabel,
    // onShowSiteLabel,
    onFilterGroupPipeCloseClicked,
    whiteBackgroundCurrentDataTable,
    onWhiteBackgroundCurrentDataTableChanged,
    showRegion,
    onShowRegionChanged,
    onAlwaysShowCurrentDataTable,
    alwaysOpenCurrentDataTable,
}: any) => {
    const [groupPipeNT, setGroupPipeNT] = useState([]);
    const [groupPipeNS, setGroupPipeNS] = useState([]);
    const [groupPipeTL, setGroupPipeTL] = useState([]);

    useEffect(() => {
        const tempNS = [];
        const tempNT = [];
        const tempTL = [];

        for (const item of groupPipe) {
            if (
                item.GroupPipeId.indexOf('TONT') !== -1 ||
                item.GroupPipeId.indexOf('NTONT') !== -1
            ) {
                tempNT.push(item);
            } else if (item.GroupPipeId.indexOf('NTONSTL') !== -1) {
                tempTL.push(item);
            } else {
                const splitIndex = item.GroupPipeName.split(' ');
                const index = parseInt(splitIndex[2]);
                item.STT = index;

                tempNS.push(item);
            }
        }

        tempNS.sort((a, b) => a.STT - b.STT);

        //@ts-ignore
        setGroupPipeNS([...tempNS]);
        //@ts-ignore
        setGroupPipeNT([...tempNT]);
        //@ts-ignore
        setGroupPipeTL([...tempTL]);
    }, [groupPipe]);

    const convertDataGroupPipe = (data: any, isTL = false) => {
        const result = [];

        if (data.length > 0) {
            for (const item of data) {
                const content = (
                    <div key={uuid()}>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={item.IsHide}
                                onChange={(e) =>
                                    onGroupPipeChanged(e, item.GroupPipeId)
                                }
                            ></Checkbox>
                            <Text c="white">
                                {isTL === true ? 'Hiện các' : ''}{' '}
                                {item.GroupPipeName}
                            </Text>
                        </Flex>
                    </div>
                );

                result.push(content);
            }
        }

        return result;
    };

    return (
        <Control position="topleft">
            <Transition
                mounted={openFilterGroupPipe}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            height: '75vh',
                            background: 'rgba(245, 222, 179, 0.78)',
                            width: '85vw',
                            maxWidth: '30rem',
                            padding: '10px',
                            borderRadius: '5px',
                            //overflow: 'scroll',
                        }}
                    >
                        <Flex justify="end" align="center">
                            <ActionIcon
                                variant="transparent"
                                onClick={onFilterGroupPipeCloseClicked}
                            >
                                <IconX size="1.125rem" color="white"></IconX>
                            </ActionIcon>
                        </Flex>
                        <Center>
                            <Text c="white" tt="capitalize" fw={550}>
                                Cấu hình
                            </Text>
                        </Center>
                        <hr />
                        <Text c="white">Hiển thị bảng Lưu lượng / Áp lực</Text>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={whiteBackgroundCurrentDataTable}
                                onChange={
                                    onWhiteBackgroundCurrentDataTableChanged
                                }
                            ></Checkbox>
                            <Text c="white">Màu nền trắng</Text>
                        </Flex>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={alwaysOpenCurrentDataTable}
                                onChange={onAlwaysShowCurrentDataTable}
                            ></Checkbox>
                            <Text c="white">Luôn hiển thị khi bắt đầu</Text>
                        </Flex>
                        <hr />
                        <Text c="white">Ẩn/hiện các địa danh</Text>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={showRegion}
                                onChange={onShowRegionChanged}
                            ></Checkbox>
                            <Text c="white">Luôn hiển thị các địa danh</Text>
                        </Flex>
                        <Flex justify="start" align="center" gap="sm">
                            {convertDataGroupPipe(groupPipeTL, true)}
                        </Flex>

                        <hr />
                        <ScrollArea h="50%">
                            <Text c="white">
                                Ẩn hiện tuyến ống chính / nhánh
                            </Text>
                            {convertDataGroupPipe(groupPipeNT)}
                            <Text c="white">Tuyến ống nước sạch</Text>
                            {convertDataGroupPipe(groupPipeNS)}
                            {/* <hr />
                        <Center>
                            <Text c="white" tt="capitalize" fw={550}>
                                Ẩn hiện label cho các đồng hồ
                            </Text>
                        </Center>
                        <hr />
                        <div>
                            <Flex justify="start" align="center" gap="sm">
                                <Checkbox
                                    checked={showLabel}
                                    onChange={onShowSiteLabel}
                                ></Checkbox>
                                <Text c="white">Hiển thị label đồng hồ</Text>
                            </Flex>
                        </div> */}
                        </ScrollArea>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default FilterGroupPipeMap;
