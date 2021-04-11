const INITIAL_STATE = {
    listOfImages: []
}

const reducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case 'FETCH_IMAGES_INPROGRESS': {
            return {
                ...state, 
                
            }
        }
    }

}