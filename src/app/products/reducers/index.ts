import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap
} from '@ngrx/store';

import * as fromProducts from './products';
import * as fromCollection from './collection';
import * as fromRoot from '../../reducers';

export interface ProductState {
    products: fromProducts.State,
    collection: fromCollection.State
}

export interface State extends fromRoot.State {
    products: ProductState;
}

export const reducers: ActionReducerMap<ProductState> = {
    products: fromProducts.reducer,
    collection: fromCollection.reducer
};

export const getProductsState = createFeatureSelector<ProductState>('products');
export const getProductEntitiesState = createSelector(
    getProductsState,
    state => state.products
);
export const getSelectedProductId = createSelector(
    getProductEntitiesState,
    fromProducts.getSelectedId
);

export const {
    selectIds: getProductIds,
    selectEntities: getProductEntities,
    selectAll: getAllProducts,
    selectTotal: getTotalProducts
} = fromProducts.adapter.getSelectors(getProductEntitiesState);

export const getSelectedProduct = createSelector(
    getProductEntities,
    getSelectedProductId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
)

export const getCollectionState = createSelector(
    getProductsState,
    (state: ProductState) => state.collection
);

export const getCollectionProductIds = createSelector(
    getCollectionState,
    fromCollection.getIds
);

export const getProductCollection = createSelector(
    getProductEntities,
    getCollectionProductIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);