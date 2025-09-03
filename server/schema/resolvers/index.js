const SiteResolver = require('./Site.resolver');
const ChannelResolver = require('./Channel.resolver');
const NoteTypeResolver = require('./NoteType.resolver');
const DisplayGroupResolver = require('./DisplayGroup.resolver');
const GroupPipeResolver = require('./GroupPipe.resolver');
const PipeResolver = require('./Pipe.resolver');
const ListPointPipeResolver = require('./ListPointPipe.resolver');
const DataDrawPipeResolver = require('./DataDrawPipe.resolver');
const DataLoggerResolver = require('./DataLogger.resolver');
const DataManualResolver = require('./DataManual.resolver');
const RoleResolver = require('./Role.resolver');
const UserResolver = require('./User.resolver');
const LoginResolver = require('./Login.resolver');
const IndexLoggerResolver = require('./IndexLogger.resolver');
const DailyDataResolver = require('./DailyData.resolver');
const QuantityTBResolver = require('./QuantityTB.resolver');
const QuantityNTResolver = require('./QuantityNT.resolver');
const ManualIndexResolver = require('./ManualIndex.resolver');
const SiteAndIndexManualResolver = require('./SiteAndIndexManual.resolver');
const QuantityMNResolver = require('./QuantityNM.resolver');
const BranchResolver = require('./Branch.resolver');
const ListPointBranchResolver = require('./ListPointBranch.resolver');
const LostBranchResolver = require('./LostBranch.resolver');

const NestedResolver = require('./Nested.resolver');

module.exports = {
    Query: {
        ...SiteResolver.Query,
        ...ChannelResolver.Query,
        ...NoteTypeResolver.Query,
        ...DisplayGroupResolver.Query,
        ...GroupPipeResolver.Query,
        ...PipeResolver.Query,
        ...ListPointPipeResolver.Query,
        ...DataDrawPipeResolver.Query,
        ...DataLoggerResolver.Query,
        ...DataManualResolver.Query,
        ...RoleResolver.Query,
        ...UserResolver.Query,
        ...LoginResolver.Query,
        ...IndexLoggerResolver.Query,
        ...DailyDataResolver.Query,
        ...QuantityTBResolver.Query,
        ...QuantityNTResolver.Query,
        ...ManualIndexResolver.Query,
        ...SiteAndIndexManualResolver.Query,
        ...QuantityMNResolver.Query,
        ...BranchResolver.Query,
        ...ListPointBranchResolver.Query,
        ...LostBranchResolver.Query,
    },
    Mutation: {
        ...SiteResolver.Mutation,
        ...DisplayGroupResolver.Mutation,
        ...ChannelResolver.Mutation,
        ...GroupPipeResolver.Mutation,
        ...PipeResolver.Mutation,
        ...ListPointPipeResolver.Mutation,
        ...DataManualResolver.Mutation,
        ...UserResolver.Mutation,
        ...DataLoggerResolver.Mutation,
        ...ManualIndexResolver.Mutation,
        ...BranchResolver.Mutation,
        ...ListPointBranchResolver.Mutation,
    },

    SiteAndChannel: {
        Channels: async (site) => {
            return await NestedResolver.GetChannelByLoggerId(site.LoggerId);
        },
        StatusError: async (site) => {
            return await NestedResolver.SetStatusError(
                site.LoggerId,
                site.TimeDelay,
            );
        },
    },
};
