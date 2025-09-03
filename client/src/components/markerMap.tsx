import { Text, ActionIcon, Grid, Textarea, Flex, Button } from '@mantine/core';

import { Marker, Popup, Tooltip } from 'react-leaflet';

import { Icon, Point } from 'leaflet';

//import MarkerGreen from '../assets/marker_green.png';
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

import { IconChartAreaLine } from '@tabler/icons-react';

import {
    convertDateToStringNotDate,
    convertDateToStringNotTime,
    convertDateToString,
} from '../utils/utils';

import uuid from 'react-uuid';

const MarkerMap = ({
    sites,
    onpenChartModalClick,
    openModalChartSiteClick,
    zoom,
}: any) => {
    // const iconGreen = new Icon({
    //     iconUrl: MarkerGreen,
    //     iconRetinaUrl: MarkerGreen,
    //     popupAnchor: [0, -3],
    //     iconSize: new Point(20, 20),
    //     className: '',
    // });

    const iconDHC = new Icon({
        iconUrl: MarkerDHC,
        iconRetinaUrl: MarkerDHC,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconAqua = new Icon({
        iconUrl: MarkerAqua,
        iconRetinaUrl: MarkerAqua,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconYellow = new Icon({
        iconUrl: MarkerYellow,
        iconRetinaUrl: MarkerYellow,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconRed = new Icon({
        iconUrl: MarkerRed,
        iconRetinaUrl: MarkerRed,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconOrange = new Icon({
        iconUrl: MarkerOrange,
        iconRetinaUrl: MarkerOrange,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconValve = new Icon({
        iconUrl: Valve,
        iconRetinaUrl: Valve,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconWaterCompany = new Icon({
        iconUrl: WaterCompany,
        iconRetinaUrl: WaterCompany,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const iconPlay = new Icon({
        iconUrl: Play,
        iconRetinaUrl: Play,
        popupAnchor: [0, -3],
        iconSize: new Point(30, 30),
        className: '',
    });

    const iconStop = new Icon({
        iconUrl: PlayStop,
        iconRetinaUrl: PlayStop,
        popupAnchor: [0, -3],
        iconSize: new Point(30, 30),
        className: '',
    });

    const iconPurple = new Icon({
        iconUrl: MarkerPurple,
        iconRetinaUrl: MarkerPurple,
        popupAnchor: [0, -3],
        iconSize: new Point(20, 20),
        className: '',
    });

    const indentifyIcon = (
        status: number | null,
        type: number | null,
        isManualMeter: boolean | undefined,
    ) => {
        let defaultIcon = iconAqua;
        if (isManualMeter === true) {
            defaultIcon = iconDHC;
        } else if (type === 1) {
            defaultIcon = iconWaterCompany;
        } else if (type === 4) {
            defaultIcon = iconValve;
        } else if (status != null) {
            if (status === 2) {
                defaultIcon = iconYellow;
            } else if (status === 3) {
                defaultIcon = iconRed;
            } else if (status === 5) {
                defaultIcon = iconOrange;
            } else if (status === 6) {
                defaultIcon = iconPlay;
            } else if (status === 7) {
                defaultIcon = iconStop;
            } else if (status === 8) {
                defaultIcon = iconPurple;
            }
        }

        return defaultIcon;
    };

    const createListChannelInPopupContent = (data: any) => {
        const content = [];

        for (const channel of data) {
            const element = (
                <Flex
                    style={{
                        width: '100%',
                        background: '#82ccdd6b',
                        padding: '0 10px 0 5px',
                        borderRadius: '5px',
                        marginBottom: '5px',
                    }}
                >
                    <Grid.Col span={{ base: 3 }} key={channel._id}>
                        <Text size="xs" c="black" style={{ margin: '5px' }}>
                            {channel.ChannelName}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={{ base: 3 }}>
                        <Text size="xs" c="blue" style={{ margin: '5px' }}>
                            {channel.LastValue == null
                                ? 'NO DATA'
                                : channel.LastValue.toFixed(2) +
                                  ' ' +
                                  channel.Unit}
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
                        <ActionIcon
                            variant="filled"
                            color="blue"
                            onClick={() => onpenChartModalClick(channel)}
                        >
                            <IconChartAreaLine size="1.125rem"></IconChartAreaLine>
                        </ActionIcon>
                    </Grid.Col>
                </Flex>
            );

            content.push(element);
        }

        return content;
    };

    const createPopupContent = (site: any) => {
        let content = '';

        let index = 0;

        if (site.Channels.length > 0) {
            for (const channel of site.Channels) {
                if (channel.ForwardFlow == true) {
                    if (
                        channel.LastIndex != null &&
                        channel.LastIndex != undefined
                    ) {
                        index += channel.LastIndex;
                    }
                } else if (channel.ReverseFlow == true) {
                    if (
                        channel.LastIndex != null &&
                        channel.LastIndex != undefined
                    ) {
                        index -= channel.LastIndex;
                    }
                }
            }
        }
        //@ts-ignore
        content = (
            <>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Mã tuyến ống: </b>
                    <span>{site.PipeId}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Tên tuyến ống: </b>
                    <span>{site.PipeName}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Kích thước tuyến ống: </b>
                    <span>{site.SizePipe}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Độ dài tuyến ống: </b>
                    <span>{site.LengthPipe}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Vị trí: </b>
                    <span>{site.Location}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>LoggerId: </b>
                    <span>{site.LoggerId}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Mã vị trí: </b>
                    <span>{site.SiteId}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Tình trạng: </b>
                    <span>{site.Status}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Trạng thái: </b>
                    <span>{site.Available}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <b style={{ marginRight: '5px' }}>Index:</b>
                    <span style={{ color: 'blue' }}>{index.toFixed(2)}</span>
                </Flex>
                <Flex
                    justify="start"
                    align="center"
                    style={{ marginBottom: '10px' }}
                >
                    <Button
                        color="blue"
                        size="xs"
                        onClick={() => openModalChartSiteClick(site)}
                    >
                        Xem biểu đồ kênh của điểm
                    </Button>
                </Flex>
                <Grid style={{ marginTop: '5px' }}>
                    {createListChannelInPopupContent(site.Channels)}
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

        return content;
    };

    const createListChannelContentInTooltipContent = (data: any) => {
        const content = [];

        for (const channel of data) {
            let colorChannel = 'green';

            if (channel.Pressure1 === true || channel.Pressure2 === true) {
                colorChannel = 'red';
            } else if (
                channel.ForwardFlow === true ||
                channel.ReverseFlow === true
            ) {
                colorChannel = 'blue';
            } else {
                colorChannel = 'green';
            }

            const element = (
                <>
                    <Grid key={channel._id}>
                        <Grid.Col span={{ base: 6 }}>
                            <Text size="xs" c="black">
                                {channel.ChannelName}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={{ base: 6 }}>
                            <Flex justify="end" align="center">
                                <Text size="xs" c={colorChannel}>
                                    {channel.LastValue == null
                                        ? 'NO DATA'
                                        : channel.LastValue.toFixed(2)}
                                </Text>
                            </Flex>
                        </Grid.Col>
                    </Grid>
                </>
            );

            content.push(element);
        }

        return content;
    };

    const createCommonTimeStampDateInTooltip = (data: any) => {
        let content = '';

        for (const channel of data) {
            if (channel.TimeStamp != null && channel.TimeStamp != undefined) {
                content = convertDateToStringNotTime(
                    new Date(channel.TimeStamp),
                );
                break;
            }
        }

        return content;
    };

    const createCommonTimeStampTimeInTooltip = (data: any) => {
        let content = '';

        for (const channel of data) {
            if (channel.TimeStamp != null && channel.TimeStamp != undefined) {
                content = convertDateToStringNotDate(
                    new Date(channel.TimeStamp),
                );
                break;
            }
        }

        return content;
    };

    const createTooltipContent = (site: any) => {
        let backgroudColor = 'blue';

        if (site.StatusError === 2) {
            backgroudColor = 'yellow';
        } else if (site.StatusError === 3) {
            backgroudColor = 'red';
        } else if (site.StatusError === 5) {
            backgroudColor = 'orange';
        } else if (site.StatusError === 8) {
            backgroudColor = 'violet';
        }

        for (const channel of site.Channels) {
            if (channel.LastValue === null) {
                backgroudColor = 'gray';
            }
            break;
        }

        const content = (
            <div key={uuid()} style={{ minWidth: '10rem' }}>
                <Flex
                    justify="center"
                    align="center"
                    key={uuid()}
                    style={{ background: backgroudColor }}
                >
                    <Text size="xs" c="white">
                        {site.Location}
                    </Text>
                </Flex>
                <Flex justify="space-between" align="center" key={uuid()}>
                    <Text size="xs" c="black" fw={500}>
                        {createCommonTimeStampDateInTooltip(site.Channels)}
                    </Text>
                    <Text size="xs" c="black" fw={500}>
                        {createCommonTimeStampTimeInTooltip(site.Channels)}
                    </Text>
                </Flex>
                {createListChannelContentInTooltipContent(site.Channels)}
            </div>
        );

        return content;
    };

    const convertMarker = (data: any) => {
        const markers = [];
        if (data != undefined && data != null) {
            if (data.length > 0) {
                for (const site of data) {
                    if (
                        site.Latitude != null &&
                        site.Latitude != undefined &&
                        site.Longitude != null &&
                        site.Longitude != undefined &&
                        site.Type !== 3
                    ) {
                        const marker = (
                            <Marker
                                key={site._id}
                                position={[site.Latitude, site.Longitude]}
                                icon={indentifyIcon(
                                    site.StatusError,
                                    site.Type,
                                    site.IsManualMeter,
                                )}
                                riseOnHover
                                riseOffset={10}
                            >
                                <Popup minWidth={400} key={uuid()}>
                                    {createPopupContent(site)}
                                </Popup>
                                <Tooltip
                                    direction={
                                        site.Type === 1
                                            ? 'left'
                                            : site.SiteId === 'D800 CD2 CTT'
                                            ? 'left'
                                            : site.SiteId === 'D800 CD1 CTT'
                                            ? 'right'
                                            : 'bottom'
                                    }
                                    permanent={true}
                                    offset={[0, 5]}
                                    opacity={
                                        site.IsShowLabel || zoom >= 14 ? 1 : 0
                                    }
                                    key={uuid()}
                                    interactive={true}
                                >
                                    {createTooltipContent(site)}
                                </Tooltip>
                            </Marker>
                        );

                        markers.push(marker);
                    }
                }
            }
        }

        return markers;
    };

    return convertMarker(sites);
};

export default MarkerMap;
