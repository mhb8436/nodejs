module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        tableName: 'board',
        underscore: true,
    });
    Board.associate = function(models){
        models.Board.belongsTo(models.User);
    }
    return Board;
};
