import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


export const addItemAction = (item) => ({
    type: "ADD_ITEM",
    payload: item
})

export const getItem = (pId) => ({
    type: "GET_ITEM",
    payload: pId
})

export const updateItemAction = (item) => ({
    type: "UPDATE_ITEM",
    payload: item
})

export const deleteItemAction = (pId) => ({
    type: "DELETE_ITEM",
    payload: pId
})



const initialState = {
    items: [
        {
            "pId": 1,
            "name": "Mask",
            "quantity": 1,
            "price": 120,
            "discount": 0,
            "total": 120
        },
        {
            "pId": 2,
            "name": "Sanitizer",
            "quantity": 1,
            "price": 100,
            "discount": 0,
            "total": 100
        },
        {
            "pId": 3,
            "name": "Gloves",
            "quantity": 1,
            "price": 50,
            "discount": 0,
            "total": 50
        }
    ],
    item: null,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case "GET_ITEM":
            let arr = state.items.filter((item) => item.pId === action.payload);
            arr = arr.values()

            for (let val of arr) {
                arr = val;
            }
            return {

                ...state,
                item: arr,
            };

        case "UPDATE_ITEM":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.pId === action.payload.pId ? action.payload : item)
            }

        case "DELETE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.pId !== action.payload)
            }
        default:
            return state;
    }
}

const store = createStore(reducer, composeWithDevTools());

export default store;
