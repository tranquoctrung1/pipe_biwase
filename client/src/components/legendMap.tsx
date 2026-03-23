import React from 'react';
import Control from 'react-leaflet-custom-control';
import { Flex, Text, Progress, Transition } from '@mantine/core';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LegendMapProps {
    openLegend: boolean;
}

// ---------------------------------------------------------------------------
// Static data — defined outside the component so they are never recreated
// ---------------------------------------------------------------------------

const CHANNEL_LABELS = [
    { label: 'Áp lực (m)', color: 'red' },
    { label: 'Lưu lượng (m3/h)', color: 'blue' },
    { label: 'Kênh khác', color: 'green' },
] as const;

interface PressureRange {
    color: string;
    label: string;
}

const PRESSURE_RANGES: PressureRange[] = [
    { color: '#c23616', label: '70 < Áp lực <= 80' },
    { color: '#e84118', label: '60 < Áp lực <= 70' },
    { color: '#ffbe76', label: '50 < Áp lực <= 60' },
    { color: '#4834d4', label: '40 < Áp lực <= 50' },
    { color: '#686de0', label: '30 < Áp lực <= 40' },
    { color: '#4cd137', label: '20 < Áp lực <= 30' },
    { color: '#44bd32', label: '10 < Áp lực <= 20' },
    { color: '#fbc531', label: '0 < Áp lực <= 10' },
    { color: '#c56cf0', label: 'Áp lực <= 0' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const LegendMap = ({ openLegend }: LegendMapProps) => {
    return (
        <Control position="bottomright">
            <Transition
                mounted={openLegend}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            padding: '10px',
                            backgroundColor: '#f5deb3c7',
                            borderRadius: '5px',
                        }}
                    >
                        {/* Channel type labels */}
                        {CHANNEL_LABELS.map(({ label, color }) => (
                            <Flex
                                key={label}
                                gap="md"
                                justify="start"
                                align="center"
                            >
                                <Text size="sm" c={color} fw={600}>
                                    {label}
                                </Text>
                            </Flex>
                        ))}

                        {/* Pressure range rows */}
                        {PRESSURE_RANGES.map(({ color, label }) => (
                            <Flex
                                key={label}
                                gap="md"
                                justify="start"
                                align="center"
                            >
                                <Progress
                                    size="sm"
                                    value={100}
                                    color={color}
                                    style={{ width: '20px' }}
                                />
                                <Text size="sm" c="#dff9fb">
                                    {label}
                                </Text>
                            </Flex>
                        ))}
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default React.memo(LegendMap);
