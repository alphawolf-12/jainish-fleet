import React from 'react';
import '../../index.css';

export default function Card (props){
    const { imageDetails = {}} = props;
    return (
    <div className="card-container" onClick={ ev =>  { ev.preventDefault(); props.imageInFocus(imageDetails)}}>
        <div className="image-container">          
            <img className="image" loading="lazy" src={imageDetails.download_url} alt={imageDetails.author}/> 
        </div>
        <div className="image-description"> {imageDetails.author} </div>
    </div>
    )

}
