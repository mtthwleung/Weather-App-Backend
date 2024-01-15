const request = require("supertest");
const app = require("../app");

describe('Login and Signup API', () => {
  
  describe('/signup POST request', () => {
    it('should return 204 status upon successful signup', async () => {
      const response = await request(app)
        .post('/signup')
        .send({ email: 'testemail@test.com', password: 'testpassword' });

      expect(response.status).toBe(204);
    })
  })
})