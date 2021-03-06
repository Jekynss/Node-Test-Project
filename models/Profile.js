"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.belongsToMany(models.Project, {
        as: "projects",
        through: models.Profile_Projects,
        foreignKey: 'profile_id',
        otherKey: 'project_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Profile.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      phone: DataTypes.STRING,
      image_url: DataTypes.STRING,
      phone: DataTypes.STRING,
      description: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
