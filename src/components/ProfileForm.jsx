'use client'
import { useEffect, useRef, useState } from "react";
import { getFormatedDateDateField, getMaxDOB } from "../utils/date";
import { updateUserProfile } from "../services/user";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { defaultBoyProfileImg, defaultGirlProfileImg } from "@/assets";

export default function ProfileForm({ initialData }) {

    const initialFormValue = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        profileImage: '',
        designation: '',
        department: '',
        teamLeader: '',
        manager: ''
    }

    const [formData, setFormData] = useState(initialFormValue);
    const [imagePreview, setImagePreview] = useState(initialData?.profileImage ? initialData?.profileImage : initialData?.gender === 'female' ? defaultGirlProfileImg?.src : defaultBoyProfileImg?.src);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    useEffect(() => {
        if (initialData) {
            setFormValueBasedOnData()
        }
    }, [initialData])


    const setFormValueBasedOnData = async () => {
        setFormData((prev) => ({
            ...prev,
            firstName: initialData?.firstName || '',
            lastName: initialData?.lastName || '',
            email: initialData?.email || '',
            phoneNumber: initialData?.phoneNumber || '',
            gender: initialData?.gender || '',
            dob: getFormatedDateDateField(initialData?.dob) || '',
            profileImage: initialData?.profileImage || '',
            designation: initialData?.designation || '',
            department: initialData?.department || '',
            teamLeader: initialData?.teamLeader
                ? `${initialData?.teamLeader?.firstName ?? ''} ${initialData?.teamLeader?.lastName ?? ''}`.trim() || null
                : null,
            manager: initialData?.manager
                ? `${initialData?.manager?.firstName ?? ''} ${initialData?.manager?.lastName ?? ''}`.trim() || null
                : null,
        }))
        setImagePreview(initialData?.profileImage ? initialData?.profileImage : initialData?.gender === 'female' ? defaultGirlProfileImg?.src : defaultBoyProfileImg?.src)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const error = validateField(name, value);

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
    };



    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First name is required';
                break;
            case 'lastName':
                if (!value.trim()) error = 'Last name is required';
                break;
            case 'phoneNumber':
                if (!value.trim()) error = 'Phone number is required';
                else if (!/^[0-9]{10}$/.test(value)) error = 'Enter a valid 10-digit number';
                break;
            case 'gender':
                if (!value.trim()) error = 'Gender is required';
                break;
            case 'dob':
                if (!value.trim()) error = 'Date of birth is required';
                break;
            default:
                break;
        }

        return error;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        });

        setErrors(newErrors);
        // If no errors, submit the form
        if (Object.keys(newErrors).length === 0) {
            try {
                const submissionData = appendData();
                const response = await updateUserProfile(submissionData);
                toast.success(response.message)
            } catch (error) {
                toast.error(response.message)
            }
        }
    };

    const appendData = () => {
        const form = new FormData();
        for (const key in formData) {
            if (key !== "profileImage" && !['email', 'designation', 'department'].includes(key)) {
                form.append(key, formData[key]);
            }
        }
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            form.append("profileImage", fileInputRef.current.files[0]);
        }

        for (let [key, value] of form.entries()) {
            console.log(`${key}:`, value);
        }

        return form;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleFileChangeClick = () => {
        fileInputRef.current.click();
    };

    return <>
        <div className="flex flex-col">
            <motion.div
                className="flex flex-col md:flex-row justify-center mb-5 items-start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <div className="text-center relative">
                    <div>
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleFileChangeClick}
                            src={imagePreview}
                            alt="Profile Picture"
                            className="cursor-pointer rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 ring ring-gray-300"
                        />
                        <input
                            ref={fileInputRef}
                            type="file"
                            name="profile"
                            id="upload_profile"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleFileChangeClick}
                        className="cursor-pointer bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300"
                    >
                        Change Profile Picture
                    </button>
                </div>
                {/* </div> */}
            </motion.div>

            <motion.form
                className="space-y-4 mt-[30px]"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {/* <form className="space-y-4 mt-[30px]" onSubmit={handleSubmit}> */}
                {/* İsim ve Unvan */}
                <div className="personal-details">
                    <h4 className="font-medium mb-2 text-[24px]">
                        Personal Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-[15px]">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                First Name <small className="text-red-600">*</small>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Please enter first name"
                                className="focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.firstName && <small className="text-red-600">{errors.firstName}</small>}

                        </div>

                        <div className="mb-[15px]">

                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Last Name <small className="text-red-600">*</small>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Please enter last name"
                                className="focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.lastName && <small className="text-red-600">{errors.lastName}</small>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-[15px]">

                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email <small className="text-red-600">*</small>
                            </label>
                            <input
                                disabled
                                type="email"
                                name="email"
                                value={formData.email}
                                id="email"
                                placeholder="Please enter email"
                                className="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-[15px]">

                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number <small className="text-red-600">*</small>
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                id="phoneNumber"
                                placeholder="Please enter phone number"
                                className="focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.phoneNumber && <small className="text-red-600">{errors.phoneNumber}</small>}

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-[15px]">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Gender <small className="text-red-600">*</small>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="focus:outline-none focus:shadow-outline focus:bg-white w-full px-2 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <small className="text-red-600">{errors.gender}</small>}
                        </div>

                        <div className="mb-[15px]">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Date Of Birth <small className="text-red-600">*</small>
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                                max={getMaxDOB()}
                                className="focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {errors.dob && <small className="text-red-600">{errors.dob}</small>}
                        </div>
                    </div>
                </div>

                <div className="personal-details">
                    <h4 className="font-medium mb-2 text-[24px]">
                        Professional Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-[15px]">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Designation <small className="text-red-600">*</small>
                            </label>
                            <input
                                disabled
                                name="designation"
                                type="text"
                                id="designation"
                                value={formData?.designation}
                                placeholder="Please enter designation"
                                className="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <small></small>
                        </div>

                        <div className="mb-[15px]">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Department <small className="text-red-600">*</small>
                            </label>
                            <input
                                disabled
                                name="department"
                                value={formData?.department}
                                type="text"
                                id="Department"
                                placeholder="Please enter department"
                                className="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <small></small>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-[15px]">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Team Leader <small className="text-red-600">*</small>
                            </label>
                            <input
                                disabled
                                value={formData?.teamLeader}
                                name="designation"
                                type="text"
                                id="designation"
                                className="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <small></small>
                        </div>

                        <div className="mb-[15px]">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Project Manager <small className="text-red-600">*</small>
                            </label>
                            <input
                                disabled
                                value={formData?.manager}
                                name="department"
                                type="text"
                                id="Department"
                                placeholder="Please enter department"
                                className="bg-gray-200 focus:outline-none focus:shadow-outline focus:bg-white w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <small></small>
                        </div>
                    </div>


                </div>

                {/* Kaydet ve İptal Butonları */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
                {/* </form> */}
            </motion.form>
        </div>
    </>
}