'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    todo: DataTypes.STRING
  }, {});
  todo.associate = function(models) {
    todo.belongsTo(models.user,{
      onDelete:'CASCADE'
    });
    // associations can be defined here
  };
  return todo;
};