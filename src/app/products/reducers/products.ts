import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductActions, ProductActionTypes } from '../actions/product';
import { CollectionActions, CollectionActionTypes } from '../actions/collection';
import { Product } from '../models/product';

export interface State extends EntityState<Product>{
    selectedProductId: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product: Product) => product._id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedProductId: null
});

export function reducer(state = initialState, action: ProductActions | CollectionActions): State {
    switch (action.type) {
        case CollectionActionTypes.LoadSuccess:
            return adapter.addMany(action.payload, {
                ...state,
                selectedProductId: state.selectedProductId
            })
        
        case ProductActionTypes.Load: {
            return adapter.addOne(action.payload, {
                ...state,
                selectedProductId: state.selectedProductId
            })
        }

        case ProductActionTypes.Select: {
            return {
                ...state,
                selectedProductId: action.payload
            }
        }

        case ProductActionTypes.Update: {
            return adapter.updateOne(
                {id: action.payload.id, changes: {
                    name: action.payload.product.name,
                    number: action.payload.product.number,
                    description: action.payload.product.description
                }}, state
            );
        }

        case ProductActionTypes.UpdateImage: {
            return adapter.updateOne({
                id: action.payload.id, changes: {
                    images: action.payload.images
                }}, state)
        }

        default:{
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedProductId;