import axios from 'axios';
import { stringifyQueryparams } from '../utils';
const instace = axios.create({
    baseURL: 'https://picsum.photos/v2'
})

export const fetchListOfImages = payload => {
    return instace.get('/list' + stringifyQueryparams(payload));
}
