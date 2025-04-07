'use client'
import { useEffect, useRef, useState } from "react";
import { getMaxDOB } from "../utils/date";

export default function ProfileForm({ initialData, isLoading }) {

    const initialFormValue = {
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        phoneNumber: initialData?.phoneNumber || '',
        gender: initialData?.gender || '',
        dob: initialData?.dob || '',
        profileImage: initialData?.profileImage || '',
        designation: initialData?.designation || '',
        department: initialData?.department || '',
    }

    const [formData, setFormData] = useState(initialFormValue);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    console.log('initial data---------:', initialData)

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
            dob: initialData?.dob || '',
            profileImage: initialData?.profileImage || '',
            designation: initialData?.designation || '',
            department: initialData?.department || ''
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';

        setErrors(newErrors);

        // If no errors, submit the form
        if (Object.keys(newErrors).length === 0) {
            // Call the API to submit the form data
            try {
                // Replace the following line with your actual API call
                const response = await fetch('/api/updateProfile', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.ok) {
                    alert('Profile updated successfully');
                } else {
                    alert('Error updating profile');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };




    const handleFileChangeClick = () => {
        fileInputRef.current.click();
    };

    if (isLoading) {
        return (
            <div>Loading...</div>  // Or you can show a loading spinner here
        );
    }

    return <>
        <div className="flex items-center justify-center ">
            <div className="font-std mb-2 w-full rounded-2xl bg-white p-5 font-normal leading-relaxed text-gray-900 shadow-xl">
                <div className="flex flex-col">

                    <div className="flex flex-col md:flex-row justify-center mb-5 items-start">

                        <div className="text-center relative">
                            <div>
                                <img
                                    onClick={handleFileChangeClick}
                                    src="https://i.pravatar.cc/300"
                                    alt="Profile Picture"
                                    className="cursor-pointer rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
                                />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="profile"
                                    id="upload_profile"
                                    className="hidden"
                                    required
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
                    </div>
                    {/* Bilgi Düzenleme Formu */}
                    <form className="space-y-4 mt-[30px]">
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
                    </form>
                </div>
            </div>
        </div>
    </>
}