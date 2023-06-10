import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem('myCart')
    if(localCartData === []){
        return []
    }else{
        return JSON.parse(localCartData);
    }
}
const initialState = {
    //cart : [],
    cart : getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 5000,
    shipping_fees: 5000
}

const CartProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch(  {type: "ADD_TO_CART", payload: {id, color, amount, product} } )
    }

    const removeItem = (id) => {
        dispatch( {type: "REMOVE_ITEM", payload: id} )
    }

    const setDecrease = (id) => {
        dispatch( {type: 'SET_DECREMENT', payload: id } )
    }

    const setIncrease = (id) => {
        dispatch( {type: 'SET_INCREMENT', payload: id } )
    }

    const clearCart = () => {
        dispatch( {type: 'CLEAR_CART'} )
    }

    useEffect( ()=> {
        //dispatch( {type: 'CART_TOTAL_ITEM'} )
        //dispatch( {type: 'TOTAL_ITEM_SUM'} )
        dispatch( {type: 'CART_ITEM_PRICE_TOTAL'} );
        localStorage.setItem('myCart', JSON.stringify(state.cart))
    }, [state.cart])

    return <CartContext.Provider value={{...state, addToCart, removeItem, clearCart, setDecrease, setIncrease}}>
        {children}
    </CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
}


export {CartProvider, useCartContext} ;