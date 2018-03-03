import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './effects/collection';
import { ProductService } from './service/product.service';
import { ProductsEffects } from './effects/product';
import { SelectedProductComponent } from './components/selected-product/selected-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: ProductsMainComponent },
			{ path: ':id', component: ProductSingleComponent }
		]),
		StoreModule.forFeature('products', reducers),
		EffectsModule.forFeature([ProductsEffects, CollectionEffects]),
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		ProductsMainComponent, ProductSingleComponent, SelectedProductComponent
	],
	providers: [ProductService]
})
export class ProductsModule { }