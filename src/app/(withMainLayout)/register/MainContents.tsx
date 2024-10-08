/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useUserRegistration } from "@/src/hooks/auth.hooks";

const MainContentsOfRegister = () => {
  // Initialize useForm hook
  const { register, handleSubmit } = useForm();
  const {
    mutate: handleUserRegistration,
    isPending,
    data,
  } = useUserRegistration();
  const router = useRouter();

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data.message);
    } else if (data && data.success) {
      toast.success("User registered successfully");
      router.push("/login");
    }
  }, [data]);

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePicture: data.profilePicture
        ? data.profilePicture
        : "https://i.ibb.co/HN9NtYY/user.png",
    };

    handleUserRegistration(userData);
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
                alt="Sign Up"
                className="h-full"
                src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?t=st=1724555771~exp=1724559371~hmac=e2c481bd11c2f4215096d6ce2bd2a58f728b890c0d25496ed777b102b9082412&w=740"
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
                Sign Up to be a member!
              </p>

              {/* Form starts here */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    required
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    required
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
                    })}
                    required
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Profile Picture URL (Optional)
                    </label>
                  </div>
                  <input
                    {...register("profilePicture")}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                  />
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-button hover:bg-button-dark text-white font-bold py-2 px-4 w-full rounded text-lg"
                    isDisabled={isPending}
                    isLoading={isPending}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentsOfRegister;
