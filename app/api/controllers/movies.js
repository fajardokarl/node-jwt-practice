const movieModel = require('../models/movies')

module.exports = {
    //Getting Specific Movie by ID
    getById: (req, res, next) => {
        movieModel.findById(req.params.movieId, (err, movieInfo) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: "success",
                    message: "Movie Found",
                    data: {
                        movies: movieInfo
                    }
                })
            }
        })
    },
    // Getting list of all movies
    getAll: (req, res, next) => {
        let moviesList = []

        movieModel.find({}, (err, movies) => {
            if (err) {
                next(err)
            } else { // refactored lessons code
                movies.forEach(movie => {
                    moviesList = [...moviesList, {
                        id: movie._id,
                        name: movie.name,
                        released_on: movie.released_on
                    }]
                })

                res.json({
                    status: "success",
                    message: "All Movies Found.",
                    data: {
                        movies: moviesList
                    }
                })
            }
        })
    },
    // Update a Movie
    updateById: (req, res, next) => {
        movieModel.findByIdAndUpdate(req.params.movieId, {name: req.body.name}, (err, movieInfo) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: "success",
                    message: "Movie Updated.",
                    data: null
                })
            }
        })
    },
    // Delete a Movie
    deleteById: (req, res, next) => {
        movieModel.findByIdAndRemove(req.params.movieId, (err, movieInfo) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: "success",
                    message: "Movie Removed.",
                    data: null
                })
            }
        })
    },
    // Create Movie
    create: (req, res, next) => {
        movieModel.create({
            name: req.body.name,
            released_on: req.body.released_on
        }, (err, result) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    status: "success",
                    message: "Movie Created.",
                    data: null
                })
            }
        })
    }
}