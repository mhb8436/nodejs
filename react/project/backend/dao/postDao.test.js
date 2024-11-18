const postDao = require('./postDao');

describe("Test post DAO", ()=>{
    test("createPost Test", async () => {
        const data = {
            title: "Jest Test",
            content: "Jest Test",
            UserId: 4
        }
        const result = await postDao.createPost(data);
        expect(result.title).toBe(data.title);
    });

    test("findAll Test", async () => {

    });

    test("updatePost", async () => {
        
    });
});
/// npm run test