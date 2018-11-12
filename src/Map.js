import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';


class MapContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showInfo: false,
			clickedMarker: {},
			selectedPlace: {},
			markerObjects: []
		}
		this.onMarkerClick = this.onMarkerClick.bind(this)
		this.onMarkerMounted = element => {
      		this.setState(prevState => ({
        	markerObjects: [...prevState.markerObjects, element.marker]
      			}))
    	};
  	}
	
	onMarkerClick(props, marker, e){
		this.setState({
			selectedPlace: props,
			clickedMarker: marker,
			showInfo: true,
		})
		console.log(this.state.clickedMarker)
	}
	
	render() {

    	return (
    	<div className='container'>
     		<Map 
     		google={this.props.google}
      		zoom={12}
      		initialCenter={{lat: 52.370216, lng: 4.895168}}>
    <Marker 
      		className='marker'
      		onClick={this.onMarkerClick}
     		name={'Anne&Max Amsterdam Zuid'} 
      		position={{lat: 52.3519133, lng: 4.8538804}}
      		cat={'cafè'}
      		/>
	      	<Marker 
	      	className='marker'
	      	onClick={this.onMarkerClick}
	      	name={'Dignita VondelPark'} 
	     	position={{lat: 52.351852, lng: 4.857204}}
	      	cat={'cafè'}/>
	      <Marker 
	      className='marker'
	      onClick={this.onMarkerClick}
	      name={'ROOTS'} 
	      position={{lat: 52.3533437, lng: 4.8535822}}
	      cat={'cafè'}

	      />
      		

      			<InfoWindow 
	      		marker={this.state.clickedMarker}
	      		visible={this.state.showInfo}
	      		onClose= {this.onInfoWindowClose}>
      				<div>
      					<p>{this.state.selectedPlace.name}</p>
      				</div>
     		 	</InfoWindow>
     		 	
      		</Map>
      	</div>
      	)
    }
}


     	
    


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDVCA3WbyUDIxb9PCdD4Nnt8OEOtG8Ajcg')
})(MapContainer)
