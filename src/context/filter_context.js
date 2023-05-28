import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products:[],
    grid_view: true,
    sorting_value: 'lowest',
    filters: {
        text: "",
        category: 'All',
        company: 'All',
        colors: 'All',
        maxPrice: 0,
        price: 0,
        minPrice: 0
    }
}

export const FilterContextProvider = ( {children} ) => {
    const { products } = useProductContext();
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView = () => {
        return dispatch( {type : "SET_GRID_VIEW"} )
    }

    const setListView = () => {
        return dispatch( {type : "SET_LIST_VIEW"} )
    }

    const sorting = (event) => {
        let userValue = event.target.value;
        dispatch( {type: "GET_SORT_VALUE", payload: userValue } )
    }

    // update the filters the vlues
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch( {type: "UPDATE_FILTERS_VALUE", payload: {name, value} } );
    }

    // Clear filters
    const clearFilters = () => {
        dispatch( {type: 'CLEAR_FILTERS' } );
    }

    useEffect( ()=>{
        dispatch( {type: "FILTER_PRODUCTS"} );
        dispatch( { type: "SORTING_PRODUCTS", payload:products });
    }, [state.sorting_value, state.filters] );

    useEffect(() => {
        //console.log('products-2',products)
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products });
    }, [products]);


    return <FilterContext.Provider value={ { ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters, } }>
        {children}
    </FilterContext.Provider>
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}