import React from "react";
import { Outlet } from "react-router-dom";

const PrivateLayout = () =>{
    return(
        <div>
            <h2>BrainPin Main Layout</h2>
            <Outlet />
        </div>
    )
}

export default PrivateLayout;