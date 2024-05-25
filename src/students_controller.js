const express = require("express");
const router = express.Router();
const Students = require("./students");

// Route GET to fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Route POST to create a new student
router.post("/", async (req, res) => {
  try {
    await Students.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// Route PUT to view more information of student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
});

// Route PUT to update student by ID
router.put("/:id", async (req, res) => {
  try {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Students.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

// Route DELETE to delete student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Students.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = router;
