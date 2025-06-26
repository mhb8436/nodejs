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
        attachments: {
            type: DataTypes.JSON, // 여러 파일 정보를 JSON으로 저장
            allowNull: true,
            defaultValue: []
        }
    }, {
        tableName: 'board',
        underscore: true,
    });
    Board.associate = function(models){
        models.Board.belongsTo(models.User);
    }
    return Board;
};
