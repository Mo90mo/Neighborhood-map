import React, { Component } from 'react';
import './App.css';
import {styles} from './styles.js';
/* global google */ 

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMarkers: false,
      map: '',
      venues: [],
    }
  }
  //The function creates the map
  initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.9236505, lng: 4.4694199},
        zoom: 13,
        styles: styles,
    })
    if(map !== undefined) {
        this.props.createMap(map);
        this.setState({showMarkers: true, map: map});
      }
    this.props.createMap(map);
    this.setMarkers(map);
  }
  //The function creates the markers and infowindows for the given locations
  // and add an eventListener to show the infowindow when the marker's clicked
  setMarkers(map) {
    var infowindows = [];
    var markers = [];
    for( var i = 0; i < this.props.venues.length; i += 1) {
      var marker = new google.maps.Marker({
        id: this.props.venues[i].venue.id,
        map: map,
        position: {lat: this.props.venues[i].venue.location.lat, lng: this.props.venues[i].venue.location.lng},
        animation: google.maps.Animation.DROP,
      });
      var content = this.props.venues[i].venue.name + ' - ' + this.props.venues[i].venue.location.address;
      var infoWindow = new google.maps.InfoWindow({
        id: this.props.venues[i].venue.id,
        content: content,
        maxWidth: 200,
      });

      google.maps.event.addListener(marker,'click', (function(marker) {
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(this.setAnimation(null), 750);
        var f = infowindows.filter((item => {
          return item.id.search(this.id) !== -1;
        }))
        console.log(f[0].content);
        infoWindow.setContent(f[0].content);
        infoWindow.open(map, this);   
      }));
      markers.push(marker);
      this.props.createMarkersList(markers);
      infowindows.push(infoWindow);
      this.props.createInfoWindowsList(infowindows); 
    } 
  }
  
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.venues !== this.props.venues) {
      this.setState({venues: this.props.venues});
      this.initMap();
    } 
  }
  render() {
    return (
      <div id='map' aria-label='Map of Amsterdam' role='application' tabIndex='0'>
      </div>
     )
  }
}


export default Map;