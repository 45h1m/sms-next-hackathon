import connectDB from "@/lib/connectDB";
import { StudentModel } from "@/schemas/Schemas";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Provide ID!" });
        }

        await connectDB();

        const deletedStudent = await StudentModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));

        if(!deletedStudent) {
            return NextResponse.json({ message: "Student not found!" });
        }

        return NextResponse.json({ message: "Student was deleted!" });
    } catch (error) {
        console.log("Error registering: " + error);
        return NextResponse.json({ error: "Something went wrong!" });
    }
}
