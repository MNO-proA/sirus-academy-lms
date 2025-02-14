/* eslint-disable react/prop-types */
// import { Navigate, useLocation } from "react-router-dom";
// import { Fragment } from "react";

// function RouteGuard({ authenticated, user, element }) {
//   const location = useLocation();
  
//   // If not authenticated and not on an auth page, redirect to login
//   if (!authenticated && !location.pathname.includes("/auth")) {
//     return <Navigate to="/auth" />;
//   }

//   // If authenticated but trying to access auth pages, redirect based on role
//   if (authenticated && location.pathname.includes("/auth")) {
//     if (user?.role === "instructor" || user?.role === "admin") {
//       return <Navigate to="/instructor" />;
//     }
//     return <Navigate to="/academy/home" />;
//   }

//   // If trying to access instructor routes without proper role
//   if (
//     authenticated &&
//     user?.role !== "instructor" &&
//     user?.role !== "admin" &&
//     location.pathname.includes("instructor")
//   ) {
//     return <Navigate to="/home" />;
//   }

//   // If instructor/admin accessing non-instructor pages (except auth)
//   if (
//     authenticated &&
//     (user?.role === "instructor" || user?.role === "admin") &&
//     !location.pathname.includes("instructor") &&
//     !location.pathname.includes("/auth")
//   ) {
//     return <Navigate to="/instructor" />;
//   }

//   return <Fragment>{element}</Fragment>;
// }

// export default RouteGuard;

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  // Redirect unauthenticated users to login (except if they're on auth page)
  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  // Redirect authenticated users away from the auth page
  if (authenticated && location.pathname.includes("/auth")) {
    return user?.role === "instructor" || user?.role === "admin"
      ? <Navigate to="/instructor" />
      : <Navigate to="/academy/home" />;
  }

  // Prevent students from accessing instructor/admin routes
  if (
    authenticated &&
    user?.role !== "instructor" &&
    user?.role !== "admin" &&
    location.pathname.includes("/instructor")
  ) {
    return <Navigate to="/academy/home" />;
  }

  // Ensure instructors/admins always stay within instructor routes
  if (
    authenticated &&
    (user?.role === "instructor" || user?.role === "admin") &&
    location.pathname.startsWith("/academy")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
