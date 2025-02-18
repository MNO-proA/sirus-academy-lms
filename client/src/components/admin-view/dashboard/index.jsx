import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Shield, UserCog, Trash2, Edit, Search } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAllUsersService, updateUserRoleService, deleteUserService } from '@/services';

const ITEMS_PER_PAGE = 5;
const ROLES = ["user", "instructor", "admin"];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState({});

  const calculateUserStats = useCallback(() => {
    return users.reduce((acc, user) => {
      acc.totalUsers++;
      if (user.role === 'instructor') acc.totalInstructors++;
      if (user.role === 'admin') acc.totalAdmins++;
      return acc;
    }, {
      totalUsers: 0,
      totalInstructors: 0,
      totalAdmins: 0
    });
  }, [users]);

  const stats = calculateUserStats();

  const config = [
    {
      icon: Users,
      label: "Total Users",
      value: stats.totalUsers,
      gradientFrom: "from-amber-600",
      gradientTo: "to-zinc-900",
    },
    {
      icon: UserCog,
      label: "Total Instructors",
      value: stats.totalInstructors,
      gradientFrom: "from-amber-600",
      gradientTo: "to-zinc-900",
    },
    {
      icon: Shield,
      label: "Total Admins",
      value: stats.totalAdmins,
      gradientFrom: "from-amber-600",
      gradientTo: "to-zinc-900",
    },
  ];

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetchAllUsersService();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleUpdate = async (userId) => {
    if (!selectedRole[userId]) return;
    try {
      await updateUserRoleService(userId, selectedRole[userId]);
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserService(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {config.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <div className={`p-2 rounded-full bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} bg-opacity-10`}>
                  <item.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} bg-clip-text text-transparent`}>
                  {item.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-extrabold sm:text-2xl bg-gradient-to-r from-amber-600 to-zinc-900 bg-clip-text text-transparent">
            User Management
          </CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-amber-50 to-zinc-50">
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group hover:bg-gray-50 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">{user.userEmail}</TableCell>
                    <TableCell>
                      {editingUserId === user._id ? (
                        <select
                          value={selectedRole[user._id] || user.role}
                          onChange={(e) => setSelectedRole(prev => ({ ...prev, [user._id]: e.target.value }))}
                          className="border rounded px-2 py-1 focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                        >
                          {ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="capitalize">{user.role}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {editingUserId === user._id ? (
                        <Button
                          onClick={() => handleRoleUpdate(user._id)}
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setEditingUserId(user._id)}
                          variant="ghost"
                          size="sm"
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          <Edit className="h-5 w-5 text-amber-600 group-hover:text-amber-700" />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteUser(user._id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 transition-transform duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="transition-all duration-200 hover:bg-amber-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="transition-all duration-200 hover:bg-amber-50"
                >
                  Next
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDashboard;