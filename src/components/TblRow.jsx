"use client";
import React, { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
const notify = (msg) => toast(msg);

const TblRow = ({ id = "ID", name = "Name", roll = "Roll", date = "Date", major = "major", age = "Age", onDelete, onSaveChange }) => {
    let [nameValue, setNameValue] = useState(name);
    const [formData, setFormData] = useState({
        name,
        age,
        major,
        roll,
    });
    let [valueChanged, setValueChanged] = useState(false);
    let [saving, setSaving] = useState(false);
    let [deleting, setDeleting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (!valueChanged) setValueChanged(true);
    };

    const handleSaveChanges = async (id) => {
        setSaving(true);

        const url = "/api/updateStudent";

        try {
            const response = await axios.post(url, {
                id,
                name: formData.name,
                age: formData.age,
                major: formData.major,
                roll: formData.roll,
            });

            console.log(response);

            if (response.data.message) {
                notify(response.data.message);
                onSaveChange(id);
            }
            if (response.data.error) {
                notify("Server error: " + response.data.error);
            }

        } catch (error) {
            console.log(error);
            notify("Client side error: " + error);
        }

        setTimeout(() => {
            setSaving(false);
            setValueChanged(false);
        }, 1000);
    };

    const handleDelete = async () => {
        setDeleting(true);

        const url = "/api/deleteStudent";

        try {
            const response = await axios.post(url, {
                id,
            });

            console.log(response);

            if (response.data.message) {
                notify(response.data.message);

                setTimeout(() => {
                    
                    if (onDelete) onDelete(id);
                    setDeleting(false);
                }, 1000);
            }
            if (response.data.error) {
                notify("Server error: " + response.data.error);
            }
            
        } catch (error) {
            console.log(error);
            notify("Client side error: " + error);
        }
        
        setDeleting(false);
    };

    useEffect(() => {
        setFormData({
            ...formData,
            name, age, major, roll    
        });
    }, [name, age, major, roll])

    return (
        <tr>
            <td>{id}</td>
            <td>
                <input
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="bg-transparent outline-none p-2 rounded-lg w-[300px] focus:bg-slate-900"
                />
            </td>
            <td>
                <input
                    type="text"
                    name="roll"
                    value={formData.roll}
                    onChange={handleChange}
                    className="bg-transparent outline-none p-2 rounded-lg focus:bg-slate-900"
                />
            </td>
            <td>
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="bg-transparent outline-none p-2 rounded-lg focus:bg-slate-900"
                />
            </td>
            <td>
                <input
                    type="text"
                    value={formData.major}
                    name="major"
                    onChange={handleChange}
                    className="bg-transparent outline-none p-2 rounded-lg focus:bg-slate-900"
                />
            </td>
            <td>{date}</td>
            <td className={`flex justify-end ${!onDelete ? "hidden" : ""} gap-2 sticky right-0`}>
                {valueChanged ? (
                    <Button disabled={saving} onclick={() => handleSaveChanges({ id, name, roll, major, age })} loading={saving} customClass="bg-emerald-600">
                        Update
                    </Button>
                ) : (
                    ""
                )}
                <Button disabled={deleting} onclick={handleDelete} loading={deleting} customClass="bg-orange-600">
                    Delete
                </Button>
            </td>
        </tr>
    );
};

export default TblRow;
