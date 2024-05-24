const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Model } = require("sequelize");
const Students = require("./students");
const sequelize = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/students", async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    await Students.create(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Students.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Students.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Students.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

describe("Students API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should fetch all students", async () => {
    await Students.create({
      name: "John Doe",
      gender: "male",
      university: "Harvard",
    });
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should create a new student", async () => {
    const res = await request(app)
      .post("/api/students")
      .send({ name: "Jane Doe", gender: "female", university: "MIT" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  it("should update a student", async () => {
    const student = await Students.create({
      name: "John Doe",
      gender: "male",
      university: "Harvard",
    });
    const res = await request(app)
      .put(`/api/students/${student.id}`)
      .send({ name: "John Smith", gender: "male", university: "Harvard" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it("should delete a student", async () => {
    const student = await Students.create({
      name: "John Doe",
      gender: "male",
      university: "Harvard",
    });
    const res = await request(app).delete(`/api/students/${student.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
