const request = require('supertest');
const app = require('../app');

describe('Movies API Endpoints', () => {
    it('should return a paginated list of movies', async () => {
        const res = await request(app).get('/movies?page=1');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return movie details', async () => {
        const res = await request(app).get('/movies/tt1234567');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('imdb_id', 'tt1234567');
    });
});
