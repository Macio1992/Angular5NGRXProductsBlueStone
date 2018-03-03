import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export enum CollectionActionTypes {
    Load = '[Collection] Load',
    LoadSuccess = '[Collection] Load Success',
    LoadFail = '[Collection] Load Fail'
}

export class Load implements Action {
    readonly type = CollectionActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;
    constructor(public payload: Product[]){}
}

export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;
    constructor(public payload: Product){}
}

export type CollectionActions = Load | LoadSuccess | LoadFail;
