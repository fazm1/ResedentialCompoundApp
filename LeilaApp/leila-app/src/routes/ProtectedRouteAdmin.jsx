import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRouteAdmin = ({children, user}) => {

    if(!user){
        return (<Navigate to="/"/>)
    }
    else if(user.email === "admin@g.co" || user.email === "sherif-badr@g.co"){
        return children
    }
    else{
        return (<Navigate to="/user"/>);
    }
    
}
 
export default ProtectedRouteAdmin;