import mongoose from "mongoose";
import express from "express";
const router = express.Router();

mongoose.set("strictQuery", true);

//create database schema
const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
});

// create schema object
const Student = mongoose.model("student", studentSchema);

// finding student
const FIND_STUDENT = async (req, res) => {
  const { id } = req.params;
  const student = await Student.find({ _id: id });
  if (!student) {
    return res.status(404).json({
      err: "student not found",
    });
  }
  res.status(200).json(student);
};

//creating a new student
const CREATE_STUDENT = async (req, res) => {
  const { fName, lName, programme, residence } = req.body;

  if (!fName && !lName && !programme && !residence) {
    res.status(500).json({
      err: "make sure all fields are correct",
    });
  }

  const student = new Student({
    firstName: fName,
    lastName: lName,
    programme: programme,
    residence: residence,
  });

  const response = await student.save();

  res.status(201).json(response);
};

router.get("/find-student/:id", FIND_STUDENT);
router.post("/create-student", CREATE_STUDENT);

export default router;
