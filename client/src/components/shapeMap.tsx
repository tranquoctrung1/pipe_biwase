import { LayerGroup, Rectangle, Tooltip } from 'react-leaflet';

import { Text } from '@mantine/core';

const ShapeMap = ({ showRegion }: any) => {
    const buildingLocation = [
        [10.545718, 106.348845],
        [10.546051, 106.349626],
        [10.545181, 106.350063],
        [10.544759, 106.349388],
    ];

    const waterCompanyLocation = [
        [10.602041, 106.437985],
        [10.601956, 106.438998],
        [10.600488, 106.438956],
        [10.600482, 106.438054],
    ];

    const ChoDaoRoundabout = [
        [10.558325, 106.591907],
        [10.559302, 106.603759],
        [10.54968, 106.604983],
        [10.548928, 106.592519],
    ];

    const ChoTramRoundabout = [
        [10.559931, 106.625956],
        [10.559756, 106.635522],
        [10.55352, 106.626381],
        [10.553205, 106.632456],
    ];

    const RachChanhBridge = [
        [10.617053, 106.4846],
        [10.616976, 106.488663],
        [10.613136, 106.488663],
        [10.613673, 106.484443],
    ];

    const MyYenRoundabout = [
        [10.650214, 106.544834],
        [10.650721, 106.547908],
        [10.648568, 106.548155],
        [10.648376, 106.546412],
    ];

    const LongSonRoundabout = [
        [10.568225, 106.542066],
        [10.568386, 106.545388],
        [10.565923, 106.545933],
        10.565388,
        106.54321,
    ];

    const UBNDPhuocVan = [
        [10.598662, 106.538159],
        [10.595445, 106.538372],
        [10.595445, 106.538372],
        [10.598732, 106.534744],
    ];

    const CanDuocWard = [
        [10.505005, 106.60586],
        [10.504654, 106.602951],
        [10.502044, 106.603819],
        [10.50355, 106.60734],
    ];

    const TBTA = [
        [10.555273, 106.62115],
        [10.553641, 106.621049],
        [10.55335, 106.621879],
        [10.555237, 106.622151],
    ];

    const GiaBaoRoundabout = [
        [10.604918, 106.653314],
        [10.604677, 106.657557],
        [10.600827, 106.653967],
        [10.600266, 106.657802],
    ];

    const TanKimRoundabout = [
        [10.625157, 106.66272],
        [10.625352, 106.664543],
        [10.623638, 106.665019],
        [10.623404, 106.663315],
    ];

    const DongThanhRoundabout = [
        [10.53911, 106.670315],
        [10.538765, 106.674438],
        [10.535402, 106.674262],
        [10.53523, 106.670491],
    ];

    const SeaPost = [
        [10.544108, 106.729516],
        [10.543567, 106.737584],
        [10.533546, 106.730854],
        [10.533275, 106.738922],
    ];

    return (
        <>
            {showRegion ? (
                <LayerGroup>
                    <Rectangle
                        //  @ts-ignore
                        bounds={buildingLocation}
                        pathOptions={{ color: 'transparent' }}
                    >
                        <Tooltip
                            permanent={true}
                            direction="top"
                            position={[10.545377, 106.349487]}
                            className="commomtooltipctt"
                        >
                            <Text c="orange" size="xs">
                                Công trình thu
                            </Text>
                        </Tooltip>
                    </Rectangle>

                    <Rectangle
                        //  @ts-ignore
                        bounds={waterCompanyLocation}
                        pathOptions={{ color: 'transparent' }}
                    >
                        <Tooltip
                            className="commomtooltipnmxl"
                            permanent={true}
                            direction="top"
                            position={[10.601434, 106.438709]}
                        >
                            <Text c="orange" size="xs">
                                Nhà máy xử lý
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={ChoDaoRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="top"
                        >
                            <Text c="orange" size="xs">
                                Ngã 4 Chợ Đào
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={ChoTramRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="top"
                        >
                            <Text c="orange" size="xs">
                                Ngã 4 Chợ Trạm
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={RachChanhBridge}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Cầu Rạch Chanh (BL)
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={MyYenRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Ngã 3 Mỹ Yên
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={LongSonRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Ngã 3 Long Sơn
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={UBNDPhuocVan}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                            position={[10.597421, 106.536986]}
                        >
                            <Text c="orange" size="xs">
                                UBND Xã Phước Vân
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={CanDuocWard}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Thị trấn Cần Đước
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={TBTA}
                        pathOptions={{ color: 'transpanrent' }}
                    >
                        <Tooltip
                            className="commomtooltiptbta"
                            permanent={true}
                            direction="bottom"
                            position={[10.554322, 106.62152]}
                        >
                            <Text c="orange" size="xs">
                                TBTA Mỹ Lệ
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={GiaBaoRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Ngã 4 Gia Bảo
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={TanKimRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="right"
                        >
                            <Text c="orange" size="xs">
                                Vòng Xoay Tân Kim
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={DongThanhRoundabout}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="bottom"
                        >
                            <Text c="orange" size="xs">
                                Ngã 4 Đông Thạnh
                            </Text>
                        </Tooltip>
                    </Rectangle>
                    <Rectangle
                        //  @ts-ignore
                        bounds={SeaPost}
                        pathOptions={{ color: 'transparent' }}
                        className="regionnoimportant"
                    >
                        <Tooltip
                            className="commomtooltip"
                            permanent={true}
                            direction="bottom"
                        >
                            <Text c="orange" size="xs">
                                Cảng Quốc Tế Long An
                            </Text>
                        </Tooltip>
                    </Rectangle>
                </LayerGroup>
            ) : null}
        </>
    );
};

export default ShapeMap;
