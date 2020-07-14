import {Injectable} from "@angular/core";
import {ServiceProvider} from "./service.provider";
import {HistoryModel} from "../models/history.models";

@Injectable()
export class StoreHistoryService extends ServiceProvider<HistoryModel>{
    model(data: HistoryModel): HistoryModel {
        return new HistoryModel(data);
    }

    localStr () {
        return 'StoreHistoryService'
    }

    handleWorkWithData() : void{
        console.log('change data')
    };
}
