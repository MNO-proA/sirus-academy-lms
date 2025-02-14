// import CommonForm from "@/components/common-form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { signInFormControls, signUpFormControls } from "@/config";
// import { AuthContext } from "@/context/auth-context";
// import { GraduationCap } from "lucide-react";
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";

// function AuthPage() {
//   const [activeTab, setActiveTab] = useState("signin");
//   const {
//     signInFormData,
//     setSignInFormData,
//     signUpFormData,
//     setSignUpFormData,
//     handleRegisterUser,
//     handleLoginUser,
//   } = useContext(AuthContext);

//   function handleTabChange(value) {
//     setActiveTab(value);
//   }

//   function checkIfSignInFormIsValid() {
//     return (
//       signInFormData &&
//       signInFormData.userEmail !== "" &&
//       signInFormData.password !== ""
//     );
//   }

//   function checkIfSignUpFormIsValid() {
//     return (
//       signUpFormData &&
//       signUpFormData.userName !== "" &&
//       signUpFormData.userEmail !== "" &&
//       signUpFormData.password !== ""
//     );
//   }

//   console.log(signInFormData);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="px-4 lg:px-6 h-14 flex items-center border-b">
//         <Link to={"/"} className="flex items-center justify-center">
//           <GraduationCap className="h-8 w-8 mr-4" />
//           <span className="font-extrabold text-xl">LMS LEARN</span>
//         </Link>
//       </header>
//       <div className="flex items-center justify-center min-h-screen bg-background">
//         <Tabs
//           value={activeTab}
//           defaultValue="signin"
//           onValueChange={handleTabChange}
//           className="w-full max-w-md"
//         >
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="signin">Sign In</TabsTrigger>
//             <TabsTrigger value="signup">Sign Up</TabsTrigger>
//           </TabsList>
//           <TabsContent value="signin">
//             <Card className="p-6 space-y-4">
//               <CardHeader>
//                 <CardTitle>Sign in to your account</CardTitle>
//                 <CardDescription>
//                   Enter your email and password to access your account
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signInFormControls}
//                   buttonText={"Sign In"}
//                   formData={signInFormData}
//                   setFormData={setSignInFormData}
//                   isButtonDisabled={!checkIfSignInFormIsValid()}
//                   handleSubmit={handleLoginUser}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//           <TabsContent value="signup">
//             <Card className="p-6 space-y-4">
//               <CardHeader>
//                 <CardTitle>Create a new account</CardTitle>
//                 <CardDescription>
//                   Enter your details to get started
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <CommonForm
//                   formControls={signUpFormControls}
//                   buttonText={"Sign Up"}
//                   formData={signUpFormData}
//                   setFormData={setSignUpFormData}
//                   isButtonDisabled={!checkIfSignUpFormIsValid()}
//                   handleSubmit={handleRegisterUser}
//                 />
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { GraduationCap } from "lucide-react";
// import CommonForm from "@/components/common-form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { signInFormControls, signUpFormControls } from "@/config";
// import { AuthContext } from "@/context/auth-context";

// function AuthPage() {
//   const [activeTab, setActiveTab] = useState("signin");
//   const {
//     signInFormData,
//     setSignInFormData,
//     signUpFormData,
//     setSignUpFormData,
//     handleRegisterUser,
//     handleLoginUser,
//   } = useContext(AuthContext);

//   function handleTabChange(value) {
//     setActiveTab(value);
//   }

//   function checkIfSignInFormIsValid() {
//     return (
//       signInFormData &&
//       signInFormData.userEmail !== "" &&
//       signInFormData.password !== ""
//     );
//   }

//   function checkIfSignUpFormIsValid() {
//     return (
//       signUpFormData &&
//       signUpFormData.userName !== "" &&
//       signUpFormData.userEmail !== "" &&
//       signUpFormData.password !== ""
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
//         <Link
//           to="/"
//           className="flex items-center justify-center group transition-transform hover:scale-105"
//         >
//           <motion.div
//             initial={{ rotate: -10 }}
//             animate={{ rotate: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//           </motion.div>
//           <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
//             <img src="siriusjpg.jpg" alt="Sirius" className="h-14 w-32 " />
//           </span>
//         </Link>
//       </header>

//       <div className="flex items-center justify-center min-h-screen pt-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="w-full max-w-md px-4 py-8"
//         >
//           <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
//             <Tabs
//               value={activeTab}
//               defaultValue="signin"
//               onValueChange={handleTabChange}
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-gray-100/80">
//                 <TabsTrigger
//                   value="signin"
//                   className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
//                 >
//                   Sign In
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="signup"
//                   className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
//                 >
//                   Sign Up
//                 </TabsTrigger>
//               </TabsList>

