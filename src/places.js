import React, {Component} from 'react';

class MapContainer extends Component {
	
	initMap() {
		map = new google.maps.Map(document.getElementByClassName('.map'), {
			zoom: 13,
			center: new google.maps.LatLng(lat: 52.370216, lng: 4.895168),
			mapTypeId: 'roadmap'
		});
	}
	render(){
		return(
			<div className='map'></div>
			)
	}

}

export default MapContainer;

{this.props.initialList.map(item => (
     	<Marker 
     	key={item.name}
     	className='marker'
      	onClick={this.onMarkerClick}
      	name={item.name} 
      	position={item.position}
      	cat={item.cat} />
    	 ))}

// <Marker 
      // className='marker'
      // onClick={this.onMarkerClick}
      // name={'Anne&Max Amsterdam Zuid'} 
      // position={{lat: 52.3519133, lng: 4.8538804}}
      // cat={'cafè'}
      // />
      // <Marker 
      // className='marker'
      // onClick={this.onMarkerClick}
      // name={'Dignita VondelPark'} 
      // position={{lat: 52.351852, lng: 4.857204}}
      // cat={'cafè'}

      // />
      // <Marker 
      // className='marker'
      // onClick={this.onMarkerClick}
      // name={'ROOTS'} 
      // position={{lat: 52.3533437, lng: 4.8535822}}
      // cat={'cafè'}

      // />


      	{initialList.map(item => (
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
       onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}