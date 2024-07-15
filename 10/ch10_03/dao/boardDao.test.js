const boardDao = require('./boardDao');

describe('Board DAO', () => {
    test('should create a new board data ', async () => {
        const boardData = {
            title: 'This is title 3',
            content: 'This is content 3',
            user: 'jane'
        };
        const createdBoard = await boardDao.createBoard(boardData);
        expect(createdBoard.title).toBe(boardData.title)
    });
});


