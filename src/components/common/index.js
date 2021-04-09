import React from 'react';

export function Error(props){
    return <div> {props.errorMessage} </div>
}

export function EmptyResult(){
    return <div> {'No Data Found'} </div>
}
