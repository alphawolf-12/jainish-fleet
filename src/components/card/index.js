import React from 'react';
import '../../index.css';
import { baseURL } from '../../utils'
class Card extends React.Component{
    constructor() {
        super();
        this.state = {
            height: 200, 
            width: 200,
            imageUrl: ""
        }
        this.divRef = React.createRef();
    }

    updateImageDetails = () =>{ 
        const {dimensions} = this.state;
        if(dimensions){
            const {height, width} = dimensions;
            let { imageDetails = {}} = this.props;
            let currentImgUrl = this.props.imageDetails.download_url || baseURL;
            let updatedImageUrl = `${currentImgUrl.split('id/')[0]}id/${imageDetails.id}/${height}/${width}`
            this.setState({imageUrl : updatedImageUrl });
        }
    }

    componentDidMount(){
        if(this.divRef.current){
            let el = this.divRef.current;
            let width = Math.round(el.getBoundingClientRect().width);
            let height = Math.round(el.getBoundingClientRect().height);
            let { imageDetails = {}} = this.props;
            let currentImgUrl = this.props.imageDetails.download_url || baseURL;
            let updatedImageUrl = `${currentImgUrl.split('id/')[0]}id/${imageDetails.id}/${height}/${width}`
            this.setState({imageUrl : updatedImageUrl, dimensions : {height, width }});
        }
    }

    componentDidUpdate(){
        this.updateImageDetails();
    }

    shouldComponentUpdate(prevPros, prevState){
        if((prevPros && prevPros.imageDetails && this.props.imageDetails && 
            prevPros.imageDetails.id == this.props.imageDetails.id) && 
            (prevState && prevState.imageUrl == this.state.imageUrl ) ){
                return false;
            }
        return true;
    }

    onLoad = ({target: img }) =>  {
        // const {imageDetails} = this.props;
        // let newImageUrl = `${imageDetails.download_url.split('id')[0]}id/${imageDetails.id}/${img.offsetHeight}/${img.offsetWidth}`;
        // this.setState({ imageUrl : newImageUrl})
    }

    render(){
        const { imageDetails = {}, disableClick} = this.props;
        const {imageUrl} = this.state;
        return (
        <div className="card-container" style={{cursor : disableClick && "text" }} onClick={ ev =>  { ev.preventDefault(); this.props.imageInFocus(imageDetails)}}>
            <div ref = {this.divRef} className="image-container" data-test={imageDetails.download_url}>
                {imageUrl &&  <img onLoad={this.onLoad} style={{cursor : disableClick && "text" }} className="image" 
                    loading="lazy" src={imageUrl} alt={imageDetails.author}/> }
            </div>
            <div style={{cursor : disableClick && "text" }} className="image-description"> 
                {imageDetails.author} 
            </div>
        </div>
        )
    }

}


export default Card;