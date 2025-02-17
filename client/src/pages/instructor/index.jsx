import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import AdminDashboard from "@/components/admin-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LogoV from "../../../public/logo-v.png";
import LogoH from "../../../public/logo-h.png";
import { motion } from "framer-motion";
import {
  Book,
  LogOut,
  FolderLock,
  Menu,
  Bell,
  Search,
  User,
  ChartNoAxesCombined,
} from "lucide-react";
import { capitalizeWord } from "@/lib/utils";
import { Link } from "react-router-dom";

const InstructorDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("courses"); // Changed default to "courses"
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { resetCredentials, auth } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  const fetchAllCourses = async () => {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: ChartNoAxesCombined,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
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
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full p-5">
        <div className="px-3 py-1 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              >
                <Menu className="h-6 w-6" />
              </button>
              {/* <div className="text-xl font-bold flex items-center lg:ml-2.5"> */}
              {/* <img src={LogoH} alt="Sirius" className="h-24 w-24" /> */}
              {/* </div> */}
            </div>
            <p className="md:text-4xl font-extrabold text-3xl bg-gradient-to-r from-amber-600 to-zinc-900 bg-clip-text text-transparent">
              Sirus Panel
            </p>
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
              <Button variant="ghost" className="p-2 rounded-lg ">
                <Bell className="h-6 w-6" />
              </Button>
              {/* <Button
                variant="ghost"
                className="ml-2 p-2 rounded-lg"
              >
                <User className="h-6 w-6" />
              </Button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 pb-4 overflow-y-auto transition-transform bg-white border-r border-gray-200 
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 py-1 flex flex-col">
          <Link to={"/"}>
            <img src={LogoV} alt="Sirius" className="h-40 w-40" />
          </Link>

          <div className="flex-1 space-y-1">
    {menuItems.map((menuItem) => (
      <motion.div
        key={menuItem.value}
        whileHover={{ scale: menuItem.value === 'logout' ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant={activeTab === menuItem.value ? "secondary" : "ghost"}
          className={`w-full justify-start py-2 px-4 text-base font-normal rounded-lg transition-all duration-200
            ${
              menuItem.value === 'logout'
                ? "hover:bg-red-50 group"
                : activeTab === menuItem.value
                ? "bg-indigo-50 text-[#B1771D]"
                : "text-gray-900 hover:bg-gray-100"
            }
            ${
              menuItem.value === 'logout' && activeTab === menuItem.value
                ? "bg-red-50"
                : ""
            }
          `}
          onClick={() => handleMenuItemClick(menuItem)}
        >
          <menuItem.icon
            className={`w-6 h-6 transition-colors duration-200 
              ${
                menuItem.value === 'logout'
                  ? "text-red-500 group-hover:text-red-600"
                  : activeTab === menuItem.value
                  ? "text-[#B1771D]"
                  : "text-gray-500"
              }
            `}
          />
          <span 
            className={`ml-3 transition-colors duration-200
              ${
                menuItem.value === 'logout'
                  ? "group-hover:text-red-600"
                  : ""
              }
            `}
          >
            {menuItem.label}
          </span>
          
          {menuItem.value === 'logout' && (
            <motion.div
              className="ml-auto"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="h-2 w-2 rounded-full bg-red-500" />
            </motion.div>
          )}
        </Button>
      </motion.div>
    ))}
  </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="px-4 py-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Logged in as</p>
              <p className="text-sm font-medium text-gray-900 truncate mb-2 flex gap-3">
                {/* <Button
                variant="ghost"
                className="rounded-lg"
              > */}
                <User className="h-6 w-6" />
                <span>
                  {capitalizeWord(auth?.user?.userName) || "Instructor"}
                </span>
                {/* </Button> */}
              </p>
              <p className="text-xs text-gray-900 truncate">
                Powered by Qodexcore
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
      <main className="pt-24 lg:ml-64 min-h-screen">
        <div className="px-4 py-6 lg:px-8">
          <div className="mb-3">
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-zinc-900 bg-clip-text text-transparent">
              {menuItems.find((item) => item.value === activeTab)?.label}
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {menuItems.map(
                (menuItem) =>
                  menuItem.component && (
                    <TabsContent
                      key={menuItem.value}
                      value={menuItem.value}
                      className="p-6 focus:outline-none"
                    >
                      {menuItem.component}
                    </TabsContent>
                  )
              )}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboardPage;
