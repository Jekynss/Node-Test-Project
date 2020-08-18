'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.belongsToMany(models.Profile, {
        as: "profiles",
        through: models.Profile_Projects,
        foreignKey: 'project_id',
        otherKey: 'profile_id',
        onDelete: 'CASCADE'
      });
    }
  };
  Project.init({
    name: DataTypes.STRING,
    status: DataTypes.ENUM('active','pending','completed','failed'),
    stack: DataTypes.ARRAY(DataTypes.STRING,),
    price: DataTypes.NUMERIC,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};