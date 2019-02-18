import React, { Component } from 'react';
import './App.css';
import Map from './MapContainer.js';
import InfoWindow from './infowindow.js';
import SideList from './sidebar.js'

/*global google*/
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
      showList: false,
      clicked: '',
      displayedMarkers: [],
      infoWindows: [],
      map: [],
      results: []
    };
     this.handleSearch = this.handleSearch.bind(this);
     this.handleClick = this.handleClick.bind(this);
     this.closeInfowindow = this.closeInfowindow.bind(this);
     this.createMarkersList = this.createMarkersList.bind(this);
     this.createInfoWindowsList = this.createInfoWindowsList.bind(this);
     this.createMap = this.createMap.bind(this);
     this.showList = this.showList.bind(this);  
  }
  componentWillMount() {
    document.title = 'My neighborhood';
  }
  componentDidMount() {
    this.getPlaces();  
  }
  //Request to Foursquare API for the default places to mark on the map
  async getPlaces() {
    let setVenueState = this.setState.bind(this);
    const venuesEndpoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: 'SBHRXHJ1MGGVFHO43FPR1G3N32QO1AO4AFN35X1GGV4XUS4K',
      client_secret: 'CMWVLHG5DSUMJ4LNFD015Q4G1G2JW4LIDNOI3OBARGTT2QPD',
      ll: '51.9236505, 4.4694199',
      v: '20130619',
      radius: 7000,
      limit: 100,
      query: 'palestra',
     }
    try {
      const res = await fetch(venuesEndpoint + new URLSearchParams(params), {
        method: 'GET',
      });
      if(!res.ok) {
        throw Error(res.statusText);
      }
      await res.json().then(response => {
      setVenueState({venues: response.response.groups[0].items, filteredList: response.response.groups[0].items});
      });
    } catch(error) {
      console.log(error)
    }
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
  //it sends request for tips and images of the selected place
  // and selects the marker and infowindow to animate/show on the map
  handleClick(e) {
    var selection = this.state.venues;
    selection = selection.filter((item => {
      return item.venue.id.search(e.target.id) !== -1;
    }));
    var selectedMarker = this.state.displayedMarkers;
    selectedMarker = selectedMarker.filter((item => {
      return item.id.search(e.target.id) !== -1;
    }));
    var selectedInfoWindow = this.state.infoWindows;
    selectedInfoWindow = selectedInfoWindow.filter((item => {
      return item.id.search(e.target.id) !== -1;
    }));
    selectedInfoWindow[0].open(this.state.map, selectedMarker[0])
    selectedMarker[0].setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ selectedMarker[0].setAnimation(null); }, 1400);
    this.setState({selectedVenue: selection});
    this.setState({showMenu: 'visibleMenu', display: true});
    this.getHours(selection[0].venue.id);
    this.getTips(selection[0].venue.id);
  }
  
  //Request to Foursquare API for venues' opening hours
  async getHours(selection) {
    let setHoursState = this.setState.bind(this);
    let source = 'https://api.foursquare.com/v2/venues/'+selection+'/hours?';
    let parameters = {
      client_id: 'SBHRXHJ1MGGVFHO43FPR1G3N32QO1AO4AFN35X1GGV4XUS4K',
      client_secret: 'CMWVLHG5DSUMJ4LNFD015Q4G1G2JW4LIDNOI3OBARGTT2QPD',
      v: '20130619',
    };
    try {
      const res = await fetch(source + new URLSearchParams(parameters), {
        method: 'GET'
      });
      if (!res.ok) {
        throw Error(res.statusText);
      }
      await res.json().then(response => {
        if(response.length > 0) {
          setHoursState({hours: response.response.hours.timeframes});
          console.log(response)
        }
        else { setHoursState({hours: 'no hours available'})}
        })
    } catch(error) {
      setHoursState({hours: 'No opening hours available'});
      console.log(error)
    }
  }
  //Request to Foursquare API for selected venue's tips
  async getTips(selection) {
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
    try {
    const response = await fetch(source + new URLSearchParams(params), {
     method: 'GET'
    });
    if(!response.ok) {
      throw Error(response.statusText);
    } 
    await response.json().then(response=> {
      setTipsState({tips: response.response.tips.items});
    })
    } catch(error) {
      console.log(error);
    }  
  }

  closeInfowindow() {
    this.setState({showMenu: 'hiddenInfo'});
  }
  showList() {
    this.setState({showList: !this.state.showList});
  }
  createMap(map) {
    this.setState({map: map})
  }
  createMarkersList(markers) {
    this.setState({displayedMarkers: markers})
  }
  createInfoWindowsList(infowindows) {
    this.setState({infoWindows: infowindows})
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 tabIndex='0'>My neighborhood</h1>
          <h3 tabIndex='0'>Find a gym in your neighborhood!</h3>
        </header>
        <input 
          role='search'
          aria-label='labelText'
          className='input'
          placeholder='Filter...'
          onChange={this.handleSearch}
        ></input>
        <div className='map-container'>
          <Map id='map' getInfo={this.getPlaceId} venues={this.state.venues} openInfo={this.openInfo} createMap={this.createMap} createMarkersList={this.createMarkersList} createInfoWindowsList={this.createInfoWindowsList} handleMarkerClick={this.handleMarkerClick} clicked={this.state.clicked}/>
       </div>
       <div className='collapsed-sidebar'>
         <p onClick={this.showList} tabIndex='0'>See list</p>
        </div>
        <div className={this.state.showList ? 'sidebar-open' : 'sidebar'}>
        {this.state.venues.length > 0 ? (this.state.venues.map((venue) => 
          <SideList key={venue.venue.id} handleClick={this.handleClick} venue={venue}/>))
           : null }
        </div>
        <div className={this.state.showMenu}>
            <button className='closingButton' onClick={this.closeInfowindow}>Close</button>
            {this.state.display ? (<InfoWindow selectedVenue={this.state.selectedVenue} hours={this.state.hours} tips={this.state.tips}/>) : null}
        </div>
      </div> 
    )
  }
}

export default App;
