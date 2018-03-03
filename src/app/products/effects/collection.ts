import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as fromActions from '../actions/collection';
import { ProductService } from '../service/product.service';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class CollectionEffects {

    constructor(private actions$: Actions, private service: ProductService){}

    @Effect()
    loadCollection$: Observable<Action> = this.actions$
    .ofType<fromActions.Load>(fromActions.CollectionActionTypes.Load)
    .switchMap(o => {
        return this.service.getProducts().pipe(
            map((products: any[]) => new fromActions.LoadSuccess(products)),
            catchError(err => of(new fromActions.LoadFail(err)))
        );
    })

}