import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useKeycloak } from "@react-keycloak/web";


export default function Navbar() {
  const { keycloak } = useKeycloak();
  return (
    <div className='navbar'>navbar
        <Link to="/">Home</Link>
        <Link to="/guild">Guilds</Link>
        <div className='navbar'>
          {!keycloak.authenticated && (
          <button
            type="button"
            className="text-blue-800"
            onClick={() => keycloak.login()}>
              Login
          </button>
          )}
        </div>
        <div className='navbar'>
          {!!keycloak.authenticated && (
          <button
            type="button"
            className="text-blue-800"
            onClick={() => keycloak.logout()}>
              Logout ({keycloak.tokenParsed.preferred_username})
          </button>
          )}
          {console.log(keycloak.subject)}
        </div>
    </div>
  )
}