import React, { useMemo } from 'react';
import Control from 'react-leaflet-custom-control';
import { Button, Space, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    IconSearch,
    IconDropletSearch,
    IconFilter,
    IconList,
    IconTable,
    TablerIconsProps,
} from '@tabler/icons-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ButtonMapProps {
    onAlarmTableClicked: () => void;
    onLostWaterClicked: () => void;
    onSearchSiteClicked: () => void;
    onFilterGroupPipeClicked: () => void;
    onLegendHideClicked: () => void;
    onTableCurrentDataClicked: () => void;
    onTableCurrentPressureClicked: () => void;
    openAlarm: boolean;
    openLostWater: boolean;
    openFilterSite: boolean;
    openFilterGroupPipe: boolean;
    openLegend: boolean;
    openTableCurrentData: boolean;
    openTableCurrentPressureData: boolean;
}

interface MapButtonConfig {
    color: string;
    label: string;
    isOpen: boolean;
    onClick: () => void;
    Icon: (props: TablerIconsProps) => JSX.Element;
}

// ---------------------------------------------------------------------------
// Shared button style — defined outside the component, never recreated
// ---------------------------------------------------------------------------

const BUTTON_STYLE: React.CSSProperties = {
    border: 'none',
    boxShadow: '0 0 5px 0 rgba(0,0,0,.2)',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ButtonMap = ({
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
}: ButtonMapProps) => {
    const mobile = useMediaQuery('(max-width: 431px)');

    // Button definitions — rebuilt only when open-state props change
    const buttons: MapButtonConfig[] = useMemo(
        () => [
            {
                color: '#27ae60',
                label: `${openTableCurrentData ? 'Ẩn' : 'Bật'} Bảng Lưu lượng / Áp lực`,
                isOpen: openTableCurrentData,
                onClick: onTableCurrentDataClicked,
                Icon: IconTable,
            },
            {
                color: '#e74c3c',
                label: `${openTableCurrentPressureData ? 'Ẩn' : 'Bật'} Bảng áp lực nước sạch`,
                isOpen: openTableCurrentPressureData,
                onClick: onTableCurrentPressureClicked,
                Icon: IconTable,
            },
            {
                color: '#1e90ff',
                label: `${openLostWater ? 'Ẩn' : 'Bật'} Bảng tính thất thoát`,
                isOpen: openLostWater,
                onClick: onLostWaterClicked,
                Icon: IconDropletSearch,
            },
            {
                color: '#1abc9c',
                label: `${openFilterSite ? 'Ẩn' : 'Bật'} Tìm kiếm theo đồng hồ`,
                isOpen: openFilterSite,
                onClick: onSearchSiteClicked,
                Icon: IconSearch,
            },
            {
                color: '#2980b9',
                label: `${openFilterGroupPipe ? 'Ẩn' : 'Bật'} Cấu hình hiển thị`,
                isOpen: openFilterGroupPipe,
                onClick: onFilterGroupPipeClicked,
                Icon: IconFilter,
            },
            {
                color: 'rgba(245, 222, 179, 0.78)',
                label: `${openLegend ? 'Ẩn' : 'Bật'} Chú thích`,
                isOpen: openLegend,
                onClick: onLegendHideClicked,
                Icon: IconList,
            },
        ],
        [
            openTableCurrentData,
            openTableCurrentPressureData,
            openLostWater,
            openFilterSite,
            openFilterGroupPipe,
            openLegend,
            onTableCurrentDataClicked,
            onTableCurrentPressureClicked,
            onLostWaterClicked,
            onSearchSiteClicked,
            onFilterGroupPipeClicked,
            onLegendHideClicked,
        ],
    );

    return (
        <Control prepend position="topright">
            <div>
                {buttons.map(({ color, label, onClick, Icon }) => (
                    <React.Fragment key={label}>
                        <Button
                            style={{ ...BUTTON_STYLE, background: color }}
                            onClick={onClick}
                        >
                            {!mobile && (
                                <>
                                    <Text size="xs">{label}</Text>
                                    <Space w="sm" />
                                </>
                            )}
                            <Icon size="1.125rem" style={{ color: 'white' }} />
                        </Button>
                        <Space h="xs" />
                    </React.Fragment>
                ))}
            </div>
        </Control>
    );
};

export default React.memo(ButtonMap);
