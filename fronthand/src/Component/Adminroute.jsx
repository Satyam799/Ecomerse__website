import {useSelector} from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Adminroute() {
 const {userInfo}=useSelector(state=>state.auth)

 return(userInfo  && userInfo?.isAdmin ? <Outlet/> :<Navigate to={'/'} replace/> )

}

export default Adminroute
