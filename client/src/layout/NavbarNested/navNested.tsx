// import { Group, Code, ScrollArea, Text, Flex } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import {
    IconMap,
    IconBuildingFactory2,
    IconFile,
    IconSitemapOff,
    IconEdit,
    IconUser,
} from '@tabler/icons-react';
import { LinksGroup } from '../NavbarLinkGroup/navbarLinkGroup';
import classes from './navbarNested.module.css';

const mockdata = [
    { label: 'Bản đồ mạng lưới - đồng hồ', icon: IconMap, link: '/' },
    {
        label: 'Thêm, sửa, xóa đồng hồ và Logger, kênh áp lực',
        icon: IconBuildingFactory2,
        link: '/site',
    },
    {
        label: 'Thêm, sửa, xóa tuyến ống',
        icon: IconSitemapOff,
        initiallyOpened: false,
        links: [
            { label: 'Nhóm tuyến ống', link: '/groupPipe' },
            { label: 'Tuyến ống', link: '/pipe' },
            { label: 'Nhánh', link: '/branch' },
            { label: 'Phân tuyến ống', link: '/pipePermission' },
            { label: 'Phân nhánh', link: '/branchPermission' },
        ],
    },
    {
        label: 'Dữ liệu nhập tay',
        icon: IconEdit,
        initiallyOpened: false,
        links: [
            { label: 'Sản lượng', link: '/manual' },
            { label: 'Chỉ số', link: '/index' },
        ],
    },
    {
        label: 'Xuất dữ liệu báo cáo',
        icon: IconFile,
        initiallyOpened: false,
        links: [
            { label: 'Sản lượng trạm II', link: '/quantitytb' },
            { label: 'Sản lượng nước thô', link: '/quantitynt' },
            { label: 'Sản lượng phân tích nước thô', link: '/quantityntsx' },
            { label: 'Thất thoát theo nhánh', link: '/lostbranch' },
        ],
    },
    {
        label: 'Quản lý tài khoản người dùng',
        icon: IconUser,
        initiallyOpened: false,
        links: [
            { label: 'Tạo người dùng', link: '/createUser' },
            { label: 'Xem người dùng', link: '/viewUser' },
        ],
    },
];

const mockdataForStaff = [
    { label: 'Bản đồ mạng lưới - đồng hồ', icon: IconMap, link: '/' },
    {
        label: 'Dữ liệu nhập tay',
        icon: IconEdit,
        initiallyOpened: false,
        links: [
            { label: 'Sản lượng', link: '/manual' },
            { label: 'Lịch sử', link: '/history' },
            { label: 'Chỉ số', link: '/index' },
        ],
    },
    {
        label: 'Xuất dữ liệu báo cáo',
        icon: IconFile,
        initiallyOpened: false,
        links: [
            { label: 'Bảng dữ liệu', link: '/data' },
            { label: 'Sản lượng', link: '/quantity' },
            { label: 'Sản lượng trạm II', link: '/quantitytb' },
            { label: 'Sản lượng nước thô', link: '/quantitynt' },
            { label: 'Sản lượng phân tích nước thô', link: '/quantityntsx' },
        ],
    },
];

const mockdataMapViewer = [
    { label: 'Bản đồ mạng lưới - đồng hồ', icon: IconMap, link: '/' },
];

export function NavbarNested() {
    const role = localStorage.getItem('Role');
    let links = [];
    if (role === 'mapViewer') {
        links = mockdataMapViewer.map((item) => (
            <LinksGroup {...item} key={item.label} />
        ));
    } else if (role === 'staff') {
        links = mockdataForStaff.map((item) => (
            <LinksGroup {...item} key={item.label} />
        ));
    } else {
        links = mockdata.map((item) => (
            <LinksGroup {...item} key={item.label} />
        ));
    }

    return (
        <nav className={classes.navbar}>
            {/* <div className={classes.header}>
                <Group justify="space-between">
                    <Text
                        c="blue"
                        fw={500}
                        variant="gradient"
                        gradient={{
                            from: 'blue',
                            to: 'rgba(12, 232, 247, 1)',
                            deg: 90,
                        }}
                    >
                        Biwase
                    </Text>
                    <Code fw={700}>v 1.0</Code>
                </Group>
            </div> */}

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
            {/* <div className={classes.footer}>
                <Flex justify="center" align="center">
                    <Text fw={500} c="blue">
                        {localStorage.getItem('Username')
                            ? localStorage.getItem('Username')
                            : ''}
                    </Text>
                </Flex>
            </div> */}
        </nav>
    );
}
