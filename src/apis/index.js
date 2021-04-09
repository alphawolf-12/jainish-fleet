import axios from 'axios';
import { stringifyQueryparams } from '../utils';
const instace = axios.create({
    baseURL: 'https://picsum.photos/v2'
})

const fetchListOfImages = payload => {
    return instace.get('/list' + stringifyQueryparams(payload));
}

export default {
    fetchListOfImages
};