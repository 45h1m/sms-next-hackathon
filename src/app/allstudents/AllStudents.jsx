"use client";
import Button from "@/components/Button";
import TblRow from "@/components/TblRow";
import axios from "axios";
import { ChevronDown, Heading2, LoaderCircle, UserX } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (msg) => toast(msg);
function convertToIST(isoTime) {
    const date = new Date(isoTime);

    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    return date.toLocaleString("en-IN", options);
}

const AllStudents = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [_students, _setStudents] = useState([]);
    const [order, setOrder] = useState(false);
    const [sortKey, setSortKey] = useState("");

    const fetchStudents = async () => {
        setLoading(true);

        const url = "/api/allStudents";

        try {
            const response = await axios.get(url);

            console.log(response);

            if (response.data.message) {
                // notify(response.data.message);
                if (response.data.data) {
                    setStudents(response.data.data);
                    _setStudents(response.data.data);
                }
            }
            if (response.data.error) {
                notify("Server error: " + response.data.error);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            notify("Client side error: " + error);
            setLoading(false);
        }
    };

    const handleSortClick = (key) => {
        setOrder(!order);
        setSortKey(key);
        console.log(order);
        console.log(sortKey);
    };

    const sortStudents = () => {
        console.log(_students);
        let sortedStudents;

        if (order) {
            sortedStudents = [...students].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
            _setStudents([...sortedStudents]);

            return;
        }

        sortedStudents = [...students].sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1));
        _setStudents([...sortedStudents]);
    };

    useEffect(() => {
        sortStudents();
    }, [sortKey, order]);

    useEffect(() => {
        setTimeout(() => {
            fetchStudents();
        }, 500);
    }, []);

    return (
        <div className="h-full ">
            <div>
                <h1 className="text-white py-4 text-xl p-4">All Students {students.length > 0 && `(${students.length + 1})`}</h1>
            </div>

            <div className="overflow-x-auto bg-black/10">
                {students.length > 0 && (
                    <table className="text-white">
                        <tbody>
                            <tr className="">
                                <th>ID</th>
                                <th className="cursor-pointer"
                                    onClick={(e) => {
                                        handleSortClick("name");
                                    }}
                                >
                                    <div className={`flex items-center`}>
                                        Name
                                        <ChevronDown
                                            className={`${!order ? "rotate-0" : "rotate-180"} ${sortKey === "name" ? "opacity-100" : "opacity-0"}`}
                                        />
                                    </div>
                                </th>
                                <th className="cursor-pointer"
                                    onClick={() => {
                                        handleSortClick("roll");
                                    }}
                                >
                                    <div className={`flex items-center`}>
                                        Roll No.
                                        <ChevronDown
                                            className={`${!order ? "rotate-0" : "rotate-180"} ${sortKey === "roll" ? "opacity-100" : "opacity-0"}`}
                                        />
                                    </div>
                                </th>
                                <th className="cursor-pointer"
                                    onClick={() => {
                                        handleSortClick("age");
                                    }}
                                >
                                    <div className={`flex items-center`}>
                                        Age
                                        <ChevronDown
                                            className={`${!order ? "rotate-0" : "rotate-180"} ${sortKey === "age" ? "opacity-100" : "opacity-0"}`}
                                        />
                                    </div>
                                </th>
                                <th className="cursor-pointer"
                                    onClick={() => {
                                        handleSortClick("major");
                                    }}
                                >
                                    <div className={`flex items-center`}>
                                        Major
                                        <ChevronDown
                                            className={`${!order ? "rotate-0" : "rotate-180"} ${sortKey === "major" ? "opacity-100" : "opacity-0"}`}
                                        />
                                    </div>
                                </th>
                                <th className="cursor-pointer"
                                    onClick={() => {
                                        handleSortClick("date");
                                    }}
                                >
                                    <div className={`flex items-center`}>
                                        Registered
                                        <ChevronDown
                                            className={`rotate-180 ${!order ? "rotate-0" : "rotate-180"} ${
                                                sortKey === "date" ? "opacity-100" : "opacity-0"
                                            }`}
                                        />
                                    </div>
                                </th>

                                <th
                                    onClick={() => {
                                        alert("ok");
                                    }}
                                >
                                    <div>Actions</div>
                                </th>
                            </tr>
                            {_students?.map((student, index) => (
                                <TblRow
                                    key={index}
                                    id={student._id}
                                    name={student.name}
                                    age={student.age}
                                    major={student.major}
                                    date={convertToIST(student.createdAt)}
                                    roll={student.roll}
                                    onDelete={() => {
                                        fetchStudents();
                                    }}
                                    onSaveChange={() => {
                                        fetchStudents();
                                    }}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {loading && (
                <h2 className="text-center flex items-center justify-center p-10">
                    <LoaderCircle className="animate-spin mr-2" />
                    Fetching Students..
                </h2>
            )}
            {!loading && students.length === 0 && (
                <>
                    <h2 className="text-center flex items-center justify-center">
                        <UserX className="mr-2" />
                        No records found!
                    </h2>
                </>
            )}
            <div className="flex gap-5 justify-center p-4 sticky bottom-0 bg-emerald-700">
                <Link className="underline" href="/dashboard">
                    Go to Dashboard
                </Link>
                <p className="opacity-75">or</p>
                <Link className="underline" href="/register">
                    Register Student
                </Link>
            </div>
        </div>
    );
};

export default AllStudents;
