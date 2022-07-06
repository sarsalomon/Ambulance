import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { Context } from '..';

const Redirects = () => {
    const {user} = useContext(Context)
    if (user._userrole === "Admin"){
        return <Navigate to='/admin'/>
    }else if (user._userrole === "Manager"){
        return <Navigate to='/manager'/>
    }else if (user._userrole === "Operator"){
        return <Navigate to='/operator'/>
    }else if (user._userrole === "Statistics"){
        return <Navigate to='/statistics'/>
    }else if (!user._userrole){
        return <Navigate to='/'/>
    }
    return (
        <div>
            
        </div>
    );
};

export default Redirects;