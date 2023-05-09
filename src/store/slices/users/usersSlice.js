import { createSlice } from "@reduxjs/toolkit";
export const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    admin: false,
}
const initialErrors = {
    username: '',
    password: '',
    email: '',
}
export const userSlice = createSlice({
    name: 'users',
    initialState:{
        users:[],
        userSelected:initialUserForm,
        visibleForm:false,
        errors:initialErrors,
        isLoading:true,
    },
    reducers:{
        addUser:(state,action)=>{
            state.users=[
                ...state.users,
                {
                    ...action.payload,
                }
            ];
            state.userSelected=initialUserForm;
            state.visibleForm=false;
           
        },
        removeUser:(state,action)=>{
            state.users= state.users.filter(u=>u.id !== action.payload)
        },
        updateUser:(state,action)=>{
            state.users=state.users.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.userSelected=initialUserForm;
            state.visibleForm=false;
        },
        loadingUsers:(state,action)=>{
            state.users = action.payload
            state.isLoading=false;
        },
        onUserSelectedForm:(state,action)=>{
            state.userSelected= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.userSelected=initialUserForm;
        },
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addUser,
    removeUser,
    updateUser,
    loadingUsers,
    onUserSelectedForm,
    onOpenForm,
    onCloseForm,
    onError,
    
}=userSlice.actions;