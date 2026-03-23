import { motion } from 'framer-motion';
import { Grid } from '@mantine/core';
import { TileLayer, useMap, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from 'react';
import {
    useGetDataDrawingPipeQuery,
    useGetSiteAndChannelQuery,
} from '../__generated__/graphql';
import uuid from 'react-uuid';
import { debounce } from 'lodash';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import ChartModal from '../components/chartModal';
import LegendMap from '../components/legendMap';
import TableAlarmMap from '../components/tableAlarmMap';
import LostWaterMap from '../components/lostWaterMap';
import SearchSiteMap from '../components/searchSiteMap';
import FilterGroupPipeMap from '../components/filterGroupPipeMap';
import ButtonMap from '../components/buttonMap';
import PolyLineMap from '../components/polylineMap';
import MarkerMap from '../components/markerMap';
import ShapeMap from '../components/shapeMap';
import MapContainerComponent from '../components/mapContainer';
import TableCurrentDataMap from '../components/tableCurrentDataMap';
import ChartLostWater from '../components/chartLostWater';
import ChartSiteModal from '../components/chartSiteModal';
import TableCurrentPressureDataMap from '../components/tableCurrentPressureDataMap';
import ChartSiteModalECharts from '../components/chartSiteModalECharts';
import ChartModalECharts from '../components/chartModalECharts';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Channel {
    ChannelId: string;
    ChannelName: string;
    Unit: string;
}

interface Site {
    SiteId: string;
    LoggerId: string;
    Location: string;
    Latitude: number;
    Longitude: number;
    StatusError: number;
    DisplayGroup: string;
    PipeId: string;
    PipeName: string;
    SizePipe: number;
    LengthPipe: number;
    Channels?: Channel[];
}

interface SiteRow extends Site {
    STT: number;
}

interface FilterOption {
    label: string;
    value: string;
    children: Array<{ label: string; value: string }>;
}

interface PipeLine {
    Lines: [[number, number], [number, number]];
    Color?: string;
    Weight?: number;
    Content?: React.ReactNode[];
}

interface GroupPipeItem {
    GroupPipeId: string;
    GroupPipeName: string;
    IsHide: boolean;
    Pipes: Array<{
        PipeId: string;
        PipeName: string;
        Length: number;
        Size: number;
        BaseMax: number;
        BaseMin: number;
        Lines: PipeLine[];
    }>;
}

type PanelKey =
    | 'alarm'
    | 'lostWater'
    | 'filterSite'
    | 'filterGroupPipe'
    | 'legend'
    | 'tableCurrentData'
    | 'tableCurrentPressure';

type PanelState = Record<PanelKey, boolean>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;
const TOOLTIP_ZOOM_THRESHOLD = 14;
const STORAGE_KEY_OPEN_TABLE = 'openCurrentTableData';

// ---------------------------------------------------------------------------
// Helpers — pure functions, defined outside the component
// ---------------------------------------------------------------------------

/**
 * Build the popup content for a pipe line.
 * Moved out of the data-fetch callback so JSX is not created inside
 * business-logic code and the function is stable across renders.
 */
function buildPipeContent(
    groupPipeId: string,
    groupPipeName: string,
    pipeId: string,
    pipeName: string,
    length: number,
    size: number,
    baseMax: number,
    baseMin: number,
): React.ReactNode[] {
    const row = (label: string, value: React.ReactNode) => (
        <p key={uuid()}>
            <span>{label} </span>
            <b>{value}</b>
        </p>
    );

    return [
        row('Mã nhóm tuyến ống:', groupPipeId),
        row('Tên nhóm tuyến ống:', groupPipeName),
        row('Mã tuyến ống:', pipeId),
        row('Tên tuyến ống:', pipeName),
        row('Chiều dài ống:', length),
        row('Kích thước ống:', size),
        row('Ngưỡng trên:', baseMax),
        row('Ngưỡng dưới:', baseMin),
    ];
}

function getPipeWeight(size: number): number {
    if (size <= 100) return 1;
    if (size <= 200) return 2;
    if (size <= 400) return 3;
    return 4;
}

function getInitialPanelState(): PanelState {
    const openTable = localStorage.getItem(STORAGE_KEY_OPEN_TABLE) === 'true';
    return {
        alarm: false,
        lostWater: false,
        filterSite: false,
        filterGroupPipe: false,
        legend: true,
        tableCurrentData: openTable,
        tableCurrentPressure: false,
    };
}

// ---------------------------------------------------------------------------
// Custom hooks
// ---------------------------------------------------------------------------

/**
 * Manages all map-overlay panel open/close state in a single object,
 * replacing ~14 individual boolean useState calls.
 */
function usePanelState() {
    const [panels, setPanels] = useState<PanelState>(getInitialPanelState);

    const toggle = useCallback((key: PanelKey) => {
        setPanels((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const close = useCallback((key: PanelKey) => {
        setPanels((prev) => ({ ...prev, [key]: false }));
    }, []);

    return { panels, toggle, close };
}

/**
 * Fetches and transforms site + channel data.
 */
function useSiteData(
    getSiteAndChannelRefetch: ReturnType<
        typeof useGetSiteAndChannelQuery
    >['refetch'],
) {
    const [sites, setSites] = useState<Site[]>([]);
    const [tableData, setTableData] = useState<SiteRow[]>([]);
    const [filterSite, setFilterSite] = useState<FilterOption[]>([]);
    const [filterSiteNS, setFilterSiteNS] = useState<FilterOption[]>([]);
    const originFilterRef = useRef<{
        site: FilterOption[];
        siteNS: FilterOption[];
    }>({ site: [], siteNS: [] });

    const fetchAndProcess = useCallback(() => {
        getSiteAndChannelRefetch()
            .then(({ data }) => {
                const raw = data?.GetSiteAndChannel;
                if (!raw) return;

                setSites(raw as Site[]);

                // Table data (exclude error sites)
                const rows: SiteRow[] = [];
                let count = 1;
                for (const item of raw) {
                    if (item.StatusError !== 1) {
                        rows.push({ ...(item as Site), STT: count++ });
                    }
                }
                setTableData(rows);

                // Filter trees
                const dhnt: FilterOption[] = [];
                const ns: FilterOption[] = [];

                for (const item of raw as Site[]) {
                    const node: FilterOption = {
                        label: item.Location,
                        value: item.SiteId,
                        children: (item.Channels ?? []).map((ch) => ({
                            label: `${ch.ChannelId}_${ch.ChannelName}`,
                            value: ch.ChannelId,
                        })),
                    };

                    if (item.DisplayGroup === 'DHNT') {
                        dhnt.push(node);
                    } else {
                        ns.push(node);
                    }
                }

                originFilterRef.current = { site: dhnt, siteNS: ns };
                setFilterSite(dhnt);
                setFilterSiteNS(ns);
            })
            .catch(console.error);
    }, [getSiteAndChannelRefetch]);

    // Debounced search filter
    const handleSearch = useMemo(
        () =>
            debounce((value: string) => {
                const { site, siteNS } = originFilterRef.current;
                if (!value) {
                    setFilterSite([...site]);
                    setFilterSiteNS([...siteNS]);
                    return;
                }
                const lv = value.toLowerCase();
                setFilterSite(
                    site.filter((el) => el.label.toLowerCase().includes(lv)),
                );
                setFilterSiteNS(
                    siteNS.filter((el) => el.label.toLowerCase().includes(lv)),
                );
            }, 1000),
        [],
    );

    const handleFilterSiteChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
        },
        [handleSearch],
    );

    return {
        sites,
        tableData,
        filterSite,
        filterSiteNS,
        fetchAndProcess,
        handleFilterSiteChanged,
    };
}

/**
 * Fetches and transforms pipe drawing data.
 */
function usePipeData(
    getDataDrawingPipeRefetch: ReturnType<
        typeof useGetDataDrawingPipeQuery
    >['refetch'],
) {
    const [polylines, setPolylines] = useState<PipeLine[]>([]);
    const [groupPipe, setGroupPipe] = useState<GroupPipeItem[]>([]);

    const fetchAndProcess = useCallback(() => {
        getDataDrawingPipeRefetch()
            .then(({ data }) => {
                const raw = data?.GetDataDrawingPipe;
                if (!raw) return;

                const lines: PipeLine[] = [];
                const groups: GroupPipeItem[] = [];

                for (const item of raw) {
                    //@ts-ignore
                    groups.push({ IsHide: true, ...(item as GroupPipeItem) });

                    for (const pipe of (item as GroupPipeItem).Pipes) {
                        for (const line of pipe.Lines) {
                            lines.push({
                                ...line,
                                Weight: getPipeWeight(pipe.Size),
                                Content: buildPipeContent(
                                    //@ts-ignore
                                    item.GroupPipeId,
                                    //@ts-ignore
                                    item.GroupPipeName,
                                    pipe.PipeId,
                                    pipe.PipeName,
                                    pipe.Length,
                                    pipe.Size,
                                    pipe.BaseMax,
                                    pipe.BaseMin,
                                ),
                            });
                        }
                    }
                }

                setPolylines(lines);
                setGroupPipe(groups);
            })
            .catch(console.error);
    }, [getDataDrawingPipeRefetch]);

    return { polylines, groupPipe, setGroupPipe, fetchAndProcess };
}

// ---------------------------------------------------------------------------
// SetMap — sub-component, must live inside MapContainer
// ---------------------------------------------------------------------------

interface SetMapProps {
    mapRef: React.MutableRefObject<L.Map | null>;
    onZoomChange: (zoom: number) => void;
}

const SetMap = React.memo(({ mapRef, onZoomChange }: SetMapProps) => {
    const map = useMap();

    // Sync the ref so the parent can call map methods imperatively
    useEffect(() => {
        mapRef.current = map;
    }, [map, mapRef]);

    const handleZoomEnd = useCallback(() => {
        const zoom = map.getZoom();

        map.eachLayer(
            (
                layer: L.Layer & {
                    _tooltip?: { _container: HTMLElement };
                    openTooltip?: () => void;
                    closeTooltip?: () => void;
                },
            ) => {
                if (!layer._tooltip) return;

                if (zoom >= TOOLTIP_ZOOM_THRESHOLD) {
                    layer.openTooltip?.();
                    layer._tooltip._container.style.opacity = '1';
                } else {
                    layer.closeTooltip?.();
                    layer._tooltip._container.style.opacity = '0';
                }
            },
        );

        onZoomChange(zoom);
    }, [map, onZoomChange]);

    useMapEvents({ zoomend: handleZoomEnd });

    return null;
});

SetMap.displayName = 'SetMap';

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const MapPage = () => {
    // Map instance kept in a ref — never triggers re-renders
    const mapRef = useRef<L.Map | null>(null);

    // Panel visibility
    const { panels, toggle, close } = usePanelState();

    // Zoom level (used by MarkerMap for clustering decisions)
    const [zoomMap, setZoomMap] = useState<number | null>(null);

    // Modal state
    const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
    const [currentSite, setCurrentSite] = useState<Site | null>(null);
    const [modal, setModal] = useState(false);
    const [modalChartLostWater, setModalChartLostWater] = useState(false);
    const [modalChartSite, setModalChartSite] = useState(false);
    const [lostWaterMode, setLostWaterMode] = useState<'NS' | 'NT' | ''>('');

    // UI preferences
    const [whiteBackground, setWhiteBackground] = useState(false);
    const [showRegion, setShowRegion] = useState(true);
    const [alwaysOpenCurrentDataTable, setAlwaysOpenCurrentDataTable] =
        useState(() => localStorage.getItem(STORAGE_KEY_OPEN_TABLE) === 'true');

    // GraphQL
    const { refetch: getSiteAndChannelRefetch } = useGetSiteAndChannelQuery();
    const { refetch: getDataDrawingPipeRefetch } = useGetDataDrawingPipeQuery();

    // Custom hooks
    const {
        sites,
        tableData,
        filterSite,
        filterSiteNS,
        fetchAndProcess: fetchSites,
        handleFilterSiteChanged,
    } = useSiteData(getSiteAndChannelRefetch);

    const {
        polylines,
        groupPipe,
        setGroupPipe,
        fetchAndProcess: fetchPipes,
    } = usePipeData(getDataDrawingPipeRefetch);

    // ---------------------------------------------------------------------------
    // Data loading
    // ---------------------------------------------------------------------------

    useEffect(() => {
        fetchSites();
        fetchPipes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSites();
            fetchPipes();
        }, REFRESH_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [fetchSites, fetchPipes]);

    // ---------------------------------------------------------------------------
    // Stable callbacks
    // ---------------------------------------------------------------------------

    const handleZoomChange = useMemo(
        () => debounce((zoom: number) => setZoomMap(zoom), 1000),
        [],
    );

    // Clean up the debounce on unmount
    useEffect(() => () => handleZoomChange.cancel(), [handleZoomChange]);

    const openChartModal = useCallback((channel: Channel) => {
        setCurrentChannel(channel);
        setModal(true);
    }, []);

    const openChartSiteModal = useCallback((site: Site) => {
        setCurrentSite(site);
        setModalChartSite(true);
    }, []);

    const onSiteTreeClicked = useCallback(
        (siteId: string) => {
            const found = sites.find((s) => s.SiteId === siteId);
            if (!found || !mapRef.current) return;

            mapRef.current.eachLayer(
                (
                    layer: L.Layer & {
                        _latlng?: L.LatLng;
                        fire?: (event: string) => void;
                    },
                ) => {
                    if (
                        layer._latlng?.lat === found.Latitude &&
                        layer._latlng?.lng === found.Longitude
                    ) {
                        layer.fire?.('click');
                        mapRef.current?.flyTo(layer._latlng, 18);
                    }
                },
            );
        },
        [sites],
    );

    const onGroupPipeChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, groupPipeId: string) => {
            setGroupPipe((prev) => {
                const updated = [...prev];
                const idx = updated.findIndex(
                    (g) => g.GroupPipeId === groupPipeId,
                );
                if (idx === -1) return prev;

                updated[idx] = { ...updated[idx], IsHide: e.target.checked };

                if (!mapRef.current) return updated;

                // Toggle layer visibility imperatively
                for (const pipe of updated[idx].Pipes) {
                    for (const line of pipe.Lines) {
                        mapRef.current.eachLayer(
                            (
                                layer: L.Layer & {
                                    _latlngs?: L.LatLng[];
                                    _latlng?: L.LatLng;
                                    _path?: HTMLElement;
                                    _icon?: HTMLElement;
                                    closePopup?: () => void;
                                    closeTooltip?: () => void;
                                },
                            ) => {
                                const show = e.target.checked;
                                const ll = line.Lines;

                                // Polyline layers
                                if (
                                    layer._latlngs?.length &&
                                    ll[0][0] === layer._latlngs[0].lat &&
                                    ll[0][1] === layer._latlngs[0].lng &&
                                    ll[1][0] === layer._latlngs[1].lat &&
                                    ll[1][1] === layer._latlngs[1].lng
                                ) {
                                    if (layer._path) {
                                        layer._path.style.display = show
                                            ? ''
                                            : 'none';
                                        if (!show) {
                                            layer.closePopup?.();
                                            layer.closeTooltip?.();
                                        }
                                    }
                                }

                                // Marker layers at line endpoints
                                if (
                                    layer._latlng &&
                                    ((layer._latlng.lat === ll[0][0] &&
                                        layer._latlng.lng === ll[0][1]) ||
                                        (layer._latlng.lat === ll[1][0] &&
                                            layer._latlng.lng === ll[1][1]))
                                ) {
                                    if (layer._icon) {
                                        layer._icon.style.display = show
                                            ? ''
                                            : 'none';
                                        if (!show) {
                                            layer.closePopup?.();
                                            layer.closeTooltip?.();
                                        }
                                    }
                                }
                            },
                        );
                    }
                }

                return updated;
            });
        },
        [],
    );

    const onAlwaysShowCurrentDataTable = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            localStorage.setItem(
                STORAGE_KEY_OPEN_TABLE,
                String(e.target.checked),
            );
            setAlwaysOpenCurrentDataTable(e.target.checked);
        },
        [],
    );

    const onWhiteBackgroundChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setWhiteBackground(e.target.checked);
        },
        [],
    );

    const onShowRegionChanged = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setShowRegion(e.target.checked);
        },
        [],
    );

    // Pre-bound panel handlers — stable references, no inline arrow functions in JSX
    const toggleAlarm = useCallback(() => toggle('alarm'), [toggle]);
    const toggleLostWater = useCallback(() => toggle('lostWater'), [toggle]);
    const toggleFilterSite = useCallback(() => toggle('filterSite'), [toggle]);
    const toggleFilterGroupPipe = useCallback(
        () => toggle('filterGroupPipe'),
        [toggle],
    );
    const toggleLegend = useCallback(() => toggle('legend'), [toggle]);
    const toggleTableCurrentData = useCallback(
        () => toggle('tableCurrentData'),
        [toggle],
    );
    const toggleTableCurrentPressure = useCallback(
        () => toggle('tableCurrentPressure'),
        [toggle],
    );
    const closeAlarm = useCallback(() => close('alarm'), [close]);
    const closeLostWater = useCallback(() => close('lostWater'), [close]);
    const closeFilterSite = useCallback(() => close('filterSite'), [close]);
    const closeFilterGroupPipe = useCallback(
        () => close('filterGroupPipe'),
        [close],
    );
    const closeTableCurrentData = useCallback(
        () => close('tableCurrentData'),
        [close],
    );
    const closeTableCurrentPressure = useCallback(
        () => close('tableCurrentPressure'),
        [close],
    );

    const closeModal = useCallback(() => setModal(false), []);
    const closeModalChartSite = useCallback(() => setModalChartSite(false), []);
    const closeModalChartLostWater = useCallback(
        () => setModalChartLostWater(false),
        [],
    );

    const onChartLostWaterNSClicked = useCallback(() => {
        setLostWaterMode('NS');
        setModalChartLostWater(true);
    }, []);

    const onChartLostWaterNTClicked = useCallback(() => {
        setLostWaterMode('NT');
        setModalChartLostWater(true);
    }, []);

    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <MapContainerComponent>
                        <SetMap
                            mapRef={mapRef}
                            onZoomChange={handleZoomChange}
                        />

                        {/* Base satellite layer */}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            maxNativeZoom={18}
                            maxZoom={30}
                        />

                        {/* Optional street-map overlay */}
                        <LayersControl position="topright">
                            <LayersControl.Overlay name="bản đồ giao thông">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    maxNativeZoom={18}
                                    maxZoom={30}
                                />
                            </LayersControl.Overlay>
                        </LayersControl>

                        <ShapeMap showRegion={showRegion} />

                        <MarkerMap
                            //@ts-ignore
                            sites={sites}
                            onpenChartModalClick={openChartModal}
                            //@ts-ignore
                            openModalChartSiteClick={openChartSiteModal}
                            zoom={zoomMap}
                        />

                        <PolyLineMap polylines={polylines} />

                        <ButtonMap
                            onAlarmTableClicked={toggleAlarm}
                            onLostWaterClicked={toggleLostWater}
                            onSearchSiteClicked={toggleFilterSite}
                            onFilterGroupPipeClicked={toggleFilterGroupPipe}
                            onLegendHideClicked={toggleLegend}
                            onTableCurrentDataClicked={toggleTableCurrentData}
                            onTableCurrentPressureClicked={
                                toggleTableCurrentPressure
                            }
                            openAlarm={panels.alarm}
                            openLostWater={panels.lostWater}
                            openFilterSite={panels.filterSite}
                            openFilterGroupPipe={panels.filterGroupPipe}
                            openLegend={panels.legend}
                            openTableCurrentData={panels.tableCurrentData}
                            openTableCurrentPressureData={
                                panels.tableCurrentPressure
                            }
                        />

                        <TableAlarmMap
                            openAlarm={panels.alarm}
                            //@ts-ignore
                            data={tableData}
                            onTableAlarmCloseClicked={closeAlarm}
                        />

                        <LegendMap openLegend={panels.legend} />

                        <LostWaterMap
                            openLostWater={panels.lostWater}
                            onLostWaterCloseClicked={closeLostWater}
                            onChartLostWaterNSClicked={
                                onChartLostWaterNSClicked
                            }
                            onChartLostWaterNTClicked={
                                onChartLostWaterNTClicked
                            }
                        />

                        <SearchSiteMap
                            openFilterSite={panels.filterSite}
                            filterSite={filterSite}
                            filterSiteNS={filterSiteNS}
                            handleFilterSiteChanged={handleFilterSiteChanged}
                            onSiteTreeClicked={onSiteTreeClicked}
                            onSearhSiteCloseClicked={closeFilterSite}
                        />

                        <FilterGroupPipeMap
                            groupPipe={groupPipe}
                            openFilterGroupPipe={panels.filterGroupPipe}
                            onGroupPipeChanged={onGroupPipeChanged}
                            onFilterGroupPipeCloseClicked={closeFilterGroupPipe}
                            whiteBackgroundCurrentDataTable={whiteBackground}
                            showRegion={showRegion}
                            onWhiteBackgroundCurrentDataTableChanged={
                                onWhiteBackgroundChanged
                            }
                            onShowRegionChanged={onShowRegionChanged}
                            alwaysOpenCurrentDataTable={
                                alwaysOpenCurrentDataTable
                            }
                            onAlwaysShowCurrentDataTable={
                                onAlwaysShowCurrentDataTable
                            }
                        />

                        <TableCurrentDataMap
                            openTableCurrentData={panels.tableCurrentData}
                            onTabelCurrentDataCloseClicked={
                                closeTableCurrentData
                            }
                            whiteBackgroundCurrentDataTable={whiteBackground}
                        />

                        <TableCurrentPressureDataMap
                            openTableCurrentPressureData={
                                panels.tableCurrentPressure
                            }
                            onTableCurrentPressureDataCloseClicked={
                                closeTableCurrentPressure
                            }
                        />
                    </MapContainerComponent>
                </Grid.Col>
            </Grid>

            {/* ----------------------------------------------------------------
                Modals — rendered outside the map container to avoid z-index
                conflicts with Leaflet layers.
            ---------------------------------------------------------------- */}

            {/* Channel chart modal */}
            <Modal isOpen={modal} toggle={closeModal} centered size="xl">
                <ModalHeader toggle={closeModal}>
                    Biểu đồ {currentSite?.Location}
                </ModalHeader>
                <ModalBody>
                    {currentChannel && (
                        <ChartModalECharts
                            channelid={currentChannel.ChannelId}
                            channelname={currentChannel.ChannelName}
                            unit={currentChannel.Unit}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={closeModal}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Site chart modal */}
            <Modal
                isOpen={modalChartSite}
                toggle={closeModalChartSite}
                centered
                size="xl"
            >
                <ModalHeader toggle={closeModalChartSite}>
                    Biểu đồ {currentSite?.Location}
                </ModalHeader>
                <ModalBody>
                    {currentSite && (
                        <ChartSiteModalECharts
                            siteid={currentSite.SiteId}
                            loggerid={currentSite.LoggerId}
                            location={currentSite.Location}
                            pipeid={currentSite.PipeId}
                            pipename={currentSite.PipeName}
                            sizepipe={currentSite.SizePipe}
                            lengthpipe={currentSite.LengthPipe}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={closeModalChartSite}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Lost-water chart modal */}
            <Modal
                isOpen={modalChartLostWater}
                toggle={closeModalChartLostWater}
                centered
                size="lg"
            >
                <ModalHeader toggle={closeModalChartLostWater}>
                    Biểu đồ dữ liệu
                </ModalHeader>
                <ModalBody>
                    <ChartLostWater lostWaterMode={lostWaterMode} />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={closeModalChartLostWater}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </motion.div>
    );
};

export default MapPage;
