
import { fetchListOfImages } from '../apis';

export const fetchList = (params) => dispatch => {

    dispatch({
        type: 'FETCH_IMAGES_INPROGRESS'
    })

    fetchListOfImages(params).then(res => {
        dispatch({
            type: 'FETCH_IMAGES_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: "FETCH_IMAGES_ERROR",
            payload: JSON.stringify(err.message.err)
        })
    })

}