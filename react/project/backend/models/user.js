module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey : true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING, // 255
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: DataTypes.STRING,
        address: DataTypes.STRING        
    }, {
        tableName: "users"
    });
    return User;
}