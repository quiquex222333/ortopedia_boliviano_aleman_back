module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecret",
  jwtExpiresIn: "1h",
  dbUrl: process.env.MONGO_URI,
};
