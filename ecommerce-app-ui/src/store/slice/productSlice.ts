import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface ProductState {
    categories:Record<string, unknown>[];
    productList:Record<string, unknown>[];
    total:number;
    limit:number;
    offset:number;
    filter:string;
    fetchState:string;
}

const initialState:ProductState = {
    categories:[],
    productList:[],
    total:0,
    limit:25,
    offset:0,
    filter:'',
    fetchState:'NOT_FETCHED',
}


const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
        setCategories:(state, action:PayloadAction<Record<string, unknown>[]>) => {
            state.categories = action.payload;
        },
        setProductList:(state, action:PayloadAction<Record<string, unknown>[]>) => {
            state.productList = action.payload;
        },
        setTotal:(state, action:PayloadAction<number>) => {
            state.total = action.payload;
        },
        setLimit:(state, action:PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setOffset:(state, action:PayloadAction<number>) => {
            state.offset = action.payload;
        },
        setFilter:(state, action:PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setFetchState:(state, action:PayloadAction<string>) => {
            state.fetchState = action.payload;
        },
    }
})

export const { setCategories, setProductList, setTotal, setLimit, setOffset, setFilter, setFetchState } = productSlice.actions;
export default productSlice.reducer;