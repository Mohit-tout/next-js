"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "@/services/auth";
import Link from "next/link";
import { LogoImageForBg } from "@/assets";
import Image from "next/image";
interface FormData {
  name?: string;
  email: string;
  password: string;
}

export const AuthForm = () => {
  const pathname = usePathname();
  const isSignUp = pathname === "/signup";
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: validateField(e.target.name, e.target.value),
    }));
  };

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!value) return "Email is required!";
      if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email!";
    }
    if (name === "password") {
      if (!value) return "Password is required!";
      if (value.length < 6) return "Password must be at least 6 characters!";
    }
    if (name === "name" && isSignUp) {
      if (!value) return "Full name is required!";
      if (!/^[a-zA-Z\s]+$/.test(value)) return "Full name can only contain letters and spaces!";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: isSignUp ? validateField("name", formData.name || "") : undefined,
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === undefined || error === "");
  };

  function formDataToObject(formData: FormData): Record<string, string> {
    const obj: Record<string, string> = {};
    for (const [key, value] of Array.from(formData.entries())) {
      obj[key] = value.toString();
    }
    return obj;
  }

// Inside your submit handler
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const plainObject = formDataToObject(formData);
    const data = isSignUp
      ? await registerUser(plainObject)
      : await loginUser(plainObject);

    toast.success(data?.message || "Success");

    if (isSignUp) {
      router.push("/login");
    } else {
      localStorage.setItem("accessToken", data?.accessToken);
      localStorage.setItem("refreshToken", data?.refreshToken);
      localStorage.setItem("userId", data?.user?.id);
      localStorage.setItem("role", "admin");
      router.push("/admin/dashboard");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

  
  
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" alt="logo" src={LogoImageForBg} />
          Task Management Tool
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {isSignUp ? "Create an account" : "Login to your account"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Please enter full name"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
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
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
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
                  id="password"
                  placeholder="Please enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <button type="submit" className="bg-blue-600 text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {isSignUp ? "Create an account" : "Login"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <Link href={isSignUp ? "/login" : "/signup"} className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                  {isSignUp ? "Login here" : "Sign up here"}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};