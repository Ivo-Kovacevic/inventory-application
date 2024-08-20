const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR( 50 ) NOT NULL,
        release_date DATE,
        rating NUMERIC( 3, 1 ),
        description VARCHAR( 255 )
    );

    CREATE TABLE IF NOT EXISTS genres (
        id SERIAL PRIMARY KEY,
        name VARCHAR( 30 )
    );

    CREATE TABLE IF NOT EXISTS movie_genres (
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (movie_id, genre_id)
    );

    INSERT INTO movies (title, release_date, rating, description) VALUES
        ('Inception', '2010-07-16', 8.8, 'A mind-bending thriller.'),
        ('The Matrix', '1999-03-31', 8.7, 'A sci-fi classic.');

    INSERT INTO genres (genre) VALUES
        ('Sci-Fi'),
        ('Action');

    INSERT INTO movie_genres (movie_id, genre_id) VALUES
        (
            (SELECT id FROM movies WHERE title = 'Inception'),
            (SELECT id FROM genres WHERE genre = 'Sci-Fi')
        ),
        (
            (SELECT id FROM movies WHERE title = 'Inception'),
            (SELECT id FROM genres WHERE genre = 'Action')
        ),
        (
            (SELECT id FROM movies WHERE title = 'The Matrix'),
            (SELECT id FROM genres WHERE genre = 'Sci-Fi')
        ),
        (
            (SELECT id FROM movies WHERE title = 'The Matrix'),
            (SELECT id FROM genres WHERE genre = 'Action')
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
