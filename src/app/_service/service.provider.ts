import {BehaviorSubject, Observable, of} from "rxjs";

export abstract class ServiceProvider<T> {
    private items: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    private _selectItem: T | undefined;

    abstract model(type: T): T;

    get selectMaker(): T | undefined {
        return this._selectItem;
    }

    set selectMaker(value: T) {
        this._selectItem = value ? this.model(value) : value;
    }

    private _getValues(): T[] {
        return this.items.value || [];
    }

    getItems(): BehaviorSubject<T[]> {
        return this.items;
    }

    createItem(data: T): Observable<T> {
        const newItem = this.model(data);
        const array = [
            ...this._getValues(),
            newItem
        ];

        this.items.next(array);
        return of(newItem);
    }

    getCount(): number {
        return this._getValues().length;
    }
}
