import { Action } from '@ngrx/store';
import { Product } from '../models/product';
import { Image } from '../models/image';

export enum ProductActionTypes {
    Load = '[Product] Load',
    Select = '[Product] Select',
    Update = '[Product] Update',
    UpdateDone = '[Product] Update Done',
    UpdateImage = '[Product] Update Image',
    UpdateImageDone = '[Product] Update Image Done'
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
    constructor(public payload: Product){}
}

export class Select implements Action {
    readonly type = ProductActionTypes.Select;
    constructor(public payload: string){}
}

export class Update implements Action {
    readonly type = ProductActionTypes.Update;
    constructor(public payload: {id: string, product: Product}){}
}

export class UpdateDone implements Action {
    readonly type = ProductActionTypes.UpdateDone;
    constructor(public payload: Product){}
}

export class UpdateImageAction implements Action {
    readonly type = ProductActionTypes.UpdateImage;
    constructor(public payload: {id: string, images: Image[], image: Image}){}
}

export class UpdateImageDoneAction implements Action {
    readonly type = ProductActionTypes.UpdateImageDone;
    constructor(public payload: Image){}
}

export type ProductActions = Load | Select | Update | UpdateImageAction;