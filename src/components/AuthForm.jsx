"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "@/services/auth";
import { LogoImageForBg } from "@/assets";
import Image from "next/image";

export const AuthForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isSignUp = pathname === "/signup";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    if (name === "email") {
      if (!value) return "Email is required!";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email!";
    }
    if (name === "password") {
      if (!value) return "Password is required!";
      if (value.length < 6) return "Password must be at least 6 characters!";
    }
    if (name === "firstName" && isSignUp) {
      if (!value) return "Full name is required!";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Full name can only contain letters and spaces!";
    }
    if (name === "lastName" && isSignUp) {
      if (!value) return "Full name is required!";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Full name can only contain letters and spaces!";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      firstName: isSignUp ? validateField("firstName", formData.firstName || "") : "",
      lastName: isSignUp ? validateField("lastName", formData.lastName || "") : "",
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const signUpFormData = isSignUp ? {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        password: formData?.password,
        organizationId: "2dd67cc0-5cf0-48c3-807b-a36ee65cfb3c",
        role: "EMPLOYEE"
      } : formData
      const data = isSignUp ? await registerUser(signUpFormData) : await loginUser(formData);
      toast.success(data?.message);

      if (isSignUp) {
        router.push("/login");
      } else {
        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);
        localStorage.setItem("userId", data?.user?.id);
        localStorage.setItem("role", data?.user?.role);
        localStorage.setItem("fullName", data?.user?.fullName);
        router.push("/employee/dashboard");
      }
    } catch (error) {
      console.error("ERROR -:", error);
      toast.error(error?.message || "Authentication failed!");
    }
  };


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" alt="logo" src={LogoImageForBg} />
          Task Management Tool
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? "Create an account" : "Login to your account"}
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (<>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
                    placeholder="Please enter first name"
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
                    placeholder="Please enter last name"
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </>
              )}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
                  placeholder="Please enter email"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Please enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <button type="submit" className="bg-blue-600 text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {isSignUp ? "Create an account" : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <a href={isSignUp ? "/login" : "/signup"} className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                  {isSignUp ? " Login here" : " Sign up here"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
