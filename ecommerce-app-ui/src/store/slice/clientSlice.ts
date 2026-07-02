import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
    user:Record<string, unknown>;
    addressList:Record<string, unknown>[];
    creditCards:Record<string, unknown>[];
    roles:Record<string, unknown>[];
    theme:string;
    language:string;
}

const initialState:ClientState = {
    user:{},
    addressList:[],
    creditCards:[],
    roles:[],
    theme:'',
    language:'',
}

const clientSlice = createSlice({ 
     name:'client',
     initialState,
     reducers:{
        setUser:(state, action:PayloadAction<Record<string, unknown>>) => {
            state.user = action.payload;
        },
        setAddressList:(state, action:PayloadAction<Record<string, unknown>[]>) => {
            state.addressList = action.payload;
        },
        setCreditCards:(state, action:PayloadAction<Record<string, unknown>[]>) => {
            state.creditCards = action.payload;
        },
        setRoles:(state, action:PayloadAction<Record<string, unknown>[]>) => {
            state.roles = action.payload;
        },
        setTheme:(state, action:PayloadAction<string>) => {
            state.theme = action.payload;
        },
        setLanguage:(state, action:PayloadAction<string>) => {
            state.language = action.payload;
        },
     },
     
});

export const { setUser, setAddressList, setCreditCards, setRoles, setTheme, setLanguage } = clientSlice.actions;
export default clientSlice.reducer;