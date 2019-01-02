import React, { Component } from 'react';
import './App.css';

/* global google */ 
let map;

class Map extends Component {
  componentDidUpdate(prevProps,prevState) {
    if(prevProps.venues !== this.props.venues) {
      let venues = this.props.venues;
      let map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.3791316, lng: 4.8980833},
        zoom: 12,
        styles: [
          {'featureType': 'all',
          'elementType': 'all',
          'stylers': [
              {'saturation': -50}
            ]
          }
        ]
      });
     
      for( var i = 0; i < venues.length; i += 1) {
        var marker = new google.maps.Marker({
          id: venues[i].venue.id,
          map: map,
          position: {lat: venues[i].venue.location.lat, lng: venues[i].venue.location.lng},
          animation: google.maps.Animation.DROP,
      });
        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(i);
            infowindow.open(map,this);
          }
        })(this,venues[i].venue.name + ' - ' + venues[i].venue.location.address));
       
      //   google.maps.event.addListener(marker, 'click', (function handleListMarkers(marker,i){
      //     return function() {
      //       var updatedList = venues;
      // updatedList = updatedList.filter((item => {
      //   return item.venue.id.search(i) !== -1;
      //  }));
      //   console.log(updatedList)
      //     }
          
      //   })(this, venues[i].venue.id));
      
      // google.maps.event.addListener(marker, 'click', toggleBounce(this))
//       function toggleBounce(marker) {

//     if (marker.getAnimation() !== null) {
//       marker.setAnimation(null);
//     } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
// }

            
      }
      // google.maps.event.addListener(marker, 'click', (function(marker, i) {
      //   return function(marker,i) {
      //     var selectedMarker = venues;
      //   selectedMarker = selectedMarker.filter((item => {
      //     return item.venue.id.search(i) !== -1;
      //   }))
      //   console.log(selectedMarker)
      //   // this.props.action(this, selectedMarker.venue.id); 
      //  }(this)})(this,marker.id))
        
        
    }

  }
  
  
  render() {
    return (
      <div id='map' aria-label='Map of Amsterdam' role='application'>
      </div>
     )
  }
}


export default Map;