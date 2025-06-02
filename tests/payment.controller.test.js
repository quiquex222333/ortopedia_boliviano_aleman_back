const request = require("supertest");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const paymentRoutes = require("../src/routes/payment.routes");
const userRoutes = require("../src/routes/user.routes");
const Sale = require("../src/models/sale.model");
const ChangeHistory = require("../src/models/changeHistory.model");
const Employee = require("../src/models/employee.model");
const Branch = require("../src/models/branch.model");
const User = require("../src/models/user.model");
const { hashPassword } = require("../src/utils/hash");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

let token, saleId, changeHistoryId, employeeId, branchId;

beforeAll(async () => {

  const email = "paymenttest@example.com";
  const password = "123456";
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post("/api/users/login")
    .send({ email, password });

  token = res.body.token;

  const sale = await Sale.create({});
  saleId = sale._id;

  const employee = await Employee.create({
    firstName: "Ana",
    lastName: "Paredes",
    middleName: "Juárez",
    employeeType: "admin",
    imagePath: "https://example.com/image.jpg",
  });

  const branch = await Branch.create({
    name: "Sucursal Norte",
    address: "Calle 10 #100",
    city: "Santa Cruz",
    phones: ["71234567"],
    openingHours: [{ day: "Martes", from: "09:00", to: "17:00" }],
    mapUrl: "https://example.com/mapa",
    imagePath: "https://example.com/sucursal.jpg",
  });

  const change = await ChangeHistory.create({
    saleId,
    deliveryType: "casa",
    employee: employee._id,
    branch: branch._id,
  });

  employeeId = employee._id;
  branchId = branch._id;
  changeHistoryId = change._id;
});

describe("Payments Routes (protected)", () => {
  it("should create a payment for a change history", async () => {
    const res = await request(app)
      .post("/api/payments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        changeHistoryId,
        client: {
          identityNumber: "12345678",
          complement: "A",
          documentType: "CI",
          businessName: "Juan Pérez",
          email: "juan@example.com",
        },
        paymentMethods: [
          { method: "efectivo", amount: 50 },
          { method: "qr", amount: 30.5 },
        ],
        totalAmount: 80.5,
        employee: employeeId,
        branch: branchId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.totalAmount).toBe(80.5);
  });

  it("should return payments by change history ID", async () => {
    const res = await request(app)
      .get(`/api/payments/${changeHistoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should not create payment if change history does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .post("/api/payments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        changeHistoryId: fakeId,
        client: {
          identityNumber: "12345678",
          complement: "B",
          documentType: "CI",
          businessName: "Cliente X",
          email: "cliente@example.com",
        },
        paymentMethods: [{ method: "qr", amount: 100 }],
        totalAmount: 100,
        employee: employeeId,
        branch: branchId,
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("El historial de cambio no existe");
  });
});
