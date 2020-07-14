import {
    BaseModel
} from './base.model';

export class MakerPositionModel extends BaseModel<MakerPositionModel> {
    constructor(init?: Partial<MakerPositionModel>) {
        super(init);
    }

    lat: number;
    lng: number;
    formatted_address: string;
}

export class MakerImageModel extends BaseModel<MakerImageModel> {
    constructor(init?: Partial<MakerImageModel>) {
        super(init);
    }

    isMain: boolean;
    path: string;
    id: string;
}

export class MakerModel extends BaseModel<MakerModel> {
    constructor(init?: Partial<MakerModel>) {
        super(init);
    }

    images: MakerImageModel[] = [];
    position: MakerPositionModel;
    name: string;
    ratesArray: number[] = [];
    oTime: string;
    description: string;
    cTime: string;
    site: string;
    phone: string;
}
