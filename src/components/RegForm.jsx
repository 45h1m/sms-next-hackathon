"use client";
import React, { useState } from "react";
import Button from "./Button";
import { User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const RegForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        major: "Computer Science",
        roll: "",
    });
    const [loading, setLoading] = useState(false);

    const majors = ["Computer Science", "Mechanical", "Civil", "Automobile", "Electronics", "Electrical"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            age: "",
            major: "Computer Science",
            roll: "",
        });
    };

    const notify = (msg) => toast(msg);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);

        const url = "/api/registerStudent";
        const data = {
            ...formData,
        };

        try {
            const response = await axios.post(url, data);

            console.log(response);

            if (response.data.message) {
                notify(response.data.message);
                resetForm();
            }
            if (response.data.error) {
                notify(response.data.error);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            alert(error);
            setLoading(false);
        }
    };
    return (
        <div className="p-4 flex items-center flex-col">
            <h1 className="text-white text-2xl font-semibold p-6 pt-4 flex items-center gap-2">
                <User size={36} className="bg-black/10 mr-2 rounded-full p-1" />
                Register Student
            </h1>
            <form className="p-4 rounded-xl text-black bg-emerald-50 flex flex-col gap-2 max-w-md shadow-lg w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label className="pl-5 opacity-70">Name:</label>
                    <input
                        className="p-2 px-4 rounded-lg bg-white/90 text-black border-2 border-emerald-400"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Name"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="pl-5 opacity-70">Age:</label>
                    <input
                        min={18}
                        max={100}
                        className="p-2 px-4 rounded-lg bg-white/90 text-black border-2 border-emerald-400"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter Age"
                        required
                    />
                </div>
                {/* <div className="flex flex-col gap-1">
                    <label className="pl-5 opacity-70">Major:</label>
                    <input
                        className="p-2 px-4 rounded-lg bg-white/90 text-black border-2 border-emerald-400"
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        placeholder="Enter Major"
                        required
                    />
                </div> */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                        Select Major:
                    </label>
                    <select
                        id="major"
                        value={formData.major}
                        name="major"
                        onChange={handleChange}
                        className="p-3 px-4 rounded-lg bg-white/90 text-black border-2 border-emerald-400"
                    >
                        <option value="" disabled>
                            -- Select a major --
                        </option>
                        {majors.map((major, index) => (
                            <option key={index} value={major}>
                                {major}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="pl-5 opacity-70">Roll:</label>
                    <input
                        max={999999999}
                        min={100000000}
                        className="p-2 px-4 rounded-lg bg-white/90 text-black border-2 border-emerald-400"
                        type="number"
                        name="roll"
                        value={formData.roll}
                        onChange={handleChange}
                        placeholder="Enter Roll"
                        required
                    />
                </div>
                <Button loading={loading} customClass={"mt-2 text-white"}>
                    Submit
                </Button>
            </form>
            <div className="flex gap-5 justify-center pt-4">
                <Link className="underline" href="/dashboard">
                    Go to Dashboard
                </Link>
                <p className="opacity-75">or</p>
                <Link className="underline" href="/allstudents">
                    All Students
                </Link>
            </div>
        </div>
    );
};

export default RegForm;
