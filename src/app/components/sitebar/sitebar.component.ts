import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {StoreHistoryService} from "../../_service/store.history.service";
import {BehaviorSubject} from "rxjs";
import {HistoryModel} from "../../models/history.models";
import {StoreService} from "../../_service/store.service";

@Component({
    selector: 'app-sitebar',
    templateUrl: './sitebar.component.html',
    styleUrls: ['./sitebar.component.scss']
})
export class SitebarComponent {
    historyList$: BehaviorSubject<HistoryModel[]> = this.storeHistoryService.getItems();
    makersList$: BehaviorSubject<HistoryModel[]> = this.storeHistoryService.getItems();

    constructor(
        private router: Router,
        private storeHistoryService: StoreHistoryService,
        private storeService: StoreService,
    ) {}

    createMaker(): void {
        this.router.navigateByUrl('/create-maker');
    }

    get listsHistory(): HistoryModel[] {
        return this.historyList$.getValue().reverse();
    }

    get listsMakers(): HistoryModel[] {
        return this.makersList$.getValue();
    }
}
