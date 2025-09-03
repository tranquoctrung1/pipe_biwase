const ConnectDB = require('../db/connect');

const DailyDataCollection = `t_DailyData`;

module.exports.DailyData = class DailyData {
    constructor(
        _id,
        SiteId,
        LoggerId,
        TimeStamp,
        Pressure1,
        Pressure2,
        ForwardFlow,
        ReverseFlow,
    ) {
        this._id = _id;
        this.SiteId = SiteId;
        this.LoggerId = LoggerId;
        this.TimeStamp = TimeStamp;
        this.Pressure1 = Pressure1;
        this.Pressure2 = Pressure2;
        this.ForwardFlow = ForwardFlow;
        this.ReverseFlow = ReverseFlow;
    }
};

module.exports.GetDailyDatas = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(DailyDataCollection);

    let result = await collection.find({}).sort({ TimeStamp: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetDailyDataBySiteIdTimeStamp = async (loggerid, start, end) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));
        timestart.setHours(timestart.getHours() + 7);
        timeend.setHours(timeend.getHours() + 7);

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(DailyDataCollection);

        let result = await collection
            .find({
                LoggerId: loggerid,
                TimeStamp: { $gte: timestart, $lte: timeend },
            })
            .sort({ TimeStamp: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetDailyDataByChannelTimeStamp = async (
    loggerid,
    start,
    end,
) => {
    try {
        let timestart = new Date(parseInt(start));
        let timeend = new Date(parseInt(end));
        timestart.setHours(timestart.getHours() + 7);
        timeend.setHours(timeend.getHours() + 7);

        let Connect = new ConnectDB.Connect();

        let collection = await Connect.connect(DailyDataCollection);

        let result = await collection
            .find({
                LoggerId: loggerid,
                TimeStamp: { $gte: timestart, $lte: timeend },
            })
            .sort({ TimeStamp: 1 })
            .toArray();

        Connect.disconnect();

        return result;
    } catch (err) {
        console.log(err);
    }
};
