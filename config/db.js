const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `${process.env.DB}://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.DB_IP}:${process.env.PORT}/${process.env.DB_NAME}`
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