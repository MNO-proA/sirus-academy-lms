// import InstructorCourses from "@/components/instructor-view/courses";
// import InstructorDashboard from "@/components/instructor-view/dashboard";
// import AdminDashboard from "@/components/admin-view/dashboard";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { AuthContext } from "@/context/auth-context";
// import { InstructorContext } from "@/context/instructor-context";
// import { fetchInstructorCourseListService } from "@/services";
// import { BarChart, Book, LogOut, FolderLock } from "lucide-react";
// import { useContext, useEffect, useState } from "react";

// function InstructorDashboardpage() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const { resetCredentials, auth } = useContext(AuthContext);
//   const { instructorCoursesList, setInstructorCoursesList } =
//     useContext(InstructorContext);

//   async function fetchAllCourses() {
//     const response = await fetchInstructorCourseListService();
//     if (response?.success) setInstructorCoursesList(response?.data);
//   }

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   const menuItems = [
//     {
//       icon: BarChart,
//       label: "Dashboard",
//       value: "dashboard",
//       component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
//     },
//     {
//       icon: Book,
//       label: "Courses",
//       value: "courses",
//       component: <InstructorCourses listOfCourses={instructorCoursesList} />,
//     },
//   ];

//   if (auth?.user?.role === "admin") {
//     menuItems.push({
//       icon: FolderLock,
//       label: "Admin",
//       value: "admin",
//       component: <AdminDashboard />,
//     });
//   }

//   menuItems.push({
//     icon: LogOut,
//     label: "Logout",
//     value: "logout",
//     component: null,
//   });

//   function handleLogout() {
//     resetCredentials();
//     sessionStorage.clear();
//   }

//   console.log(instructorCoursesList, "instructorCoursesList");

//   return (
//     <div className="flex h-full min-h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md hidden md:block">
//         <div className="p-4">
//           <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
//           <nav>
//             {menuItems.map((menuItem) => (
//               <Button
//                 className="w-full justify-start mb-2"
//                 key={menuItem.value}
//                 variant={activeTab === menuItem.value ? "secondary" : "ghost"}
//                 onClick={
//                   menuItem.value === "logout"
//                     ? handleLogout
//                     : () => setActiveTab(menuItem.value)
//                 }
//               >
//                 <menuItem.icon className="mr-2 h-4 w-4" />
//                 {menuItem.label}
//               </Button>
//             ))}
//           </nav>
//         </div>
//       </aside>
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             {menuItems.map((menuItem) => (
//               <TabsContent key={menuItem?.value} value={menuItem.value}>
//                 {menuItem.component !== null ? menuItem.component : null}
//               </TabsContent>
//             ))}
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default InstructorDashboardpage;
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import AdminDashboard from "@/components/admin-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Book, 
  LogOut, 
  FolderLock,
  Menu,
  X,
  Bell,
  Search,
  User
} from "lucide-react";
import { capitalizeWord } from '@/lib/utils';

const InstructorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resetCredentials, auth } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext);

  const fetchAllCourses = async () => {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
  ];

  if (auth?.user?.role === "admin") {
    menuItems.push({
      icon: FolderLock,
      label: "Admin",
      value: "admin",
      component: <AdminDashboard />,
    });
  }

  menuItems.push({
    icon: LogOut,
    label: "Logout",
    value: "logout",
    component: null,
  });

  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  const handleMenuItemClick = (menuItem) => {
    if (menuItem.value === "logout") {
      handleLogout();
    } else {
      setActiveTab(menuItem.value);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="text-xl font-bold flex items-center lg:ml-2.5">
                <span className="self-center whitespace-nowrap">Sirus Panel</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden lg:flex items-center">
                <div className="relative mx-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                className="p-2 rounded-lg"
              >
                <Bell className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="ml-2 p-2 rounded-lg"
              >
                <User className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 pb-4 overflow-y-auto transition-transform bg-white border-r border-gray-200 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="flex-1 space-y-1">
            {menuItems.map((menuItem) => (
              <Button
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                className={`w-full justify-start py-2 px-4 text-base font-normal rounded-lg transition-colors
                  ${activeTab === menuItem.value 
                    ? 'bg-indigo-50 text-[#B1771D]' 
                    : 'text-gray-900 hover:bg-gray-100'
                  }`}
                onClick={() => handleMenuItemClick(menuItem)}
              >
                <menuItem.icon className={`w-6 h-6 transition-colors duration-200 ${
                  activeTab === menuItem.value ? 'text-[#B1771D]' : 'text-gray-500'
                }`} />
                <span className="ml-3">{menuItem.label}</span>
              </Button>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="text-sm font-medium text-gray-900 truncate">
                {capitalizeWord(auth?.user?.userName) || 'Instructor'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="px-4 py-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              {menuItems.find(item => item.value === activeTab)?.label}
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {menuItems.map((menuItem) => (
                menuItem.component && (
                  <TabsContent
                    key={menuItem.value}
                    value={menuItem.value}
                    className="p-6 focus:outline-none"
                  >
                    {menuItem.component}
                  </TabsContent>
                )
              ))}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;