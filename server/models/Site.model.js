const ConnectDB = require('../db/connect');
const { ObjectId } = require('mongodb');

const SiteCollection = 't_Sites';

module.exports.Site = class Site {
    constructor(
        _id,
        SiteId,
        Location,
        Latitude,
        Longitude,
        DisplayGroup,
        LoggerId,
        Status,
        Available,
        Note,
        Type,
        Prioritize,
        IsScadaMeter,
        IsManualMeter,
        IsShowLabel,
        TimeDelay,
        IsDNP,
        IsHWM,
        StartHour,
    ) {
        this._id = _id;
        this.SiteId = SiteId;
        this.Location = Location;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.DisplayGroup = DisplayGroup;
        this.LoggerId = LoggerId;
        this.Status = Status;
        this.Available = Available;
        this.Note = Note;
        this.Type = Type;
        this.Prioritize = Prioritize;
        this.IsScadaMeter = IsScadaMeter;
        this.IsManualMeter = IsManualMeter;
        this.IsShowLabel = IsShowLabel;
        this.TimeDelay = TimeDelay;
        this.IsDNP = IsDNP;
        this.IsHWM = IsHWM;
        this.StartHour = StartHour;
    }
};

module.exports.GetSites = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection.find({}).sort({ SiteId: 1 }).toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteBySiteId = async (siteid) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ SiteId: siteid })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSitesNotConnectPoint = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ Type: { $ne: 3 } })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteById = async (id) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ _id: new ObjectId(id) })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteIsMeter = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ $or: [{ Type: 2 }, { Type: 5 }, { Type: 6 }] })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteIsMeterForIndexManual = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ $or: [{ Type: 2 }, { Type: 5 }, { Type: 6 }] })
        .sort({ _id: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteIsMeterTotal = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ Type: 5 })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteIsMeterTotalBranch = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ Type: 6 })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.GetSiteIsManualMeter = async () => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection
        .find({ IsManualMeter: true })
        .sort({ SiteId: 1 })
        .toArray();

    Connect.disconnect();

    return result;
};

module.exports.Insert = async (site) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    site.Type = +site.Type;

    let result = await collection.insertOne(site);

    Connect.disconnect();

    return result.insertedId;
};

module.exports.Update = async (site) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection.updateMany(
        { _id: new ObjectId(site._id) },
        {
            $set: {
                SiteId: site.SiteId,
                Location: site.Location,
                Latitude: site.Latitude,
                Longitude: site.Longitude,
                DisplayGroup: site.DisplayGroup,
                LoggerId: site.LoggerId,
                Status: site.Status,
                Available: site.Available,
                Note: site.Note,
                Type: +site.Type,
                Prioritize: site.Prioritize,
                IsManualMeter: site.IsManualMeter,
                IsScadaMeter: site.IsScadaMeter,
                IsShowLabel: site.IsShowLabel,
                TimeDelay: site.TimeDelay,
                IsDNP: site.IsDNP,
                IsHWM: site.IsHWM,
                StartHour: site.StartHour,
            },
        },
    );

    Connect.disconnect();

    return result.modifiedCount;
};

module.exports.Delete = async (site) => {
    let Connect = new ConnectDB.Connect();

    let collection = await Connect.connect(SiteCollection);

    let result = await collection.deleteMany({ _id: new ObjectId(site._id) });

    Connect.disconnect();

    return result.deletedCount;
};
