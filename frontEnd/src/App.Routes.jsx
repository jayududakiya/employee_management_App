import { createBrowserRouter} from "react-router-dom";
import Home from "./pages/home";
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoutes  from "./ProtectedRoutes";



const AppRoutes = createBrowserRouter([
  {
      path: "/login",
      element: <Login />
  },
  {
      path: "/signup",
      element: <SignUp />
  },
  {
      element: <ProtectedRoutes />,
      children: [
          {
              path: "/",
              element: <Home />
          },
      ]
  },
]);



export default AppRoutes;


