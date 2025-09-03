const GroupPipeModel = require('../../models/GroupPipe.model');
const PipeModel = require('../../models/Pipe.model');
const SiteModel = require('../../models/Site.model');
const ChannelModel = require('../../models/Channel.model');
const ListPointPipeModel = require('../../models/ListPointPipe.model');

const Util = require('../../utils/util');

module.exports = {
    Query: {
        GetDataDrawingPipe: async (parent, {}, context, info) => {
            const result = [];
            try {
                const groupPipes = await GroupPipeModel.GetGroupPipes();
                const pipes = await PipeModel.GetPipes();
                const sites = await SiteModel.GetSites();
                const channels = await ChannelModel.GetChannels();
                const listPointPipe =
                    await ListPointPipeModel.GetListPointPipes();

                const defaultColor = '#2ecc71';

                for (const groupPipe of groupPipes) {
                    const objGroupPipe = {};
                    objGroupPipe.GroupPipeId = groupPipe.GroupPipeId;
                    objGroupPipe.GroupPipeName = groupPipe.Name;

                    if (
                        groupPipe.Color === '' ||
                        groupPipe.Color === null ||
                        groupPipe.Color === undefined
                    ) {
                        objGroupPipe.Color = defaultColor;
                    } else {
                        objGroupPipe.Color = groupPipe.Color;
                    }

                    let diffPressureValue = null;
                    let mainPipe = [];
                    let colorPipe = [];
                    let total = 0;
                    let percent = 0;
                    // set diff value pressure start site id and end site id
                    if (
                        objGroupPipe.SiteIdStart !== '' &&
                        objGroupPipe.SiteIdEnd !== ''
                    ) {
                        const startSite = sites.find(
                            (el) => el._id.toString() === groupPipe.SiteIdStart,
                        );
                        const endSite = sites.find(
                            (el) => el._id.toString() === groupPipe.SiteIdEnd,
                        );

                        if (startSite !== undefined && endSite !== undefined) {
                            const pressureChannelSiteStart = channels.find(
                                (el) =>
                                    el.LoggerId === startSite.LoggerId &&
                                    (el.Pressure1 === true ||
                                        el.Pressure2 === true),
                            );

                            const pressureChannelSiteEnd = channels.find(
                                (el) =>
                                    el.LoggerId === endSite.LoggerId &&
                                    (el.Pressure1 === true ||
                                        el.Pressure2 === true),
                            );

                            if (
                                pressureChannelSiteStart !== undefined &&
                                pressureChannelSiteEnd !== undefined
                            ) {
                                if (
                                    pressureChannelSiteStart.LastValue !==
                                        null &&
                                    pressureChannelSiteEnd.LastValue !== null
                                ) {
                                    diffPressureValue =
                                        pressureChannelSiteStart.LastValue -
                                        pressureChannelSiteEnd.LastValue;

                                    if (diffPressureValue < 0) {
                                        diffPressureValue = null;
                                    } else if (diffPressureValue <= 1) {
                                        diffPressureValue = 1;
                                    }
                                }
                            }
                        }
                        if (startSite !== undefined) {
                            const pressureChannelSiteStart = channels.find(
                                (el) =>
                                    el.LoggerId === startSite.LoggerId &&
                                    (el.Pressure1 === true ||
                                        el.Pressure2 === true),
                            );
                            if (pressureChannelSiteStart !== undefined) {
                                if (
                                    pressureChannelSiteStart.LastValue !== null
                                ) {
                                    if (
                                        pressureChannelSiteStart.LastValue >
                                            70 &&
                                        pressureChannelSiteStart <= 80
                                    ) {
                                        objGroupPipe.Color = '#c23616';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            70 &&
                                        pressureChannelSiteStart.LastValue > 60
                                    ) {
                                        objGroupPipe.Color = '#e84118';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            60 &&
                                        pressureChannelSiteStart.LastValue > 50
                                    ) {
                                        objGroupPipe.Color = '#ffbe76';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            50 &&
                                        pressureChannelSiteStart.LastValue > 40
                                    ) {
                                        objGroupPipe.Color = '#4834d4';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            40 &&
                                        pressureChannelSiteStart.LastValue > 30
                                    ) {
                                        objGroupPipe.Color = '#686de0';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            30 &&
                                        pressureChannelSiteStart.LastValue > 20
                                    ) {
                                        objGroupPipe.Color = '#4cd137';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            20 &&
                                        pressureChannelSiteStart.LastValue > 10
                                    ) {
                                        objGroupPipe.Color = '#44bd32';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <=
                                            10 &&
                                        pressureChannelSiteStart.LastValue > 0
                                    ) {
                                        objGroupPipe.Color = '#fbc531';
                                    } else if (
                                        pressureChannelSiteStart.LastValue <= 0
                                    ) {
                                        objGroupPipe.Color = '#c56cf0';
                                    }
                                }
                            }
                        }
                    }

                    objGroupPipe.Pipes = [];

                    const filterPipe = pipes.filter(
                        (el) => el.GroupPipeId == groupPipe._id.toString(),
                    );
                    if (filterPipe.length > 0) {
                        for (const pipe of filterPipe) {
                            const objPipe = {};
                            objPipe.PipeId = pipe.PipeId;
                            objPipe.PipeName = pipe.Name;
                            objPipe.TypeAlarmChannel = pipe.TypeAlarmChannel;
                            objPipe.Size = pipe.Size;
                            objPipe.Length = pipe.Length;
                            objPipe.BaseMin = pipe.BaseMin;
                            objPipe.BaseMax = pipe.BaseMax;
                            objPipe.Lines = [];

                            const filterListPointPipe = listPointPipe.filter(
                                (el) => el.PipeId === pipe._id.toString(),
                            );

                            if (filterListPointPipe.length > 0) {
                                const filterSites = [];

                                for (const pp of filterListPointPipe) {
                                    const find = sites.find(
                                        (el) =>
                                            el._id.toString() === pp.PointId,
                                    );

                                    if (find !== undefined) {
                                        filterSites.push(find);
                                    }
                                }

                                if (filterSites.length > 0) {
                                    if (mainPipe.length === 0) {
                                        mainPipe = [...filterSites];
                                    }

                                    let checkOtherPipe = false;
                                    let indexInMainPipe = 0;

                                    if (diffPressureValue !== null) {
                                        const splitPipeId =
                                            objPipe.PipeId.split('-');

                                        if (splitPipeId.length >= 2) {
                                            checkOtherPipe = true;

                                            indexInMainPipe =
                                                mainPipe.findIndex(
                                                    (el) =>
                                                        el._id ===
                                                        filterSites[0]._id,
                                                );

                                            if (indexInMainPipe === -1) {
                                                indexInMainPipe = 0;
                                            }
                                        } else {
                                            total = Math.floor(
                                                filterSites.length /
                                                    diffPressureValue,
                                            );

                                            percent = 0;
                                        }
                                    }

                                    let color = objGroupPipe.Color;

                                    for (
                                        let i = 0;
                                        i < filterSites.length - 1;
                                        i++
                                    ) {
                                        const objLine = {};
                                        objLine.Lines = [];
                                        if (diffPressureValue != null) {
                                            if (checkOtherPipe === false) {
                                                if (i % total == 0 || i === 0) {
                                                    percent +=
                                                        0.4 / diffPressureValue;

                                                    color = Util.lightenColor(
                                                        color,
                                                        percent,
                                                    );

                                                    colorPipe.push(color);
                                                }
                                            } else {
                                                color =
                                                    colorPipe[
                                                        Math.ceil(
                                                            indexInMainPipe /
                                                                total,
                                                        ) - 1
                                                    ];
                                            }
                                        }

                                        objLine.Color = color;

                                        const firstCoordinates = [
                                            filterSites[i].Latitude,
                                            filterSites[i].Longitude,
                                        ];
                                        const secondCoordinates = [
                                            filterSites[i + 1].Latitude,
                                            filterSites[i + 1].Longitude,
                                        ];

                                        objLine.Lines.push(
                                            firstCoordinates,
                                            secondCoordinates,
                                        );

                                        objPipe.Lines.push(objLine);
                                    }
                                }
                                objGroupPipe.Pipes.push(objPipe);
                            }
                        }
                    }
                    // for (const pipe of objGroupPipe.Pipes) {
                    //     for (const line of pipe.Lines) {
                    //         line.Color = objGroupPipe.Color;
                    //     }
                    // }

                    result.push(objGroupPipe);
                }
            } catch (err) {
                console.log(err);
            }

            return result;
        },
    },
};
