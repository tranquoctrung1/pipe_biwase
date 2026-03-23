import React, { useMemo } from 'react';
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
import { IconX } from '@tabler/icons-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GroupPipeItem {
    GroupPipeId: string;
    GroupPipeName: string;
    IsHide: boolean;
    STT?: number;
}

interface FilterGroupPipeMapProps {
    openFilterGroupPipe: boolean;
    groupPipe: GroupPipeItem[];
    onGroupPipeChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
        groupPipeId: string,
    ) => void;
    onFilterGroupPipeCloseClicked: () => void;
    whiteBackgroundCurrentDataTable: boolean;
    onWhiteBackgroundCurrentDataTableChanged: (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => void;
    showRegion: boolean;
    onShowRegionChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
    alwaysOpenCurrentDataTable: boolean;
    onAlwaysShowCurrentDataTable: (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => void;
}

// ---------------------------------------------------------------------------
// Helpers — pure, defined outside the component
// ---------------------------------------------------------------------------

function classifyPipes(groupPipe: GroupPipeItem[]): {
    nt: GroupPipeItem[];
    ns: GroupPipeItem[];
    tl: GroupPipeItem[];
} {
    const nt: GroupPipeItem[] = [];
    const ns: GroupPipeItem[] = [];
    const tl: GroupPipeItem[] = [];

    for (const item of groupPipe) {
        if (
            item.GroupPipeId.includes('TONT') ||
            item.GroupPipeId.includes('NTONT')
        ) {
            nt.push(item);
        } else if (item.GroupPipeId.includes('NTONSTL')) {
            tl.push(item);
        } else {
            const parts = item.GroupPipeName.split(' ');
            const stt = parseInt(parts[2], 10);
            ns.push({ ...item, STT: isNaN(stt) ? 0 : stt });
        }
    }

    ns.sort((a, b) => (a.STT ?? 0) - (b.STT ?? 0));

    return { nt, ns, tl };
}

// ---------------------------------------------------------------------------
// PipeCheckbox — shared row used by both pipe-list sections
// ---------------------------------------------------------------------------

interface PipeCheckboxProps {
    item: GroupPipeItem;
    prefixLabel?: string;
    onGroupPipeChanged: FilterGroupPipeMapProps['onGroupPipeChanged'];
}

const PipeCheckbox = React.memo(
    ({ item, prefixLabel, onGroupPipeChanged }: PipeCheckboxProps) => {
        const handleChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) =>
                onGroupPipeChanged(e, item.GroupPipeId),
            [onGroupPipeChanged, item.GroupPipeId],
        );

        return (
            <Flex justify="start" align="center" gap="sm">
                <Checkbox checked={item.IsHide} onChange={handleChange} />
                <Text c="white">
                    {prefixLabel ? `${prefixLabel} ` : ''}
                    {item.GroupPipeName}
                </Text>
            </Flex>
        );
    },
);

PipeCheckbox.displayName = 'PipeCheckbox';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const FilterGroupPipeMap = ({
    openFilterGroupPipe,
    groupPipe,
    onGroupPipeChanged,
    onFilterGroupPipeCloseClicked,
    whiteBackgroundCurrentDataTable,
    onWhiteBackgroundCurrentDataTableChanged,
    showRegion,
    onShowRegionChanged,
    alwaysOpenCurrentDataTable,
    onAlwaysShowCurrentDataTable,
}: FilterGroupPipeMapProps) => {
    // Derived pipe lists — recomputed only when groupPipe changes
    const { nt, ns, tl } = useMemo(() => classifyPipes(groupPipe), [groupPipe]);

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
                        }}
                    >
                        {/* Header */}
                        <Flex justify="end" align="center">
                            <ActionIcon
                                variant="transparent"
                                onClick={onFilterGroupPipeCloseClicked}
                            >
                                <IconX size="1.125rem" color="white" />
                            </ActionIcon>
                        </Flex>
                        <Center>
                            <Text c="white" tt="capitalize" fw={550}>
                                Cấu hình
                            </Text>
                        </Center>
                        <hr />

                        {/* Table display settings */}
                        <Text c="white">Hiển thị bảng Lưu lượng / Áp lực</Text>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={whiteBackgroundCurrentDataTable}
                                onChange={
                                    onWhiteBackgroundCurrentDataTableChanged
                                }
                            />
                            <Text c="white">Màu nền trắng</Text>
                        </Flex>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={alwaysOpenCurrentDataTable}
                                onChange={onAlwaysShowCurrentDataTable}
                            />
                            <Text c="white">Luôn hiển thị khi bắt đầu</Text>
                        </Flex>
                        <hr />

                        {/* Region visibility */}
                        <Text c="white">Ẩn/hiện các địa danh</Text>
                        <Flex justify="start" align="center" gap="sm">
                            <Checkbox
                                checked={showRegion}
                                onChange={onShowRegionChanged}
                            />
                            <Text c="white">Luôn hiển thị các địa danh</Text>
                        </Flex>

                        {/* TL pipes (shown inline, not in scroll area) */}
                        <Flex justify="start" align="center" gap="sm">
                            {tl.map((item) => (
                                <PipeCheckbox
                                    key={item.GroupPipeId}
                                    item={item}
                                    prefixLabel="Hiện các"
                                    onGroupPipeChanged={onGroupPipeChanged}
                                />
                            ))}
                        </Flex>
                        <hr />

                        {/* Pipe group lists */}
                        <ScrollArea h="50%">
                            <Text c="white">
                                Ẩn hiện tuyến ống chính / nhánh
                            </Text>
                            {nt.map((item) => (
                                <PipeCheckbox
                                    key={item.GroupPipeId}
                                    item={item}
                                    onGroupPipeChanged={onGroupPipeChanged}
                                />
                            ))}

                            <Text c="white">Tuyến ống nước sạch</Text>
                            {ns.map((item) => (
                                <PipeCheckbox
                                    key={item.GroupPipeId}
                                    item={item}
                                    onGroupPipeChanged={onGroupPipeChanged}
                                />
                            ))}
                        </ScrollArea>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default React.memo(FilterGroupPipeMap);
