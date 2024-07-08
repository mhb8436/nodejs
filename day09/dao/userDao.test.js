const userDao = require('./userDao');

describe('User DAO', () => {
    test('should create a new user', async () => {
        const userData = {
            email: 'jane1@example.com',
            name: 'jane doe',
            password: 'jane1234'
        };
        const createdUser = await userDao.createUser(userData);
        expect(createdUser.email).toBe(userData.email)
    });
});


