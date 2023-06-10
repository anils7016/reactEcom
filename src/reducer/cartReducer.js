
const cartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART"){
        let {id, color, amount, product} = action.payload;
            
        console.log('state=rpd',state)
        let existingProduct = state.cart.find( 
            (curEl) => curEl.id === id + color
        )
        if(existingProduct){
            let updatedProduct = state.cart.map( (curEl)=> {
                if(curEl.id === id+color){
                    let newAmount = curEl.amount + amount;
                    if(newAmount >= curEl.max){
                        newAmount = curEl.max;
                    }
                    return {
                        ...curEl,
                        amount: newAmount
                    }
                }else{
                    return curEl
                }
            })
            return {
                ...state,
                cart: updatedProduct
            }
        }else{

            //console.log('product =reducer',product)
            let cartProduct;
            cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock
            }
            return {
                ...state,
                cart: [ ...state.cart, cartProduct]
            };
        }

    }

    if(action.type === "SET_DECREMENT"){
        let updatedProduct = state.cart.map( (curEl) => {
            if(curEl.id === action.payload){
                let decAmount = curEl.amount -1;

                if(decAmount <= 1){
                    decAmount = 1;
                }
                return {
                    ...curEl,
                    amount: decAmount
                }
            }else{
                return {
                    ...curEl
                }
            }
        } )

        return{
            ...state,
            cart: updatedProduct
        }
    }
    if(action.type === "SET_INCREMENT"){
        let updatedProduct = state.cart.map( (curEl) => {
            if(curEl.id === action.payload){
                let incAmount = curEl.amount +1;

                if(incAmount >= curEl.max){
                    incAmount = curEl.max;
                }
                return {
                    ...curEl,
                    amount: incAmount
                }
            }else{
                return {
                    ...curEl
                }
            }
        } )

        return{
            ...state,
            cart: updatedProduct
        }
    }

    if(action.type === "REMOVE_ITEM"){
        let updatedCart = state.cart.filter( (currItem) =>  currItem.id !== action.payload );
        return {
            ...state,
            cart: updatedCart
        }
    }

    // clear cart
    if( action.type === "CLEAR_CART"){
        return {
            ...state,
            cart: []
        }
    }
    // if (action.type === "REMOVE_ITEM") {
    //     let updatedCart = state.cart.filter(
    //       (curItem) => curItem.id !== action.payload
    //     );
    //     return {
    //       ...state,
    //       cart: updatedCart,
    //     };
    //   }

    // if(action.type === 'CART_TOTAL_ITEM'){
    //     let updatedItemVal = state.cart.reduce( (initialVal, curEl) => {
    //         let {amount} = curEl;
    //         initialVal = initialVal + amount;  

    //         return initialVal;
    //     }, 0);
    //     console.log('updatedItemVal==',updatedItemVal)
    //     return {
    //         ...state,
    //         total_item : updatedItemVal
    //     }
    // }

    // if(action.type === 'TOTAL_ITEM_SUM'){
    //     let total_price = state.cart.reduce( (initialVal, curEl) => {
    //         let {price, amount} = curEl;
            
    //         initialVal = initialVal + price * amount;  

    //         return initialVal;
    //     }, 0);
    //     return {
    //         ...state,
    //         total_price : total_price
    //     }
    // }

    if(action.type === 'CART_ITEM_PRICE_TOTAL'){
        let {total_price, total_item} = state.cart.reduce( (accum, curEl) =>{
            let {price, amount} = curEl;
            
            accum.total_item += amount;
            accum.total_price += amount * price; 

            return accum
        
        }, {total_item: 0, total_price: 0} );

        return {
            ...state,
            total_item,
            total_price
        }
    }

    return state;
}

export default cartReducer;