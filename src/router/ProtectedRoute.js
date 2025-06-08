import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({user, element}) => {
    return user ? element : <Navigate to="/login"/>
}

export default ProtectedRoute;