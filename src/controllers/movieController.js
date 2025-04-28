const movieModel = require('../models/movieModel');

function listMovies(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const offset = (page - 1) * limit;

    movieModel.getAllMovies(limit, offset, (err, rows) => {
        if (err) return next(err);
        res.json(rows);
    });
}

function getMovieDetails(req, res, next) {
    const { id } = req.params;

    movieModel.getMovieDetails(id, (err, movieDetails) => {
        if (err) return next({ status: 404, message: err });
        res.json(movieDetails);
    });
}

module.exports = { listMovies, getMovieDetails };