//               <AnimatePresence mode="wait">
//                 <TabsContent value="signin">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className="border-none shadow-none p-6">
//                       <CardHeader className="space-y-1 px-0">
//                         <CardTitle className="text-2xl font-bold tracking-tight">
//                           Welcome back
//                         </CardTitle>
//                         <CardDescription className="text-gray-500">
//                           Enter your credentials to access your account
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="px-0">
//                         <CommonForm
//                           formControls={signInFormControls}
//                           buttonText="Sign In"
//                           formData={signInFormData}
//                           setFormData={setSignInFormData}
//                           isButtonDisabled={!checkIfSignInFormIsValid()}
//                           handleSubmit={handleLoginUser}
//                         />
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </TabsContent>

//                 <TabsContent value="signup">
//                   <motion.div
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Card className="border-none shadow-none p-6">
//                       <CardHeader className="space-y-1 px-0">
//                         <CardTitle className="text-2xl font-bold tracking-tight">
//                           Create your account
//                         </CardTitle>
//                         <CardDescription className="text-gray-500">
//                           Join our learning community today
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="px-0">
//                         <CommonForm
//                           formControls={signUpFormControls}
//                           buttonText="Sign Up"
//                           formData={signUpFormData}
//                           setFormData={setSignUpFormData}
//                           isButtonDisabled={!checkIfSignUpFormIsValid()}
//                           handleSubmit={handleRegisterUser}
//                         />
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </TabsContent>
//               </AnimatePresence>
//             </Tabs>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Loader2, Home } from "lucide-react";
import { toast } from "sonner";
import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.password !== ""
    );
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.password !== ""
    );
  }

  const clearSignInForm = () => {
    setSignInFormData({
      userEmail: "",
      password: "",
    });
  };

  const clearSignUpForm = () => {
    setSignUpFormData({
      userName: "",
      userEmail: "",
      password: "",
    });
  };

  const handleSignIn = async (e) => {
    try {
      setIsLoading(true);
      await handleLoginUser(e);
      clearSignInForm();
      toast.success("Signed in successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    try {
      setIsLoading(true);
      await handleRegisterUser(e);
      clearSignUpForm();
      toast.success("Account created successfully!");
      setActiveTab("signin");
    } catch (error) {
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('/logo-v.png')]">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm fixed w-full top-0 z-50">
        <Link
          to="/"
          className="flex items-center justify-center group transition-transform hover:scale-105"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            <img src="siriusjpg.jpg" alt="Sirius" className="h-14 w-32" />
          </span>
        </Link>
      </header> */}

      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-4 py-8"
        >
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <Tabs
              value={activeTab}
              defaultValue="signin"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full gap-6 grid-cols-2 mb-1 p-1 bg-gray-100/80">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
                >
                  Sign Up
                </TabsTrigger>
                
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="signin">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-none p-6">
                      <CardHeader className="space-y-1 px-0">
                        <CardTitle className="text-2xl font-bold tracking-tight">
                          Welcome back
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                          Enter your credentials to access your account
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0">
                        <CommonForm
                          formControls={signInFormControls}
                          buttonText={
                            isLoading ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Signing in...
                              </div>
                            ) : (
                              "Sign In"
                            )
                          }
                          formData={signInFormData}
                          setFormData={setSignInFormData}
                          isButtonDisabled={
                            !checkIfSignInFormIsValid() || isLoading
                          }
                          handleSubmit={handleSignIn}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="signup">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-none shadow-none p-6">
                      <CardHeader className="space-y-1 px-0">
                        <CardTitle className="text-2xl font-bold tracking-tight">
                          Create your account
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                          Join our learning community today
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-0">
                        <CommonForm
                          formControls={signUpFormControls}
                          buttonText={
                            isLoading ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating account...
                              </div>
                            ) : (
                              "Sign Up"
                            )
                          }
                          formData={signUpFormData}
                          setFormData={setSignUpFormData}
                          isButtonDisabled={
                            !checkIfSignUpFormIsValid() || isLoading
                          }
                          handleSubmit={handleSignUp}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
              {/* Home Button */}
              <div className="flex justify-center mt-4 pb-4">
              <Button onClick={() => navigate("/")} className="flex items-center gap-2 text-slate-950 hover:bg-white bg-slate-50 hover:underline">
                <Home className="h-5 w-5" />
                Go Home
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;
