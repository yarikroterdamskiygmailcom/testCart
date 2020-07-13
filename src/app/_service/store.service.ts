import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {MakerModel} from "../models/makers.models";

@Injectable()
export class Store {

    private makers: BehaviorSubject<MakerModel[]> = new BehaviorSubject<MakerModel[]>([]);
    private selectMaker: MakerModel | undefined;

    get selectMaker (): MakerModel | undefined{
        return this.selectMaker
    }

    private _getValues (): MakerModel[]  {
        return this.makers.value;
    }

    getMakers (): BehaviorSubject<MakerModel[]> {
        return this.makers;
    }

    createMaker (data: MakerModel): Observable<MakerModel> {
        const newIntem = new MakerModel(data);
        const array = [
            ...this._getValues(),
            newIntem
        ];

        this.makers.next(array);
        return of(newIntem)
    }

    setSelectMaker (value: MakerModel): void {
        this.selectMaker = value ? new MakerModel(value) : value
    }
}