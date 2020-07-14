import {
    BaseModel
} from './base.model';

export class HistoryModel extends BaseModel<HistoryModel> {
    constructor(init?: Partial<HistoryModel>) {
        super(init);
    }

    action: string;
}
