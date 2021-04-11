import React, {Fragment, PureComponent} from 'react';
import queryString from 'query-string';
import apis from './apis';

import {history, stringifyQueryparams} from './utils';

import Card from './components/card';
import Reveal from './components/reveal';
import { Error } from './components/common';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


import './index.css';
class App extends PureComponent {
  constructor(){
    super();
    let stringParams = queryString.parse(window.location.search);
    this.state = { 
      page: stringParams.page ? isNaN(stringParams.page) ? 1 :  Math.abs (stringParams.page ): 1,
      limit: stringParams.limit ? isNaN(stringParams.limit) ? 30 :  Math.abs (stringParams.limit ) : 30,
      showRevealComponent : stringParams['reveal-image-id'] ? true : false,
      revealImageID: stringParams['reveal-image-id'],
      listOfImages: [],
      imagesFetchProgress: true,
    }
  }

  componentDidMount(){
    const { page, limit } = this.state;
    apis.fetchListOfImages({page, limit}).then( res => {
      this.setState({
        listOfImages : res.data, 
        imagesFetchProgress: false, 
        imagesFetchError : false,
        imagesFetchErrorMsg: undefined
      }); 
    }).catch(err => {
      this.setState({ 
        imagesFetchProgress: false, 
        imagesFetchError : true, 
        imagesFetchErrorMsg:  JSON.stringify(err) 
     });
    })
  }

  imageInFocus = imageDetails => {
    let newStringParams = queryString.parse(window.location.search);
    newStringParams['reveal-image-id'] = imageDetails.id;
    // Update the params in history
    history.replace({
      pathname : window.location.pathname,
      search: stringifyQueryparams(newStringParams) 
    });
    this.setState({showRevealComponent : true, revealImageId: imageDetails.id})
  }

  hideReveal = ev => {
    let newStringParams = queryString.parse(window.location.search);
    delete newStringParams['reveal-image-id']
    history.replace({
      pathname : window.location.pathname,
      search: stringifyQueryparams(newStringParams) 
    });
    ev.preventDefault();
    this.setState({showRevealComponent : false, revealImageId: undefined});
  }

  handlePagination = page => {
    this.setState({page});
    let newStringParams = queryString.parse(window.location.search);
    newStringParams['page'] = page;
    newStringParams['limit'] = 30;
    history.replace({
      pathname : window.location.pathname,
      search: stringifyQueryparams(newStringParams) 
    });
  }
  
  renderPage = () => {
    const {listOfImages, showRevealComponent, revealImageId, page} = this.state;
    let imageDetails =  revealImageId ?  listOfImages.filter( ele => ele.id == revealImageId)[0] : undefined; 
    return (
        <div className="page-settings">
          <div style={{width : showRevealComponent ? "72%" : "100%", display : "grid" }}>
            <div className="list-container"> 
              {listOfImages.map( ele => <Card imageInFocus={this.imageInFocus} imageDetails={ele} /> )}
            </div>
            <div style={{ display : "flex" , justifyContent :"center"}}> 
              <button className="pagination-icon" disabled={page ==1 } onClick={ev => {
                ev.preventDefault(); 
                this.handlePagination(page-1)
                }}>
                <NavigateBeforeIcon />
              </button>
              <button className="pagination-icon" onClick={ev => {
                ev.preventDefault(); 
                this.handlePagination(page+1)
                }}>
                <NavigateNextIcon />
              </button>
            </div>
          </div>
          <Reveal showRevealComponent={showRevealComponent} imageDetails = {imageDetails} hideReveal={this.hideReveal} />
        </div>
      );
  }

  render(){
    const {imagesFetchProgress , imagesFetchError, imagesFetchErrorMsg  } = this.state;
    return (
      <div> 
        {imagesFetchProgress && <div> {'Spinner'} </div>} 
        {!imagesFetchProgress && imagesFetchError && <Error errorMessage={imagesFetchErrorMsg} />}
        {!imagesFetchProgress && !imagesFetchError ? this.renderPage() : ''}
      </div>
    );
  }
}

export default App;
