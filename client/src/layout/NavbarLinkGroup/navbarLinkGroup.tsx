import { useState } from 'react';
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    rem,
} from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './navbarLinkGroup.module.css';

import { useNavigate } from 'react-router-dom';

import { toggle } from '../../features/openSidebar';

import { useDispatch } from 'react-redux';

interface LinksGroupProps {
    //@ts-ignore
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    link?: string;
}

export function LinksGroup({
    icon: Icon,
    label,
    link,
    initiallyOpened,
    links,
}: LinksGroupProps) {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text
            className={classes.link}
            key={link.label}
            onClick={() => {
                dispatch(toggle());

                return navigate(link.link);
            }}
        >
            {link.label}
        </Text>
    ));

    return (
        <>
            {link ? (
                <>
                    <UnstyledButton
                        onClick={() => {
                            dispatch(toggle());

                            return navigate(link);
                        }}
                        className={classes.control}
                    >
                        <Group justify="space-between" gap={0}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ThemeIcon variant="light" size={30}>
                                    <Icon
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                    />
                                </ThemeIcon>
                                <Box ml="md">{label}</Box>
                            </Box>
                        </Group>
                    </UnstyledButton>
                </>
            ) : (
                <>
                    <UnstyledButton
                        onClick={() => setOpened((o) => !o)}
                        className={classes.control}
                    >
                        <Group justify="space-between" gap={0}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ThemeIcon variant="light" size={30}>
                                    <Icon
                                        style={{
                                            width: rem(18),
                                            height: rem(18),
                                        }}
                                    />
                                </ThemeIcon>
                                <Box ml="md">{label}</Box>
                            </Box>
                            {hasLinks && (
                                <IconChevronRight
                                    className={classes.chevron}
                                    stroke={1.5}
                                    style={{
                                        width: rem(16),
                                        height: rem(16),
                                        transform: opened
                                            ? 'rotate(-90deg)'
                                            : 'none',
                                    }}
                                />
                            )}
                        </Group>
                    </UnstyledButton>
                    {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
                </>
            )}
        </>
    );
}

const mockdata = {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
    ],
};

export function NavbarLinksGroup() {
    return (
        <Box mih={220} p="md">
            <LinksGroup {...mockdata} />
        </Box>
    );
}
