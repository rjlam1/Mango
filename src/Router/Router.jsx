// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router";

// import React from 'react';
// import MainLaOut from "../LayOut/MainLaOut";
// import Home from "../Component/Home";
// import Login from "../Component/Login";
// import Register from "../Component/Register";
// import AuthProvider from "../PrivateRouter/AuthPrivate";
// import AddPlant from "../Component/AddPlants";

// const Router = createBrowserRouter([
//   {
//     path: "/",
//    Component:MainLaOut,
//    children:[
//     {index:true,Component:Home},
//     {path:'/login',Component:Login},
//     {path:'/register',Component:Register},
//     {path:'/addPlants',element:<AddPlant></AddPlant>}
//    ]
//   },
// ]);

// export default Router;

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router"; // use 'react-router-dom' for browser routing

// import React from 'react';
// import MainLaOut from "../LayOut/MainLaOut";
// import Home from "../Component/Home";
// import Login from "../Component/Login";
// import Register from "../Component/Register";
// import AddPlant from "../Component/AddPlants";
// import ViewDetails from "../Component/ViewDetails";
// import UpdatePlant from "../Component/UpdatePlant";
// import MyPlants from "../Component/Myplants";
// import PrivateRoute from "../Component/PrivateRouter";

// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLaOut />, // Use 'element' instead of 'Component'
//     children: [
//       { index: true, element: <Home /> },
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
//       { path: "/addPlants", element: <PrivateRoute><AddPlant></AddPlant></PrivateRoute> },
//       { path: "/myPlants", element: <PrivateRoute><MyPlants></MyPlants></PrivateRoute> },
//       { path: "/plant/:id", element: <PrivateRoute><ViewDetails /></PrivateRoute>, loader: ({ params }) => fetch(`https://mango-server-ten.vercel.app/plants/${params.id}`) },
//       { path: "/update/:id", element: <PrivateRoute><UpdatePlant /></PrivateRoute>, loader: ({ params }) => fetch(`https://mango-server-ten.vercel.app/plants/${params.id}`) }
//     ]
//   },
// ]);

// export default Router;
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router';

import React from 'react';
import MainLaOut from '../LayOut/MainLaOut';
import Home from '../Component/Home';

import AddPlant from '../Component/AddPlants';
import ViewDetails from '../Component/ViewDetails';
import UpdatePlant from '../Component/UpdatePlant';
import MyPlants from '../Component/Myplants';
import PrivateRoute from '../Component/PrivateRouter';
import Login from '../Component/Login'
import Register from'../Component/Register'
import AllPlants from '../Component/Allplans';
import NotFound from '../Component/NotFound';
const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLaOut />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login></Login> },
      {path:'/register', element:<Register></Register>},
      {path:'/allPlants',element:<AllPlants></AllPlants>}
      ,
      {
        path: '/addPlants',
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        )
      },
      {
        path: '/myPlants',
        element: (
          <PrivateRoute>
            <MyPlants />
          </PrivateRoute>
        )
      },
      {
        path: '/plant/:id',
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`https://mango-server-ten.vercel.app/mango/${params.id}`)
      },
      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdatePlant />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`https://mango-server-ten.vercel.app/mango/${params.id}`)
      },
      // 404 fallback
      {
        path: '*',
        element:<NotFound></NotFound>
      }
    ]
  }
]);

export default Router;
