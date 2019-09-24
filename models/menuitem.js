module.exports = function(sequelize, DataTypes) {
  var MenuItem = sequelize.define("MenuItem", {
    category: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return MenuItem;
};
