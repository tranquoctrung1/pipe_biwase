const IndexLoggerModel = require('../../models/IndexLogger.model');
const ChannelModel = require('../../models/Channel.model');
const SiteModel = require('../../models/Site.model');
const ManualIndexModel = require('../../models/ManualIndex.model');

const Utils = require('../../utils/util');

module.exports = {
    Query: {
        GetQuantityDailyTB2: async (parent, { month, year }, context, info) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];
            const startHours = [];

            const totalDays = Utils.CalcDayInMonth(year, month);

            let start = new Date(year, month - 1, 1, 0, 0, 0);
            start.setDate(start.getDate() - 2);
            let end = new Date(year, month, 2, 0, 0, 0);

            let listChannelForward = [];
            let listChannelReverse = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                if (site.length > 0) {
                    if (
                        site[0].LoggerId !== null &&
                        site[0].LoggerId !== undefined &&
                        site[0].LoggerId !== ''
                    ) {
                        let startHour = 6;

                        if (
                            site[0].StartHour !== null &&
                            site[0].StartHour !== undefined
                        ) {
                            startHour = site[0].StartHour;
                        }

                        startHours.push(startHour);

                        start.setHours(startHour);
                        end.setHours(startHour);

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
                                    listChannelForward.push(channelForward);
                                }
                            }
                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listChannelReverse.push(channelReverse);
                                }
                            }
                        } else {
                            channelForward.push('');
                            channelReverse.push('');
                        }
                    }
                }
            }

            let date = new Date(year, month - 1, 1, 0, 0, 0);

            for (let i = 0; i < totalDays; i++) {
                let tempDate = new Date(date);
                tempDate.setDate(tempDate.getDate() + i);

                const obj = {
                    TimeStamp: tempDate,
                    Value: null,
                };

                for (let j = 0; j < listsite.length; j++) {
                    date.setHours(startHours[j]);

                    let t1 = new Date(date);
                    let t2 = new Date(date);
                    let t3 = new Date(date);
                    let t4 = new Date(date);

                    t1.setDate(t1.getDate() + i);

                    t2.setDate(t2.getDate() + i);
                    t2.setHours(t2.getHours() + 1);

                    t3.setDate(t3.getDate() + i + 1);

                    t4.setDate(t4.getDate() + i + 1);
                    t4.setHours(t4.getHours() + 1);

                    let indexForwardStart = null;
                    let indexForwardEnd = null;
                    let indexReverseStart = null;
                    let indexReverseEnd = null;

                    let checkForward = false;
                    let checkReverse = false;

                    if (
                        listChannelForward[j] !== null &&
                        listChannelForward[j] !== undefined &&
                        listChannelForward[j] !== ''
                    ) {
                        const fowardStart =
                            await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                listChannelForward[j].ChannelId,
                                t1.getTime(),
                                t2.getTime(),
                            );

                        if (fowardStart.length > 0) {
                            indexForwardStart = fowardStart[0].Value;
                            checkForward = true;
                        }

                        const forwardEnd =
                            await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                listChannelForward[j].ChannelId,
                                t3.getTime(),
                                t4.getTime(),
                            );
                        if (forwardEnd.length > 0) {
                            indexForwardEnd = forwardEnd[0].Value;
                            checkForward = true;
                        }
                    }

                    if (
                        listChannelReverse[j] !== null &&
                        listChannelReverse[j] !== undefined &&
                        listChannelReverse[j] !== ''
                    ) {
                        const reverseStart =
                            await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                listChannelReverse[j].ChannelId,
                                t1.getTime(),
                                t2.getTime(),
                            );
                        if (reverseStart.length > 0) {
                            indexReverseStart = reverseStart[0].Value;
                            checkReverse = true;
                        }

                        const reverseEnd =
                            await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                listChannelReverse[j].ChannelId,
                                t3.getTime(),
                                t4.getTime(),
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
                            obj.Value += indexForwardEnd;
                            obj.Value -= indexForwardStart;
                        }
                    }

                    if (checkReverse === true) {
                        if (
                            indexReverseEnd !== null &&
                            indexReverseStart !== null
                        ) {
                            obj.Value -= indexReverseEnd;
                            obj.Value += indexReverseStart;
                        }
                    }
                    if (obj.Value < 0) {
                        obj.Value = null;
                    }
                }

                result.push(obj);
            }

            return result;
        },
        GetQuantityMonthlyTB2: async (
            parent,
            { start, end },
            context,
            info,
        ) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];
            const startHours = [];

            const startDate = new Date(parseInt(start));
            startDate.setDate(startDate.getDate() - 2);
            const endDate = new Date(parseInt(end));
            const tempEnd = new Date(parseInt(end));
            tempEnd.setDate(tempEnd.getDate() + 1);
            tempEnd.setMonth(tempEnd.getMonth() + 1);
            const year = endDate.getFullYear();

            let listChannelForward = [];
            let listChannelReverse = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                if (site.length > 0) {
                    if (
                        site[0].LoggerId !== null &&
                        site[0].LoggerId !== undefined &&
                        site[0].LoggerId !== ''
                    ) {
                        let startHour = 6;

                        if (
                            site[0].StartHour !== null &&
                            site[0].StartHour !== undefined
                        ) {
                            startHour = site[0].StartHour;
                        }

                        startHours.push(startHour);

                        startDate.setHours(startHour);
                        tempEnd.setHours(startHour);

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
                                    listChannelForward.push(channelForward);
                                }
                            }
                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listChannelReverse.push(channelReverse);
                                }
                            }
                        } else {
                            listChannelForward.push('');
                            listChannelReverse.push('');
                        }
                    }
                }
            }

            for (let i = 0; i <= 11; i++) {
                const date = new Date(year, i, 1, 0, 0, 0);

                let tt = new Date(parseInt(start));
                tt.setHours(tt.getHours() + 7);
                let tt2 = new Date(parseInt(end));
                tt2.setHours(tt2.getHours() + 7);

                if (tt.getMonth() != tt2.getMonth()) {
                    if (i === startDate.getMonth()) {
                        date.setDate(startDate.getDate());
                    }

                    if (i === endDate.getMonth()) {
                        date.setDate(endDate.getDate());
                    }
                }

                const totalDays = Utils.CalcDayInMonth(year, i + 1);

                const obj = {
                    TimeStamp: date,
                    Value: null,
                    CountDay: null,
                    AvgValue: null,
                    IsEnoughData: true,
                    StartDate: null,
                    EndDate: null,
                };

                let startDateHasData = null;
                let endDateHasData = null;

                for (let j = 0; j <= totalDays - date.getDate(); j++) {
                    let tempDate = new Date(date);
                    tempDate.setDate(tempDate.getDate() + j);

                    let quantity = null;

                    for (let k = 0; k < listsite.length; k++) {
                        date.setHours(startHours[k]);

                        let t1 = new Date(date);
                        let t2 = new Date(date);
                        let t3 = new Date(date);
                        let t4 = new Date(date);

                        t1.setDate(t1.getDate() + j);

                        t2.setDate(t2.getDate() + j);
                        t2.setHours(t2.getHours() + 1);

                        t3.setDate(t3.getDate() + j + 1);

                        t4.setDate(t4.getDate() + j + 1);
                        t4.setHours(t4.getHours() + 1);

                        let indexForwardStart = null;
                        let indexForwardEnd = null;
                        let indexReverseStart = null;
                        let indexReverseEnd = null;

                        let checkForward = false;
                        let checkReverse = false;

                        if (
                            listChannelForward[k] !== null &&
                            listChannelForward[k] !== undefined &&
                            listChannelForward[k] !== ''
                        ) {
                            const fowardStart =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelForward[k].ChannelId,
                                    t1.getTime(),
                                    t2.getTime(),
                                );

                            if (fowardStart.length > 0) {
                                indexForwardStart = fowardStart[0].Value;
                                checkForward = true;
                                if (startDateHasData === null) {
                                    startDateHasData = fowardStart[0].TimeStamp;
                                }
                            }

                            const test =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    'D800NMNT_02',
                                    t1.getTime(),
                                    t2.getTime(),
                                );

                            if (test.length > 0) {
                                indexForwardStart = test[0].Value;
                            }

                            const forwardEnd =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelForward[k].ChannelId,
                                    t3.getTime(),
                                    t4.getTime(),
                                );
                            if (forwardEnd.length > 0) {
                                indexForwardEnd = forwardEnd[0].Value;
                                checkForward = true;

                                endDateHasData = forwardEnd[0].TimeStamp;
                            }
                        }

                        if (
                            listChannelReverse[k] !== null &&
                            listChannelReverse[k] !== undefined &&
                            listChannelReverse[k] !== ''
                        ) {
                            const reverseStart =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelReverse[k].ChannelId,
                                    t1.getTime(),
                                    t2.getTime(),
                                );
                            if (reverseStart.length > 0) {
                                indexReverseStart = reverseStart[0].Value;
                                checkReverse = true;
                                if (startDateHasData === null) {
                                    startDateHasData =
                                        reverseStart[0].TimeStamp;
                                }
                            }

                            const reverseEnd =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelReverse[k].ChannelId,
                                    t3.getTime(),
                                    t4.getTime(),
                                );
                            if (reverseEnd.length > 0) {
                                indexReverseEnd = reverseEnd[0].Value;
                                checkReverse = true;

                                endDateHasData = reverseEnd[0].TimeStamp;
                            }
                        }

                        if (checkForward === true) {
                            if (
                                indexForwardEnd !== null &&
                                indexForwardStart !== null
                            ) {
                                quantity += indexForwardEnd;
                                quantity -= indexForwardStart;
                            }
                        }

                        if (checkReverse === true) {
                            if (
                                indexReverseEnd !== null &&
                                indexReverseStart !== null
                            ) {
                                quantity -= indexReverseEnd;
                                quantity += indexReverseStart;
                            }
                        }
                    }

                    if (quantity < 0) {
                        quantity = null;
                    }

                    if (quantity !== null) {
                        obj.Value += quantity;
                        obj.CountDay += 1;
                    } else {
                        obj.IsEnoughData = false;
                    }
                }

                if (startDateHasData !== null) {
                    obj.StartDate = startDateHasData.setDate(
                        startDateHasData.getDate() + 1,
                    );
                    obj.StartDate = new Date(obj.StartDate);
                } else {
                    obj.StartDate = startDateHasData;
                }

                if (endDateHasData !== null) {
                    obj.EndDate = endDateHasData.setDate(
                        endDateHasData.getDate(),
                    );
                    obj.EndDate = new Date(obj.EndDate);
                } else {
                    obj.EndDate = endDateHasData;
                }

                if (obj.Value < 0) {
                    obj.Value = null;
                }
                if (obj.Value !== null && obj.CountDay !== null) {
                    obj.AvgValue = obj.Value / obj.CountDay;
                }

                result.push(obj);
            }

            return result;
        },
        GetQuantityYearlyTB2: async (parent, { start, end }, context, info) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];
            const startHours = [];

            const startDate = new Date(parseInt(start));
            const tempStart = new Date(parseInt(start));
            startDate.setDate(startDate.getDate() - 2);
            const endDate = new Date(parseInt(end));
            const tempEnd = new Date(parseInt(end));
            tempEnd.setDate(tempEnd.getDate() + 1);
            tempEnd.setFullYear(tempEnd.getFullYear() + 1);

            const year = endDate.getFullYear();
            const startYear = tempStart.getFullYear();

            let totalYear = year - startYear + 1;
            let listChannelForward = [];
            let listChannelReverse = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                if (site.length > 0) {
                    if (
                        site[0].LoggerId !== null &&
                        site[0].LoggerId !== undefined &&
                        site[0].LoggerId !== ''
                    ) {
                        let startHour = 6;

                        if (
                            site[0].StartHour !== null &&
                            site[0].StartHour !== undefined
                        ) {
                            startHour = site[0].StartHour;
                        }

                        startHours.push(startHour);

                        startDate.setHours(startHour);
                        tempEnd.setHours(startHour);

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
                                    listChannelForward.push(channelForward);
                                }
                            }
                            if (channelReverse !== undefined) {
                                if (
                                    channelReverse.ChannelId !== null &&
                                    channelReverse.ChannelId !== undefined &&
                                    channelReverse.ChannelId !== ''
                                ) {
                                    listChannelReverse.push(channelReverse);
                                }
                            }
                        } else {
                            listChannelForward.push('');
                            listChannelReverse.push('');
                        }
                    }
                }
            }

            for (let i = 0; i < totalYear; i++) {
                const date = new Date(startYear + i, 0, 1, 0, 0, 0);
                const totalDays = Utils.CalcDayInYear(date.getFullYear());

                const obj = {
                    TimeStamp: date,
                    Value: null,
                    CountDay: null,
                    AvgValue: null,
                    IsEnoughData: true,
                    StartDate: null,
                    EndDate: null,
                };

                let startDateHasData = null;
                let endDateHasData = null;

                for (let j = 0; j < totalDays; j++) {
                    let tempDate = new Date(date);
                    tempDate.setDate(tempDate.getDate() + j);

                    let quantity = null;

                    for (let k = 0; k < listsite.length; k++) {
                        date.setHours(startHours[k]);

                        let t1 = new Date(date);
                        let t2 = new Date(date);
                        let t3 = new Date(date);
                        let t4 = new Date(date);

                        t1.setDate(t1.getDate() + j);

                        t2.setDate(t2.getDate() + j);
                        t2.setHours(t2.getHours() + 1);

                        t3.setDate(t3.getDate() + j + 1);

                        t4.setDate(t4.getDate() + j + 1);
                        t4.setHours(t4.getHours() + 1);

                        let indexForwardStart = null;
                        let indexForwardEnd = null;
                        let indexReverseStart = null;
                        let indexReverseEnd = null;

                        let checkForward = false;
                        let checkReverse = false;

                        if (
                            listChannelForward[k] !== null &&
                            listChannelForward[k] !== undefined &&
                            listChannelForward[k] !== ''
                        ) {
                            const fowardStart =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelForward[k].ChannelId,
                                    t1.getTime(),
                                    t2.getTime(),
                                );
                            if (fowardStart.length > 0) {
                                indexForwardStart = fowardStart[0].Value;
                                checkForward = true;
                                if (startDateHasData === null) {
                                    startDateHasData = fowardStart[0].TimeStamp;
                                }
                            }

                            const test =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    'D800NMNT_02',
                                    t1.getTime(),
                                    t2.getTime(),
                                );

                            if (test.length > 0) {
                                indexForwardStart = test[0].Value;
                            }

                            const forwardEnd =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelForward[k].ChannelId,
                                    t3.getTime(),
                                    t4.getTime(),
                                );
                            if (forwardEnd.length > 0) {
                                indexForwardEnd = forwardEnd[0].Value;
                                checkForward = true;

                                endDateHasData = forwardEnd[0].TimeStamp;
                            }
                        }

                        if (
                            listChannelReverse[k] !== null &&
                            listChannelReverse[k] !== undefined &&
                            listChannelReverse[k] !== ''
                        ) {
                            const reverseStart =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelReverse[k].ChannelId,
                                    t1.getTime(),
                                    t2.getTime(),
                                );
                            if (reverseStart.length > 0) {
                                indexReverseStart = reverseStart[0].Value;
                                checkReverse = true;
                                if (startDateHasData === null) {
                                    startDateHasData =
                                        reverseStart[0].TimeStamp;
                                }
                            }

                            const reverseEnd =
                                await IndexLoggerModel.GetIndexLoggerByTimeStamp(
                                    listChannelReverse[k].ChannelId,
                                    t3.getTime(),
                                    t4.getTime(),
                                );
                            if (reverseEnd.length > 0) {
                                indexReverseEnd = reverseEnd[0].Value;
                                checkReverse = true;

                                endDateHasData = forwardEnd[0].TimeStamp;
                            }
                        }

                        if (checkForward === true) {
                            if (
                                indexForwardEnd !== null &&
                                indexForwardStart !== null
                            ) {
                                quantity += indexForwardEnd;
                                quantity -= indexForwardStart;
                            }
                        }

                        if (checkReverse === true) {
                            if (
                                indexReverseEnd !== null &&
                                indexReverseStart !== null
                            ) {
                                quantity -= indexReverseEnd;
                                quantity += indexReverseStart;
                            }
                        }

                        if (date.getFullYear() === startDate.getFullYear()) {
                            if (t3.getTime() >= startDate.getTime()) {
                                if (quantity < 0) {
                                    quantity = null;
                                }
                                if (quantity !== null) {
                                    obj.Value += quantity;
                                    obj.CountDay += 1;
                                } else {
                                    obj.IsEnoughData = false;
                                }
                            }
                        } else if (
                            date.getFullYear() === endDate.getFullYear()
                        ) {
                            if (t3.getTime() <= endDate.getTime()) {
                                if (quantity < 0) {
                                    quantity = null;
                                }
                                if (quantity !== null) {
                                    obj.Value += quantity;
                                    obj.CountDay += 1;
                                } else {
                                    obj.IsEnoughData = false;
                                }
                            }
                        } else {
                            if (quantity < 0) {
                                quantity = null;
                            }
                            if (quantity !== null) {
                                obj.Value += quantity;
                                obj.CountDay += 1;
                            } else {
                                obj.IsEnoughData = false;
                            }
                        }
                        obj.StartDate = startDateHasData;
                        obj.EndDate = endDateHasData;

                        if (obj.Value < 0) {
                            obj.Value = null;
                        }
                        if (obj.Value !== null && obj.CountDay !== null) {
                            obj.AvgValue = obj.Value / obj.CountDay;
                        }
                    }
                }

                result.push(obj);
            }

            return result;
        },

        GetManualIndexDailyTB2: async (
            parent,
            { month, year },
            context,
            info,
        ) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];

            const totalDays = Utils.CalcDayInMonth(year, month);

            let start = new Date(year, month - 1, 1, 0, 0, 0);
            start.setDate(start.getDate() - 2);
            let end = new Date(year, month, 2, 0, 0, 0);

            const listIndexManual = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                listIndexManual.push(
                    await ManualIndexModel.GetDataIndexManualBySiteIdAndTimeStamp(
                        site[0].SiteId,
                        start.getTime().toString(),
                        end.getTime().toString(),
                    ),
                );
            }

            let date = new Date(year, month - 1, 1, 0, 0, 0);

            for (let i = 0; i < totalDays; i++) {
                let tempDate = new Date(date);
                tempDate.setDate(tempDate.getDate() + i);

                const obj = {
                    TimeStamp: tempDate,
                    Value: null,
                };

                let quantity = null;

                for (let j = 0; j < listsite.length; j++) {
                    date.setHours(8);

                    let t1 = new Date(date);
                    let t2 = new Date(date);

                    t1.setDate(t1.getDate() + i);

                    t2.setDate(t2.getDate() + i + 1);

                    const find = listIndexManual[j].find(
                        (el) =>
                            el.TimeStamp.getTime() >= t1.getTime() &&
                            el.TimeStamp.getTime() < t2.getTime(),
                    );

                    if (find !== undefined) {
                        quantity += find.Value;
                    }
                }

                obj.Value = quantity;

                result.push(obj);
            }

            return result;
        },

        GetManualIndexMonthlyTB2: async (
            parent,
            { start, end },
            context,
            info,
        ) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];

            const startDate = new Date(parseInt(start));
            startDate.setDate(startDate.getDate() - 2);
            const endDate = new Date(parseInt(end));
            const tempEnd = new Date(parseInt(end));
            tempEnd.setDate(tempEnd.getDate() + 1);
            tempEnd.setMonth(tempEnd.getMonth() + 1);

            const year = endDate.getFullYear();

            const listIndexManual = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                listIndexManual.push(
                    await ManualIndexModel.GetDataIndexManualBySiteIdAndTimeStamp(
                        site[0].SiteId,
                        startDate.getTime().toString(),
                        tempEnd.getTime().toString(),
                    ),
                );
            }

            for (let i = 0; i <= 11; i++) {
                const date = new Date(year, i, 1, 0, 0, 0);

                let tt = new Date(parseInt(start));
                tt.setHours(tt.getHours() + 7);
                let tt2 = new Date(parseInt(end));
                tt2.setHours(tt2.getHours() + 7);

                if (tt.getMonth() != tt2.getMonth()) {
                    if (i === startDate.getMonth()) {
                        date.setDate(startDate.getDate());
                    }

                    if (i === endDate.getMonth()) {
                        date.setDate(endDate.getDate());
                    }
                }

                const totalDays = Utils.CalcDayInMonth(year, i + 1);

                const obj = {
                    TimeStamp: date,
                    Value: null,
                    CountDay: null,
                    AvgValue: null,
                    IsEnoughData: true,
                    StartDate: null,
                    EndDate: null,
                };

                let startDateHasData = null;
                let endDateHasData = null;

                for (let j = 0; j <= totalDays - date.getDate(); j++) {
                    let tempDate = new Date(date);
                    tempDate.setDate(tempDate.getDate() + j);

                    let quantity = null;

                    for (let k = 0; k < listsite.length; k++) {
                        date.setHours(8);

                        let t1 = new Date(date);
                        let t2 = new Date(date);

                        t1.setDate(t1.getDate() + j);

                        t2.setDate(t2.getDate() + j + 1);

                        const find = listIndexManual[k].find(
                            (el) =>
                                el.TimeStamp.getTime() >= t1.getTime() &&
                                el.TimeStamp.getTime() < t2.getTime(),
                        );

                        if (find !== undefined) {
                            quantity += find.Value;

                            if (startDateHasData === null) {
                                startDateHasData = find.TimeStamp;
                            }

                            endDateHasData = find.TimeStamp;
                        }
                    }

                    if (quantity !== null) {
                        obj.Value += quantity;
                        obj.CountDay += 1;
                    } else {
                        obj.IsEnoughData = false;
                    }
                }

                if (startDateHasData !== null) {
                    obj.StartDate = startDateHasData.setDate(
                        startDateHasData.getDate(),
                    );
                    obj.StartDate = new Date(obj.StartDate);
                } else {
                    obj.StartDate = startDateHasData;
                }

                if (endDateHasData !== null) {
                    obj.EndDate = endDateHasData.setDate(
                        endDateHasData.getDate(),
                    );
                    obj.EndDate = new Date(obj.EndDate);
                } else {
                    obj.EndDate = endDateHasData;
                }

                if (obj.Value !== null && obj.CountDay !== null) {
                    obj.AvgValue = obj.Value / obj.CountDay;
                }

                result.push(obj);
            }

            return result;
        },

        GetManualIndexYearlyTB2: async (
            parent,
            { start, end },
            context,
            info,
        ) => {
            const result = [];

            const listsite = ['D800 Nha May Nhi Thanh'];

            const startDate = new Date(parseInt(start));
            startDate.setDate(startDate.getDate() - 2);
            const endDate = new Date(parseInt(end));
            const tempEnd = new Date(parseInt(end));
            tempEnd.setDate(tempEnd.getDate() + 1);
            tempEnd.setFullYear(tempEnd.getFullYear() + 1);

            const year = endDate.getFullYear();
            const startYear = startDate.getFullYear();

            let totalYear = year - startYear + 1;

            const listIndexManual = [];

            for (const s of listsite) {
                const site = await SiteModel.GetSiteBySiteId(s);

                listIndexManual.push(
                    await ManualIndexModel.GetDataIndexManualBySiteIdAndTimeStamp(
                        site[0].SiteId,
                        startDate.getTime().toString(),
                        tempEnd.getTime().toString(),
                    ),
                );
            }

            for (let i = 0; i < totalYear; i++) {
                const date = new Date(startYear + i, 0, 1, 0, 0, 0);

                const totalDays = Utils.CalcDayInYear(date.getFullYear());

                const obj = {
                    TimeStamp: date,
                    Value: null,
                    CountDay: null,
                    AvgValue: null,
                    IsEnoughData: true,
                    StartDate: null,
                    EndDate: null,
                };

                let startDateHasData = null;
                let endDateHasData = null;

                for (let j = 0; j < totalDays; j++) {
                    let tempDate = new Date(date);
                    tempDate.setDate(tempDate.getDate() + j);

                    for (let k = 0; k < listsite.length; k++) {
                        date.setHours(8);

                        let t1 = new Date(date);
                        let t2 = new Date(date);

                        t1.setDate(t1.getDate() + j);

                        t2.setDate(t2.getDate() + j + 1);

                        const find = listIndexManual[k].find(
                            (el) =>
                                el.TimeStamp.getTime() >= t1.getTime() &&
                                el.TimeStamp.getTime() < t2.getTime(),
                        );
                        let quantity = null;

                        if (find !== undefined) {
                            quantity = find.Value;

                            if (startDateHasData === null) {
                                startDateHasData = find.TimeStamp;
                            }

                            endDateHasData = find.TimeStamp;
                        }

                        if (date.getFullYear() === startDate.getFullYear()) {
                            if (t1.getTime() >= startDate.getTime()) {
                                if (quantity !== null) {
                                    obj.Value += quantity;
                                    obj.CountDay += 1;
                                } else {
                                    obj.IsEnoughData = false;
                                }
                            }
                        } else if (
                            date.getFullYear() === endDate.getFullYear()
                        ) {
                            if (t1.getTime() <= endDate.getTime()) {
                                if (quantity !== null) {
                                    obj.Value += quantity;
                                    obj.CountDay += 1;
                                } else {
                                    obj.IsEnoughData = false;
                                }
                            }
                        } else {
                            if (quantity !== null) {
                                obj.Value += quantity;
                                obj.CountDay += 1;
                            } else {
                                obj.IsEnoughData = false;
                            }
                        }
                        obj.StartDate = startDateHasData;
                        obj.EndDate = endDateHasData;

                        if (obj.Value !== null && obj.CountDay !== null) {
                            obj.AvgValue = obj.Value / obj.CountDay;
                        }
                    }
                }

                result.push(obj);
            }

            return result;
        },
    },
};
