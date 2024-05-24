const request = require("supertest");
const express = require("express");
const studentsController = require("../src/students_controller");
const Students = require("../src/students");

const app = express();
app.use(express.json());
app.use("/api/students", studentsController);

jest.mock("../src/students");

describe("Students API", () => {
  beforeEach(() => {
    Students.findAll.mockClear();
    Students.create.mockClear();
    Students.findByPk.mockClear();
    Students.update.mockClear();
    Students.destroy.mockClear();
  });

  test("GET /api/students should return all students", async () => {
    const students = [{ id: 1, name: "John Doe" }];
    Students.findAll.mockResolvedValue(students);

    const response = await request(app).get("/api/students");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(students);
  });

  test("POST /api/students should create a new student", async () => {
    const newStudent = {
      name: "John Doe",
      gender: "male",
      university: "University",
    };
    Students.create.mockResolvedValue(newStudent);

    const response = await request(app).post("/api/students").send(newStudent);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ success: true });
  });

  test("PUT /api/students/:id should update a student", async () => {
    const updatedStudent = {
      name: "Jane Doe",
      gender: "female",
      university: "University",
    };
    Students.findByPk.mockResolvedValue(updatedStudent);
    Students.update.mockResolvedValue([1]);

    const response = await request(app)
      .put("/api/students/1")
      .send(updatedStudent);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  test("DELETE /api/students/:id should delete a student", async () => {
    Students.findByPk.mockResolvedValue({ id: 1 });
    Students.destroy.mockResolvedValue(1);

    const response = await request(app).delete("/api/students/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });
});
