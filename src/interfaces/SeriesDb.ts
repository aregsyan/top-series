import {ObjectID} from 'mongodb';
import SeriesInterface from './Series';

interface SeriesDb extends SeriesInterface {
    _id: ObjectID;
    seriesId: string;
}

export default SeriesDb;
