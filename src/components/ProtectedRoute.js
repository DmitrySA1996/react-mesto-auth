import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Routes>
      <Route>
        {() =>
          props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
        }
      </Route>
    </Routes>
  )
}