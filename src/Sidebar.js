import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {
	
	render() {
		return (
			<div className='list'>
          <ul className='res-list' >
            {this.props.list.map((item) => {
              return (
              <li key={item.name}>{item.name}</li>)
            })}
          </ul>
          <ul className='sup-list'>
            <li></li>
          </ul>
        </div>  )
	}
}

export default Sidebar