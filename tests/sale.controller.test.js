const request = require("supertest");
const express = require("express");
const app = express();

const saleRoutes = require("../src/routes/sale.routes");
const userRoutes = require("../src/routes/user.routes");

const User = require("../src/models/user.model");
const Patient = require("../src/models/patient.model");
const Product = require("../src/models/product.model");
const SoldProduct = require("../src/models/soldProduct.model");
const Employee = require("../src/models/employee.model");
const Branch = require("../src/models/branch.model");
const { hashPassword } = require("../src/utils/hash");

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);

let token, patientId, productId, soldProductId, employeeId, branchId, saleId;

beforeAll(async () => {
  const email = "saleuser@example.com";
  const password = "123456";
  await User.create({ email, password: hashPassword(password) });

  const res = await request(app)
    .post("/api/users/login")
    .send({ email, password });
  token = res.body.token;

  const patient = await Patient.create({
    identityNumber: "78945612",
    lastName: "Sánchez",
    middleName: "Luis",
    firstName: "Andrés",
    birthDate: "2000-01-01",
    biologicalGender: "masculino",
  });

  const product = await Product.create({
    oldCode: "P001",
    name: "Plantilla ortopédica",
    salePrice: 120.5,
    productionArea: "plantillas",
    prescription: true,
    brand: "MarcaX",
    provider: "ProveedorY",
    unitValue: 1,
    barcode: "1234567890123",
    indications: "Dolor plantar",
    materials: ["EVA"],
    technicalData: "Medida especial",
    multimedia: { type: "imagen", path: "https://example.com/image.jpg" },
    weight: "200g",
    others: "N/A",
  });

  const soldProduct = await SoldProduct.create({
    patientId: patient._id,
    productId: product._id,
    quantity: 1,
  });

  const employee = await Employee.create({
    firstName: "Raúl",
    lastName: "Gómez",
    middleName: "Núñez",
    employeeType: "admin",
    imagePath: "https://example.com/image.jpg",
  });

  const branch = await Branch.create({
    name: "Sucursal Centro",
    address: "Av. Siempre Viva 742",
    city: "La Paz",
    phones: ["71234567"],
    openingHours: [{ day: "Lunes", from: "08:00", to: "18:00" }],
    mapUrl: "https://maps.example.com",
    imagePath: "https://example.com/sucursal.jpg",
  });

  patientId = patient._id;
  productId = product._id;
  soldProductId = soldProduct._id;
  employeeId = employee._id;
  branchId = branch._id;
});

describe("Sales Endpoints", () => {
  it("should create a sale", async () => {
    const res = await request(app)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        invoiceCode: "INV001",
        status: "pending",
        patients: [patientId],
        productsSold: [soldProductId],
        products: [productId],
        employee: employeeId,
        branch: branchId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.invoiceCode).toBe("INV001");
    saleId = res.body._id;
  });

  it("should get all sales", async () => {
    const res = await request(app)
      .get("/api/sales")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get sale by ID", async () => {
    const res = await request(app)
      .get(`/api/sales/${saleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(saleId);
  });

  it("should update sale status to completed", async () => {
    const res = await request(app)
      .put(`/api/sales/${saleId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        invoiceCode: "INV001",
        status: "completed",
        patients: [patientId],
        productsSold: [soldProductId],
        products: [productId],
        employee: employeeId,
        branch: branchId,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completed");
  });

  it("should delete sale", async () => {
    const res = await request(app)
      .delete(`/api/sales/${saleId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Venta eliminada correctamente");
  });
});
