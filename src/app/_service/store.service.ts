import {Injectable} from "@angular/core";
import {MakerModel} from "../models/makers.models";
import {ServiceProvider} from "./service.provider";

@Injectable()
export class StoreService extends ServiceProvider<MakerModel> {
    model(data: MakerModel): MakerModel {
        return new MakerModel(data);
    }
}
