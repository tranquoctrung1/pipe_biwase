import React, { useCallback, useMemo } from 'react';
import { Text, ActionIcon, Grid, Textarea, Flex, Button } from '@mantine/core';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { Icon, Point } from 'leaflet';
import { IconChartAreaLine } from '@tabler/icons-react';

import MarkerRed from '../assets/marker_red.png';
import MarkerYellow from '../assets/marker_yellow.png';
import MarkerOrange from '../assets/marker_orange.png';
import MarkerAqua from '../assets/marker_aqua.png';
import Valve from '../assets/bom.png';
import WaterCompany from '../assets/watercompany.png';
import MarkerDHC from '../assets/marker_dhc.png';
import Play from '../assets/play.png';
import PlayStop from '../assets/playstop.png';
import MarkerPurple from '../assets/marker_purple.png';

import {
    convertDateToStringNotDate,
    convertDateToStringNotTime,
    convertDateToString,
} from '../utils/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Channel {
    _id: string;
    ChannelId: string;
    ChannelName: string;
    Unit: string;
    LastValue: number | null;
    LastIndex: number | null;
    TimeStamp: string | null;
    ForwardFlow: boolean;
    ReverseFlow: boolean;
    Pressure1: boolean;
    Pressure2: boolean;
}

interface Site {
    _id: string;
    SiteId: string;
    LoggerId: string;
    Location: string;
    Latitude: number | null;
    Longitude: number | null;
    StatusError: number | null;
    Type: number | null;
    IsManualMeter: boolean | undefined;
    IsShowLabel: boolean;
    Status: string;
    Available: string;
    PipeId: string;
    PipeName: string;
    SizePipe: number;
    LengthPipe: number;
    Note: string;
    Channels: Channel[];
}

interface MarkerMapProps {
    sites: Site[];
    onpenChartModalClick: (channel: Channel) => void;
    openModalChartSiteClick: (site: Site) => void;
    zoom: number | null;
}

// ---------------------------------------------------------------------------
// Icons — module-level constants, created once for the lifetime of the app
// ---------------------------------------------------------------------------

function makeIcon(url: string, size = 20): Icon {
    return new Icon({
        iconUrl: url,
        iconRetinaUrl: url,
        popupAnchor: [0, -3],
        iconSize: new Point(size, size),
        className: '',
    });
}

const ICONS = {
    aqua: makeIcon(MarkerAqua),
    dhc: makeIcon(MarkerDHC),
    yellow: makeIcon(MarkerYellow),
    red: makeIcon(MarkerRed),
    orange: makeIcon(MarkerOrange),
    purple: makeIcon(MarkerPurple),
    valve: makeIcon(Valve),
    waterCompany: makeIcon(WaterCompany),
    play: makeIcon(Play, 30),
    stop: makeIcon(PlayStop, 30),
} as const;

// ---------------------------------------------------------------------------
// Pure helpers — outside the component, never recreated
// ---------------------------------------------------------------------------

function identifyIcon(
    status: number | null,
    type: number | null,
    isManualMeter: boolean | undefined,
): Icon {
    if (isManualMeter) return ICONS.dhc;
    if (type === 1) return ICONS.waterCompany;
    if (type === 4) return ICONS.valve;

    switch (status) {
        case 2:
            return ICONS.yellow;
        case 3:
            return ICONS.red;
        case 5:
            return ICONS.orange;
        case 6:
            return ICONS.play;
        case 7:
            return ICONS.stop;
        case 8:
            return ICONS.purple;
        default:
            return ICONS.aqua;
    }
}

function tooltipDirection(site: Site): 'left' | 'right' | 'bottom' {
    if (site.Type === 1) return 'left';
    if (site.SiteId === 'D800 CD2 CTT') return 'left';
    if (site.SiteId === 'D800 CD1 CTT') return 'right';
    return 'bottom';
}

function tooltipBackground(site: Site): string {
    if (site.Channels[0]?.LastValue === null) return 'gray';
    switch (site.StatusError) {
        case 2:
            return 'yellow';
        case 3:
            return 'red';
        case 5:
            return 'orange';
        case 8:
            return 'violet';
        default:
            return 'blue';
    }
}

function channelColor(ch: Channel): string {
    if (ch.Pressure1 || ch.Pressure2) return 'red';
    if (ch.ForwardFlow || ch.ReverseFlow) return 'blue';
    return 'green';
}

