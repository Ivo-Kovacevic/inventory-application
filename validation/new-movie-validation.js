const { check } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 100 characters.";
const yearErr = "must be whole number between 1900 and 2100";
const genreErr = "At least 1 genre must be picked";
const $ratingErr = "Rating must be number between 1 and 10";

const validateNewMovie = [
    check("name")
        .trim()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage(`Movie name ${alphaErr}`)
        .isLength({ min: 1, max: 100 })
        .withMessage(`Movie name ${lengthErr}`),

    check("year")
        .trim()
        .isInt({ min: 1900, max: 2100 })
        .withMessage(`Year ${yearErr}`),

    check("genres").notEmpty().withMessage(genreErr),

    check("rating")
        .trim()
        .isFloat({ min: 1, max: 10 })
        .withMessage($ratingErr),

    check("description")
        .optional({ values: "falsy" })
        .trim(),
];

module.exports = { validateNewMovie };
