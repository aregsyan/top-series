import testCases from './testCases';
import {tmdbFetcher, mongoDb} from '../../../src/lib';
import {TopEpisodesService, PopularSeriesService} from '../../../src/services';

const getTvDetails = jest.spyOn(tmdbFetcher, 'getTvDetails') as jest.Mock<any>;
const getSeasonDetails = jest.spyOn(tmdbFetcher, 'getSeasonDetails')  as jest.Mock<any>;
mongoDb.getDB = jest.fn();

jest
    .spyOn(TopEpisodesService.prototype as any, 'saveEpisodesDb')
    .mockImplementation(() => {});
jest
    .spyOn(PopularSeriesService as any, 'updateSeriesMetrics')
    .mockImplementation(() => {});
jest
    .spyOn(TopEpisodesService.prototype as any, 'checkInDb')
    .mockImplementation(() => {});


describe('Top Episodes', () => {
        it('Return 20 episodes in case of more then 20 episodes', async () => {
            const seriesId = testCases.case1.seriesId;
            getTvDetails.mockReturnValueOnce(testCases.case1.tvDetails);
            getSeasonDetails.mockReturnValueOnce(testCases.case1.seasonsDetails[0]);
            getSeasonDetails.mockReturnValueOnce(testCases.case1.seasonsDetails[1]);
            getSeasonDetails.mockReturnValueOnce(testCases.case1.seasonsDetails[2]);
            const instance = new TopEpisodesService(seriesId);
            const result = await instance.getTopEpisodes();
            // @ts-ignore
            const res = result.episodes.map(it => it.averageVotes);
            const dres = testCases.case1.result.episodes
                .map((it) => it.averageVotes);
            expect(res).toEqual(dres);
        });
        it('Return less then 20 episodes in case of less then 20 episodes', async () => {
            const seriesId = testCases.case2.seriesId;
            getTvDetails.mockReturnValueOnce(testCases.case2.tvDetails);
            getSeasonDetails.mockReturnValueOnce(testCases.case2.seasonsDetails[0]);
            getSeasonDetails.mockReturnValueOnce(testCases.case2.seasonsDetails[1]);
            getSeasonDetails.mockReturnValueOnce(testCases.case2.seasonsDetails[2]);
            const instance = new TopEpisodesService(seriesId);
            const result = await instance.getTopEpisodes();
            // @ts-ignore
            const res = result.episodes.map(it => it.averageVotes);
            const dres = testCases.case2.result.episodes
                .map((it) => it.averageVotes);
            expect(res).toEqual(dres);
        });
});
