import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import NotFound from "./NotFound";
import Register from "./Routes/Register";
import Login from "./Routes/Login";
import Routines from "./Routes/Routines/Routines";
import Activities from "./Routes/Activities/Activities";
import Home from "./Routes/Home"
import Root from './Routes/Root';
import UserRoutines from "./Routes/Profile";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children:[ 
        {
          path:'home',
          element: <Home />
        },
        {
          path:"routines",
          element:<Routines />,
        },
        {
          path:"activities",
          element: <Activities/>
        },
        {
          path:"users/routines",
          element:<UserRoutines />
        },
        {
          path:"register",
          element:<Register />
        },
        {
          path:"login",
          element:<Login />
        },
      ],
    },

  ]);
// the colon: means this specific thing is a route parameter will render specific posts, gives it the functionality, takes database ID and shows the infomation
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;