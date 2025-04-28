const movieModel = require('../models/movieModel');

describe('Movie Model', () => {
    it('should return paginated movies for valid input', (done) => {
        movieModel.getAllMovies(50, 0, (err, rows) => {
            expect(err).toBeNull();
            expect(Array.isArray(rows)).toBeTruthy();
            done();
        });
    });

    it('should handle database errors gracefully', (done) => {
        jest.spyOn(movieModel, 'getAllMovies').mockImplementation((limit, offset, callback) => {
            callback({ status: 500, message: 'Database query failed.' });
        });

        movieModel.getAllMovies(50, 0, (err, rows) => {
            expect(err).toHaveProperty('status', 500);
            expect(err).toHaveProperty('message', 'Database query failed.');
            done();
        });
    });

    it('should handle missing movie ID', (done) => {
        movieModel.getMovieDetails(null, (err, details) => {
            expect(err).toHaveProperty('status', 400);
            expect(err).toHaveProperty('message', 'Invalid movie ID.');
            done();
        });
    });
});
