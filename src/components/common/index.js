import React from 'react';

export function Error(props){
    return <div> {props.errorMessage} </div>
}

export function EmptyResult(){
    return (
        <div style={{marginTop: "30%", marginBottom: "20%"}}>
            <div style={{textAlign : "center"}}> 
                <div className="empty--title"> {"Argh!!!!!!!!!"} </div> 
                <div className="empty--message"> {'Sorry We have No More Images to Show'} </div>   
            </div>
        </div>
    );
}
