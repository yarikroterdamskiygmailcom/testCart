import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {StoreHistoryService} from "../../_service/store.history.service";
import {BehaviorSubject, Observable} from "rxjs";
import {HistoryModel, TypeHistoryAction} from "../../models/history.models";
import {StoreService} from "../../_service/store.service";
import {MakerModel} from "../../models/makers.models";
import {Helper} from "../../helpers/helper";
import {FormControl} from "@angular/forms";
import {arrayTypes} from "../../const/consts";

@Component({
    selector: 'app-sitebar',
    templateUrl: './sitebar.component.html',
    styleUrls: ['./sitebar.component.scss']
})
export class SitebarComponent extends Helper<any>{
    historyList$: BehaviorSubject<HistoryModel[]> = this.storeHistoryService.getItems();
    get makersList(): MakerModel[] {
        return this.storeService.makersList;
    }
    typesAsColor: object = {
        [TypeHistoryAction.success]: 'primary',
        [TypeHistoryAction.error]: 'warn',
        [TypeHistoryAction.info]: 'accent'
    };
    arrayTypes: string[] = arrayTypes;
    searchSrt = new FormControl('');
    searchByCategory = new FormControl([]);

    get listsHistory(): HistoryModel[] {
        return this.historyList$.getValue().reverse();
    }

    constructor(
        private router: Router,
        private storeHistoryService: StoreHistoryService,
        private storeService: StoreService,
    ) {
        super()
    }

    createMaker(): void {
        this.router.navigateByUrl('/create-maker');
    }

    home(): void {
        this.router.navigateByUrl('/');
    }

    setSelectMaker (value: MakerModel): void {
        this.storeService.selectMaker = value;
    }

    isColor({ type }: HistoryModel): string {
        return this.typesAsColor[type] || '';
    }

    changeValue(data: unknown, type: string){
        if(!!type)
            this.storeService.objectSearch = {
                ...this.storeService.objectSearch,
                [type] : data
            };
    }
}
