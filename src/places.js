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