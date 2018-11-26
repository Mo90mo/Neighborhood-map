import React, { Component } from 'react';
import './App.css';

import Map from './MapContainer.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      order: 'out',
      initialList: [
        {
          name:'Dignita Vondelpark',
          position: {lat: 52.351852, lng: 4.857204},
          cat: 'res'
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
        },
        {
          name: 'Gustatio',
          position: {lat: 52.3583046, lng: 4.8533045},
          cat: 'res'
        }
      ],
      filteredList: []
    }
     this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.setState({filteredList: this.state.initialList});
    
  }
  handleSearch(e) {
    var updatedList = this.state.initialList;
    updatedList = updatedList.filter((item => {
      return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    }));
    this.setState({filteredList: updatedList});
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My neighborhood</h1>
        </header>
        <input 
          className='input'
          placeholder='Search'
          onChange={this.handleSearch}
        ></input>
        <div className='map-container'>
       
         <Map />
          
        </div>
        <div className='list'>
          <ul className='res-list' >
            {this.state.filteredList.map((item) => {
              return (
              <li key={item.name}>{item.name}</li>)
            })}
          </ul>
          <ul className='sup-list'>
            <li></li>
          </ul>
        </div> 
      </div>
    );
  }
}

export default App;
