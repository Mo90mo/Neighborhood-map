import React, { Component } from 'react';
import './App.css';

//The component renders the Info when a list item is clicked
class InfoWindow extends Component {
	render() {
		return(
			<div>
           		<h3 tabIndex='1'>{this.props.selectedVenue[0].venue.name}</h3>
				<p tabIndex='1'>{this.props.selectedVenue[0].venue.location.address}</p>
				<p tabIndex='1'>{this.props.hours}</p>
				<h4 tabIndex='1'>Reviews (from Foursquare)</h4>
				{this.props.tips.map((item) => {
					return(
						<div key={item.id} className='tips'>
							<img tabIndex='1' className='images'src={item.photourl} alt={this.props.selectedVenue[0].venue.name}/>
							<p tabIndex='1' className='tips-Text'>{item.text}</p>
							<p tabIndex='1'>{item.user.firstName} {item.user.lastName}</p>
						</div>
					)
				})}	
			</div>
		)
	}		
}


export default InfoWindow;