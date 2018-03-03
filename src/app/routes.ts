import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full'},
    {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
    }
];