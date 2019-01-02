import React, { Component } from 'react';
import './App.css';
import Map from './MapContainer.js';
import InfoWindow from './infowindow.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      filteredList: [],
      display: false,
      selectedVenue: [],
      hours: [],
      showMenu: 'hiddenInfo',
      tips: [],
    };
     this.handleSearch = this.handleSearch.bind(this);
     this.handleClick = this.handleClick.bind(this);
     this.closeInfowindow = this.closeInfowindow.bind(this);
     this.handleListMarkers = this.handleListMarkers.bind(this);
  }
  componentDidMount() {
    this.getPlaces();
  }

  //Request to Foursquare API for the default places to mark on the map
  getPlaces() {
    let setVenueState = this.setState.bind(this);
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'SBHRXHJ1MGGVFHO43FPR1G3N32QO1AO4AFN35X1GGV4XUS4K',
      client_secret: 'CMWVLHG5DSUMJ4LNFD015Q4G1G2JW4LIDNOI3OBARGTT2QPD',
      ll: '52.3791316, 4.8980833',
      v: '20130619',
      radius: 7000,
      limit: 100,
      query: 'posto per la colazione',
     }
    fetch(venuesEndpoint + new URLSearchParams(params), {
      method: 'GET'
      }).then(response => response.json()).then(response => {
      setVenueState({venues: response.response.groups[0].items, filteredList: response.response.groups[0].items});
    });
  }
  handleListMarkers(marker, i) {
    var updatedList = this.state.venues;
      updatedList = updatedList.filter((item => {
        return item.venue.id.search(i) !== -1;
       }));
        console.log(updatedList)
  }
  //Changes the list items and the markers once the input field is modified
  handleSearch(e) {
    var updatedList = this.state.venues;
    updatedList = updatedList.filter((item => {
      return item.venue.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    }));
    this.setState({venues: updatedList});
    if(e.target.value === '') {
      this.setState({venues: this.state.filteredList, showMenu: 'hiddenInfo'})
    }
  }
  //Called when an item on the list is clicked
  handleClick(e) {
    var selection = this.state.venues;
    selection = selection.filter((item => {
      return item.venue.name.toLowerCase().search(e.target.innerHTML.toLowerCase().toString()) !== -1;
    }));
    this.setState({showMenu: 'visibleMenu', display: true});
    this.getHours(selection[0].venue.id);
    this.getTips(selection[0].venue.id);
    this.setState({selectedVenue: selection});
  }
  
  //Request to Foursquare API for venues' opening hours
  getHours(selection) {
    let setHoursState = this.setState.bind(this);
    let source = 'https://api.foursquare.com/v2/venues/'+selection+'/hours?';
    let parameters = {
      client_id: 'SBHRXHJ1MGGVFHO43FPR1G3N32QO1AO4AFN35X1GGV4XUS4K',
      client_secret: 'CMWVLHG5DSUMJ4LNFD015Q4G1G2JW4LIDNOI3OBARGTT2QPD',
      v: '20130619',
    };
    fetch(source + new URLSearchParams(parameters), {
      method: 'GET'
      }).then(response => response.json()).then(response => {
        if(response.length > 0) {
          setHoursState({hours: response.response.hours.timeframes});
        console.log(response)
        }
        else { setHoursState({hours: 'no hours available'})}
        
      }).catch(setHoursState({hours: null}))
  }
  getTips(selection) {
    let setTipsState = this.setState.bind(this);
    let source = 'https://api.foursquare.com/v2/venues/'+selection+'/tips?';
    let params = {
      client_id: 'SBHRXHJ1MGGVFHO43FPR1G3N32QO1AO4AFN35X1GGV4XUS4K',
      client_secret: 'CMWVLHG5DSUMJ4LNFD015Q4G1G2JW4LIDNOI3OBARGTT2QPD',
      v: '20130619',
      limit: 5,
      lang: ['en'],
      sort: 'popular',

    };
    fetch(source + new URLSearchParams(params), {
     method: 'GET'
    }).then(response=>response.json().then(response=>{
     
        setTipsState({tips: response.response.tips.items});
       console.log(response);
      
    }))
      }

  closeInfowindow() {
    this.setState({showMenu: 'hiddenInfo'})
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My neighborhood</h1>
          <h3>Fancy a nice breakfast but don't know where to go? Have a look at the coolest breakfast spots in your neighborhood!</h3>
        </header>
        <input 
          aria-label='labelText'
          className='input'
          placeholder='Filter...'
          onChange={this.handleSearch}
        ></input>
        <div className='map-container'>
          <Map id='map' venues={this.state.venues} action={this.handleListMarkers}/>
       </div>
        <div className='sidebar'>
          {this.state.venues.map((item) => {
            return (
            <div key={item.venue.id} className='element' >
            <li className='name' onClick={this.handleClick}>{item.venue.name}</li>
            
            </div>)
          })}
        </div>
        <div className={this.state.showMenu}>
        <button className='closingButton' onClick={this.closeInfowindow}>Close</button>
          {this.state.display ? (<InfoWindow selectedVenue={this.state.selectedVenue} hours={this.state.hours} tips={this.state.tips}/>) : null}
        </div> 
      </div>
    );
  }
}

export default App;
