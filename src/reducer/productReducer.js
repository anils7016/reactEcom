const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOCADING":
            return {
                ...state,
                isLoading: true,
            } 
        case "SET_API_DATA":
            const featureData = action.payload.filter( (currEl)=>{
                return currEl.featured === true;
            });
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureProducts: featureData,
            }    
        case "API_Error":
            return {
                ...state,
                isLoading: false,
                isError:true,
            }    
        case "SET_SINGLE_LOADING" :
            return {
                ...state,
                isLoading:true,
            }
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSinleLoading:false,
                singleProduct: action.payload
            }  
        case "SET_SINGLE_ERROR":
            return{
                isLoading:false,
                isSingleError:true,
            }         
        default:
            return state
            
    }
}

export default ProductReducer;