import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export enum ProductActionTypes {
    Load = '[Product] Load',
    Select = '[Product] Select',
    Update = '[Product] Update',
    UpdateDone = '[Product] Update Done'
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

export type ProductActions = Load | Select | Update | UpdateDone;