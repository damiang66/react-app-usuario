
import { useNavigate, useResolvedPath } from "react-router-dom";
import Swal from "sweetalert2";

import { findAll, remove, save, update } from "../services/userService";

import { useDispatch, useSelector } from "react-redux";
import { addUser, loadingUsers, onCloseForm, onError, onOpenForm, onUserSelectedForm, removeUser, updateUser } from "../store/slices/users/usersSlice";
import { initialUserForm } from './../store/slices/users/usersSlice';
import { useAuth } from "../auth/hooks/useAuth";

const initialUsers = [];





export const useUsers = () => {
  
   const {users,userSelected,visibleForm,errors}= useSelector(state=>state.users)
   const dispatch= useDispatch();




    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getUsers = async () => {
        try {
            
       
        const result = await findAll();
        console.log(result);
        dispatch(loadingUsers(result.data));
          
     } catch (error) {
            
    }
}

    const handlerAddUser = async (user) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {

            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser(response.data))
            } else {
                response = await update(user);
                dispatch(updateUser(response.data))
            }

            

            Swal.fire(
                (user.id === 0) ?
                    'Usuario Creado' :
                    'Usuario Actualizado',
                (user.id === 0) ?
                    'El usuario ha sido creado con exito!' :
                    'El usuario ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status == 400) {
               dispatch( onError(error.response.data));
            } else if (error.response && error.response.status == 500 &&
                error.response.data?.message?.includes('constraint')) {
            
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch( onError({ username: 'El username ya existe!' }))
                }
                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch( onError({ email: 'El email ya existe!' }))
                }
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then( async(result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerUserSelectedForm = (user) => {
      
   dispatch(onUserSelectedForm({...user}))
    }

    const handlerOpenForm = () => {
     
        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
      dispatch(onCloseForm())
      dispatch( onError({}));
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    }
}