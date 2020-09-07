import testCases from './testCases';
import {tmdbFetcher, mongoDb} from '../../../src/lib';
import {TopEpisodesModel} from '../../../src/models';

const getTvDetails = jest.spyOn(tmdbFetcher, 'getTvDetails') as jest.Mock<any>;
const getSeasonDetails = jest.spyOn(tmdbFetcher, 'getSeasonDetails')  as jest.Mock<any>;
mongoDb.getDB = jest.fn();

jest
    .spyOn(TopEpisodesModel.prototype as any, 'saveEpisodesDb')
    .mockImplementation(() => {});
jest
    .spyOn(TopEpisodesModel.prototype as any, 'saveReqCount')
    .mockImplementation(() => {});
jest
    .spyOn(TopEpisodesModel.prototype as any, 'checkInDb')
    .mockImplementation(() => {});


describe('Top Episodes', () => {
    Object.values(testCases).forEach(testCase => {
        it(testCase.test, async () => {
            const seriesId = testCase.seriesId;
            getTvDetails.mockReturnValueOnce(testCase.tvDetails);
            getSeasonDetails.mockReturnValueOnce(testCase.seasonsDetails[0]);
            getSeasonDetails.mockReturnValueOnce(testCase.seasonsDetails[1]);
            getSeasonDetails.mockReturnValueOnce(testCase.seasonsDetails[2]);
            const instance = new TopEpisodesModel(seriesId);
            const result = await instance.getTopEpisodes();
            // @ts-ignore
            const res = result.episodes.map(it => it.averageVotes);
            const dres = testCase.result.episodes
                .map((it) => it.averageVotes);
            expect(res).toEqual(dres);
        });
    });
});
