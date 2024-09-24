import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { userAuthKey } from "./auth/authKeys";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loginSusses } = userAuthKey;
  const { userLoginStatus } = useSelector((state) => state.userInfo);

  if (userLoginStatus === loginSusses) {
    console.log('userLoginStatus', userLoginStatus);    
    setIsLoggedIn(true);
  }
  useEffect(() => {
    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Dependencies to trigger the effect

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    navigate("/login");
  } // Render child routes if logged in
}

export default ProtectedRoutes;
