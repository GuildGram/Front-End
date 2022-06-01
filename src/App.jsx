import React from 'react';
import './App.css';
import {BrowserRouter as Routes, Route, BrowserRouter} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Guild from './components/Guild/Guild';

import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak"
import PrivateRoute from './components/helpers/PrivateRoute';

export default function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/guild' element={
              <PrivateRoute>
                <Guild/>
              </PrivateRoute>
              }/>
          </Routes>
        </BrowserRouter>
    </ReactKeycloakProvider>
);
}
