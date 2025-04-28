const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { parseBudgetToUSD } = require('../utils/budgetHelper');

const dbPathMovies = path.resolve(__dirname, '../../db/movies.db');
const moviesDb = new sqlite3.Database(dbPathMovies);

// Fetch all movies (paginated)
function getAllMovies(limit, offset, callback) {
    const query = `
    SELECT imdbId, title, genres, releaseDate, budget
    FROM movies
    LIMIT ? OFFSET ?;
  `;
    moviesDb.all(query, [limit, offset], (err, rows) => {
        if (err) return callback({ status: 500, message: 'Database query failed.' });
        callback(null, rows.map(row => ({
            ...row,
            budget: parseBudgetToUSD(row.budget || 0),
            genres: row.genres || 'Unknown', // Handle null genres
        })));
    });
}

// Fetch movie details by imdbId
function getMovieDetails(imdbId, callback) {
    if (!imdbId) return callback({ status: 400, message: 'Invalid movie ID.' });

    const query = `
    SELECT imdbId, title, overview AS description, releaseDate, budget, runtime, genres, language AS original_language, productionCompanies AS production_companies
    FROM movies
    WHERE imdbId = ?;
  `;
    moviesDb.get(query, [imdbId], (err, movieRow) => {
        if (err) return callback({ status: 500, message: 'Database query failed.' });
        if (!movieRow) return callback({ status: 404, message: 'Movie not found.' });

        callback(null, {
            ...movieRow,
            budget: parseBudgetToUSD(movieRow.budget || 0),
            genres: movieRow.genres || 'Unknown', // Handle null genres
        });
    });
}

module.exports = { getAllMovies, getMovieDetails };
