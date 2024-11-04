import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function Privaterourte() {

    const {userInfo}=useSelector(state=>state.auth)
    return userInfo ? <Outlet/> : <Navigate to={'/login'} replace/>
    
}

export default Privaterourte
