import {
    Transition,
    Flex,
    Input,
    Text,
    Group,
    Tree,
    ActionIcon,
    Center,
} from '@mantine/core';
import { IconSearch, IconPlus, IconMinus, IconX } from '@tabler/icons-react';

import Control from 'react-leaflet-custom-control';

const SearchSiteMap = ({
    openFilterSite,
    filterSite,
    filterSiteNS,
    handleFilterSiteChanged,
    onSiteTreeClicked,
    onSearhSiteCloseClicked,
}: any) => {
    return (
        <Control position="topleft">
            <Transition
                mounted={openFilterSite}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            height: '75vh',
                            background: '#1e90ff',
                            width: '85vw',
                            maxWidth: '30rem',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        <Flex justify="end" align="center">
                            <ActionIcon
                                variant="transparent"
                                onClick={onSearhSiteCloseClicked}
                            >
                                <IconX size="1.125rem" color="white"></IconX>
                            </ActionIcon>
                        </Flex>
                        <Flex justify="center" align="center">
                            <Input
                                placeholder="Tìm kiếm điểm đo"
                                leftSection={<IconSearch size="1.125rem" />}
                                style={{ flex: '1' }}
                                onChange={handleFilterSiteChanged}
                            />
                        </Flex>
                        <hr />
                        <div
                            style={{
                                height: '25%',
                            }}
                        >
                            <Center>
                                <Text
                                    c="white"
                                    fw={600}
                                    tt="uppercase"
                                    size="1rem"
                                    my="sm"
                                >
                                    Nước Thô
                                </Text>
                            </Center>
                            <Tree
                                data={filterSite}
                                style={{ height: '80%', overflowY: 'scroll' }}
                                renderNode={({
                                    //@ts-ignore
                                    node,
                                    //@ts-ignore
                                    expanded,
                                    //@ts-ignore
                                    hasChildren,
                                    //@ts-ignore
                                    elementProps,
                                }) => (
                                    <Group gap={10} {...elementProps}>
                                        {hasChildren && expanded ? (
                                            <IconMinus
                                                size="1.125rem"
                                                color="white"
                                            />
                                        ) : (
                                            <IconPlus
                                                size="1.125rem"
                                                color="white"
                                            />
                                        )}

                                        <Text
                                            size="sm"
                                            c="white"
                                            fw={500}
                                            onClick={() =>
                                                onSiteTreeClicked(node.value)
                                            }
                                        >
                                            {node.label}
                                        </Text>
                                    </Group>
                                )}
                            />
                        </div>

                        <div
                            style={{
                                height: '65%',
                            }}
                        >
                            <Center>
                                <Text
                                    c="white"
                                    fw={600}
                                    tt="uppercase"
                                    size="1rem"
                                    my="sm"
                                >
                                    Nước Sạch
                                </Text>
                            </Center>
                            <Tree
                                data={filterSiteNS}
                                style={{ height: '85%', overflowY: 'scroll' }}
                                renderNode={({
                                    //@ts-ignore
                                    node,
                                    //@ts-ignore
                                    expanded,
                                    //@ts-ignore
                                    hasChildren,
                                    //@ts-ignore
                                    elementProps,
                                }) => (
                                    <Group gap={10} {...elementProps}>
                                        {hasChildren && expanded ? (
                                            <IconMinus
                                                size="1.125rem"
                                                color="white"
                                            />
                                        ) : (
                                            <IconPlus
                                                size="1.125rem"
                                                color="white"
                                            />
                                        )}

                                        <Text
                                            size="sm"
                                            c="white"
                                            fw={500}
                                            onClick={() =>
                                                onSiteTreeClicked(node.value)
                                            }
                                        >
                                            {node.label}
                                        </Text>
                                    </Group>
                                )}
                            />
                        </div>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default SearchSiteMap;
