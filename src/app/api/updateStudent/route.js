import connectDB from "@/lib/connectDB";
import { StudentModel } from "@/schemas/Schemas";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { id, name, age, major, roll } = await req.json();

        if (!id || !name || !age || !roll || !major) {
            return NextResponse.json({ error: "Provide all fields!" });
        }

        await connectDB();

        const updatedStudent = await StudentModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
            { name, age, major, roll },
            { new: true, runValidators: true } // Options: return the updated doc and validate the fields
        );

        if (!updatedStudent) {
            return NextResponse.json({ error: "Student not found!" });
        }

        return NextResponse.json({ message: "Student with roll: "+ roll + ", named: "+name+" was updated!", data: updatedStudent });
    } catch (error) {
        console.log("Error updating student: " + error);
        return NextResponse.json({ error: "Something went wrong!" });
    }
}
