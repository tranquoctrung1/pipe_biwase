const SiteModel = require('../../models/Site.model');
const ListPointPipeModel = require('../../models/ListPointPipe.model');
const PipeModel = require('../../models/Pipe.model');

module.exports = {
    Query: {
        GetSites: async (parent, {}, context, info) => {
            return await SiteModel.GetSites();
        },

        GetSiteAndChannel: async (parent, {}, context, info) => {
            const result = [];

            const sites = await SiteModel.GetSitesNotConnectPoint();
            const pipes = await PipeModel.GetPipes();
            const listPointPipe = await ListPointPipeModel.GetListPointPipes();

            for (const site of sites) {
                let PipeName = '';
                let PipeId = '';
                let SizePipe = null;
                let LengthPipe = null;

                const findPointPipe = listPointPipe.find(
                    (el) => el.PointId === site._id.toString(),
                );

                if (findPointPipe !== undefined) {
                    const findPipe = pipes.find(
                        (el) => el._id.toString() === findPointPipe.PipeId,
                    );

                    if (findPipe !== undefined) {
                        PipeId = findPipe.PipeId;
                        PipeName = findPipe.Name;
                        SizePipe = findPipe.Size;
                        LengthPipe = findPipe.Length;
                    }
                }

                const obj = {
                    ...site,
                    PipeName: PipeName,
                    PipeId: PipeId,
                    SizePipe: SizePipe,
                    LengthPipe: LengthPipe,
                };

                result.push(obj);
            }

            return result;
        },
        GetSiteIsMeter: async (parent, {}, context, info) => {
            return await SiteModel.GetSiteIsMeter();
        },
        GetSiteIsMeterTotal: async (parent, {}, context, info) => {
            return await SiteModel.GetSiteIsMeterTotal();
        },
        GetSiteIsMeterTotalBranch: async (parent, {}, context, info) => {
            return await SiteModel.GetSiteIsMeterTotalBranch();
        },
        GetSiteIsManualMeter: async (parent, {}, context, info) => {
            return await SiteModel.GetSiteIsManualMeter();
        },
    },
    Mutation: {
        InsertSite: async (parent, { site }, context, info) => {
            return SiteModel.Insert(site);
        },
        UpdateSite: async (parent, { site }, context, info) => {
            return SiteModel.Update(site);
        },
        DeleteSite: async (parent, { site }, context, info) => {
            return SiteModel.Delete(site);
        },
    },
};
