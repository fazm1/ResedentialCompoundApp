import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRouteMaintenance = ({children, user}) => {

    if(!user){
        return (<Navigate to="/"/>)
    }
    else if(user.email === "ashraf@g.co"){
        return children
    }
    else{
        return (<Navigate to="/user"/>);
    }
    
}
 
export default ProtectedRouteMaintenance;