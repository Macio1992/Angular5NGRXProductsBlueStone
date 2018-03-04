import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as fromActions from '../actions/product';
import { ProductService } from '../service/product.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable()
export class ProductsEffects {

    constructor(private actions$: Actions, private service: ProductService){}

    @Effect()
    loadProduct$: Observable<Action> = this.actions$
    .ofType<fromActions.Select>(fromActions.ProductActionTypes.Select)
    .map(action => action.payload)
    .switchMap(id => {
        return this.service.getProduct(id).pipe(
            map((product: Product) => new fromActions.Load(product))
        );
    });

    @Effect()
    updateProduct$: Observable<Action> = this.actions$
    .ofType<fromActions.Update>(fromActions.ProductActionTypes.Update)
    .map(action => action.payload)
    .switchMap(product => {
        return this.service.updateProduct(product.id, product.product).pipe(
            map((product: Product) => new fromActions.UpdateDone(product))
        );
    });

    @Effect()
    updateImage$: Observable<Action> = this.actions$
    .ofType<fromActions.UpdateImageAction>(fromActions.ProductActionTypes.UpdateImage)
    .map(action => action.payload)
    .switchMap(image => {
        return this.service.updateImage(image.id, image.image).pipe(
            map((image: Image) => new fromActions.UpdateImageDoneAction(image))
        );
    });

}