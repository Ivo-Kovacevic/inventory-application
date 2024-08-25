const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        release_year INTEGER,
        rating NUMERIC(3, 1),
        description VARCHAR(1000),
        path VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        path VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS movie_genres (
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (movie_id, genre_id)
    );

    INSERT INTO movies (title, release_year, rating, description, path) VALUES
        ('Inception', '2010', 8.8, 'A thief enters dreams to plant an idea in a target''s mind.', '/movie-images/inception.jpg'),
        ('The Matrix', '1999', 8.7, 'A hacker discovers the reality he lives in is a simulated illusion.', '/movie-images/the-matrix.jpg'),
        ('Guardians of the Galaxy', '2014', 8.0, 'A team of space outlaws must save the galaxy from a powerful threat.', '/movie-images/guardians-of-the-galaxy.jpg'),
        ('Pirates of the Caribbean: The Curse of the Black Pearl', '2003', 8.1, 'A pirate and a blacksmith team up to rescue a kidnapped governor''s daughter.', '/movie-images/pirates-of-the-caribbean.jpg'),
        ('Superbad', '2007', 7.6, 'Two friends seek to have an unforgettable high school experience with a party.', '/movie-images/superbad.jpg');

    INSERT INTO genres (name, path) VALUES
        ('Sci-Fi', '/genre-images/sci-fi.jpg'),
        ('Comedy', '/genre-images/comedy.jpg'),
        ('Horror', '/genre-images/horror.jpg'),
        ('Adventure', '/genre-images/adventure.jpg'),
        ('Action', '/genre-images/action.jpg');

    INSERT INTO movie_genres (movie_id, genre_id) VALUES
        (
            (SELECT id FROM movies WHERE title = 'Inception'),
            (SELECT id FROM genres WHERE name = 'Sci-Fi')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Inception'),
            (SELECT id FROM genres WHERE name = 'Action')
        ),
        (
            (SELECT id FROM movies WHERE title = 'The Matrix'),
            (SELECT id FROM genres WHERE name = 'Sci-Fi')
        ),
        (
            (SELECT id FROM movies WHERE title = 'The Matrix'),
            (SELECT id FROM genres WHERE name = 'Action')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Guardians of the Galaxy'),
            (SELECT id FROM genres WHERE name = 'Sci-Fi')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Guardians of the Galaxy'),
            (SELECT id FROM genres WHERE name = 'Action')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Guardians of the Galaxy'),
            (SELECT id FROM genres WHERE name = 'Comedy')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl'),
            (SELECT id FROM genres WHERE name = 'Adventure')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Pirates of the Caribbean: The Curse of the Black Pearl'),
            (SELECT id FROM genres WHERE name = 'Action')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Superbad'),
            (SELECT id FROM genres WHERE name = 'Comedy')
        );
`;

const main = async function () {
    try {
        // example of database connection
        // postgresql://user:password@host:5432/database
        const connectionString = process.argv[2];
        if (!connectionString) {
            console.error(
                "Please provide the database connection string as an argument."
            );
            process.exit(1);
        }

        console.log("Seeding...");
        const client = new Client({ connectionString });

        await client.connect();
        await client.query(SQL);
        await client.end();

        console.log("Done");
    } catch (error) {
        console.error("Error during seeding: ", error);
        process.exit(1);
    }
};

main();
