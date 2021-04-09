import React, {Fragment, PureComponent} from 'react';
import queryString from 'query-string';
import apis from './apis';

import Card from './components/card';
import { Error } from './components/common';

import './index.css';
class App extends PureComponent {
  constructor(){
    super();
    let stringParams = queryString.parse(window.location.search);
    console.log(window.location.search);
    this.state = {
      page: stringParams.page ? stringParams.page : 1,
      limit: stringParams.limit ? stringParams.limit : 30,
      showRevealComponent : stringParams['reveal-image-id'],
      listOfImages: [],
      imagesFetchProgress: true,
    }
  }

  componentDidMount(){
    const { page, limit, listOfImages } = this.state;
    apis.fetchListOfImages({page, limit}).then( res => {
      this.setState({
        listOfImages : listOfImages.concat(res.data), 
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
 
  renderPage = () => {
    const {listOfImages} = this.state;
    return (
        <div>
          <div className="list-container"> 
            {listOfImages.map( ele => <Card imageDetails={ele} /> )}
          </div>
          <div> 
            {'Pagination'}
          </div>
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
