import React, {Component} from 'react';
import './App.css';
import { GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
/* global google */

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showInfo: false,
			clickedMarker: {},
			selectedPlace: {},
			markerObjects: [],
			initialList: [
        {
          name:'Dignita Vondelpark',
          position: {lat: 52.351852, lng: 4.857204},
          cat: 'res',
        }, 
        { 
          name: 'Roots',
          position: {lat: 52.3533437, lng: 4.8535822},
          cat: 'res'
        },
        {
          name: 'Anne&Max Amsterdam Zuid',
          position: {lat: 52.3519133, lng: 4.8538804},
          cat: 'res'
        } 
      ],
    };
		this.onMarkerClick = this.onMarkerClick.bind(this);
  }
	componentDidMount() {
		console.log(this.state.initialList)
    // let service = new google.maps.places.PlacesService(GoogleMap);
    // let request = {
    //   location: {lat: 52.370216, lng: 4.895168},
    //   radius: 500,
    //   type: ['store', 'cafe', 'restaurant'],
    //   keyword: ['vegan', 'organic', 'vegetarian', 'green']
    // }
    // function callback(status, results) {
    //   if(status === google.maps.places.PlacesService.OK) {
    //     for(var i = 0; i< results.length; i++) {
    //       new google.maps.Marker({
    //         map: map,
    //         postion: place.geometry.location
    //       })
    //     }
    //   }
    // }
    // service.nearbySearch(request, callback)
    
    
	}
	onMarkerClick(props, marker, e){
		this.setState({
			selectedPlace: props,
			clickedMarker: marker,
			showInfo: true,
		})
		console.log(this.props.order)
	}

	render() {
		// const {initialList = []} = this.props;
    	return (
    	<div className='container'>
      <withGoogleMap props>
     		<GoogleMap 
     		google={window.google}
      		zoom={12}
      		initialCenter={{lat: 52.370216, lng: 4.895168}}
      		>
      		{this.state.initialList.map(item => (
      			<Marker 
     		key={item.name}
     		className='marker'
      		onClick={this.onMarkerClick}
      		name={item.name} 
      		position={item.position}
      		cat={item.cat} />))}
      		
      			<InfoWindow 
	      		marker={this.state.clickedMarker}
	      		visible={this.state.showInfo}
	      		onClose= {this.onInfoWindowClose}>
      				<div>
      					<p>{this.state.selectedPlace.name}</p>
      				</div>
     		 	</InfoWindow>	
      		</GoogleMap>
          </withGoogleMap>
      	</div>
     	)
    }
}


     	

export default MapContainer
