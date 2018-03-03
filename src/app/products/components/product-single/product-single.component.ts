import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import * as fromActions from '../../actions/product';

@Component({
	selector: 'app-product-single',
	templateUrl: './product-single.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

	actionsSubscription: Subscription;

	constructor(private store: Store<State>, route: ActivatedRoute) {
		this.actionsSubscription = route.params
		.pipe(map(params => new fromActions.Select(params.id)))
		.subscribe(store);
	}

	ngOnInit() {
		this.actionsSubscription.unsubscribe();
	}

}