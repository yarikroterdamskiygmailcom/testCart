import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

import {StoreService} from "../../_service/store.service";
import {takeUntil} from "rxjs/operators";
import {BehaviorSubject, interval, Subject} from "rxjs";
import {MakerModel} from "../../models/makers.models";


declare let google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
    @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
    @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
    title = 'testCart';
    zoom = 12;
    center: {} = {
        lat: 50.4501,
        lng: 30.5234
    };
    destroyed$ = new Subject();

    constructor(private storeService: StoreService) {

    }

    customMapType = new google.maps.StyledMapType([
        {
            featureType: "poi",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }
    ], {
        name: 'Custom Style'
    });
    customMapTypeId = 'custom_style';
    options: any = {
        mapTypeId: 'roadmap',
        disableDoubleClickZoom: true,
        // maxZoom: 15,
        zoom: 12,
        // minZoom: 8,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, this.customMapTypeId]
        }
    };
    markers: BehaviorSubject<MakerModel[]> = this.storeService.getItems();

    ngAfterViewInit() {
        navigator.geolocation.getCurrentPosition(position => {
            if (this.destroyed$.closed) {
                return;
            }
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
        });
        const numbers = interval(500);
        numbers.pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                try {
                    const googleMap = this.map._googleMap;
                    googleMap.mapTypes.set(this.customMapTypeId, this.customMapType);
                    googleMap.setMapTypeId(this.customMapTypeId);
                    this.destroyed$.next(true);
                    this.destroyed$.complete();
                } catch (e) {
                    console.error('GoogleTestError!!!!!!!!!!!!!!!!!!!!!!!!', e);
                }
            });
    }


    openInfo(marker, data): void {
        const test = this.infoWindow.open(marker);
        debugger;
    }

    closeInfo(): void {
debugger
    }
}
