import React from 'react';
import { LayerGroup, Rectangle, Tooltip } from 'react-leaflet';
import { Text } from '@mantine/core';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ShapeMapProps {
    showRegion: boolean;
}

type LatLng = [number, number];
type Bounds = [LatLng, LatLng, LatLng, LatLng];
type Direction = 'top' | 'bottom' | 'left' | 'right';

interface RegionConfig {
    bounds: Bounds;
    label: string;
    direction: Direction;
    /** Override tooltip anchor — only needed when the Rectangle centre is wrong */
    position?: LatLng;
    /** CSS class on the Rectangle element */
    rectClass?: string;
    /** CSS class on the Tooltip element */
    tipClass: string;
}

// ---------------------------------------------------------------------------
// Static region data — module-level constant, never recreated
// ---------------------------------------------------------------------------

const REGIONS: RegionConfig[] = [
    {
        bounds: [
            [10.545718, 106.348845],
            [10.546051, 106.349626],
            [10.545181, 106.350063],
            [10.544759, 106.349388],
        ],
        label: 'Công trình thu',
        direction: 'top',
        position: [10.545377, 106.349487],
        tipClass: 'commomtooltipctt',
    },
    {
        bounds: [
            [10.602041, 106.437985],
            [10.601956, 106.438998],
            [10.600488, 106.438956],
            [10.600482, 106.438054],
        ],
        label: 'Nhà máy xử lý',
        direction: 'top',
        position: [10.601434, 106.438709],
        tipClass: 'commomtooltipnmxl',
    },
    {
        bounds: [
            [10.558325, 106.591907],
            [10.559302, 106.603759],
            [10.54968, 106.604983],
            [10.548928, 106.592519],
        ],
        label: 'Ngã 4 Chợ Đào',
        direction: 'top',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.559931, 106.625956],
            [10.559756, 106.635522],
            [10.55352, 106.626381],
            [10.553205, 106.632456],
        ],
        label: 'Ngã 4 Chợ Trạm',
        direction: 'top',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.617053, 106.4846],
            [10.616976, 106.488663],
            [10.613136, 106.488663],
            [10.613673, 106.484443],
        ],
        label: 'Cầu Rạch Chanh (BL)',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.650214, 106.544834],
            [10.650721, 106.547908],
            [10.648568, 106.548155],
            [10.648376, 106.546412],
        ],
        label: 'Ngã 3 Mỹ Yên',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        // Fixed: original had bare numbers [10.565388, 106.54321] instead of a LatLng tuple
        bounds: [
            [10.568225, 106.542066],
            [10.568386, 106.545388],
            [10.565923, 106.545933],
            [10.565388, 106.54321],
        ],
        label: 'Ngã 3 Long Sơn',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.598662, 106.538159],
            [10.595445, 106.538372],
            [10.595445, 106.538372],
            [10.598732, 106.534744],
        ],
        label: 'UBND Xã Phước Vân',
        direction: 'right',
        position: [10.597421, 106.536986],
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.505005, 106.60586],
            [10.504654, 106.602951],
            [10.502044, 106.603819],
            [10.50355, 106.60734],
        ],
        label: 'Thị trấn Cần Đước',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.555273, 106.62115],
            [10.553641, 106.621049],
            [10.55335, 106.621879],
            [10.555237, 106.622151],
        ],
        label: 'TBTA Mỹ Lệ',
        direction: 'bottom',
        position: [10.554322, 106.62152],
        tipClass: 'commomtooltiptbta',
    },
    {
        bounds: [
            [10.604918, 106.653314],
            [10.604677, 106.657557],
            [10.600827, 106.653967],
            [10.600266, 106.657802],
        ],
        label: 'Ngã 4 Gia Bảo',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.625157, 106.66272],
            [10.625352, 106.664543],
            [10.623638, 106.665019],
            [10.623404, 106.663315],
        ],
        label: 'Vòng Xoay Tân Kim',
        direction: 'right',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.53911, 106.670315],
            [10.538765, 106.674438],
            [10.535402, 106.674262],
            [10.53523, 106.670491],
        ],
        label: 'Ngã 4 Đông Thạnh',
        direction: 'bottom',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
    {
        bounds: [
            [10.544108, 106.729516],
            [10.543567, 106.737584],
            [10.533546, 106.730854],
            [10.533275, 106.738922],
        ],
        label: 'Cảng Quốc Tế Long An',
        direction: 'bottom',
        rectClass: 'regionnoimportant',
        tipClass: 'commomtooltip',
    },
];

const TRANSPARENT = { color: 'transparent' };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ShapeMap = ({ showRegion }: ShapeMapProps) => {
    if (!showRegion) return null;

    return (
        <LayerGroup>
            {REGIONS.map(
                ({
                    bounds,
                    label,
                    direction,
                    position,
                    rectClass,
                    tipClass,
                }) => (
                    <Rectangle
                        key={label}
                        bounds={bounds}
                        pathOptions={TRANSPARENT}
                        className={rectClass}
                    >
                        <Tooltip
                            className={tipClass}
                            permanent
                            direction={direction}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore — react-leaflet Tooltip `position` prop is not in its TS types but is valid at runtime
                            position={position}
                        >
                            <Text c="orange" size="xs">
                                {label}
                            </Text>
                        </Tooltip>
                    </Rectangle>
                ),
            )}
        </LayerGroup>
    );
};

export default React.memo(ShapeMap);
