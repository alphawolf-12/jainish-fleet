import axios from 'axios';
import { stringifyQueryparams } from '../utils';
const instace = axios.create({
    baseURL: 'https://picsum.photos'
})

export const fetchListOfImages = payload => {
    return instace.get('/v2/list' + stringifyQueryparams(payload));
}

export const fetchImage = id => {
    return instace.get(`/id/${id}`);
}