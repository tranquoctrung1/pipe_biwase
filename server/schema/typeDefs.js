const { gql } = require('graphql-tag');

module.exports = gql`
    #declare scalar
    scalar Date

    #declare type
    type Site {
        _id: ID!
        SiteId: String
        Location: String
        Latitude: Float
        Longitude: Float
        DisplayGroup: String
        LoggerId: String
        Status: String
        Available: String
        Note: String
        Type: Int
        Prioritize: Boolean
        IsScadaMeter: Boolean
        IsManualMeter: Boolean
        IsShowLabel: Boolean
        TimeDelay: Int
        IsDNP: Boolean
        IsHWM: Boolean
        StartHour: Int
    }

    type Channel {
        _id: ID!
        ChannelId: String
        ChannelName: String
        LoggerId: String
        Unit: String
        Pressure1: Boolean
        Pressure2: Boolean
        ForwardFlow: Boolean
        ReverseFlow: Boolean
        BaseLine: Float
        BaseMax: Float
        BaseMin: Float
        OtherChannel: Boolean
        TimeStamp: Date
        LastValue: Float
        IndexTimeStamp: Date
        LastIndex: Float
    }

    type SiteAndChannel {
        _id: ID!
        SiteId: String
        Location: String
        Latitude: Float
        Longitude: Float
        DisplayGroup: String
        LoggerId: String
        Status: String
        Available: String
        Note: String
        Type: Int
        Prioritize: Boolean
        Channels: [Channel]
        StatusError: Int
        IsScadaMeter: Boolean
        IsManualMeter: Boolean
        IsShowLabel: Boolean
        IsDNP: Boolean
        IsHWM: Boolean
        PipeId: String
        PipeName: String
        SizePipe: Int
        LengthPipe: Int
        StartHour: Int
    }

    type TypeNode {
        _id: ID!
        Type: Int
        Name: String
    }

    type DisplayGroup {
        _id: ID!
        Group: String
        Name: String
    }

    type GroupPipe {
        _id: ID!
        GroupPipeId: String
        Name: String
        Description: String
        Color: String
        SiteIdStart: String
        SiteIdEnd: String
    }

    type Pipe {
        _id: ID!
        PipeId: String
        Name: String
        Description: String
        GroupPipeId: String
        Size: Int
        Length: Int
        TypeChannelAlarm: String
        BaseMin: Float
        BaseMax: Float
        ColorBaseMax: String
        ColorBaseMin: String
        SetPrioritize: Int
    }

    type ListPointPipe {
        _id: ID!
        PipeId: String
        PointId: String
        STT: Int
    }

    type Coordinates {
        a: String
    }

    type DrawLine {
        Color: String
        Lines: [[Float]]
    }

    type DrawPipe {
        PipeId: String
        PipeName: String
        TypeAlarmChannel: String
        Size: Int
        Length: Int
        BaseMin: Float
        BaseMax: Float
        Lines: [DrawLine]
    }

    type DataDrawPipe {
        GroupPipeId: String
        GroupPipeName: String
        Pipes: [DrawPipe]
    }

    type DataLogger {
        _id: ID
        TimeStamp: Date
        Value: Float
    }

    type DataChart {
        ChannelId: String
        ChannelName: String
        Unit: String
        BaseMax: Float
        BaseMin: Float
        ListDataLogger: [DataLogger]
    }

    type DataTable {
        STT: Int
        SiteId: String
        Location: String
        Type: Int
        Pressure: Float
        ForwardFlow: Float
        ReverseFlow: Float
        IndexForwardFlow: Float
        IndexReverseFlow: Float
        TimeStamp: Date
    }

    type DataManual {
        _id: ID!
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    type Role {
        _id: ID!
        Role: String
        Description: String
    }

    type User {
        _id: ID!
        Username: String
        Password: String
        pfm: String
        Salt: String
        StaffId: String
        ConsumerId: String
        Email: String
        Role: String
        Active: Int
        TimeStamp: Date
        Ip: String
        LoginTime: Int
        Language: String
    }

    type Login {
        token: String
        Role: String
        Username: String
    }

    type DailyData {
        _id: ID!
        SiteId: String
        LoggerId: String
        TimeStamp: Date
        Pressure1: Float
        Pressure2: Float
        ForwardFlow: Float
        ReverseFlow: Float
    }

    type DataQuantityTB {
        TimeStamp: Date
        Value: Float
    }

    type DataQuantityMonthlyTB {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type DataQuantityYearlyTB {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type DataQuantityDailyNT {
        TimeStamp: Date
        GD1: Float
        GD2: Float
        GD3: Float
        Total: Float
    }

    type DataQuantityMonthlyNT {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type DataQuantityYearlyNT {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type ManualIndex {
        _id: ID!
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    type SiteAndManualIndex {
        SiteId: String
        Location: String
        Quantity: Float
        IdManualIndex: ID
        IndexManual: Float
    }

    type DataQuantityDailyNM {
        TimeStamp: Date
        GD1: Float
        GD2: Float
        GD3: Float
        Total: Float
    }

    type DataQuantityMonthlyNM {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type DataQuantityYearlyNM {
        TimeStamp: Date
        Value: Float
        CountDay: Int
        AvgValue: Float
        IsEnoughData: Boolean
        StartDate: Date
        EndDate: Date
    }

    type Branch {
        _id: ID!
        BranchId: String
        BranchName: String
    }

    type ListPointBranch {
        _id: ID!
        BranchId: String
        PointId: String
        Level: Int
    }

    type LostBranch {
        TimeStamp: Date
        Quantitylevel1: Float
        Quantitylevel2: Float
    }

    type QuantitySite {
        TimeStamp: Date
        MinFlow: Float
        MaxFlow: Float
        AvgFlow: Float
        MinPressure: Float
        MaxPressure: Float
        AvgPressure: Float
        Index: Float
        Quantity: Float
    }

    #declare input
    input SiteInsertInput {
        SiteId: String
        Location: String
        Latitude: Float
        Longitude: Float
        DisplayGroup: String
        LoggerId: String
        Status: String
        Available: String
        Note: String
        Type: String
        Prioritize: Boolean
        IsScadaMeter: Boolean
        IsManualMeter: Boolean
        IsShowLabel: Boolean
        TimeDelay: Int
        IsDNP: Boolean
        IsHWM: Boolean
        StartHour: Int
    }

    input SiteUpdateInput {
        _id: ID!
        SiteId: String
        Location: String
        Latitude: Float
        Longitude: Float
        DisplayGroup: String
        LoggerId: String
        Status: String
        Available: String
        Note: String
        Type: String
        Prioritize: Boolean
        IsScadaMeter: Boolean
        IsManualMeter: Boolean
        IsShowLabel: Boolean
        TimeDelay: Int
        IsDNP: Boolean
        IsHWM: Boolean
        StartHour: Int
    }

    input DisplayGroupInsertInput {
        Group: String
        Name: String
    }

    input DisplayGroupUpdateInput {
        _id: ID!
        Group: String
        Name: String
    }

    input ChannelInsertInput {
        ChannelId: String
        ChannelName: String
        LoggerId: String
        Unit: String
        Pressure1: Boolean
        Pressure2: Boolean
        ForwardFlow: Boolean
        ReverseFlow: Boolean
        BaseLine: Float
        BaseMax: Float
        BaseMin: Float
        OtherChannel: Boolean
        TimeStamp: Date
        LastValue: Float
        IndexTimeStamp: Date
        LastIndex: Float
    }

    input ChannelUpdateInput {
        _id: ID!
        ChannelId: String
        ChannelName: String
        LoggerId: String
        Unit: String
        Pressure1: Boolean
        Pressure2: Boolean
        ForwardFlow: Boolean
        ReverseFlow: Boolean
        BaseLine: Float
        BaseMax: Float
        BaseMin: Float
        OtherChannel: Boolean
        TimeStamp: Date
        LastValue: Float
        IndexTimeStamp: Date
        LastIndex: Float
    }

    input GroupPipeInsertInput {
        GroupPipeId: String
        Name: String
        Description: String
        Color: String
        SiteIdStart: String
        SiteIdEnd: String
    }

    input GroupPipeUpdateInput {
        _id: ID!
        GroupPipeId: String
        Name: String
        Description: String
        Color: String
        SiteIdStart: String
        SiteIdEnd: String
    }

    input PipeInsertInput {
        PipeId: String
        Name: String
        Description: String
        GroupPipeId: String
        Size: Int
        Length: Int
        TypeChannelAlarm: String
        BaseMin: Float
        BaseMax: Float
        ColorBaseMax: String
        ColorBaseMin: String
        SetPrioritize: String
    }

    input PipeUpdateInput {
        _id: ID!
        PipeId: String
        Name: String
        Description: String
        GroupPipeId: String
        Size: Int
        Length: Int
        TypeChannelAlarm: String
        BaseMin: Float
        BaseMax: Float
        ColorBaseMax: String
        ColorBaseMin: String
        SetPrioritize: String
    }

    input ListPointPipeInput {
        PipeId: String
        PointId: String
        STT: Int
    }

    input ListPointPipeUpdateInput {
        PipeId: String
        Data: [ListPointPipeInput]
    }

    input DataManualInsertInput {
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    input DataManualUpdateInput {
        _id: ID!
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    input UserInsertInput {
        Username: String
        Password: String
        pfm: String
        Salt: String
        StaffId: String
        ConsumerId: String
        Email: String
        Role: String
        Active: Int
        TimeStamp: Date
        Ip: String
        LoginTime: Int
        Language: String
    }

    input UserUpdateInput {
        _id: ID!
        Username: String
        Password: String
        pfm: String
        Salt: String
        StaffId: String
        ConsumerId: String
        Email: String
        Role: String
        Active: Int
        TimeStamp: Date
        Ip: String
        LoginTime: Int
        Language: String
    }

    input DataLoggerInsertInput {
        ChannelId: String
        TimeStamp: Date
        Value: Float
    }

    input DataLoggerUpdateInput {
        _id: ID!
        ChannelId: String
        TimeStamp: Date
        Value: Float
    }

    input ChannelValueUpdateInput {
        ChannelId: String
        TimeStamp: Date
        Value: Float
    }

    input ManualIndexInsertInput {
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    input ManualIndexUpdateInput {
        _id: ID!
        SiteId: String
        TimeStamp: Date
        Value: Float
    }

    input BranchInsertInput {
        BranchId: String
        BranchName: String
    }

    input BranchUpdateInput {
        _id: ID!
        BranchId: String
        BranchName: String
    }

    input ListPointBranchInput {
        BranchId: String
        PointId: String
        Level: Int
    }

    input ListPointBranchUpdateInput {
        BranchId: String
        Data: [ListPointBranchInput]
    }

    #declare query
    type Query {
        GetSites: [Site!]

        GetChannels: [Channel!]

        GetNodeTypes: [TypeNode!]

        GetSiteAndChannel: [SiteAndChannel!]

        GetDisplayGroups: [DisplayGroup]

        GetChannelByLoggerId(loggerid: String): [Channel]

        GetGroupPipes: [GroupPipe]

        GetPipes: [Pipe]

        GetListPointPipeByPipeId(pipeid: String): [ListPointPipe]

        GetDataDrawingPipe: [DataDrawPipe]

        GetDataLoggerByCurrentTime(channelid: String): DataChart

        GetDataLoggerByCurrentTimeForManualData(channelid: String): [DataLogger]

        GetDataLoggerByTimeStampForManualData(
            channelid: String
            start: String
            end: String
        ): [DataLogger]

        GetDataLoggerByTimeStamp(
            channelid: String
            start: String
            end: String
        ): DataChart

        GetDataTableCurrent: [DataTable]

        GetDataManuals: [DataManual]

        GetDataManualBySiteId(siteid: String): [DataManual]

        GetSiteIsMeter: [Site]

        GetSiteIsMeterTotal: [Site]

        GetSiteIsMeterTotalBranch: [Site]

        GetSiteIsManualMeter: [Site]

        GetTotalQuantityByTimeStamp(
            siteid: String
            start: String
            end: String
        ): Float

        GetRoles: [Role]

        GetUsers: [User]

        GetUserByUsername(Username: String): [User]

        VerifyPassword(Username: String, Password: String): Boolean

        LoginAction(username: String, password: String): Login

        VerifyToken(token: String): String

        GetIndexLoggerExactTime(channelid: String, time: String): [DataLogger]

        GetIndexLoggerFilterTime(
            channelid: String
            start: String
            end: String
        ): [DataLogger]

        GetDataLoggerOfSiteCurrentTime(loggerid: String): [DataChart]

        GetDataLoggerOfSiteByTimeStamp(
            loggerid: String
            start: String
            end: String
        ): [DataChart]

        GetDataLoggerPressureByLoggerId(
            loggerid: String
            start: String
            end: String
        ): [DataLogger]

        GetDailyDatas: [DailyData]

        GetDailyDataBySiteIdTimeStamp(
            loggerid: String
            start: String
            end: String
        ): [DataChart]

        GetDailyDataByChannelTimeStamp(
            channelid: String
            start: String
            end: String
        ): DataChart

        GetQuantityDailyTB2(month: Int, year: Int): [DataQuantityTB]

        GetQuantityMonthlyTB2(
            start: String
            end: String
        ): [DataQuantityMonthlyTB]

        GetQuantityYearlyTB2(start: String, end: String): [DataQuantityYearlyTB]

        GetManualIndexDailyTB2(month: Int, year: Int): [DataQuantityTB]

        GetManualIndexMonthlyTB2(
            start: String
            end: String
        ): [DataQuantityMonthlyTB]

        GetManualIndexYearlyTB2(
            start: String
            end: String
        ): [DataQuantityYearlyTB]

        GetQuantityDailyNT(month: Int, year: Int): [DataQuantityDailyNT]

        GetQuantityMonthlyNT(
            start: String
            end: String
        ): [DataQuantityMonthlyNT]

        GetQuantityYearlyNT(start: String, end: String): [DataQuantityYearlyNT]

        GetManualIndexDailyNT(month: Int, year: Int): [DataQuantityDailyNT]

        GetManualIndexMonthlyNT(
            start: String
            end: String
        ): [DataQuantityMonthlyNT]

        GetManualIndexYearlyNT(
            start: String
            end: String
        ): [DataQuantityYearlyNT]

        GetDataIndexManuals: [ManualIndex]

        GetDataIndexManualBySiteId(siteid: String): [ManualIndex]

        GetDataQuantityAndIndexManual(time: String): [SiteAndManualIndex]

        GetQuantityDailyNM(month: Int, year: Int): [DataQuantityDailyNM]

        GetQuantityMonthlyNM(
            start: String
            end: String
        ): [DataQuantityMonthlyNM]

        GetQuantityYearlyNM(start: String, end: String): [DataQuantityYearlyNM]

        GetManualIndexDailyNM(month: Int, year: Int): [DataQuantityDailyNM]

        GetManualIndexMonthlyNM(
            start: String
            end: String
        ): [DataQuantityMonthlyNM]

        GetManualIndexYearlyNM(
            start: String
            end: String
        ): [DataQuantityYearlyNM]

        GetBranchs: [Branch]

        GetListPointBranchByBranchId(branchid: String): [ListPointBranch]

        GetLostWaterBranch(
            branchid: String
            start: String
            end: String
        ): [LostBranch]

        GetQuantityHourly(
            siteid: String
            start: String
            end: String
        ): [QuantitySite]

        GetQuantityDaily(
            siteid: String
            start: String
            end: String
        ): [QuantitySite]

        GetQuantityMonthly(
            siteid: String
            start: String
            end: String
        ): [QuantitySite]

        GetQuantityYearly(
            siteid: String
            start: String
            end: String
        ): [QuantitySite]
    }

    #declare mutation
    type Mutation {
        InsertSite(site: SiteInsertInput): String

        UpdateSite(site: SiteUpdateInput): Int

        DeleteSite(site: SiteUpdateInput): Int

        InsertDisplayGroup(displayGroup: DisplayGroupInsertInput): String

        UpdateDisplayGroup(displayGroup: DisplayGroupUpdateInput): Int

        DeleteDisplayGroup(displayGroup: DisplayGroupUpdateInput): Int

        InsertChannel(channel: ChannelInsertInput): String

        UpdateChannel(channel: ChannelUpdateInput): Int

        UpdateValueChannel(channel: ChannelValueUpdateInput): Int

        DeleteChannel(channel: ChannelUpdateInput): Int

        InsertGroupPipe(groupPipe: GroupPipeInsertInput): String

        UpdateGroupPipe(groupPipe: GroupPipeUpdateInput): Int

        DeleteGroupPipe(groupPipe: GroupPipeUpdateInput): Int

        InsertPipe(pipe: PipeInsertInput): String

        UpdatePipe(pipe: PipeUpdateInput): Int

        DeletePipe(pipe: PipeUpdateInput): Int

        UpdateListPointPipe(list: ListPointPipeUpdateInput): Int

        InsertDataManual(data: DataManualInsertInput): String

        UpdateDataManual(data: DataManualUpdateInput): Int

        DeleteDataManual(data: DataManualUpdateInput): Int

        InsertUser(user: UserInsertInput): String

        UpdateUser(user: UserUpdateInput): Int

        DeleteUser(user: UserUpdateInput): Int

        InsertDataLogger(data: DataLoggerInsertInput): String

        UpdateDataLogger(data: DataLoggerUpdateInput): Int

        DeleteDataLogger(data: DataLoggerUpdateInput): Int

        InsertManualIndex(data: ManualIndexInsertInput): String

        UpdateManualIndex(data: ManualIndexUpdateInput): Int

        DeleteManualIndex(data: ManualIndexUpdateInput): Int

        InsertBranch(branch: BranchInsertInput): String

        UpdateBranch(branch: BranchUpdateInput): Int

        DeleteBranch(branch: BranchUpdateInput): Int

        UpdateListPointBranch(list: ListPointBranchUpdateInput): Int
    }
`;
