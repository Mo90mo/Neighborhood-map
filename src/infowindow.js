import React, { Component } from 'react';
import './App.css';



class InfoWindow extends Component {
	
	render() {
		return(
			<div>
				<h3>{this.props.selectedVenue[0].venue.name}</h3>
				<p>{this.props.selectedVenue[0].venue.location.address}</p>
				
				<h4>What people say about the place</h4>
				
					{this.props.tips.map((item) => {
						return(

						<div key={item.id} className='tips'>
							<img className='images'src={item.photourl} />
							<p className='tips-Text'>{item.text}</p>
							<p>{item.user.firstName} {item.user.lastName}</p>
						</div>)
						}
				)}
				
				
			</div>
		)
	}		
}


export default InfoWindow;