import {Component, OnInit, ViewChild} from '@angular/core';
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit{
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow
  center = {}
  title = 'testCart';
  zoom = 12
 // center: //google.maps.LatLngLiteral
  options: any = {//google.maps.MapOptions
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {
      debugger
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoWindow.open(marker)
  }

}
