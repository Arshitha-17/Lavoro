import {createSlice} from '@reduxjs/toolkit';

const initialState={
    userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) :null
}

 const authSlie = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials :(state,action)=>{
            state.userInfo= action.payload;
            localStorage,setItem('userInfo',JSON.stringify(action,payload))
        },
        logout:(state,action)=>{
            state.userInfo= null,
            localStorage.removeItem('user')
        },
        
    },
 });


 export const {setCredentials,logout} = authSlie.actions;

 export default authSlie.reducer

