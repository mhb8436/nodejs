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
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        writer: DataTypes.STRING,
        write_date: DataTypes.DATE,
    }, {
        tableName: 'board',
        underscore: true,
    });
    return Board;
};
