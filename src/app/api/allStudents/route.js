import connectDB from "@/lib/connectDB";
import { StudentModel } from "@/schemas/Schemas";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        

    
        await connectDB();

        const students = await StudentModel.find();

        return NextResponse.json({ message: "Student data fetched!", data: students });
    } catch (error) {
        console.log("Error in all students: " + error);
        return NextResponse.json({ error: "Something went wrong!" });
    }
}
