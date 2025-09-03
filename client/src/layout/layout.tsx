import {
    AppShell,
    Burger,
    Flex,
    Text,
    Image,
    ActionIcon,
    Space,
    Center,
} from '@mantine/core';

import { useEffect } from 'react';

import Logo from '../assets/logo.png';

import { NavbarNested } from './NavbarNested/navNested';

import { IconPower } from '@tabler/icons-react';

import IconChangeTheme from '../components/iconChangeTheme';

import { Outlet } from 'react-router-dom';

import { OpenState, toggle } from '../features/openSidebar';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

import { useVerifyTokenQuery } from '../__generated__/graphql';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@mantine/core/styles.css';

const Layout = () => {
    const open = useSelector(OpenState);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const { refetch: verifyTokenRefetch } = useVerifyTokenQuery();

    // //detect ios device
    // const iOS = () => {
    //     return (
    //         [
    //             'iPad Simulator',
    //             'iPhone Simulator',
    //             'iPod Simulator',
    //             'iPad',
    //             'iPhone',
    //             'iPod',
    //         ].includes(navigator.platform) ||
    //         // iPad on iOS 13 detection
    //         (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    //     );
    // };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null && token !== undefined && token !== '') {
            verifyTokenRefetch({ token: token })
                .then((res) => {
                    if (
                        res?.data?.VerifyToken !== null &&
                        res?.data?.VerifyToken !== undefined
                    ) {
                        if (res.data.VerifyToken === 'error') {
                            localStorage.removeItem('Username');
                            localStorage.removeItem('Role');
                            localStorage.removeItem('token');

                            navigate('/login');
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            localStorage.removeItem('Username');
            localStorage.removeItem('Role');
            localStorage.removeItem('token');

            navigate('/login');
        }

        // if (iOS() === true) {
        //     document.getElementById('main')?.classList.add('ios');
        // } else {
        //     document.getElementById('main')?.classList.remove('ios');
        // }
    }, [location /*, iOS()*/]);

    const onOpenSidebarClicked = () => {
        dispatch(toggle());
    };

    const onLogoutClick = async () => {
        localStorage.removeItem('Username');
        localStorage.removeItem('token');
        localStorage.removeItem('Role');
        navigate('/login');
    };

    return (
        <div className="main" id="main" style={{ background: '#ecf0f12b' }}>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: {
                        mobile: !open,
                        desktop: !open,
                    },
                }}
                style={{ height: '100%' }}
                padding="md"
            >
                <AppShell.Header tabIndex={0}>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ padding: '10px 40px' }}
                    >
                        <Flex justify="space-between" align="center">
                            {localStorage.getItem('Role') !== 'mapViewer' ? (
                                <Burger
                                    opened={open}
                                    onClick={onOpenSidebarClicked}
                                    //hiddenFrom="xl"
                                    size="sm"
                                />
                            ) : null}

                            <Image radius="md" src={Logo} h={45} w={100} />
                        </Flex>
                        <div>
                            <Center>
                                <Text
                                    fw="bold"
                                    c="blue"
                                    visibleFrom="sm"
                                    tt="uppercase"
                                    // variant="gradient"
                                    // gradient={{
                                    //     from: 'blue',
                                    //     to: 'rgba(12, 232, 247, 1)',
                                    //     deg: 90,
                                    // }}
                                >
                                    Lưu Lượng Và Áp Lực
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    fw="bold"
                                    c="blue"
                                    visibleFrom="sm"
                                    tt="uppercase"
                                    // variant="gradient"
                                    // gradient={{
                                    //     from: 'blue',
                                    //     to: 'rgba(12, 232, 247, 1)',
                                    //     deg: 90,
                                    // }}
                                >
                                    Hệ thống mạng tuyến ống Biwase - Long An
                                </Text>
                            </Center>
                        </div>

                        <Flex justify="space-between" align="center">
                            <IconChangeTheme />
                            <Space w="xs" />
                            <ActionIcon
                                variant="filled"
                                aria-label="Log out"
                                onClick={onLogoutClick}
                            >
                                <IconPower
                                    style={{ width: '70%', height: '70%' }}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Flex>
                    </Flex>
                </AppShell.Header>

                <AppShell.Navbar p="md" style={{ zIndex: 10000 }}>
                    <NavbarNested />
                </AppShell.Navbar>

                <AppShell.Main style={{ minHeight: '100%' }} id="content">
                    <div id="detail">
                        <Outlet />
                    </div>
                </AppShell.Main>
            </AppShell>
        </div>
    );
};

export default Layout;
