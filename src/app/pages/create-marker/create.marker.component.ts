import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MakerImageModel, MakerModel, MakerPositionModel} from "../../models/makers.models";
import {Event, Router} from "@angular/router";
import {StoreHistoryService} from "../../_service/store.history.service";
import {StoreService} from "../../_service/store.service";
import {TypeHistoryAction} from "../../models/history.models";
import {arrayTypes} from "../../const/consts";

declare let google: any;

@Component({
    selector: 'app-create-marker',
    templateUrl: './create.marker.component.html',
    styleUrls: ['./create.marker.component.scss']
})
export class CreateMarkerComponent implements AfterViewInit {
    types: string[] = ['address', '(cities)', '(regions)', '(regions)'];
    arrayTypes: string[] = arrayTypes;
    @ViewChild('location', {static: true}) location: ElementRef;
    @ViewChild('form', {static: true}) form: ElementRef;

    MakerFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        phone: [''],
    });
    locationAutocomplete;
    placeDataSpecific: MakerPositionModel;
    placeDataMain: MakerPositionModel;
    specificPosition: any[] = [];
    loadedPhoto: MakerImageModel[] = [];

    constructor(
        private storeHistoryService: StoreHistoryService,
        private storeService: StoreService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.getPlaceAutocomplete();
        }, 3000);
    }

    getPlaceAutocomplete() {
        this.locationAutocomplete = new google.maps.places.Autocomplete(
            this.location.nativeElement,
            {types: ['(regions)']},
        );
        this.locationAutocomplete.addListener('place_changed', () => {

            const data = this.locationAutocomplete.getPlace();

            this.placeDataMain = this.setMakerPositionModel(data);

            this.storeHistoryService.createItem({
                action: `Select address: ${data.formatted_address}`,
                type: TypeHistoryAction.success
            });

        });
    }


    selectChangedValue(elements: string[]) {
        const pyrmont = new google.maps.LatLng(this.placeDataMain.lat,this.placeDataMain.lng);
        const request:any = {
            location: pyrmont,
            radius: 10000,
            type: elements
        };
        const test = new google.maps.places.PlacesService(document.createElement('div'));
        test.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.specificPosition = results;
            }
        });
    }

    setSpecific(data){
        this.placeDataSpecific = this.setMakerPositionModel(data)
    }

    setMakerPositionModel(data): MakerPositionModel{
        return new MakerPositionModel({
            lat: data.geometry.location.lat(),
            lng: data.geometry.location.lng(),
            formatted_address: data.formatted_address || data.name
        });
    }

    back(): void {
        this.router.navigateByUrl('/');
    }

    create(): void {
        if (!this.placeDataMain) {
            this.storeHistoryService.createItem({
                action: `Location invalid`,
                type: TypeHistoryAction.error
            });
            return;
        }

        if (this.MakerFormGroup.invalid) {
            this.storeHistoryService.createItem({
                action: `Form invalid`,
                type: TypeHistoryAction.error
            });
            return;
        }
        const data = {
            ...this.MakerFormGroup.value,
            position: Object.assign({}, this.placeDataMain),
            positionSpecific: Object.assign({}, this.placeDataSpecific),
            images: [...(this.loadedPhoto || [])],
            category: [...(this.MakerFormGroup.value.category || [])]
        };


        this.storeService.createItem(data)
            .subscribe((item: MakerModel) => {
                if(this.storeService.getCount() === 1) {
                    this.storeService.selectMaker = item;
                }
                this.storeHistoryService.createItem({
                    action: `Create marker: ${item.id}`,
                    type: TypeHistoryAction.success
                });
                this.back()
            });
    }
}
