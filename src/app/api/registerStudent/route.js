import connectDB from "@/lib/connectDB";
import { StudentModel } from "@/schemas/Schemas";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, age, major, roll } = await req.json();

        if (!name || !age || !roll || !major) {
            return NextResponse.json({ error: "Provide all fields!" });
        }

        await connectDB();

        const newStudent = new StudentModel({
            name,
            age,
            major,
            roll,
        });

        const savedStudent = await newStudent.save();

        return NextResponse.json({ message: "Student successfully registered!", data: savedStudent });
    } catch (error) {
        console.log("Error registering: " + error);
        return NextResponse.json({ error: "Something went wrong!" });
    }
}
