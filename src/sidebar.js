import React, { Component } from 'react';

//The component renders the list of locations
class SideList extends Component {
	render() {
		return(
			 <div key={this.props.venue.venue.id} className='element' onClick={this.props.handleClick}>
			 <button tabIndex='0' id={this.props.venue.venue.id} className='name' onClick={this.props.handleClick}>{this.props.venue.venue.name}</button>
            </div>)
	}
}
export default SideList