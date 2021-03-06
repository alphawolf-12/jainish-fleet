import React, {Fragment, PureComponent} from 'react';
import queryString from 'query-string';
import { fetchListOfImages }from './apis';

import {history, stringifyQueryparams} from './utils';

import Card from './components/card';
import Reveal from './components/reveal';
import { EmptyResult, Error } from './components/common';

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
      revealImageId: stringParams['reveal-image-id'],
      listOfImages: {},
      imagesFetchProgress: true,
    }
  }

  componentDidMount(){
    const { page, limit, listOfImages = {} } = this.state;
    fetchListOfImages({page, limit}).then( res => {
      listOfImages[page] = res.data;
      this.setState({
        listOfImages : {...listOfImages}, 
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
    ev.preventDefault();
    this.setState({showRevealComponent : false, revealImageId: undefined});
    let newStringParams = queryString.parse(window.location.search);
    delete newStringParams['reveal-image-id'];
    history.replace({
      pathname : window.location.pathname,
      search: stringifyQueryparams(newStringParams) 
    });
  }

  handlePagination = page => {
    const {listOfImages = []} = this.state;
    this.setState({page, showRevealComponent: false});
    let newStringParams = queryString.parse(window.location.search);
    newStringParams['page'] = page;
    newStringParams['limit'] = 30;
    delete newStringParams['reveal-image-id']
    history.replace({
      pathname : window.location.pathname,
      search: stringifyQueryparams(newStringParams) 
    });
    if(!listOfImages[page]){
      this.setState({imagesFetchProgress : true})
      fetchListOfImages({page, limit: 30}).then(res => {
        listOfImages[page] = res.data;
        this.setState({  listOfImages : {...listOfImages}, imagesFetchProgress: false, imagesFetchError: false })
      }).catch(err => {
        this.setState({  imagesFetchProgress: false, imagesFetchError: true, imagesFetchError: JSON.stringify(err.message)  })
      })
    }

  }
  
  renderPage = () => {
    const {listOfImages = {}, showRevealComponent, revealImageId, page} = this.state;
    let imageDetails =  revealImageId ?  listOfImages[page].filter( ele => ele.id == revealImageId)[0] : undefined; 
    return (
        <div className="page-settings">
          <div style={{width : showRevealComponent ? "72%" : "100%", display : "grid" }}>
           <Fragment>
              {listOfImages[page].length > 0 ? 
                <div className="list-container"> 
                  {(listOfImages[page] || []).map( ele => <Card imageInFocus={this.imageInFocus} imageDetails={ele} /> )}
                </div> 
                : <EmptyResult />
              }  
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
              </Fragment>
          </div>
          {showRevealComponent &&   <Reveal imageDetails = {imageDetails} hideReveal={this.hideReveal} />}
         
        </div>
      );
  }

  render(){
    const {imagesFetchProgress , imagesFetchError, imagesFetchErrorMsg  } = this.state;
    return (
      <div> 
        {imagesFetchProgress && <div className="spinner--position">  <div className="spinner" /> </div> } 
        {!imagesFetchProgress && imagesFetchError && <Error errorMessage={imagesFetchErrorMsg} />}
        {!imagesFetchProgress && !imagesFetchError ? this.renderPage() : ''}
      </div>
    );
  }
}

export default App;
