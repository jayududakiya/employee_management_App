import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userAuthKey } from "../auth/authKeys";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, userLoginStatus } = useSelector(
    (state) => state.userInfo
  );

  const { loginSusses } = userAuthKey;

  useEffect(() => {
    console.log("userRegisterStatus ", userLoginStatus);
  }, []);

  return (
    <div>
      <p>{loading ? "LOADING..." : null}</p>
      {!loading && userLoginStatus === loginSusses && (
        <h1>Welcome To Home Page</h1>
      )}

      {error && <p> {error} </p>}
    </div>
  );
};

export default Home;
