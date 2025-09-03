import { motion } from 'framer-motion';

import { Grid } from '@mantine/core';

import { TileLayer, useMap, useMapEvents, LayersControl } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import React, { useState, useEffect } from 'react';

import {
    useGetDataDrawingPipeQuery,
    useGetSiteAndChannelQuery,
} from '../__generated__/graphql';

import uuid from 'react-uuid';

//@ts-ignore
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

const LegendMapMemo = React.memo(LegendMap);
const TableAlarmMapMemo = React.memo(TableAlarmMap);
const LostWaterMapMemo = React.memo(LostWaterMap);
const SearchSiteMapMemo = React.memo(SearchSiteMap);
const FilterGroupPipeMemo = React.memo(FilterGroupPipeMap);
const ButtonMapMemo = React.memo(ButtonMap);
const PolyLineMapMemo = React.memo(PolyLineMap);
const MarkerMapMemo = React.memo(MarkerMap);
const ShapeMapMemo = React.memo(ShapeMap);
const MapContainerComponentMemo = React.memo(MapContainerComponent);
const TableCurrentDataMapMemo = React.memo(TableCurrentDataMap);
const TableCurrentPressureDataMapMemp = React.memo(TableCurrentPressureDataMap);

const MapPage = () => {
    const [polylines, setPolylines] = useState([]);
    const [sites, setSites] = useState([]);
    const [filterSite, setFilterSite] = useState([]);
    const [filterSiteNS, setFilterSiteNS] = useState([]);
    const [originFilterSite, setOriginFilterSite] = useState([]);
    const [originFilterSiteNS, setOriginFilterSiteNS] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [currentSite, setCurrentSite] = useState(null);
    const [groupPipe, setGroupPipe] = useState([]);
    const [zoomMap, setZoomMap] = useState(null);

    const [modal, setModal] = useState(false);
    const [modalChartLostWater, setModalChartLostWater] = useState(false);
    const [modalChartSite, setModalChartSite] = useState(false);
    const [openAlarm, setOpenAlarm] = useState(false);
    const [openLostWater, setOpenLostWater] = useState(false);
    const [openFilterSite, setOpenFilterSite] = useState(false);
    const [openFilterGroupPipe, setOpenFilterGroupPipe] = useState(false);
    const [openLegend, setOpenLegend] = useState(true);
    const [openTableCurrentData, setOpenTableCurrentData] = useState(
        localStorage.getItem('openCurrentTableData') === 'true' ? true : false,
    );
    const [lostWaterMode, setLostWaterMode] = useState('');
    const [openTableCurrentPressureData, setOpenTableCurrentPressureData] =
        useState(false);
    // const [showLabel, setShowLabel] = useState(false);

    //const [detectIOS, setDetectIOS] = useState(false);

    const [whiteBackgroundCurrentDataTable, setWhiteBackgroudCurrentDataTable] =
        useState(false);
    const [alwaysOpenCurrentDataTable, setAlwaysOpenCurrentDataTable] =
        useState(
            localStorage.getItem('openCurrentTableData') === 'true'
                ? true
                : false,
        );

    const [showRegion, setShowRegion] = useState(true);

    const [data, setData] = useState([]);

    const { refetch: getDataDrawingPipeRefetch } = useGetDataDrawingPipeQuery();
    const { refetch: getSiteAndChannelRefetch } = useGetSiteAndChannelQuery();

    //@ts-ignore
    let map = null;

    const toggle = () => setModal(!modal);
    const toggleChartLostWater = () => {
        setModalChartLostWater(!modalChartLostWater);
    };
    const toggleChartSite = () => {
        setModalChartSite(!modalChartSite);
    };

    const getDataSiteAndChannel = () => {
        getSiteAndChannelRefetch()
            .then((res) => {
                if (res?.data?.GetSiteAndChannel) {
                    //@ts-ignore
                    setSites([...res.data.GetSiteAndChannel]);

                    const temp = [];

                    let count = 1;
                    for (const item of res.data.GetSiteAndChannel) {
                        if (item.StatusError !== 1) {
                            const obj = {
                                ...item,
                                STT: count++,
                            };

                            temp.push(obj);
                        }
                    }

                    //@ts-ignore
                    setData([...temp]);
                }
            })
            .catch((err) => console.log(err));
    };

    const getFilterSite = () => {
        getSiteAndChannelRefetch()
            .then((res) => {
                if (res?.data?.GetSiteAndChannel) {
                    const tempFilterSite = [];
                    const tempFilterSiteNS = [];

                    for (const item of res.data.GetSiteAndChannel) {
                        const objFilterSite = {
                            label: `${item.Location}`,
                            value: item.SiteId,
                            children: [],
                        };

                        //@ts-ignore
                        if (item.Channels?.length > 0) {
                            //@ts-ignore
                            for (const channel of item.Channels) {
                                const objChannel = {
                                    //@ts-ignore
                                    label: `${channel.ChannelId}_${channel.ChannelName}`,
                                    //@ts-ignore
                                    value: channel.ChannelId,
                                };
                                // @ts-ignore
                                objFilterSite.children.push(objChannel);
                            }
                        }
                        if (item.DisplayGroup === 'DHNT') {
                            tempFilterSite.push(objFilterSite);
                        } else {
                            tempFilterSiteNS.push(objFilterSite);
                        }
                    }
                    //@ts-ignore
                    setFilterSite([...tempFilterSite]);
                    //@ts-ignore
                    setFilterSiteNS([...tempFilterSiteNS]);
                    //@ts-ignore
                    setOriginFilterSite([...tempFilterSite]);
                    //@ts-ignore
                    setOriginFilterSiteNS([...tempFilterSiteNS]);
                }
            })
            .catch((err) => console.log(err));
    };

    const getDataDrawingPipe = () => {
        getDataDrawingPipeRefetch()
            .then((res) => {
                if (res?.data?.GetDataDrawingPipe) {
                    const temp = [];
                    for (const item of res.data.GetDataDrawingPipe) {
                        //@ts-ignore
                        for (const pipe of item.Pipes) {
                            //@ts-ignore
                            for (const line of pipe.Lines) {
                                const content = [
                                    <p key={uuid()}>
                                        <span>Mã nhóm tuyến ống: </span>
                                        <b> {item?.GroupPipeId}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Tên nhóm tuyến ống: </span>
                                        <b> {item?.GroupPipeName}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Mã tuyến ống: </span>
                                        <b> {pipe?.PipeId}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Tên tuyến ống: </span>
                                        <b> {pipe?.PipeName}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Chiều dài ống: </span>
                                        <b> {pipe?.Length}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Kích thước ống: </span>
                                        <b> {pipe?.Size}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Ngưỡng trên: </span>
                                        <b>{pipe?.BaseMax}</b>
                                    </p>,
                                    <p key={uuid()}>
                                        <span>Ngưỡng dưới: </span>
                                        <b> {pipe?.BaseMin}</b>
                                    </p>,
                                ];

                                const obj = {
                                    ...line,
                                    Weight:
                                        //@ts-ignore
                                        pipe?.Size <= 100
                                            ? 1
                                            : //@ts-ignore
                                            pipe?.Size <= 200
                                            ? 2
                                            : //@ts-ignore
                                            pipe?.Size <= 400
                                            ? 3
                                            : 4,
                                    Content: content,
                                };

                                temp.push(obj);
                            }
                        }
                    }
                    //@ts-ignore
                    setPolylines([...temp]);
                }
            })
            .catch((err) => console.log(err));
    };

    const getGroupPipe = () => {
        getDataDrawingPipeRefetch()
            .then((res) => {
                if (res?.data?.GetDataDrawingPipe) {
                    const temp = [];

                    for (const item of res.data.GetDataDrawingPipe) {
                        const obj = {
                            IsHide: true,
                            ...item,
                        };

                        temp.push(obj);
                    }
                    //@ts-ignore
                    setGroupPipe([...temp]);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleSearchDebounce = debounce(async (value: any) => {
        let filter = [];
        let filterNS = [];

        if (value === '') {
            filter = [...originFilterSite];
            filterNS = [...originFilterSiteNS];
        } else {
            filter = originFilterSite.filter(
                (el) =>
                    //@ts-ignore
                    el.label.toLowerCase().indexOf(value.toLowerCase()) !== -1,
            );
            filterNS = originFilterSiteNS.filter(
                (el) =>
                    //@ts-ignore
                    el.label.toLowerCase().indexOf(value.toLowerCase()) !== -1,
            );
        }
        setFilterSite([...filter]);
        setFilterSiteNS([...filterNS]);
    }, 1000);

    const handleFilterSiteChanged = (e: any) => {
        handleSearchDebounce(e.target.value);
    };

    // //detect ios device
    // const iOS = () => {
    //     return (
    //         [
    //             'iPad Simulator',
    //             'iPhone Simulator',
    //             'iPod Simulator',
    //             'iPad',
    //             'iPhone',
    //             'iPod',
    //         ].includes(navigator.platform) ||
    //         // iPad on iOS 13 detection
    //         (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    //     );
    // };

    useEffect(() => {
        getDataDrawingPipe();
        getDataSiteAndChannel();
        getFilterSite();
        getGroupPipe();
        //setDetectIOS(iOS());

        if (
            localStorage.getItem('openCurrentTableData') === undefined ||
            localStorage.getItem('openCurrentTableData') === null
        ) {
            localStorage.setItem('openCurrentTableData', 'true');
        }
    }, []);

    //set resize for leaflet map
    setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
    }, 0);

    useEffect(() => {
        const interval = setInterval(() => {
            getDataDrawingPipe();
            getDataSiteAndChannel();
        }, 1000 * 60 * 5);
        return () => clearInterval(interval);
    }, []);

    const onpenChartModalClick = (channel: any) => {
        setCurrentChannel(channel);
        setModal(true);
    };

    const openModalChartSiteClick = (site: any) => {
        setCurrentSite(site);
        setModalChartSite(true);
    };

    const onSiteTreeClicked = (e: any) => {
        //@ts-ignore
        const find = sites.find((el) => el.SiteId === e);
        if (find !== undefined) {
            //@ts-ignore
            map.eachLayer((layer) => {
                //@ts-ignore
                if (layer._latlng !== undefined) {
                    if (
                        //@ts-ignore
                        layer._latlng.lat == find.Latitude &&
                        //@ts-ignore
                        layer._latlng.lng == find.Longitude
                    ) {
                        layer.fire('click');
                        //@ts-ignore
                        map.flyTo(layer._latlng, 18);
                    }
                }
            });
        }
    };

    const openTableAlarmClicked = () => {
        setOpenAlarm(!openAlarm);
    };

    const onTableAlarmCloseClicked = () => {
        setOpenAlarm(false);
    };

    const openSearchSiteClicked = () => {
        setOpenFilterSite(!openFilterSite);
    };

    const onSearhSiteCloseClicked = () => {
        setOpenFilterSite(false);
    };

    const openLostWaterClicked = () => {
        setOpenLostWater(!openLostWater);
    };

    const onLostWaterCloseClicked = () => {
        setOpenLostWater(false);
    };

    const openFilterGroupPipeClicked = () => {
        setOpenFilterGroupPipe(!openFilterGroupPipe);
    };

    const onFilterGroupPipeCloseClicked = () => {
        setOpenFilterGroupPipe(false);
    };

    const onLegendHideClicked = () => {
        setOpenLegend(!openLegend);
    };

    const onTabelCurrentDataCloseClicked = () => {
        setOpenTableCurrentData(false);
    };

    const onTableCurrentDataClicked = () => {
        setOpenTableCurrentData(!openTableCurrentData);
    };

    const onGroupPipeChanged = (e: any, groupPipeId: string) => {
        const index = groupPipe.findIndex(
            //@ts-ignore
            (el) => el.GroupPipeId === groupPipeId,
        );

        if (groupPipe[index] !== undefined) {
            //@ts-ignore
            groupPipe[index].IsHide = e.target.checked;
            //@ts-ignore
            for (const pipe of groupPipe[index].Pipes) {
                //@ts-ignore
                for (const line of pipe.Lines) {
                    //@ts-ignore
                    map.eachLayer((layer) => {
                        if (
                            layer._latlngs !== undefined &&
                            layer._latlngs.length > 0
                        ) {
                            if (
                                line.Lines[0][0] === layer._latlngs[0].lat &&
                                line.Lines[0][1] === layer._latlngs[0].lng &&
                                line.Lines[1][0] === layer._latlngs[1].lat &&
                                line.Lines[1][1] === layer._latlngs[1].lng
                            ) {
                                if (layer._path !== undefined) {
                                    if (e.target.checked === false) {
                                        layer._path.style.display = 'none';
                                        layer.closePopup();
                                        layer.closeTooltip();
                                    } else {
                                        layer._path.style.display = '';
                                    }
                                }
                            }
                        }
                        if (layer._latlng !== undefined) {
                            if (
                                (layer._latlng.lat === line.Lines[0][0] &&
                                    layer._latlng.lng === line.Lines[0][1]) ||
                                (layer._latlng.lat === line.Lines[1][0] &&
                                    layer._latlng.lng === line.Lines[1][1])
                            ) {
                                if (layer._icon !== undefined) {
                                    if (e.target.checked === false) {
                                        layer._icon.style.display = 'none';
                                        layer.closePopup();
                                        layer.closeTooltip();
                                    } else {
                                        layer._icon.style.display = '';
                                    }
                                }
                            }
                        }
                    });
                }
            }

            setGroupPipe([...groupPipe]);
        }
    };

    // const onShowSiteLabel = (e: any) => {
    //     //@ts-ignore
    //     setShowLabel(e.target.checked);
    //     //@ts-ignore
    //     map.eachLayer((layer) => {
    //         if (layer._latlng !== undefined) {
    //             if (e.target.checked === true) {
    //                 layer.openTooltip();
    //             } else {
    //                 layer.closeTooltip();
    //             }
    //         }
    //     });
    // };

    const onAlwaysShowCurrentDataTable = (e: any) => {
        localStorage.setItem(
            'openCurrentTableData',
            e.target.checked.toString(),
        );

        setAlwaysOpenCurrentDataTable(e.target.checked);
    };

    const onWhiteBackgroundCurrentDataTableChanged = (e: any) => {
        setWhiteBackgroudCurrentDataTable(e.target.checked);
    };

    const onShowRegionChanged = (e: any) => {
        setShowRegion(e.target.checked);
    };

    const onChartLostWaterNSClicked = () => {
        setLostWaterMode('NS');
        setModalChartLostWater(true);
    };

    const onChartLostWaterNTClicked = () => {
        setLostWaterMode('NT');
        setModalChartLostWater(true);
    };

    const onTableCurrentPressureClicked = () => {
        setOpenTableCurrentPressureData(!openTableCurrentPressureData);
    };

    const onTableCurrentPressureDataCloseClicked = () => {
        setOpenTableCurrentPressureData(false);
    };

    const handelSetZoomMap = debounce((zoom: any) => {
        setZoomMap(zoom);
    }, 1000);

    const SetMap = () => {
        map = useMap();

        useMapEvents({
            zoomend: () => {
                //@ts-ignore
                if (map.getZoom() >= 14) {
                    //@ts-ignore
                    map.eachLayer((layer: any) => {
                        if (layer._tooltip !== undefined) {
                            layer.openTooltip();
                            layer._tooltip._container.style.opacity = '1';
                        }
                    });
                } else {
                    //@ts-ignore
                    map.eachLayer((layer: any) => {
                        if (layer._tooltip !== undefined) {
                            layer.closeTooltip();
                            layer._tooltip._container.style.opacity = '0';
                        }
                    });
                }
                //@ts-ignore
                handelSetZoomMap(map.getZoom());
            },
        });
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <MapContainerComponentMemo
                    /*detectIOS={detectIOS}*/
                    >
                        <SetMap />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            maxNativeZoom={18}
                            maxZoom={30}
                        />
                        <LayersControl position="topright">
                            <>
                                <LayersControl.Overlay name="bản đồ giao thông">
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        maxNativeZoom={18}
                                        maxZoom={30}
                                    />
                                </LayersControl.Overlay>
                            </>
                        </LayersControl>
                        {/* Shape Map */}
                        <ShapeMapMemo showRegion={showRegion} />
                        {/* Marker Map */}
                        <MarkerMapMemo
                            sites={sites}
                            onpenChartModalClick={onpenChartModalClick}
                            openModalChartSiteClick={openModalChartSiteClick}
                            zoom={zoomMap}
                        />

                        {/* Polyline Map */}
                        <PolyLineMapMemo polylines={polylines} />
                        {/* Button Map */}
                        <ButtonMapMemo
                            onAlarmTableClicked={openTableAlarmClicked}
                            onLostWaterClicked={openLostWaterClicked}
                            onSearchSiteClicked={openSearchSiteClicked}
                            onFilterGroupPipeClicked={
                                openFilterGroupPipeClicked
                            }
                            onLegendHideClicked={onLegendHideClicked}
                            onTableCurrentDataClicked={
                                onTableCurrentDataClicked
                            }
                            onTableCurrentPressureClicked={
                                onTableCurrentPressureClicked
                            }
                            openAlarm={openAlarm}
                            openLostWater={openLostWater}
                            openFilterSite={openFilterSite}
                            openFilterGroupPipe={openFilterGroupPipe}
                            openLegend={openLegend}
                            openTableCurrentData={openTableCurrentData}
                            openTableCurrentPressureData={
                                openTableCurrentPressureData
                            }
                        />
                        {/* Table Alarm */}
                        <TableAlarmMapMemo
                            openAlarm={openAlarm}
                            data={data}
                            onTableAlarmCloseClicked={onTableAlarmCloseClicked}
                        />
                        {/* Legend  */}
                        <LegendMapMemo openLegend={openLegend} />
                        {/* Lost Water */}
                        <LostWaterMapMemo
                            openLostWater={openLostWater}
                            onLostWaterCloseClicked={onLostWaterCloseClicked}
                            onChartLostWaterNSClicked={
                                onChartLostWaterNSClicked
                            }
                            onChartLostWaterNTClicked={
                                onChartLostWaterNTClicked
                            }
                        />
                        {/* Search Site */}
                        <SearchSiteMapMemo
                            openFilterSite={openFilterSite}
                            filterSite={filterSite}
                            filterSiteNS={filterSiteNS}
                            handleFilterSiteChanged={handleFilterSiteChanged}
                            onSiteTreeClicked={onSiteTreeClicked}
                            onSearhSiteCloseClicked={onSearhSiteCloseClicked}
                        />
                        {/* Filter Group Pipe */}
                        <FilterGroupPipeMemo
                            groupPipe={groupPipe}
                            openFilterGroupPipe={openFilterGroupPipe}
                            onGroupPipeChanged={onGroupPipeChanged}
                            // showLabel={showLabel}
                            // onShowSiteLabel={onShowSiteLabel}
                            onFilterGroupPipeCloseClicked={
                                onFilterGroupPipeCloseClicked
                            }
                            whiteBackgroundCurrentDataTable={
                                whiteBackgroundCurrentDataTable
                            }
                            showRegion={showRegion}
                            onWhiteBackgroundCurrentDataTableChanged={
                                onWhiteBackgroundCurrentDataTableChanged
                            }
                            onShowRegionChanged={onShowRegionChanged}
                            alwaysOpenCurrentDataTable={
                                alwaysOpenCurrentDataTable
                            }
                            onAlwaysShowCurrentDataTable={
                                onAlwaysShowCurrentDataTable
                            }
                        />

                        {/* Table Current Data  */}
                        <TableCurrentDataMapMemo
                            openTableCurrentData={openTableCurrentData}
                            onTabelCurrentDataCloseClicked={
                                onTabelCurrentDataCloseClicked
                            }
                            whiteBackgroundCurrentDataTable={
                                whiteBackgroundCurrentDataTable
                            }
                        />
                        {/* Table current pressure data  */}
                        <TableCurrentPressureDataMapMemp
                            openTableCurrentPressureData={
                                openTableCurrentPressureData
                            }
                            onTableCurrentPressureDataCloseClicked={
                                onTableCurrentPressureDataCloseClicked
                            }
                        ></TableCurrentPressureDataMapMemp>
                    </MapContainerComponentMemo>
                </Grid.Col>
                <div>
                    <Modal
                        isOpen={modal}
                        toggle={toggle}
                        centered={true}
                        size="xl"
                    >
                        <ModalHeader toggle={toggle}>
                            {/* @ts-ignore */}
                            Biểu đồ {currentSite?.Location}
                        </ModalHeader>
                        <ModalBody>
                            {currentChannel !== null ? (
                                <ChartModal
                                    //@ts-ignore
                                    channelid={currentChannel?.ChannelId}
                                    //@ts-ignore
                                    channelname={currentChannel?.ChannelName}
                                    //@ts-ignore
                                    unit={currentChannel?.Unit}
                                ></ChartModal>
                            ) : null}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggle}>
                                Đóng
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={modalChartSite}
                        toggle={toggleChartSite}
                        centered={true}
                        size="xl"
                    >
                        <ModalHeader toggle={toggleChartSite}>
                            {/* @ts-ignore */}
                            Biểu đồ {currentSite?.Location}
                        </ModalHeader>
                        <ModalBody>
                            {currentSite !== null ? (
                                <ChartSiteModal
                                    //@ts-ignore
                                    siteid={currentSite.SiteId}
                                    //@ts-ignore
                                    loggerid={currentSite.LoggerId}
                                    //@ts-ignore
                                    location={currentSite.Location}
                                    //@ts-ignore
                                    pipeid={currentSite.PipeId}
                                    //@ts-ignore
                                    pipename={currentSite.PipeName}
                                    //@ts-ignore
                                    sizepipe={currentSite.SizePipe}
                                    //@ts-ignore
                                    lengthpipe={currentSite.LengthPipe}
                                ></ChartSiteModal>
                            ) : null}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={toggleChartSite}>
                                Đóng
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div>
                    <Modal
                        isOpen={modalChartLostWater}
                        toggle={toggleChartLostWater}
                        centered={true}
                        size="lg"
                    >
                        <ModalHeader toggle={toggleChartLostWater}>
                            Biểu đồ dữ liệu
                        </ModalHeader>
                        <ModalBody>
                            <ChartLostWater
                                lostWaterMode={lostWaterMode}
                            ></ChartLostWater>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                onClick={toggleChartLostWater}
                            >
                                Đóng
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Grid>
        </motion.div>
    );
};

export default MapPage;
