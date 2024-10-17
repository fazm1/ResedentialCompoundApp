import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRouteSecurity = ({children, user}) => {

    if(!user){
        return (<Navigate to="/"/>)
    }
    else if(user.email === "security@g.co"){
        return children
    }
    else{
        return (<Navigate to="/user"/>);
    }
    
}
 
export default ProtectedRouteSecurity;