export const stringifyQueryparams = payload => {
    let stringified = Object.keys(payload).reduce( 
        (acc, ele) =>  { 
            acc += `${ele}=${payload[ele]}&` ;
            return acc;
        } , "");
    // remove extra & at the end
    let urlStringParams =  '?' + stringified.slice(0, -1);
    return urlStringParams;
}