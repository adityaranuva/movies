const movieController = require('../controllers/movieController');
const movieModel = require('../models/movieModel');

jest.mock('../models/movieModel');

describe('Movie Controller', () => {
    it('should return movies for valid pagination', (done) => {
        const req = { query: { page: 1 } };
        const res = { json: jest.fn() };
        const next = jest.fn();

        movieModel.getAllMovies.mockImplementation((limit, offset, callback) => {
            callback(null, [{ imdb_id: 'tt1234567', title: 'Test Movie' }]);
        });

        movieController.listMovies(req, res, next);

        setTimeout(() => {
            expect(res.json).toHaveBeenCalledWith([{ imdb_id: 'tt1234567', title: 'Test Movie' }]);
            done();
        }, 50);
    });
});