function firstTimestamp(channels: Channel[]): string {
    for (const ch of channels) {
        if (ch.TimeStamp != null) return ch.TimeStamp;
    }
    return '';
}

function calculateIndex(channels: Channel[]): number {
    return channels.reduce((acc, ch) => {
        if (ch.LastIndex == null) return acc;
        if (ch.ForwardFlow) return acc + ch.LastIndex;
        if (ch.ReverseFlow) return acc - ch.LastIndex;
        return acc;
    }, 0);
}

// ---------------------------------------------------------------------------
// Sub-components — each is memoised to prevent unnecessary re-renders
// ---------------------------------------------------------------------------

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
    valueColor?: string;
}

const InfoRow = React.memo(({ label, value, valueColor }: InfoRowProps) => (
    <Flex justify="start" align="center" style={{ marginBottom: '10px' }}>
        <b style={{ marginRight: '5px' }}>{label}</b>
        <span style={valueColor ? { color: valueColor } : undefined}>
            {value}
        </span>
    </Flex>
));
InfoRow.displayName = 'InfoRow';

// ---------------------------------------------------------------------------

interface ChannelRowProps {
    channel: Channel;
    onChartClick: (channel: Channel) => void;
}

const ChannelRow = React.memo(({ channel, onChartClick }: ChannelRowProps) => {
    const handleClick = useCallback(
        () => onChartClick(channel),
        [channel, onChartClick],
    );

    return (
        <Flex
            style={{
                width: '100%',
                background: '#82ccdd6b',
                padding: '0 10px 0 5px',
                borderRadius: '5px',
                marginBottom: '5px',
            }}
        >
            <Grid.Col span={{ base: 3 }}>
                <Text size="xs" c="black" style={{ margin: '5px' }}>
                    {channel.ChannelName}
                </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 3 }}>
                <Text size="xs" c="blue" style={{ margin: '5px' }}>
                    {channel.LastValue == null
                        ? 'NO DATA'
                        : `${channel.LastValue.toFixed(2)} ${channel.Unit}`}
                </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 5 }}>
                <Text size="xs" c="black" style={{ margin: '5px' }}>
                    {channel.TimeStamp == null
                        ? 'NO TIME'
                        : convertDateToString(channel.TimeStamp)}
                </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 1 }} style={{ margin: 'auto' }}>
                <ActionIcon variant="filled" color="blue" onClick={handleClick}>
                    <IconChartAreaLine size="1.125rem" />
                </ActionIcon>
            </Grid.Col>
        </Flex>
    );
});
ChannelRow.displayName = 'ChannelRow';

// ---------------------------------------------------------------------------

interface SitePopupProps {
    site: Site;
    onChartClick: (channel: Channel) => void;
    onSiteChartClick: (site: Site) => void;
}

