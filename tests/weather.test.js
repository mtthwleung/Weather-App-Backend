const request = require('supertest');
const app = require('../app');

describe('Weather API', () => {

  describe('/weather/:city GET endpoint', () => {
    it('should return weather data for valid city', async () => {
      const city = 'london';
      const response = await request(app).get(`/weather/${city}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('day0');
      expect(response.body.day0).toHaveProperty('temperature');
      expect(response.body.day0).toHaveProperty('weather');
    });

    it('should return error if no data for city', async () => {
      const city = 'new york';
      const response = await request(app).get(`/weather/${city}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Weather data not found" });

    })
  });
});