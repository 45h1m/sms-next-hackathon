import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
        max: 120,
        min: 10,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18, 
        max: 120, 
        trim: true
    },
    major: {
        min: 5,
        max: 100,
        type: String,
        required: true,
        trim: true,
        enum: ["Computer Science", "Mechanical", "Civil", "Automobile", "Electronics", "Electrical"], 
    },
    roll: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        min: 9,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

studentSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export const StudentModel = models.Students || model("Students", studentSchema);