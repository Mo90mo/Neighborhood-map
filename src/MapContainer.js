import React, { Component } from 'react';
import './App.css';
/* global google */ 


let markers = [];

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [markers],
    }
  }
  componentDidMount() {
    console.log(this.props.initialList)
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.370216, lng: 4.895168},
      zoom: 13,
    });
    let infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    let request = {
      location: {lat: 52.370216, lng: 4.895168},
      radius: 1500,
      type: ['store'|| 'cafe'|| 'restaurant'|| 'supermarket' || 'concept store' ],
      keyword: ['vegan'|| 'organic' ||'vegetarian' || 'green' || 'sustainable' || 'bio']
    };
    function callback(results, status) {
      console.log(status, results);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i += 1 ) {
          markers.push(results[i]);
          addMarker(results[i]);
        }
      }
    }
    service.nearbySearch(request, callback)
    function addMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location  
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
    console.log(this.state.list)
  }
  render() {
    return (
      <div id='map'>
        <div className='markers'></div>
        <div id='infowindow'></div>
      </div>
    )
  }
}

export default Map