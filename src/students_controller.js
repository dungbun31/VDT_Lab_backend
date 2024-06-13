const Students = require("./students");

const findAll = async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

const create = async (req, res) => {
  try {
    await Students.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
};

const findById = async (req, res) => {
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
};

const update = async (req, res) => {
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
};

const deleteById = async (req, res) => {
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
};

module.exports = { findAll, create, findById, update, deleteById };