const SitePopup = React.memo(
    ({ site, onChartClick, onSiteChartClick }: SitePopupProps) => {
        const handleSiteChart = useCallback(
            () => onSiteChartClick(site),
            [site, onSiteChartClick],
        );

        const index = useMemo(
            () => calculateIndex(site.Channels),
            [site.Channels],
        );

        return (
            <>
                <InfoRow label="Mã tuyến ống:" value={site.PipeId} />
                <InfoRow label="Tên tuyến ống:" value={site.PipeName} />
                <InfoRow label="Kích thước tuyến ống:" value={site.SizePipe} />
                <InfoRow label="Độ dài tuyến ống:" value={site.LengthPipe} />
                <InfoRow label="Vị trí:" value={site.Location} />
                <InfoRow label="LoggerId:" value={site.LoggerId} />
                <InfoRow label="Mã vị trí:" value={site.SiteId} />
                <InfoRow label="Tình trạng:" value={site.Status} />
                <InfoRow label="Trạng thái:" value={site.Available} />
                <InfoRow
                    label="Index:"
                    value={index.toFixed(2)}
                    valueColor="blue"
                />

                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <Button color="blue" size="xs" onClick={handleSiteChart}>
                        Xem biểu đồ kênh của điểm
                    </Button>
                </Flex>

                <Grid style={{ marginTop: '5px' }}>
                    {site.Channels.map((ch) => (
                        <ChannelRow
                            key={ch._id}
                            channel={ch}
                            onChartClick={onChartClick}
                        />
                    ))}
                </Grid>

                <Grid style={{ marginTop: '5px' }}>
                    <Grid.Col
                        span={{ base: 12 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Textarea
                            label="Ghi chú"
                            placeholder="Ghi chú của điểm"
                            autosize
                            minRows={2}
                            maxRows={4}
                            defaultValue={site.Note}
                            style={{ flex: 1, marginRight: '5px' }}
                        />
                    </Grid.Col>
                </Grid>
            </>
        );
    },
);
SitePopup.displayName = 'SitePopup';

// ---------------------------------------------------------------------------

interface SiteTooltipProps {
    site: Site;
}

const SiteTooltip = React.memo(({ site }: SiteTooltipProps) => {
    const bg = useMemo(() => tooltipBackground(site), [site]);
    const timestamp = useMemo(
        () => firstTimestamp(site.Channels),
        [site.Channels],
    );

    return (
        <div style={{ minWidth: '10rem' }}>
            <Flex justify="center" align="center" style={{ background: bg }}>
                <Text size="xs" c="white">
                    {site.Location}
                </Text>
            </Flex>

            <Flex justify="space-between" align="center">
                <Text size="xs" c="black" fw={500}>
                    {timestamp
                        ? convertDateToStringNotTime(new Date(timestamp))
                        : ''}
                </Text>
                <Text size="xs" c="black" fw={500}>
                    {timestamp
                        ? convertDateToStringNotDate(new Date(timestamp))
                        : ''}
                </Text>
            </Flex>

            {site.Channels.map((ch) => (
                <Grid key={ch._id}>
                    <Grid.Col span={{ base: 6 }}>
                        <Text size="xs" c="black">
                            {ch.ChannelName}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6 }}>
                        <Flex justify="end" align="center">
                            <Text size="xs" c={channelColor(ch)}>
                                {ch.LastValue == null
                                    ? 'NO DATA'
                                    : ch.LastValue.toFixed(2)}
                            </Text>
                        </Flex>
                    </Grid.Col>
                </Grid>
            ))}
        </div>
    );
});
SiteTooltip.displayName = 'SiteTooltip';

// ---------------------------------------------------------------------------
// SiteMarker — one marker + its popup + tooltip
// ---------------------------------------------------------------------------

interface SiteMarkerProps {
    site: Site;
    zoom: number | null;
    onChartClick: (channel: Channel) => void;
    onSiteChartClick: (site: Site) => void;
}

const SiteMarker = React.memo(
    ({ site, zoom, onChartClick, onSiteChartClick }: SiteMarkerProps) => {
        const icon = useMemo(
            () => identifyIcon(site.StatusError, site.Type, site.IsManualMeter),
            [site.StatusError, site.Type, site.IsManualMeter],
        );
        const direction = useMemo(() => tooltipDirection(site), [site]);
        const opacity =
            site.IsShowLabel || (zoom != null && zoom >= 14) ? 1 : 0;

        return (
            <Marker
                key={site._id}
                position={[site.Latitude!, site.Longitude!]}
                icon={icon}
                riseOnHover
                riseOffset={10}
            >
                <Popup minWidth={400}>
                    <SitePopup
                        site={site}
                        onChartClick={onChartClick}
                        onSiteChartClick={onSiteChartClick}
                    />
                </Popup>
                <Tooltip
                    direction={direction}
                    permanent
                    offset={[0, 5]}
                    opacity={opacity}
                    interactive
                >
                    <SiteTooltip site={site} />
                </Tooltip>
            </Marker>
        );
    },
);
SiteMarker.displayName = 'SiteMarker';

// ---------------------------------------------------------------------------
// MarkerMap
// ---------------------------------------------------------------------------

const MarkerMap = ({
    sites,
    onpenChartModalClick,
    openModalChartSiteClick,
    zoom,
}: MarkerMapProps) => (
    <>
        {sites
            .filter(
                (site) =>
                    site.Latitude != null &&
                    site.Longitude != null &&
                    site.Type !== 3,
            )
            .map((site) => (
                <SiteMarker
                    key={site._id}
                    site={site}
                    zoom={zoom}
                    onChartClick={onpenChartModalClick}
                    onSiteChartClick={openModalChartSiteClick}
                />
            ))}
    </>
);

export default React.memo(MarkerMap);
