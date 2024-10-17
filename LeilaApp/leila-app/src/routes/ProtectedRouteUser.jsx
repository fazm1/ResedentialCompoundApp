import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRouteUser = ({children, user}) => {

    if(!user){
        return (<Navigate to="/"/>)
    }
    else if(user.email === "admin@g.co" || user.email === "sherif-badr@g.co"){
        return (<Navigate to="/admin"/>)
    }
    else if(user.email === "ashraf@g.co"){
        return (<Navigate to="/maintenance"/>)
    }
    else if(user.email === "security@g.co"){
        return (<Navigate to="/security"/>)
    }
    else{
        return children;
    }
    
}
 
export default ProtectedRouteUser;