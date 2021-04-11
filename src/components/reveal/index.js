import React from 'react';
import '../../index.css';
import CancelIcon  from '@material-ui/icons/Cancel';
import Card from '../card';

import {baseURL} from '../../utils';

class Reveal extends React.Component{

    constructor(){
        super();
        this.state = {};
        this.divRef = React.createRef();
    }

    updateImageDetails = () => {
        const {imageDetails = {}} = this.props;
        if(imageDetails.download_url){
            const { dimensions } = this.state;
            if(dimensions){
                let {height, width} = dimensions;
                let currentImgUrl = imageDetails.download_url || baseURL;
                let updatedImageUrl = `${currentImgUrl.split('id/')[0]}id/${imageDetails.id}/${height}/${width}`    
                this.setState({imageDetails : { ... imageDetails , imageUrl: updatedImageUrl } })                
            } else{
                this.setState({imageDetails : { ... imageDetails , imageUrl: imageDetails.download_url }})
            }
        }
    }

    componentDidMount(){
        if(this.divRef.current){
            let el = this.divRef.current;
            let width = Math.round(el.getBoundingClientRect().width);
            let height = Math.round(el.getBoundingClientRect().height);
            this.setState({});
            let { imageDetails = {}} = this.props;
            let currentImgUrl = this.props.imageDetails.download_url || "https://picsum.photos/";
            let updatedImageUrl = `${currentImgUrl.split('id/')[0]}id/${imageDetails.id}/${height}/${width}`
            this.setState({
                imageDetails : {...imageDetails, imageUrl : updatedImageUrl },
                dimensions : {width,height } 
            });
        }
        // this.updateImageDetails();
    }

    componentDidUpdate(){
        this.updateImageDetails();
    }

    shouldComponentUpdate(prevPros,prevState){
        if(prevState && prevState.imageDetails && this.state.imageDetails && prevPros.imageDetails.id == this.state.imageDetails.id){
            return false;
        }
        return true;
    }

    render (){
        const { imageDetails = {} } = this.state;
        let repeatingVar = Math.round(Math.random()*10);
        let repeatingItems = [];
        for(let i=0;i<repeatingVar;i++){
            repeatingItems.push(<Card disableClick={true} imageDetails={imageDetails} /> )
        }
        return (
            <div className="reveal-component" >
            <div ref={this.divRef}> 
            <div  className="revel-img" style={{backgroundImage : `url(${imageDetails.imageUrl})`}}>
                <div onClick={this.props.hideReveal} className="reveal-image--crossBtn"> <CancelIcon />  </div>
            </div>
            </div>
            <div style={{margin: "5px 10px"}}> {'Related Images'} </div>
            <div className="list-container"> 
                { imageDetails.imageUrl && repeatingItems}
            </div>
          </div>
        )
    }

}

export default Reveal;