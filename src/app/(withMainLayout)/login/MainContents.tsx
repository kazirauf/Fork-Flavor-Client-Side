/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import Link from "next/link";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useUser } from "@/src/context/user.provider";

const MainContentsOfLogin = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const {
    mutate: handleUserLogin,
    isPending,
    data: userLoginResponse,
  } = useUserLogin();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (userLoginResponse && !userLoginResponse.success) {
      toast.error(userLoginResponse.message);
    } else if (userLoginResponse && userLoginResponse.success) {
      router.push("/");
      toast.success("Logged in successfully");
    }
  }, [userLoginResponse]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  return (
    <div>
      <div className="bg-[#F5EDED]">
        <div className="py-16">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            {/* Left Image */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <img
                alt=""
                src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg?w=740&t=st=1724554960~exp=1724555560~hmac=6064a75a7f58f77ff4a136410a04650dffc247f6acb5377d73ff67c9986a77a5"
              />
            </motion.div>

            {/* Right Form */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full p-8 lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                CookNest
              </h2>
              <p className="text-xl text-gray-600 text-center">
                Login to manage recipes!
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })} // Register with validation
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="email"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })} // Register with validation
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                  />
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-button hover:bg-button-dark text-white font-bold py-2 px-4 w-full rounded text-lg"
                    isDisabled={isPending}
                    isLoading={isPending}
                    type="submit"
                  >
                    {isPending ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

              <div className="mt-4">
                <p className="text-xl text-gray-600">
                  New to this platform?{" "}
                  <Link
                    className="hover:underline text-blue-600"
                    href="/register"
                  >
                    Sign up
                  </Link>
                </p>

                <p className="text-lg text-gray-600 mt-3">
                  Forgot your password?{" "}
                  <Link
                    className="hover:underline text-blue-600"
                    href="/forgot-password"
                  >
                    Reset password from here
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentsOfLogin;
