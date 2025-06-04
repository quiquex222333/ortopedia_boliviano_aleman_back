const request = require("supertest");
const express = require("express");
const app = express();

const patientRoutes = require("../src/routes/patient.routes");
const userRoutes = require("../src/routes/user.routes");
const User = require("../src/models/user.model");
const { hashPassword } = require("../src/utils/hash");

app.use(express.json());
app.use("/api/patients", patientRoutes);
app.use("/api/users", userRoutes);

let token;
let patientId;

beforeAll(async () => {
  const email = "testpatient@example.com";
  const password = "123456";
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post("/api/users/login")
    .send({ email, password });
  token = res.body.token;
});

describe("Patient Endpoints", () => {
  it("should create a patient with only required fields", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        identityNumber: 987654,
        lastName: "Flores",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.identityNumber).toBe(987654);
    expect(res.body.lastName).toBe("Flores");
    patientId = res.body._id;
  });

  it("should fail to create patient without identityNumber", async () => {
    const res = await request(app)
      .post("/api/patients")
      .set("Authorization", `Bearer ${token}`)
      .send({ lastName: "Gonzalez" });

    expect(res.statusCode).toBe(400);
  });

  it("should update patient with optional fields", async () => {
    const res = await request(app)
      .put(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        identityNumber: 987654,
        lastName: "Flores",
        firstName: "Marco",
        email: "marco@example.com",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Marco");
    expect(res.body.email).toBe("marco@example.com");
  });

  it("should get all patients", async () => {
    const res = await request(app)
      .get("/api/patients")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should delete patient", async () => {
    const res = await request(app)
      .delete(`/api/patients/${patientId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Paciente eliminado");
  });
});
