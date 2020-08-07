const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://myuser:password@localhost:5432/crmdb"
);

const connectPG = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectPG;