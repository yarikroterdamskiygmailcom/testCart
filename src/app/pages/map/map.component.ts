import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

import {StoreService} from "../../_service/store.service";
import {map, takeUntil} from "rxjs/operators";
import {BehaviorSubject, interval, Observable, Subject} from "rxjs";
import {MakerModel} from "../../models/makers.models";
import {Helper} from "../../helpers/helper";
import {TypeHistoryAction} from "../../models/history.models";
import {StoreHistoryService} from "../../_service/store.history.service";


declare let google: any;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent extends Helper<any> implements AfterViewInit {
    @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
    @ViewChild(GoogleMap, {static: false}) map: GoogleMap;

    _center: {} = {
        lat: 50.4501,
        lng: 30.5234
    };

    get center(){
        return (this.storeService.selectMaker && this.storeService.selectMaker.position) || this._center;
    }

    set center(value){
        this._center = value;
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
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDoubleClickZoom: true,
        zoom: 12,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, this.customMapTypeId]
        }
    };

    get makersList(): MakerModel[] {
        return this.storeService.makersList;
    }

    data:MakerModel;

    destroyed$ = new Subject();

    constructor(
        private storeService: StoreService,
        private storeHistoryService: StoreHistoryService
    ) {
        super()
    }


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
        this.infoWindow.open(marker);
        this.data = data;
        this.storeHistoryService.createItem({
            action: `Open info marker: ${data.id}`,
            type: TypeHistoryAction.success
        });
    }

    closeInfo(): void {
        this.infoWindow.close();
        this.storeHistoryService.createItem({
            action: `Close info marker`,
            type: TypeHistoryAction.success
        });
    }
}
