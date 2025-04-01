"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";

export const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
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
    return "";
  };

  const validateForm = () => {
    let newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {

      const data = await loginUser(formData);
      toast.success(data?.message)
      localStorage.setItem('accessToken', data?.accessToken)
      localStorage.setItem('refreshToken', data?.refreshToken);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || error)
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">K-WD</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for your digital products, while leaving the
            UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <a href="#" className="underline">Get Started!</a>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                placeholder="Please enter email id"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:ring-blue-200"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">Password</label>
              <input
                placeholder="Please enter password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:ring-blue-200"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};