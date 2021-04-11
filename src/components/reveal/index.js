import React from 'react';
import '../../index.css';
import CancelIcon  from '@material-ui/icons/Cancel';

import Card from '../card';

export default function Reveal (props) {
    const {imageDetails = {}, showRevealComponent} = props;
    console.log(imageDetails);
    let repeatingVar = Math.round(Math.random()*10);
    let repeatingItems = [];
    for(let i=0;i<repeatingVar;i++){
        repeatingItems.push(<Card imageDetails={imageDetails} /> )
    }
    return (
        <div className="reveal-component" style={{display : showRevealComponent ? 'block' : 'none'}} > 
        <div className="revel-img" style={{backgroundImage : `url(${imageDetails.download_url})`}}>
            <div onClick={props.hideReveal} className="reveal-image--crossBtn"> <CancelIcon />  </div>
        </div>
        <div style={{margin: "5px 10px"}}> {'Related Images'} </div>
        <div className="list-container"> 
            {repeatingItems}
        </div>
      </div>
    )

}