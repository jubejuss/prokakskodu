import db from '../../db';
import { RandomService } from './interfaces';

const randRandomServices = {
    getAllServices: (): RandomService[] => {
        const { randomServices } = db; // this must be the same as in db
        return randomServices;
    }
}

export default randRandomServices;