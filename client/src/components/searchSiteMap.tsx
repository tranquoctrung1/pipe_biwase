import React, { useCallback } from 'react';
import Control from 'react-leaflet-custom-control';
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreeNode {
    label: string;
    value: string;
    children?: TreeNode[];
}

interface RenderNodeProps {
    node: TreeNode;
    expanded: boolean;
    hasChildren: boolean;
    elementProps: React.HTMLAttributes<HTMLElement>;
}

interface SearchSiteMapProps {
    openFilterSite: boolean;
    filterSite: TreeNode[];
    filterSiteNS: TreeNode[];
    handleFilterSiteChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSiteTreeClicked: (value: string) => void;
    onSearhSiteCloseClicked: () => void;
}

// ---------------------------------------------------------------------------
// SiteTree — shared sub-component for both water-type sections
// ---------------------------------------------------------------------------

interface SiteTreeProps {
    title: string;
    data: TreeNode[];
    height: string;
    onNodeClick: (value: string) => void;
}

const SiteTree = React.memo(
    ({ title, data, height, onNodeClick }: SiteTreeProps) => {
        const renderNode = useCallback(
            ({
                node,
                expanded,
                hasChildren,
                elementProps,
            }: RenderNodeProps) => (
                <Group gap={10} {...elementProps}>
                    {hasChildren && expanded ? (
                        <IconMinus size="1.125rem" color="white" />
                    ) : (
                        <IconPlus size="1.125rem" color="white" />
                    )}
                    <Text
                        size="sm"
                        c="white"
                        fw={500}
                        onClick={() => onNodeClick(node.value)}
                    >
                        {node.label}
                    </Text>
                </Group>
            ),
            [onNodeClick],
        );

        return (
            <div style={{ height }}>
                <Center>
                    <Text c="white" fw={600} tt="uppercase" size="1rem" my="sm">
                        {title}
                    </Text>
                </Center>
                <Tree
                    data={data}
                    style={{ height: '85%', overflowY: 'scroll' }}
                    //@ts-ignore
                    renderNode={renderNode}
                />
            </div>
        );
    },
);

SiteTree.displayName = 'SiteTree';

// ---------------------------------------------------------------------------
// SearchSiteMap
// ---------------------------------------------------------------------------

const SearchSiteMap = ({
    openFilterSite,
    filterSite,
    filterSiteNS,
    handleFilterSiteChanged,
    onSiteTreeClicked,
    onSearhSiteCloseClicked,
}: SearchSiteMapProps) => {
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
                                <IconX size="1.125rem" color="white" />
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

                        <SiteTree
                            title="Nước Thô"
                            data={filterSite}
                            height="25%"
                            onNodeClick={onSiteTreeClicked}
                        />

                        <SiteTree
                            title="Nước Sạch"
                            data={filterSiteNS}
                            height="65%"
                            onNodeClick={onSiteTreeClicked}
                        />
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default React.memo(SearchSiteMap);
