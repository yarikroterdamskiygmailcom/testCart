import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MakerImageModel, MakerModel, MakerPositionModel} from "../../models/makers.models";
import {Event, Router} from "@angular/router";
import {StoreHistoryService} from "../../_service/store.history.service";
import {StoreService} from "../../_service/store.service";

declare let google: any;


@Component({
    selector: 'app-create-marker',
    templateUrl: './create.marker.component.html',
    styleUrls: ['./create.marker.component.scss']
})
export class CreateMarkerComponent implements AfterViewInit {
    types = ['address', '(cities)', '(regions)', '(regions)'];

    @ViewChild('location', {static: true}) location: ElementRef;

    MakerFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        site: ['', Validators.pattern(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/)],
        phone: [''],
        oTime: [''],
        cTime: [''],
    });
    locationAutocomplete;
    placeData: MakerPositionModel;
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

            this.placeData = new MakerPositionModel({
                lat: data.geometry.location.lat(),
                lng: data.geometry.location.lng(),
                formatted_address: data.formatted_address
            });
            console.log(this.placeData);

            this.storeHistoryService.createItem({
                action: `Select address: ${data.formatted_address}`
            });

        });
    }

    back(): void {
        this.router.navigateByUrl('/');
    }

    create(): void {
        debugger
        if (!this.placeData) {
            return;
        }
        if (this.MakerFormGroup.invalid) {
            return;
        }
        const data = {
            ...this.MakerFormGroup.value,
            position: Object.assign({}, this.placeData),
            images: this.loadedPhoto || []
        };
        this.storeService.createItem(data)
            .subscribe((item: MakerModel) => {
                this.storeHistoryService.createItem({
                    action: `Create marker: ${item.id}`
                });
            });
    }
}
