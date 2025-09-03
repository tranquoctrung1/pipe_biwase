const BranchModel = require('../../models/Branch.model');
const ListPointBranchModel = require('../../models/ListPointBranch.model');
const SiteModel = require('../../models/Site.model');
const ManualIndexModel = require('../../models/ManualIndex.model');
const ChannelModel = require('../../models/Channel.model');
const IndexLoggerModel = require('../../models/IndexLogger.model');

const Utils = require('../../utils/util');

module.exports = {
    Query: {
        GetLostWaterBranch: async (
            parent,
            { branchid, start, end },
            context,
            info,
        ) => {
            const result = [];

            const branch = await BranchModel.GetBranchByBranchId(branchid);

            const listPointInBranch =
                await ListPointBranchModel.GetListPointBranchByBranchId(
                    branch[0]._id.toString(),
                );

            if (listPointInBranch.length > 0) {
                const listSiteLevel1 = listPointInBranch.filter(
                    (el) => el.Level === 1,
                );
                const listSiteLevel2 = listPointInBranch.filter(
                    (el) => el.Level === 2,
                );

                const totalDays = Utils.CalculateSpcaeDay(start, end);

                const tempStart = new Date(parseInt(start));
                const tempEnd = new Date(parseInt(end));
                tempEnd.setDate(tempEnd.getDate() + 3);

                const listIndexManualLevel1 = [];
                const listLoggerIdLevel1 = [];
                let startHourSiteLevel1 = [];
                let listChannelForwardLevel1 = [];
                let listChannelReverseLevel1 = [];

                const listIndexManualLevel2 = [];
                const listLoggerIdLevel2 = [];
                let startHourSiteLevel2 = [];
                let listChannelForwardLevel2 = [];
                let listChannelReverseLevel2 = [];

                for (const s of listSiteLevel1) {
                    const site = await SiteModel.GetSiteById(s.PointId);

                    listIndexManualLevel1.push(
                        await ManualIndexModel.GetDataIndexManualBySiteIdAndTimeStamp(
                            site[0].SiteId,
                            tempStart.getTime().toString(),
                            tempEnd.getTime().toString(),
                        ),
                    );

                    listLoggerIdLevel1.push(site[0].LoggerId);

                    if (
                        site[0].StartHour !== null &&
                        site[0].StartHour !== undefined
                    ) {
                        startHourSiteLevel1.push(site[0].StartHour);
                    }

                    if (
                        site[0].LoggerId !== null &&
                        site[0].LoggerId !== undefined &&
                        site[0].LoggerId !== ''
                    ) {
                        const channels =
                            await ChannelModel.GetChannelByLoggerId(
                                site[0].LoggerId,
                            );

                        if (channels.length > 0) {
                            const channelForward = channels.find(
                                (el) => el.ForwardFlow === true,
                            );
                            const channelReverse = channels.find(
                                (el) => el.ReverseFlow === true,
                            );

                            if (channelForward !== undefined) {
                                if (
                                    channelForward.ChannelId !== null &&
                                    channelForward.ChannelId !== undefined &&
                                    channelForward.ChannelId !== ''
                                ) {
                                    listChannelForwardLevel1.push(
                                        channelForward,
                                    );
                                }
                            }

                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listChannelReverseLevel1.push(
                                        channelReverse,
                                    );
                                }
                            }
                        } else {
                            listChannelForwardLevel1.push('');
                            listChannelReverseLevel1.push('');
                        }
                    }
                }

                for (const s of listSiteLevel2) {
                    const site = await SiteModel.GetSiteById(s.PointId);

                    listIndexManualLevel2.push(
                        await ManualIndexModel.GetDataIndexManualBySiteIdAndTimeStamp(
                            site[0].SiteId,
                            tempStart.getTime().toString(),
                            tempEnd.getTime().toString(),
                        ),
                    );

                    listLoggerIdLevel2.push(site[0].LoggerId);

                    if (
                        site[0].StartHour !== null &&
                        site[0].StartHour !== undefined
                    ) {
                        startHourSiteLevel2.push(site[0].StartHour);
                    }

                    if (
                        site[0].LoggerId !== null &&
                        site[0].LoggerId !== undefined &&
                        site[0].LoggerId !== ''
                    ) {
                        const channels =
                            await ChannelModel.GetChannelByLoggerId(
                                site[0].LoggerId,
                            );

                        if (channels.length > 0) {
                            const channelForward = channels.find(
                                (el) => el.ForwardFlow === true,
                            );
                            const channelReverse = channels.find(
                                (el) => el.ReverseFlow === true,
                            );

                            if (channelForward !== undefined) {
                                if (
                                    channelForward.ChannelId !== null &&
                                    channelForward.ChannelId !== undefined &&
                                    channelForward.ChannelId !== ''
                                ) {
                                    listChannelForwardLevel2.push(
                                        channelForward,
                                    );
                                }
                            }

                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listChannelReverseLevel2.push(
                                        channelReverse,
                                    );
                                }
                            }
                        } else {
                            listChannelForwardLevel2.push('');
                            listChannelReverseLevel2.push('');
                        }
                    }
                }

                for (let i = 0; i < totalDays; i++) {
                    let tempDate = new Date(parseInt(start));
                    tempDate.setDate(tempDate.getDate() + i);

                    const obj = {};
                    obj.TimeStamp = tempDate;
                    obj.Quantitylevel1 = 0;
                    obj.Quantitylevel2 = 0;

                    // calc site level 1
                    for (let j = 0; j < listSiteLevel1.length; j++) {
                        let tt = new Date(tempDate);
                        tt.setHours(8);

                        let tt2 = new Date(tempDate);
                        tt2.setHours(8);

                        const find = listIndexManualLevel1[j].find(
                            (el) =>
                                el.TimeStamp.getTime() >= tt.getTime() &&
                                el.TimeStamp.getTime() < tt2.getTime(),
                        );

                        if (find !== undefined) {
                            obj.Quantitylevel1 += find.Value;
                        } else {
                            let t1 = new Date(tempDate);
                            let t2 = new Date(tempDate);
                            let t3 = new Date(tempDate);
                            let t4 = new Date(tempDate);

                            t1.setHours(startHourSiteLevel1[j]);
                            t2.setHours(startHourSiteLevel1[j]);
                            t3.setHours(startHourSiteLevel1[j]);
                            t4.setHours(startHourSiteLevel1[j]);

                            t2.setHours(t2.getHours() + 1);

                            t3.setDate(t3.getDate() + 1);

                            t4.setDate(t4.getDate() + 1);
                            t4.setHours(t4.getHours() + 1);

                            let indexForwardStart = 0;
                            let indexForwardEnd = 0;
                            let indexReverseStart = 0;
                            let indexReverseEnd = 0;

                            let checkForward = false;
                            let checkReverse = false;

                            if (
                                listChannelForwardLevel1[j] !== null &&
                                listChannelForwardLevel1[j] !== undefined &&
                                listChannelForwardLevel1[j] !== ''
                            ) {
                                const fowardStart =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelForwardLevel1[j].ChannelId,
                                        t1.getTime().toString(),
                                        t2.getTime().toString(),
                                    );

                                if (fowardStart.length > 0) {
                                    indexForwardStart = fowardStart[0].Value;
                                    checkForward = true;
                                }

                                const forwardEnd =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelForwardLevel1[j].ChannelId,
                                        t3.getTime().toString(),
                                        t4.getTime().toString(),
                                    );
                                if (forwardEnd.length > 0) {
                                    indexForwardEnd = forwardEnd[0].Value;
                                    checkForward = true;
                                }
                            }

                            if (
                                listChannelReverseLevel1[j] !== null &&
                                listChannelReverseLevel1[j] !== undefined &&
                                listChannelReverseLevel1[j] !== ''
                            ) {
                                const reverseStart =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelReverseLevel1[j].ChannelId,
                                        t1.getTime().toString(),
                                        t2.getTime().toString(),
                                    );

                                if (reverseStart.length > 0) {
                                    indexReverseStart = reverseStart[0].Value;
                                    checkReverse = true;
                                }

                                const reverseEnd =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelReverseLevel1[j].ChannelId,
                                        t3.getTime().toString(),
                                        t4.getTime().toString(),
                                    );

                                if (reverseEnd.length > 0) {
                                    indexReverseEnd = reverseEnd[0].Value;
                                    checkReverse = true;
                                }
                            }

                            if (checkForward === true) {
                                if (
                                    indexForwardEnd !== null &&
                                    indexForwardStart !== null
                                ) {
                                    if (indexForwardStart === 0) {
                                        obj.Quantitylevel1 += 0;
                                    } else {
                                        obj.Quantitylevel1 += indexForwardEnd;
                                        obj.Quantitylevel1 -= indexForwardStart;
                                    }
                                }
                            }

                            if (checkReverse === true) {
                                if (
                                    indexReverseEnd !== null &&
                                    indexReverseStart !== null
                                ) {
                                    if (indexForwardStart === 0) {
                                        obj.Quantitylevel1 += 0;
                                    } else {
                                        obj.Quantitylevel1 -= indexReverseEnd;
                                        obj.Quantitylevel1 += indexReverseStart;
                                    }
                                }
                            }

                            if (
                                obj.Quantitylevel1 < 0 ||
                                obj.Quantitylevel1 == null
                            ) {
                                obj.Quantitylevel1 = 0;
                            }
                        }
                    }
                    // calc site level 2
                    for (let j = 0; j < listSiteLevel2.length; j++) {
                        let tt = new Date(tempDate);
                        tt.setHours(8);

                        let tt2 = new Date(tempDate);
                        tt2.setHours(8);

                        const find = listIndexManualLevel2[j].find(
                            (el) =>
                                el.TimeStamp.getTime() >= tt.getTime() &&
                                el.TimeStamp.getTime() < tt2.getTime(),
                        );

                        if (find !== undefined) {
                            obj.QuantityLevel2 += find.Value;
                        } else {
                            let t1 = new Date(tempDate);
                            let t2 = new Date(tempDate);
                            let t3 = new Date(tempDate);
                            let t4 = new Date(tempDate);

                            t1.setHours(startHourSiteLevel2[j]);
                            t2.setHours(startHourSiteLevel2[j]);
                            t3.setHours(startHourSiteLevel2[j]);
                            t4.setHours(startHourSiteLevel2[j]);

                            t2.setHours(t2.getHours() + 1);

                            t3.setDate(t3.getDate() + 1);

                            t4.setDate(t4.getDate() + 1);
                            t4.setHours(t4.getHours() + 1);

                            let indexForwardStart = 0;
                            let indexForwardEnd = 0;
                            let indexReverseStart = 0;
                            let indexReverseEnd = 0;

                            let checkForward = false;
                            let checkReverse = false;

                            if (
                                listChannelForwardLevel2[j] !== null &&
                                listChannelForwardLevel2[j] !== undefined &&
                                listChannelForwardLevel2[j] !== ''
                            ) {
                                const fowardStart =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelForwardLevel2[j].ChannelId,
                                        t1.getTime().toString(),
                                        t2.getTime().toString(),
                                    );

                                if (fowardStart.length > 0) {
                                    indexForwardStart = fowardStart[0].Value;
                                    checkForward = true;
                                }

                                const forwardEnd =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelForwardLevel2[j].ChannelId,
                                        t3.getTime().toString(),
                                        t4.getTime().toString(),
                                    );
                                if (forwardEnd.length > 0) {
                                    indexForwardEnd = forwardEnd[0].Value;
                                    checkForward = true;
                                }
                            }

                            if (
                                listChannelReverseLevel2[j] !== null &&
                                listChannelReverseLevel2[j] !== undefined &&
                                listChannelReverseLevel2[j] !== ''
                            ) {
                                const reverseStart =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelReverseLevel2[j].ChannelId,
                                        t1.getTime().toString(),
                                        t2.getTime().toString(),
                                    );

                                if (reverseStart.length > 0) {
                                    indexReverseStart = reverseStart[0].Value;
                                    checkReverse = true;
                                }

                                const reverseEnd =
                                    await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                        listChannelReverseLevel2[j].ChannelId,
                                        t3.getTime().toString(),
                                        t4.getTime().toString(),
                                    );
                                if (reverseEnd.length > 0) {
                                    indexReverseEnd = reverseEnd[0].Value;
                                    checkReverse = true;
                                }
                            }

                            if (checkForward === true) {
                                if (
                                    indexForwardEnd !== null &&
                                    indexForwardStart !== null
                                ) {
                                    if (indexForwardStart === 0) {
                                        obj.Quantitylevel2 += 0;
                                    } else {
                                        obj.Quantitylevel2 += indexForwardEnd;
                                        obj.Quantitylevel2 -= indexForwardStart;
                                    }
                                }
                            }

                            if (checkReverse === true) {
                                if (
                                    indexReverseEnd !== null &&
                                    indexReverseStart !== null
                                ) {
                                    if (indexForwardStart === 0) {
                                        obj.Quantitylevel2 += 0;
                                    } else {
                                        obj.Quantitylevel2 -= indexReverseEnd;
                                        obj.Quantitylevel2 += indexReverseStart;
                                    }
                                }
                            }

                            if (
                                obj.Quantitylevel2 < 0 ||
                                obj.Quantitylevel2 == null
                            ) {
                                obj.Quantitylevel2 = 0;
                            }
                        }
                    }

                    result.push(obj);
                }
            }

            return result;
        },
    },
};
