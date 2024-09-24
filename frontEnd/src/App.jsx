import { RouterProvider } from "react-router-dom";
import AppRoutes from "./App.Routes";
import {AuthorizedNavBar , UnauthorizedNavBar} from "./components/NavBar";
function App() {
  const isLoggedIn = false;
  return (
    <>
      { isLoggedIn ? <AuthorizedNavBar/> : <UnauthorizedNavBar/> }
      <div className="container">
        <RouterProvider router={AppRoutes} />
      </div>
    </>
  );
}

export default App;
