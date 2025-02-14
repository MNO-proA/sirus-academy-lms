// import { Route, Routes } from "react-router-dom";
// import AuthPage from "./pages/auth";
// import RouteGuard from "./components/route-guard";
// import { useContext } from "react";
// import { AuthContext } from "./context/auth-context";
// import InstructorDashboardpage from "./pages/instructor";
// import StudentViewCommonLayout from "./components/student-view/common-layout";
// import StudentHomePage from "./pages/student/home";
// import NotFoundPage from "./pages/not-found";
// import AddNewCoursePage from "./pages/instructor/add-new-course";
// import StudentViewCoursesPage from "./pages/student/courses";
// import StudentViewCourseDetailsPage from "./pages/student/course-details";
// import PaypalPaymentReturnPage from "./pages/student/payment-return";
// import StudentCoursesPage from "./pages/student/student-courses";
// import StudentViewCourseProgressPage from "./pages/student/course-progress";
// import CheckoutPage from "./pages/student/checkout";
// import WebsiteHome from "./pages/home-website";


// function App() {
//   const { auth } = useContext(AuthContext);

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={<WebsiteHome />}
//       />
//        <Route
//         path="/auth"
//         element={
//           <RouteGuard
//             element={<AuthPage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor"
//         element={
//           <RouteGuard
//             element={<InstructorDashboardpage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor/create-new-course"
//         element={
//           <RouteGuard
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//         path="/instructor/edit-course/:courseId"
//         element={
//           <RouteGuard
//             element={<AddNewCoursePage />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       />
//       <Route
//          path="academy"
//         element={
//           <RouteGuard
//             element={<StudentViewCommonLayout />}
//             authenticated={auth?.authenticate}
//             user={auth?.user}
//           />
//         }
//       >
//         <Route path="" element={<StudentHomePage />} />
//         <Route path="home" element={<StudentHomePage />} />
//         <Route path="courses" element={<StudentViewCoursesPage />} />
//         <Route
//           path="course/details/:id"
//           element={<StudentViewCourseDetailsPage />}
//         />
//         <Route path="checkout" element={< CheckoutPage/>} />
//         <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
//         <Route path="student-courses" element={<StudentCoursesPage />} />
//         <Route
//           path="course-progress/:id"
//           element={<StudentViewCourseProgressPage />}
//         />
//       </Route>
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import CheckoutPage from "./pages/student/checkout";
import WebsiteHome from "./pages/home-website";


function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Route (Website Home) */}
      <Route path="/" element={<WebsiteHome />} />

      {/* Auth Page (Only Accessible if NOT logged in) */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            authenticated={auth?.authenticate}
            user={auth?.user}
            element={<AuthPage />}
          />
        }
      />

      {/* Instructor Dashboard (Protected) */}
      <Route
        path="/instructor"
        element={
          <RouteGuard
            authenticated={auth?.authenticate}
            user={auth?.user}
            element={<InstructorDashboardpage />}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      {/* Student Portal Routes */}
      <Route
        path="/academy/*"
        element={
          <RouteGuard
            authenticated={auth?.authenticate}
            user={auth?.user}
            element={<StudentViewCommonLayout />}
          />
        }
      >
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route path="course/details/:id" element={<StudentViewCourseDetailsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route path="course-progress/:id" element={<StudentViewCourseProgressPage />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
