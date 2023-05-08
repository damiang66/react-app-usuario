import { Provider } from "react-redux"
import { AppRouter } from "./AppRouter"
import { store } from "./store/store"


export const UsersApp = () => {
return(
    <Provider store={store}>
        
    <AppRouter />
   </Provider>
)
   
}