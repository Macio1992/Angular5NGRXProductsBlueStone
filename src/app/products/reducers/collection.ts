import { CollectionActionTypes, CollectionActions } from '../actions/collection';

export interface State{
    ids: string[];
}

const initialState: State = {
    ids: []
};

export function reducer(state = initialState, action: CollectionActions): State{
    switch (action.type) {
        case CollectionActionTypes.Load:{
            return {
                ...state
            }
        }

        case CollectionActionTypes.LoadSuccess: {
            return {
                ids: action.payload.map(product => product._id)
            }
        }
            
        default:
            return state;
    }
}

export const getIds = (state: State) => state.ids;